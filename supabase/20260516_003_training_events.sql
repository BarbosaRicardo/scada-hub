-- Migration: training_events table for the "More Training" feature
-- Stores upcoming training courses, workshops, and certification info per guide.
-- Auto-updated weekly by GitHub Actions cron (.github/workflows/refresh_training.yml).
-- Component: site/src/components/TrainingPanel.jsx in each guide.

CREATE TABLE IF NOT EXISTS training_events (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course      text NOT NULL,         -- 'modbus' | 'opcua' | 'dnp3' | 'iec61131' | 'pid' | 'rtac' | 'ignition' | 'wireshark'
  provider    text NOT NULL,
  title       text NOT NULL,
  format      text NOT NULL CHECK (format IN ('online', 'in-person', 'hybrid', 'self-paced')),
  start_date  date,                  -- null = self-paced / always available
  end_date    date,
  url         text NOT NULL,
  is_cert     boolean NOT NULL DEFAULT false,  -- true = leads to a certification
  cert_name   text,                  -- e.g. 'GICSP', 'Ignition Core Certification'
  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now()
);

-- Public read: anyone can see training events (no auth required)
ALTER TABLE training_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public_read_training" ON training_events
  FOR SELECT USING (true);

CREATE POLICY "admin_manage_training" ON training_events
  FOR ALL TO authenticated
  USING (
    (SELECT raw_user_meta_data->>'role'
     FROM auth.users WHERE id = auth.uid()) = 'admin'
  )
  WITH CHECK (
    (SELECT raw_user_meta_data->>'role'
     FROM auth.users WHERE id = auth.uid()) = 'admin'
  );

-- Keep updated_at current on any row change
CREATE OR REPLACE FUNCTION touch_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

DROP TRIGGER IF EXISTS trg_training_updated_at ON training_events;
CREATE TRIGGER trg_training_updated_at
  BEFORE UPDATE ON training_events
  FOR EACH ROW EXECUTE FUNCTION touch_updated_at();

-- Unique constraint on URL — required for ON CONFLICT upsert in the cron updater.
-- Same-URL events found again by Brave search will overwrite their row (dates refresh).
ALTER TABLE training_events
  ADD CONSTRAINT training_events_url_unique UNIQUE (url);

-- Index for the common query pattern: course + future dates
CREATE INDEX IF NOT EXISTS idx_training_course_date
  ON training_events (course, end_date NULLS LAST);

-- Weekly cleanup: drop rows expired more than 60 days ago (run manually or add a pg_cron job)
-- DELETE FROM training_events WHERE end_date < CURRENT_DATE - INTERVAL '60 days';
