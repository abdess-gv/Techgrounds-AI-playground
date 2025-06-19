
-- Create programs table
CREATE TABLE public.programs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  start_date DATE,
  end_date DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create program_cycle_details table
CREATE TABLE public.program_cycle_details (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  program_id UUID NOT NULL REFERENCES public.programs(id) ON DELETE CASCADE,
  week_in_cycle INTEGER NOT NULL CHECK (week_in_cycle >= 1 AND week_in_cycle <= 4),
  day_of_week INTEGER NOT NULL CHECK (day_of_week >= 0 AND day_of_week <= 6),
  time_info TEXT NOT NULL DEFAULT '',
  location_info TEXT NOT NULL DEFAULT '',
  general_info TEXT NOT NULL DEFAULT '',
  link_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(program_id, week_in_cycle, day_of_week)
);

-- Create program_date_overrides table
CREATE TABLE public.program_date_overrides (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  program_id UUID NOT NULL REFERENCES public.programs(id) ON DELETE CASCADE,
  override_date DATE NOT NULL,
  time_info TEXT NOT NULL DEFAULT '',
  location_info TEXT NOT NULL DEFAULT '',
  general_info TEXT NOT NULL DEFAULT '',
  link_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(program_id, override_date)
);

-- Add Row Level Security (RLS)
ALTER TABLE public.programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.program_cycle_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.program_date_overrides ENABLE ROW LEVEL SECURITY;

-- Create policies for programs (readable by everyone, manageable by admins)
CREATE POLICY "Programs are viewable by everyone" 
  ON public.programs 
  FOR SELECT 
  USING (true);

CREATE POLICY "Programs are manageable by admins" 
  ON public.programs 
  FOR ALL 
  USING (public.is_admin(auth.uid()));

-- Create policies for program_cycle_details (readable by everyone, manageable by admins)
CREATE POLICY "Program cycle details are viewable by everyone" 
  ON public.program_cycle_details 
  FOR SELECT 
  USING (true);

CREATE POLICY "Program cycle details are manageable by admins" 
  ON public.program_cycle_details 
  FOR ALL 
  USING (public.is_admin(auth.uid()));

-- Create policies for program_date_overrides (readable by everyone, manageable by admins)
CREATE POLICY "Program date overrides are viewable by everyone" 
  ON public.program_date_overrides 
  FOR SELECT 
  USING (true);

CREATE POLICY "Program date overrides are manageable by admins" 
  ON public.program_date_overrides 
  FOR ALL 
  USING (public.is_admin(auth.uid()));

-- Insert some sample data
INSERT INTO public.programs (name, description) VALUES 
  ('AI & Data Engineering', 'Complete AI and Data Engineering bootcamp'),
  ('Cloud & DevOps', 'Cloud infrastructure and DevOps practices'),
  ('Workready Program', 'Preparation program for the job market');
