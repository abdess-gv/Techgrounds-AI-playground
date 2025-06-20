
-- Complete the database migration for roster functionality

-- Add missing columns to programs table
ALTER TABLE public.programs 
ADD COLUMN IF NOT EXISTS anchor_date DATE,
ADD COLUMN IF NOT EXISTS cycle_weeks INTEGER DEFAULT 4;

-- Update existing programs with proper anchor dates and cycle weeks
UPDATE public.programs 
SET 
  anchor_date = '2024-07-01',
  cycle_weeks = 4
WHERE name = 'Pathways';

UPDATE public.programs 
SET 
  anchor_date = '2024-09-02', 
  cycle_weeks = 4
WHERE name = 'Work-Ready';

UPDATE public.programs 
SET 
  anchor_date = '2024-10-07',
  cycle_weeks = 4  
WHERE name = 'AI-Geletterd';

-- Create roster_entries table that the frontend expects
CREATE TABLE IF NOT EXISTS public.roster_entries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  program_id UUID NOT NULL REFERENCES public.programs(id) ON DELETE CASCADE,
  week_number INTEGER NOT NULL CHECK (week_number >= 1 AND week_number <= 4),
  day_of_week INTEGER NOT NULL CHECK (day_of_week >= 1 AND day_of_week <= 5),
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  location_type TEXT NOT NULL CHECK (location_type IN ('Online', 'Fysiek', 'Zelfstudie')),
  location_details TEXT,
  meeting_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on roster_entries
ALTER TABLE public.roster_entries ENABLE ROW LEVEL SECURITY;

-- Create policies for roster_entries
CREATE POLICY "Roster entries are viewable by everyone" 
  ON public.roster_entries 
  FOR SELECT 
  USING (true);

CREATE POLICY "Roster entries are manageable by admins" 
  ON public.roster_entries 
  FOR ALL 
  USING (public.is_admin(auth.uid()));

-- Add some sample roster entries based on existing cycle details
INSERT INTO public.roster_entries (program_id, week_number, day_of_week, start_time, end_time, title, description, location_type, location_details, meeting_url)
SELECT 
  pcd.program_id,
  pcd.week_in_cycle as week_number,
  pcd.day_of_week,
  '09:00'::TIME as start_time,
  '17:00'::TIME as end_time,
  pcd.general_info as title,
  'Automatisch gegenereerd van cyclus details' as description,
  CASE 
    WHEN pcd.location_info ILIKE '%online%' THEN 'Online'
    WHEN pcd.location_info ILIKE '%locatie%' THEN 'Fysiek'
    WHEN pcd.location_info ILIKE '%self%' OR pcd.location_info ILIKE '%zelfstudie%' THEN 'Zelfstudie'
    ELSE 'Online'
  END as location_type,
  pcd.location_info as location_details,
  pcd.link_url as meeting_url
FROM public.program_cycle_details pcd
WHERE pcd.general_info IS NOT NULL AND pcd.general_info != '';
