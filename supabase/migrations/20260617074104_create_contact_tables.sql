/*
# Create contact form tables for Dubai Mall sales deck

1. New Tables
- `enquiries` — Retail leasing enquiries submitted from the Enquire page
  - id (uuid, primary key)
  - name (text, not null)
  - email (text, not null)
  - phone (text)
  - company (text)
  - space_type (text) — e.g. "Fashion Avenue", "Grand Atrium", etc.
  - message (text)
  - created_at (timestamptz)

- `venue_bookings` — Venue booking requests from the Book Venue page
  - id (uuid, primary key)
  - name (text, not null)
  - email (text, not null)
  - phone (text)
  - company (text)
  - venue_type (text) — e.g. "Corporate Events", "Concert Spaces", etc.
  - event_date (text)
  - guest_count (text)
  - message (text)
  - created_at (timestamptz)

- `partnership_discussions` — Partnership discussion requests from the Sponsorship page
  - id (uuid, primary key)
  - name (text, not null)
  - email (text, not null)
  - phone (text)
  - company (text)
  - tier (text) — e.g. "Gold Partner", "Platinum Partner", "Title Partner"
  - message (text)
  - created_at (timestamptz)

2. Security
- Enable RLS on all tables.
- Allow anon + authenticated INSERT only (these are public contact forms).
- No SELECT/UPDATE/DELETE from the frontend — data is admin-only in the Supabase dashboard.
*/

CREATE TABLE IF NOT EXISTS enquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  company text,
  space_type text,
  message text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_enquiries" ON enquiries;
CREATE POLICY "anon_insert_enquiries" ON enquiries FOR INSERT
TO anon, authenticated WITH CHECK (true);

CREATE TABLE IF NOT EXISTS venue_bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  company text,
  venue_type text,
  event_date text,
  guest_count text,
  message text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE venue_bookings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_venue_bookings" ON venue_bookings;
CREATE POLICY "anon_insert_venue_bookings" ON venue_bookings FOR INSERT
TO anon, authenticated WITH CHECK (true);

CREATE TABLE IF NOT EXISTS partnership_discussions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  company text,
  tier text,
  message text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE partnership_discussions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_partnership_discussions" ON partnership_discussions;
CREATE POLICY "anon_insert_partnership_discussions" ON partnership_discussions FOR INSERT
TO anon, authenticated WITH CHECK (true);
