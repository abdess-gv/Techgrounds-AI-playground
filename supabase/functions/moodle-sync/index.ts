
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { userId, courseId, progress, action } = await req.json()
    
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    switch (action) {
      case 'sync_progress':
        await syncCourseProgress(supabase, userId, courseId, progress)
        break
      
      case 'enroll_user':
        await enrollUserInCourse(supabase, userId, courseId)
        break
      
      case 'update_completion':
        await updateCourseCompletion(supabase, userId, courseId, progress)
        break
      
      default:
        throw new Error(`Unknown action: ${action}`)
    }

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Sync Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
    )
  }
})

async function syncCourseProgress(supabase: any, userId: string, courseId: number, progress: any) {
  const { data: existingProgress } = await supabase
    .from('course_progress')
    .select('*')
    .eq('user_id', userId)
    .eq('moodle_course_id', courseId)
    .single()

  if (existingProgress) {
    await supabase
      .from('course_progress')
      .update({
        completion_percentage: progress.completionPercentage || 0,
        completed_lessons: progress.completedLessons || 0,
        total_lessons: progress.totalLessons || 0,
        last_accessed: new Date().toISOString(),
        certificate_earned: progress.certificateEarned || false
      })
      .eq('user_id', userId)
      .eq('moodle_course_id', courseId)
  } else {
    await supabase
      .from('course_progress')
      .insert({
        user_id: userId,
        moodle_course_id: courseId,
        course_name: progress.courseName || `Course ${courseId}`,
        completion_percentage: progress.completionPercentage || 0,
        completed_lessons: progress.completedLessons || 0,
        total_lessons: progress.totalLessons || 0,
        certificate_earned: progress.certificateEarned || false
      })
  }

  console.log(`Progress synced for user ${userId} in course ${courseId}`)
}

async function enrollUserInCourse(supabase: any, userId: string, courseId: number) {
  // Get Moodle configuration for enrollment
  const { data: moodleConfig } = await supabase
    .from('moodle_config')
    .select('setting_value')
    .eq('setting_key', 'moodle_base_url')
    .single()

  if (!moodleConfig) {
    throw new Error('Moodle configuration not found')
  }

  // Get user's Moodle ID
  const { data: moodleUser } = await supabase
    .from('moodle_users')
    .select('moodle_user_id')
    .eq('user_id', userId)
    .single()

  if (!moodleUser) {
    throw new Error('User not connected to Moodle')
  }

  // Enroll user in Moodle course via Web Services API
  const enrollmentResult = await enrollInMoodleCourse(
    moodleUser.moodle_user_id,
    courseId,
    moodleConfig.setting_value
  )

  console.log(`User ${userId} enrolled in course ${courseId}:`, enrollmentResult)
}

async function updateCourseCompletion(supabase: any, userId: string, courseId: number, progress: any) {
  await supabase
    .from('course_progress')
    .upsert({
      user_id: userId,
      moodle_course_id: courseId,
      course_name: progress.courseName || `Course ${courseId}`,
      completion_percentage: progress.completionPercentage || 0,
      completed_lessons: progress.completedLessons || 0,
      total_lessons: progress.totalLessons || 0,
      certificate_earned: progress.certificateEarned || false,
      last_accessed: new Date().toISOString()
    })

  // Trigger real-time notification
  console.log(`Course completion updated for user ${userId}`)
}

async function enrollInMoodleCourse(moodleUserId: number, courseId: number, moodleBaseUrl: string) {
  // This would be replaced with actual Moodle Web Services API call
  return { success: true, enrolled: true }
}
