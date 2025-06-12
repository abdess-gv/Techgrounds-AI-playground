
-- Update admin user role for admin@aileren.com
UPDATE public.profiles 
SET user_role = 'admin'::user_role 
WHERE email = 'admin@aileren.com';

-- Verify the update worked
SELECT id, email, user_role, full_name, created_at 
FROM public.profiles 
WHERE email = 'admin@aileren.com';
