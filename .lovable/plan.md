
# HRMS Build Plan

## Connection approach (important)

You picked **"Connect my existing HRMS Supabase"**. That means:
- I will NOT enable Lovable Cloud (which would create a *new* Supabase project).
- I need your project's **URL** and **publishable/anon key** to wire the client.
- Schema changes will be delivered as **SQL migration files** in `supabase/migrations/` that you run in your Supabase SQL editor (or via `supabase db push` from your GitHub repo). I cannot execute SQL directly against your project.
- Auth, RLS, and all data live in *your* project — Lovable just builds the frontend + server functions that talk to it.

If you'd rather I run migrations directly and manage everything from inside Lovable, say the word and I'll switch to Lovable Cloud instead (you'd migrate to it or keep the two separate).

## What I need from you before phase 1

1. `SUPABASE_URL` (e.g. `https://tmvdiqel...supabase.co`)
2. `SUPABASE_PUBLISHABLE_KEY` (the `sb_publishable_...` or legacy anon key from Project Settings → API Keys)

Paste them in the next message. The service role key stays with you — not needed for the frontend.

## Design system

Clean corporate light — white background, `#2563eb` primary blue, `#0f172a` slate foreground. Inter font, generous whitespace, subtle borders. Sidebar-driven layout matching your architecture mockup.

## Phase 1 — Foundation (auth + shell + schema)

**Delivered as code + one SQL migration file for you to run.**

- Wire Supabase client (`src/integrations/supabase/client.ts`) using your URL/key.
- Migration `0001_hrms_core.sql`:
  - `app_role` enum: `owner | hr_staff | manager | employee | cashier`
  - `profiles` table (linked to `auth.users`)
  - `user_roles` table + `has_role()` security-definer function
  - `departments`, `positions`, `employees` tables
  - RLS policies + `GRANT`s for all tables
  - Trigger to auto-create profile on signup
- `/auth` route: sign in / sign up with email+password.
- `/_authenticated` layout gate that redirects to `/auth`.
- App shell with collapsible sidebar showing all 10 modules; nav items filtered by role.
- Role-based routing (Owner sees all; Employee sees only self-service; etc.).
- Dashboard landing page per role with placeholder stats.

## Phase 2 — Core HR (Employees, Departments, Positions)

- Employee list, create/edit form, profile view.
- Department + Position CRUD with assignment UI.
- Optional: create an auth account for a new employee (via server function using service role — you'd add `SUPABASE_SERVICE_ROLE_KEY` as a secret).

## Phase 3 — Daily ops (Attendance + Leave)

- Migration `0002_attendance_leave.sql`: `attendance`, `leave_types`, `leave_requests`.
- Employee clock-in/out widget.
- Leave request form + Manager/HR approval queue.
- Attendance calendar view.

## Phase 4 — Advanced (Payroll, Recruitment, Performance, Reports)

- Migration `0003_payroll_recruitment_performance.sql`: `payrolls`, `payroll_items`, `job_applications`, `performance_reviews`.
- Payroll period generator that pulls attendance + leave.
- Payslip view for employees.
- Recruitment: job postings, applications, hire → employee conversion.
- Performance evaluation forms + history.
- Reports & Analytics dashboard with charts (recharts) + CSV export.

## SariSync integration

You picked "separate Supabase projects, sync later". I'll design `employees` with a `pos_enabled` flag and stable `employee_id` so a future SariSync sync (webhook, edge function, or scheduled job) can consume it cleanly. No SariSync-specific code in v1.

## Deliverable format

Each phase = a set of code edits + (when schema changes) one `.sql` file in `supabase/migrations/` with a copy-paste block for your SQL editor. I'll tell you exactly when to run each migration.

---

**Reply with your Supabase URL and publishable key** and I'll start Phase 1. If any of the above is wrong (scope, order, connection choice), tell me now.
