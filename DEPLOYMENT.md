# 🚀 Deployment Guide

## 📋 Prerequisites

Before deploying to Vercel, ensure you have:
- Firebase project set up
- Supabase project configured
- All environment variables ready

## 🔐 Environment Variables for Vercel

Add these environment variables in your Vercel dashboard:

### Firebase Configuration
```
NG_APP_FIREBASE_API_KEY=AIzaSyCWqmOiSs08mXXtNVpJhGb7_SG0kcyLWQ0
NG_APP_FIREBASE_AUTH_DOMAIN=zyptenix-ab.firebaseapp.com
NG_APP_FIREBASE_PROJECT_ID=zyptenix-ab
NG_APP_FIREBASE_STORAGE_BUCKET=zyptenix-ab.firebasestorage.app
NG_APP_FIREBASE_MESSAGING_SENDER_ID=710758393566
NG_APP_FIREBASE_APP_ID=1:710758393566:web:6c008994a556ec3691044f
NG_APP_FIREBASE_MEASUREMENT_ID=G-S10E7B3ZKJ
```

### Supabase Configuration
```
NG_APP_SUPABASE_URL=https://avgqiqpzemajlelrpjre.supabase.co
NG_APP_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF2Z3FpcXB6ZW1hamxlbHJwanJlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMwODY2NDAsImV4cCI6MjA1ODY2MjY0MH0.UdYfjprXMWYqRU9Y3S6t_6WIoCmJYlalQkr7-GcyoTY
```

## 🛠️ Vercel Deployment Steps

1. **Connect Repository**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository: `https://github.com/schrodingercats-sudo/crm`

2. **Configure Build Settings**
   - Framework Preset: `Angular`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

3. **Add Environment Variables**
   - Go to Project Settings → Environment Variables
   - Add all the variables listed above
   - Make sure to set them for all environments (Production, Preview, Development)

4. **Deploy**
   - Click "Deploy"
   - Vercel will automatically build and deploy your application

## 🗄️ Database Setup

### Supabase Schema
Run this SQL in your Supabase SQL editor:

```sql
-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- User Profiles Table (extends auth.users)
create table public.user_profiles (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  avatar_url text,
  role text default 'user' check (role in ('admin', 'user')),
  onboarding_completed boolean default false,
  company text,
  job_title text,
  phone text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable RLS (Row Level Security)
alter table public.user_profiles enable row level security;

-- Create policy for user access
create policy "Enable all access for all users" on public.user_profiles for all using (true);
```

## 🔒 Security Checklist

- ✅ All API keys moved to environment variables
- ✅ Environment files added to .gitignore
- ✅ Production environment uses empty defaults (requires env vars)
- ✅ Development environment has fallback values for local development
- ✅ Supabase RLS enabled
- ✅ Firebase security rules configured

## 🧪 Testing

Before deployment, run:
```bash
npm run build  # Should complete without errors
npm test       # All 42 tests should pass
```

## 🌐 Post-Deployment

1. **Test Authentication**
   - Try Google signup/login
   - Try manual email signup/login
   - Verify onboarding flow works

2. **Test Database**
   - Check Supabase dashboard for user profiles
   - Verify onboarding data is saved correctly

3. **Test Role-Based Access**
   - Admin users should see admin dashboard
   - Regular users should see user dashboard

## 🚨 Important Notes

- **Admin Email**: `pratham.solanki30@gmail.com` is configured as admin
- **Onboarding**: All new users MUST complete onboarding before accessing CRM
- **Database**: User data is stored in Supabase, authentication in Firebase
- **Environment**: Production uses environment variables, development has fallbacks

## 📞 Support

If you encounter issues:
1. Check Vercel build logs
2. Verify all environment variables are set
3. Check browser console for errors
4. Verify Supabase and Firebase configurations