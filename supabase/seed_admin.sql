-- Run this once in the Supabase SQL Editor to create the admin superuser.
-- Dashboard → SQL Editor → paste and run.
-- Login: username = admin  (or email: admin@scadahub.io), password = tail

INSERT INTO auth.users (
  id, email, encrypted_password, email_confirmed_at,
  created_at, updated_at,
  raw_app_meta_data, raw_user_meta_data,
  is_super_admin, role
)
SELECT
  gen_random_uuid(),
  'admin@scadahub.io',
  crypt('tail', gen_salt('bf', 10)),
  now(), now(), now(),
  '{"provider":"email","providers":["email"]}',
  '{"role":"admin","username":"admin"}',
  false,
  'authenticated'
WHERE NOT EXISTS (
  SELECT 1 FROM auth.users WHERE email = 'admin@scadahub.io'
);
