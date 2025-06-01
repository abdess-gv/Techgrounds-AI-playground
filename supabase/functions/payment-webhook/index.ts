
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

serve(async (req) => {
  const signature = req.headers.get('stripe-signature')
  
  if (!signature) {
    return new Response('No signature', { status: 400 })
  }

  try {
    const body = await req.text()
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Verify webhook signature (simplified for demo)
    const event = JSON.parse(body)
    
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object
      
      // Get user ID from metadata
      const userId = session.metadata?.user_id
      const courseType = session.metadata?.course_type
      const accessLevel = session.metadata?.access_level

      if (!userId || !courseType || !accessLevel) {
        throw new Error('Missing required metadata')
      }

      // Create premium access record
      await supabase
        .from('premium_access')
        .insert({
          user_id: userId,
          course_type: courseType,
          access_level: accessLevel,
          payment_status: 'completed',
          payment_amount: session.amount_total,
          stripe_payment_id: session.payment_intent,
          purchase_date: new Date().toISOString(),
          expires_at: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString() // 1 year
        })

      // Enroll user in premium courses
      await enrollUserInPremiumCourses(supabase, userId, courseType)

      console.log(`Premium access granted to user ${userId} for ${courseType}`)
    }

    return new Response('OK', { status: 200 })

  } catch (error) {
    console.error('Webhook Error:', error)
    return new Response('Error', { status: 400 })
  }
})

async function enrollUserInPremiumCourses(supabase: any, userId: string, courseType: string) {
  // Get premium course IDs for the course type
  const { data: config } = await supabase
    .from('moodle_config')
    .select('setting_value')
    .eq('setting_key', 'premium_course_ids')
    .single()

  if (!config) return

  const courseIds = config.setting_value.split(',').map((id: string) => parseInt(id.trim()))

  // Enroll user in each premium course
  for (const courseId of courseIds) {
    try {
      await fetch(Deno.env.get('SUPABASE_URL') + '/functions/v1/moodle-sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')}`
        },
        body: JSON.stringify({
          userId,
          courseId,
          action: 'enroll_user'
        })
      })
    } catch (error) {
      console.error(`Failed to enroll user ${userId} in course ${courseId}:`, error)
    }
  }
}
