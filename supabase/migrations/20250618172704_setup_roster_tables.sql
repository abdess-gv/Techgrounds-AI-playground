-- supabase/migrations/YYYYMMDDHHMMSS_setup_roster_tables.sql

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Function to update 'updated_at' column
CREATE OR REPLACE FUNCTION public.trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 1. Programs Table
CREATE TABLE IF NOT EXISTS public.programs (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    description text,
    anchor_start_date date NOT NULL,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);
-- Trigger for programs table
CREATE TRIGGER set_programs_timestamp
BEFORE UPDATE ON public.programs
FOR EACH ROW
EXECUTE FUNCTION public.trigger_set_timestamp();

COMMENT ON TABLE public.programs IS 'Stores information about different programs offered.';
COMMENT ON COLUMN public.programs.anchor_start_date IS 'Canonical start date for the very first cycle of the program. Used for cycle calculations.';

-- 2. Program Cycle Details Table
CREATE TABLE IF NOT EXISTS public.program_cycle_details (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    program_id uuid NOT NULL REFERENCES public.programs(id) ON DELETE CASCADE,
    week_in_cycle smallint NOT NULL CHECK (week_in_cycle >= 1 AND week_in_cycle <= 4),
    day_of_week smallint NOT NULL CHECK (day_of_week >= 0 AND day_of_week <= 6), -- 0 for Sunday, 1 for Monday, ..., 6 for Saturday
    time_info text,
    location_info text,
    general_info text,
    link_url text,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now(),
    CONSTRAINT unique_cycle_entry UNIQUE (program_id, week_in_cycle, day_of_week)
);
-- Trigger for program_cycle_details table
CREATE TRIGGER set_cycle_details_timestamp
BEFORE UPDATE ON public.program_cycle_details
FOR EACH ROW
EXECUTE FUNCTION public.trigger_set_timestamp();

COMMENT ON TABLE public.program_cycle_details IS 'Stores the default 4-week repeating cycle content for each program.';
COMMENT ON COLUMN public.program_cycle_details.week_in_cycle IS 'Which week in the 4-week cycle (1-4).';
COMMENT ON COLUMN public.program_cycle_details.day_of_week IS '0 for Sunday, 1 for Monday, ..., 6 for Saturday.';

-- 3. Program Date Overrides Table
CREATE TABLE IF NOT EXISTS public.program_date_overrides (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    program_id uuid NOT NULL REFERENCES public.programs(id) ON DELETE CASCADE,
    override_date date NOT NULL,
    time_info text,
    location_info text,
    general_info text,
    link_url text,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now(),
    CONSTRAINT unique_override_entry UNIQUE (program_id, override_date)
);
-- Trigger for program_date_overrides table
CREATE TRIGGER set_date_overrides_timestamp
BEFORE UPDATE ON public.program_date_overrides
FOR EACH ROW
EXECUTE FUNCTION public.trigger_set_timestamp();

COMMENT ON TABLE public.program_date_overrides IS 'Stores specific date overrides that take precedence over default cycle content.';

-- Basic RLS Policies
ALTER TABLE public.programs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read access for programs" ON public.programs FOR SELECT USING (true);
-- Example Admin Write Policy (Assumes admin actions via service_role or specific admin user checks)
-- CREATE POLICY "Admin write access for programs" ON public.programs FOR ALL USING (auth.role() = 'service_role'); -- Or more specific check

ALTER TABLE public.program_cycle_details ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read access for cycle details" ON public.program_cycle_details FOR SELECT USING (true);
-- CREATE POLICY "Admin write access for cycle details" ON public.program_cycle_details FOR ALL USING (auth.role() = 'service_role');

ALTER TABLE public.program_date_overrides ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read access for date overrides" ON public.program_date_overrides FOR SELECT USING (true);
-- CREATE POLICY "Admin write access for date overrides" ON public.program_date_overrides FOR ALL USING (auth.role() = 'service_role');

-- Sample Data Population
DO $$
DECLARE
    pathways_program_id uuid;
    workready_program_id uuid;
    pathways_anchor_date date := '2024-07-01'; -- Example: First Monday of July 2024
    workready_anchor_date date := '2024-09-02'; -- Example: First Monday of Sep 2024
