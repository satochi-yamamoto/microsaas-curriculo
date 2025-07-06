-- Database schema for microsaas-curriculo
-- Create tables used by the application

-- Table to store additional user profile info
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  is_subscriber boolean not null default false,
  generation_count integer not null default 0,
  last_generation_date timestamp with time zone
);

-- Table to store generated resumes
create table if not exists public.curriculos (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade,
  data jsonb not null,
  created_at timestamp with time zone not null default now()
);

-- Index to speed up lookups by user
create index if not exists curriculos_user_id_idx on public.curriculos(user_id);
