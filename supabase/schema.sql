-- Run in Supabase SQL editor
create table profiles(id uuid primary key references auth.users on delete cascade, name text, role text not null default 'citizen');
create table evidence(id uuid primary key default gen_random_uuid(), user_id uuid not null default auth.uid() references auth.users,
  plot text not null, lat float8, lng float8, file_path text, sha256 text, taken_at timestamptz default now());
create table witnesses(id uuid primary key default gen_random_uuid(), evidence_id uuid not null references evidence on delete cascade,
  user_id uuid not null default auth.uid() references auth.users, created_at timestamptz default now(), unique(evidence_id,user_id));
create table claims(id uuid primary key default gen_random_uuid(), user_id uuid not null default auth.uid() references auth.users,
  evidence_id uuid references evidence, body text, status text not null default 'submitted', created_at timestamptz default now());

create function is_admin() returns boolean language sql security definer as $$ select exists(select 1 from profiles where id=auth.uid() and role='admin') $$;
create function new_user() returns trigger language plpgsql security definer as $$
begin insert into profiles(id,name) values(new.id,new.raw_user_meta_data->>'name'); return new; end $$;
create trigger on_signup after insert on auth.users for each row execute function new_user();

alter table profiles enable row level security; alter table evidence enable row level security;
alter table witnesses enable row level security; alter table claims enable row level security;
create policy "own profile" on profiles for select using (id=auth.uid());
create policy "read evidence" on evidence for select to authenticated using (true);
create policy "add evidence" on evidence for insert to authenticated with check (user_id=auth.uid());
create policy "read witnesses" on witnesses for select to authenticated using (true);
create policy "witness others" on witnesses for insert to authenticated with check (user_id=auth.uid()
  and not exists(select 1 from evidence e where e.id=evidence_id and e.user_id=auth.uid()));
create policy "read claims" on claims for select to authenticated using (user_id=auth.uid() or is_admin());
create policy "add claim" on claims for insert to authenticated with check (user_id=auth.uid());
create policy "admin updates claims" on claims for update to authenticated using (is_admin());

insert into storage.buckets(id,name,public) values('evidence','evidence',false);
create policy "upload own" on storage.objects for insert to authenticated with check (bucket_id='evidence' and (storage.foldername(name))[1]=auth.uid()::text);
create policy "read own" on storage.objects for select to authenticated using (bucket_id='evidence' and ((storage.foldername(name))[1]=auth.uid()::text or is_admin()));
-- Make an admin: update profiles set role='admin' where id='<user uuid>';
