-- Migration: Create plans table for Trip Planner persistence
create table if not exists plans (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  title text,
  plan_json jsonb,
  created_at timestamptz default now()
);

-- Enable RLS
alter table plans enable row level security;

-- Policies
create policy "Users can view their own plans"
  on plans for select
  using (auth.uid() = user_id);

create policy "Users can insert their own plans"
  on plans for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own plans"
  on plans for update
  using (auth.uid() = user_id);

create policy "Users can delete their own plans"
  on plans for delete
  using (auth.uid() = user_id);
