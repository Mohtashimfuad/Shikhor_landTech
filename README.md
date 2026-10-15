# ভাঙন প্রমাণ (Next.js + Supabase)
1. Create a Supabase project, run `supabase/schema.sql` in the SQL editor.
2. Auth > Providers > Email: for the demo, turn off "Confirm email".
3. `cp .env.example .env.local` and fill the two keys. Then `npm install && npm run dev`.
4. Make an admin: `update profiles set role='admin' where id='<user uuid>';`
5. Deploy: push to GitHub, import in Vercel, add the same two env vars.
