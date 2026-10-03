/*
# Create contact_submissions table

1. New Tables
- `contact_submissions`
  - `id` (uuid, primary key)
  - `name` (text, nullable - optional for hero form which only has email)
  - `email` (text, not null)
  - `company` (text, nullable)
  - `message` (text, nullable - optional for quick hero form)
  - `source` (text, not null default 'discovery_call' - tracks which form submitted: 'hero' or 'contact')
  - `readiness_score` (int, nullable - optional score from the self-assessment quiz)
  - `created_at` (timestamptz, default now())

2. Security
- Enable RLS on `contact_submissions`.
- Allow anon + authenticated INSERT only (public can submit forms).
- No SELECT/UPDATE/DELETE for anon or authenticated — submissions are private to admins.
*/

CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text,
  email text NOT NULL,
  company text,
  message text,
  source text NOT NULL DEFAULT 'discovery_call',
  readiness_score int,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_contact_submissions" ON contact_submissions;
CREATE POLICY "anon_insert_contact_submissions"
  ON contact_submissions FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
