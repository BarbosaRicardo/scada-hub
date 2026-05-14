-- Migration: add user_id to quiz_submissions and enable per-user RLS
-- Run in: Supabase Dashboard → SQL Editor
-- Safe to run multiple times (all statements are idempotent)

-- 1. Add nullable user_id column (existing anonymous rows keep null)
ALTER TABLE quiz_submissions
  ADD COLUMN IF NOT EXISTS user_id uuid;

-- 2. Enable Row Level Security
ALTER TABLE quiz_submissions ENABLE ROW LEVEL SECURITY;

-- 3. Anyone (anon or authenticated) can INSERT
DROP POLICY IF EXISTS "anyone_can_insert" ON quiz_submissions;
CREATE POLICY "anyone_can_insert" ON quiz_submissions
  FOR INSERT WITH CHECK (true);

-- 4. Authenticated users can SELECT only their own rows
DROP POLICY IF EXISTS "users_read_own" ON quiz_submissions;
CREATE POLICY "users_read_own" ON quiz_submissions
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

-- 5. Admin (role = 'admin' in user_metadata) can SELECT everything
DROP POLICY IF EXISTS "admin_reads_all" ON quiz_submissions;
CREATE POLICY "admin_reads_all" ON quiz_submissions
  FOR SELECT TO authenticated
  USING (
    (SELECT raw_user_meta_data->>'role'
     FROM auth.users WHERE id = auth.uid()) = 'admin'
  );
