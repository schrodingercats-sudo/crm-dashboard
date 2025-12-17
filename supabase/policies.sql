-- Link Clients to Auth Users
alter table public.clients add column if not exists user_id uuid references auth.users(id);

-- Helper function to check if user is admin (simplifies policies)
create or replace function public.is_admin()
returns boolean as $$
begin
  return (select auth.jwt() ->> 'email') = 'pratham.solanki30@gmail.com';
end;
$$ language plpgsql security definer;

-- --- DROP EXISTING POLICIES (Clean Slate) ---
drop policy if exists "Enable all access for all users" on public.contacts;
drop policy if exists "Enable all access for all users" on public.lead_owners;
drop policy if exists "Enable all access for all users" on public.deals;
drop policy if exists "Enable all access for all users" on public.clients;
drop policy if exists "Enable all access for all users" on public.project_updates;

drop policy if exists "Admin Full Access" on public.contacts;
drop policy if exists "Admin Full Access" on public.lead_owners;
drop policy if exists "Admin Full Access" on public.deals;
drop policy if exists "Admin Full Access" on public.clients;
drop policy if exists "Client Read Own Profile" on public.clients;
drop policy if exists "Admin Full Access" on public.project_updates;
drop policy if exists "Client Read Own Updates" on public.project_updates;

-- --- ADMIN POLICIES ---

-- Contacts: Only Admin
create policy "Admin Full Access" on public.contacts
for all using (public.is_admin());

-- Lead Owners: Only Admin
create policy "Admin Full Access" on public.lead_owners
for all using (public.is_admin());

-- Deals: Only Admin
create policy "Admin Full Access" on public.deals
for all using (public.is_admin());

-- Clients: Admin Full Access
create policy "Admin Full Access" on public.clients
for all using (public.is_admin());

-- Updates: Admin Full Access
create policy "Admin Full Access" on public.project_updates
for all using (public.is_admin());

-- --- CLIENT POLICIES ---

-- Clients: Client can see their own profile
create policy "Client Read Own Profile" on public.clients
for select using (auth.uid() = user_id);

-- Updates: Client can see updates for their own profile
create policy "Client Read Own Updates" on public.project_updates
for select using (
  client_id in (
    select id from public.clients where user_id = auth.uid()
  )
);
