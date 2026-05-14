-- Run this once in the Supabase SQL Editor to create the admin superuser.
-- Dashboard → SQL Editor → paste and run.
--
-- This uses Supabase's internal auth schema to insert a confirmed user directly.
-- The password hash below is bcrypt for "tail" (cost factor 10).
-- If you need a different password, generate a new hash at: https://bcrypt.online/

INSERT INTO auth.users (
  id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  role
)
VALUES (
  gen_random_uuid(),
  'admin@scadahub.io',
  crypt('tail', gen_salt('bf', 10)),
  now(),
  now(),
  now(),
  '{"provider":"email","providers":["email"]}',
  '{"role":"admin","username":"admin"}',
  false,
  'authenticated'
)
ON CONFLICT (email) DO NOTHING;