BEGIN
    -- 1. Insert Sample Program: Pathways
    INSERT INTO public.programs (name, description, anchor_start_date)
    VALUES ('Pathways', 'Prepares individuals for cloud computing and cybersecurity careers.', pathways_anchor_date)
    RETURNING id INTO pathways_program_id;

    -- Sample Cycle Details for Pathways (4 weeks)
    -- Week 1
    INSERT INTO public.program_cycle_details (program_id, week_in_cycle, day_of_week, time_info, location_info, general_info, link_url) VALUES
    (pathways_program_id, 1, 1, '09:00 - 17:00', 'Online', 'W1D1: Cloud Fundamentals & AWS Intro', 'https://meet.example.com/pathways-w1d1'),
    (pathways_program_id, 1, 2, '09:00 - 17:00', 'Online', 'W1D2: Linux Basics', 'https://meet.example.com/pathways-w1d2'),
    (pathways_program_id, 1, 3, '09:00 - 17:00', 'Op locatie: Amsterdam', 'W1D3: Networking Essentials', NULL),
    (pathways_program_id, 1, 4, '09:00 - 12:00', 'Online', 'W1D4: Q&A and Review', 'https://meet.example.com/pathways-w1d4'),
    (pathways_program_id, 1, 5, 'Self-study', 'Online', 'W1D5: AWS IAM Deep Dive', NULL);
    -- Week 2
    INSERT INTO public.program_cycle_details (program_id, week_in_cycle, day_of_week, time_info, location_info, general_info, link_url) VALUES
    (pathways_program_id, 2, 1, '09:00 - 17:00', 'Online', 'W2D1: AWS EC2 & S3', 'https://meet.example.com/pathways-w2d1'),
    (pathways_program_id, 2, 3, '09:00 - 17:00', 'Op locatie: Amsterdam', 'W2D3: Security Best Practices', NULL),
    (pathways_program_id, 2, 5, 'Self-study', 'Online', 'W2D5: Project Work', NULL);
    -- Week 3
    INSERT INTO public.program_cycle_details (program_id, week_in_cycle, day_of_week, time_info, location_info, general_info, link_url) VALUES
    (pathways_program_id, 3, 1, '09:00 - 17:00', 'Online', 'W3D1: Infrastructure as Code (Terraform)', 'https://meet.example.com/pathways-w3d1'),
    (pathways_program_id, 3, 4, '13:00 - 17:00', 'Hybride', 'W3D4: DevOps CI/CD', 'https://meet.example.com/pathways-w3d4');
    -- Week 4
    INSERT INTO public.program_cycle_details (program_id, week_in_cycle, day_of_week, time_info, location_info, general_info, link_url) VALUES
    (pathways_program_id, 4, 1, '09:00 - 17:00', 'Op locatie: Amsterdam', 'W4D1: Final Project Presentations', NULL),
    (pathways_program_id, 4, 5, '14:00 - 16:00', 'Op locatie: Amsterdam', 'W4D5: Graduation Ceremony', NULL);

    -- Sample Override for Pathways
    INSERT INTO public.program_date_overrides (program_id, override_date, time_info, general_info, location_info)
    VALUES (pathways_program_id, pathways_anchor_date + interval '10 days', 'All Day', 'Public Holiday - No Session', 'N/A');

    -- 2. Insert Sample Program: Workready
    INSERT INTO public.programs (name, description, anchor_start_date)
    VALUES ('Workready', 'Prepares individuals for the job market with practical skills.', workready_anchor_date)
    RETURNING id INTO workready_program_id;

    -- Sample Cycle Details for Workready - Week 1
    INSERT INTO public.program_cycle_details (program_id, week_in_cycle, day_of_week, time_info, location_info, general_info, link_url) VALUES
    (workready_program_id, 1, 1, '10:00 - 16:00', 'Online', 'WR W1D1: CV Building Workshop', 'https://meet.example.com/workready-w1d1'),
    (workready_program_id, 1, 3, '10:00 - 16:00', 'Online', 'WR W1D3: Interview Skills', 'https://meet.example.com/workready-w1d3'),
    (workready_program_id, 1, 5, 'Self-study', 'Online', 'WR W1D5: LinkedIn Profile Setup', NULL);

END $$;
