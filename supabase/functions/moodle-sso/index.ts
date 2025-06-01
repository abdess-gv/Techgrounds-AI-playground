
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { courseId, userId } = await req.json()
    
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    )

    // Verify user is authenticated
    const authHeader = req.headers.get('Authorization')!
    const token = authHeader.replace('Bearer ', '')
    const { data: user } = await supabase.auth.getUser(token)
    
    if (!user.user) {
      throw new Error('User not authenticated')
    }

    // Get Moodle configuration
    const { data: moodleConfig } = await supabase
      .from('moodle_config')
      .select('setting_key, setting_value')
      .in('setting_key', ['moodle_base_url', 'sso_secret_key'])

    const moodleBaseUrl = moodleConfig?.find(c => c.setting_key === 'moodle_base_url')?.setting_value
    const ssoSecret = moodleConfig?.find(c => c.setting_key === 'sso_secret_key')?.setting_value

    if (!moodleBaseUrl || !ssoSecret) {
      throw new Error('Moodle configuration not found')
    }

    // Check user's Moodle connection
    let { data: moodleUser } = await supabase
      .from('moodle_users')
      .select('moodle_user_id')
      .eq('user_id', user.user.id)
      .single()

    // Create Moodle user if doesn't exist
    if (!moodleUser) {
      const moodleUserId = await createMoodleUser(user.user, moodleBaseUrl)
      
      await supabase
        .from('moodle_users')
        .insert({
          user_id: user.user.id,
          moodle_user_id: moodleUserId
        })
      
      moodleUser = { moodle_user_id: moodleUserId }
    }

    // Generate SSO token
    const timestamp = Math.floor(Date.now() / 1000)
    const ssoData = {
      user_id: moodleUser.moodle_user_id,
      course_id: courseId,
      timestamp,
      redirect: `${moodleBaseUrl}/course/view.php?id=${courseId}`
    }

    const ssoToken = await generateSSOToken(ssoData, ssoSecret)
    const ssoUrl = `${moodleBaseUrl}/auth/sso/?token=${ssoToken}`

    return new Response(
      JSON.stringify({ ssoUrl, success: true }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('SSO Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
    )
  }
})

async function createMoodleUser(user: any, moodleBaseUrl: string) {
  // Simulate Moodle user creation - replace with actual Moodle Web Services API call
  const moodleResponse = await fetch(`${moodleBaseUrl}/webservice/rest/server.php`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      wstoken: Deno.env.get('MOODLE_WS_TOKEN') ?? '',
      wsfunction: 'core_user_create_users',
      moodlewsrestformat: 'json',
      'users[0][username]': user.email,
      'users[0][email]': user.email,
      'users[0][firstname]': user.user_metadata?.full_name?.split(' ')[0] || 'User',
      'users[0][lastname]': user.user_metadata?.full_name?.split(' ').slice(1).join(' ') || 'Name'
    })
  })

  const result = await moodleResponse.json()
  return result[0]?.id || Math.floor(Math.random() * 10000) // Fallback for demo
}

async function generateSSOToken(data: any, secret: string) {
  const encoder = new TextEncoder()
  const keyData = encoder.encode(secret)
  const messageData = encoder.encode(JSON.stringify(data))
  
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  
  const signature = await crypto.subtle.sign('HMAC', cryptoKey, messageData)
  const signatureArray = new Uint8Array(signature)
  const signatureHex = Array.from(signatureArray)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')
  
  return btoa(JSON.stringify({ ...data, signature: signatureHex }))
}
