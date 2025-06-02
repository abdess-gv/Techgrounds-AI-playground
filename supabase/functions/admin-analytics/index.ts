
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Verify admin access
    const authHeader = req.headers.get('Authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new Response(JSON.stringify({ error: 'Missing authorization header' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    const token = authHeader.replace('Bearer ', '')
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser(token)
    if (userError || !user) {
      return new Response(JSON.stringify({ error: 'Invalid token' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    const { data: profile } = await supabaseClient
      .from('profiles')
      .select('user_role')
      .eq('id', user.id)
      .single()

    if (!profile || profile.user_role !== 'admin') {
      return new Response(JSON.stringify({ error: 'Admin access required' }), {
        status: 403,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    // Get analytics data
    const now = new Date()
    const thirtyDaysAgo = new Date(now.getTime() - (30 * 24 * 60 * 60 * 1000))
    const sevenDaysAgo = new Date(now.getTime() - (7 * 24 * 60 * 60 * 1000))

    // User statistics
    const { data: userStats } = await supabaseClient
      .from('profiles')
      .select('id, created_at, user_role, subscription_plan')

    const totalUsers = userStats?.length || 0
    const newUsersThisWeek = userStats?.filter(u => new Date(u.created_at) > sevenDaysAgo).length || 0
    const adminUsers = userStats?.filter(u => u.user_role === 'admin').length || 0
    const proUsers = userStats?.filter(u => u.subscription_plan === 'pro').length || 0

    // Content statistics
    const { data: contentStats } = await supabaseClient
      .from('content_modules')
      .select('id, status, created_at')

    const totalContent = contentStats?.length || 0
    const publishedContent = contentStats?.filter(c => c.status === 'published').length || 0
    const draftContent = contentStats?.filter(c => c.status === 'draft').length || 0

    // Usage statistics (if available)
    const { data: usageStats } = await supabaseClient
      .from('usage_stats')
      .select('action_type, created_at')
      .gte('created_at', thirtyDaysAgo.toISOString())

    // Calculate daily usage for the past 7 days
    const dailyUsage = []
    for (let i = 6; i >= 0; i--) {
      const date = new Date(now.getTime() - (i * 24 * 60 * 60 * 1000))
      const dateStr = date.toISOString().split('T')[0]
      const dayUsage = usageStats?.filter(u => u.created_at.startsWith(dateStr)).length || 0
      
      dailyUsage.push({
        date: dateStr,
        usage: dayUsage,
        dayName: date.toLocaleDateString('nl-NL', { weekday: 'short' })
      })
    }

    // Recent admin activity
    const { data: recentActivity } = await supabaseClient
      .from('admin_logs')
      .select(`
        action,
        details,
        created_at,
        profiles!admin_logs_admin_id_fkey(full_name, email)
      `)
      .order('created_at', { ascending: false })
      .limit(10)

    const analytics = {
      overview: {
        totalUsers,
        newUsersThisWeek,
        adminUsers,
        proUsers,
        totalContent,
        publishedContent,
        draftContent,
        totalUsage: usageStats?.length || 0
      },
      dailyUsage,
      recentActivity: recentActivity || [],
      userGrowth: {
        thisWeek: newUsersThisWeek,
        lastWeek: userStats?.filter(u => {
          const created = new Date(u.created_at)
          return created > new Date(now.getTime() - (14 * 24 * 60 * 60 * 1000)) && created <= sevenDaysAgo
        }).length || 0
      }
    }

    return new Response(JSON.stringify({ analytics }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
})
