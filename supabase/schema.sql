-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Contacts Table
create table public.contacts (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text,
  phone text,
  purpose text,
  amount numeric,
  progress integer default 0,
  stage text,
  avatar text,
  created_at timestamptz default now()
);

-- Lead Owners Table (Many-to-Many or One-to-Many handling depending on usage, simple FK here as per SQLite)
create table public.lead_owners (
  id uuid default gen_random_uuid() primary key,
  contact_id uuid references public.contacts(id) on delete cascade,
  name text not null,
  avatar text
);

-- Deals Table
create table public.deals (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  company text,
  value numeric,
  stage text,
  owner_avatar text,
  type text,
  type_color text,
  created_at timestamptz default now()
);

-- Clients Table (For Client Portal)
-- Linking to auth.users is recommended for real security.
-- unique(username) added to maintain current logic strictness if needed.
create table public.clients (
  id uuid default gen_random_uuid() primary key,
  -- user_id uuid references auth.users(id), -- Uncomment when integrating true Auth
  name text not null,
  username text unique, 
  project_idea text,
  created_at timestamptz default now()
);

-- Project Updates Table
create table public.project_updates (
  id uuid default gen_random_uuid() primary key,
  client_id uuid references public.clients(id) on delete cascade,
  content text,
  type text check (type in ('text', 'image', 'milestone')),
  image_url text,
  created_at timestamptz default now()
);

-- Enable RLS (Security Best Practice)
alter table public.contacts enable row level security;
alter table public.lead_owners enable row level security;
alter table public.deals enable row level security;
alter table public.clients enable row level security;
alter table public.project_updates enable row level security;

-- Policies (Open for now to mimic current backend, lock down later)
create policy "Enable all access for all users" on public.contacts for all using (true);
create policy "Enable all access for all users" on public.lead_owners for all using (true);
create policy "Enable all access for all users" on public.deals for all using (true);
create policy "Enable all access for all users" on public.clients for all using (true);
create policy "Enable all access for all users" on public.project_updates for all using (true);
