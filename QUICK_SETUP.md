# Quick Setup Checklist for Google OAuth

## ✅ Before You Start

- [ ] Create `.env.local` file in `eventHive-client` folder
- [ ] Have Google Cloud Console access
- [ ] Know your Google OAuth Client ID and Secret
- [ ] Generate a random secret (32+ characters)

## ✅ Step 1: Set Environment Variables

Create `eventHive-client/.env.local`:

```env
# REQUIRED: These three are critical for OAuth to work
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=your-random-32-character-secret-key
GOOGLE_CLIENT_ID=your-client-id-from-google.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret-from-google

# OPTIONAL: These have defaults but can be customized
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:5000
MONGODB_URI=mongodb://127.0.0.1:27017/event-hive

# OPTIONAL: Cloudinary (if not set, image upload won't work)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

## ✅ Step 2: Google Cloud Console

Go to https://console.cloud.google.com/

1. **Create OAuth Credentials**
   - APIs & Services → Credentials
   - Create OAuth 2.0 Web Application
2. **Add Authorized Redirect URI**
   - Copy-paste exactly: `http://localhost:3000/api/auth/callback/google`
   - This MUST match your BETTER_AUTH_URL + /api/auth/callback/google

3. **Copy Credentials**
   - Client ID → GOOGLE_CLIENT_ID in .env.local
   - Client Secret → GOOGLE_CLIENT_SECRET in .env.local

## ✅ Step 3: Generate Secret

Windows:

```powershell
[Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes((1..24 | ForEach-Object { [char](Get-Random -Minimum 65 -Maximum 122) }) -join ''))
```

Mac/Linux:

```bash
openssl rand -base64 32
```

Or use any online base64 generator and create a random 32+ character string.

## ✅ Step 4: Start Servers

```bash
# Terminal 1: Start Next.js client
cd eventHive-client
npm run dev

# Terminal 2: Start Express server
cd eventHive-server
npm run dev
```

## ✅ Step 5: Test Login

1. Open http://localhost:3000/auth/signin
2. Click "Sign in with Google"
3. You'll be redirected to Google login
4. After login, you'll be back at the app

## ❌ If It Still Fails

**Check:**

- [ ] Browser console (F12) for error messages
- [ ] .env.local is in `eventHive-client` folder (not root)
- [ ] All 3 required variables are set and non-empty
- [ ] Google Cloud Redirect URI is EXACTLY: `http://localhost:3000/api/auth/callback/google`
- [ ] URL in address bar is EXACTLY: `http://localhost:3000` (no trailing slash, no `localhost:3000/`)
- [ ] Both servers are running (client on 3000, server on 5000)
- [ ] Clear browser cookies/cache and restart servers

## 📋 Minimum .env.local (Copy-Paste Template)

```env
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=replace-with-32-random-characters
GOOGLE_CLIENT_ID=replace-with-your-client-id
GOOGLE_CLIENT_SECRET=replace-with-your-secret
```

That's it! Everything else has defaults.
