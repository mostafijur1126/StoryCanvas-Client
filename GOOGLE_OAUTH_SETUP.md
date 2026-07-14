# Google OAuth Setup and Troubleshooting Guide

## Step 1: Set Up Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API:
   - Go to "APIs & Services" → "Library"
   - Search for "Google+ API"
   - Click "Enable"
4. Create OAuth 2.0 credentials:
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "OAuth 2.0 Client IDs"
   - Choose "Web application"
   - Add authorized redirect URIs:
     - `http://localhost:3000/api/auth/callback/google` (development)
     - `https://yourdomain.com/api/auth/callback/google` (production)
   - Copy the Client ID and Client Secret

## Step 2: Create .env.local File

Copy `.env.local.example` to `.env.local` and fill in the values:

```bash
cp .env.local.example .env.local
```

Then edit `.env.local` with your actual credentials:

```env
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=your-32-character-secret-key-here
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret
MONGODB_URI=mongodb://127.0.0.1:27017/event-hive
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### Generating a Secret Key

You can generate a secure secret with:

```bash
openssl rand -base64 32
```

## Step 3: Verify Configuration

Make sure the following are correct:

1. **Authorized Redirect URIs in Google Console**
   - Must match: `http://localhost:3000/api/auth/callback/google`
   - Cannot have trailing slashes or query parameters

2. **Environment Variables**
   - All three are set: `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `BETTER_AUTH_SECRET`
   - `BETTER_AUTH_URL` matches your actual server URL

3. **Port and Domain**
   - Make sure you're accessing the app at exactly `http://localhost:3000`
   - Not `localhost` or `127.0.0.1` or any other variation

## Step 4: Start the Application

```bash
# Terminal 1: Start the client
cd eventHive-client
npm run dev

# Terminal 2: Start the server
cd eventHive-server
npm run dev
```

## Step 5: Test Google Login

1. Navigate to `http://localhost:3000/auth/signin`
2. Click "Sign in with Google"
3. You should be redirected to Google's login page
4. After successful login, you should be redirected back to the app

## Troubleshooting

### "State mismatch" Error

**Cause**: The state parameter sent to Google doesn't match the one received back.

**Solutions**:

1. ✅ Clear browser cookies and try again
2. ✅ Make sure you're using exactly `http://localhost:3000` in the URL bar
3. ✅ Check that `BETTER_AUTH_URL` environment variable matches your actual URL
4. ✅ Verify the redirect URI in Google Console matches exactly: `http://localhost:3000/api/auth/callback/google`
5. ✅ Make sure `BETTER_AUTH_SECRET` is set in `.env.local`

### "Invalid Client" Error

**Cause**: Client ID or secret is incorrect.

**Solution**: Verify your credentials in Google Cloud Console and `.env.local`

### Redirect Loop

**Cause**: Session not being persisted correctly.

**Solution**:

1. Check that cookies are enabled in your browser
2. Clear browser storage: DevTools → Application → Clear all
3. Restart both servers and refresh the page

### CORS or Network Error

**Cause**: The Next.js dev server can't reach the API.

**Solution**:

1. Make sure both servers are running
2. Check ports: Client on 3000, Server on 5000
3. Verify `NEXT_PUBLIC_API_URL=http://localhost:5000` in `.env.local`

## Production Deployment

When deploying to production:

1. Update Google OAuth redirect URI to your production domain
2. Set environment variables on your hosting platform (Vercel, Netlify, etc.)
3. Update `BETTER_AUTH_URL` to your production domain
4. Use a secure, randomly generated `BETTER_AUTH_SECRET`
5. Use production MongoDB URI

Example for production:

```env
BETTER_AUTH_URL=https://yourdomain.com
BETTER_AUTH_SECRET=your-secure-random-key
GOOGLE_CLIENT_ID=your-production-client-id
GOOGLE_CLIENT_SECRET=your-production-secret
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/event-hive
```
