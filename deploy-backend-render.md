# Backend Deployment on Render

## Current Status
✅ Frontend deployed on Vercel: https://code-battle-s7yo.vercel.app
❌ Backend showing offline - needs deployment on Render

## Deploy Backend to Render

### Step 1: Go to Render Dashboard
1. Visit [render.com](https://render.com)
2. Sign in with GitHub
3. Click "New +" → "Web Service"

### Step 2: Connect Repository
1. Connect your GitHub account if not already connected
2. Select repository: `pkrcode/CodeBattle`
3. Click "Connect"

### Step 3: Configure Service
- **Name**: `codebattle-backend`
- **Root Directory**: `backend`
- **Environment**: `Docker`
- **Branch**: `main`
- **Region**: Choose closest to your users

### Step 4: Environment Variables
Add these environment variables:
```
PORT=5111
NODE_ENV=production
CORS_ORIGIN=https://code-battle-s7yo.vercel.app
```

### Step 5: Deploy
1. Click "Create Web Service"
2. Render will automatically build and deploy
3. Wait for deployment to complete (usually 5-10 minutes)

### Step 6: Get Backend URL
1. Once deployed, copy the service URL
2. It will look like: `https://codebattle-backend-xxxx.onrender.com`
3. Update your frontend environment variable in Vercel

### Step 7: Update Frontend (Vercel)
1. Go to your Vercel project dashboard
2. Settings → Environment Variables
3. Add/Update: `REACT_APP_BACKEND_URL=https://your-render-backend-url.onrender.com`
4. Redeploy frontend

## Expected Result
After deployment, your backend status should show 🟢 **Online** on the coding problem page.

## Troubleshooting
- If backend shows offline, check Render logs
- Ensure CORS_ORIGIN matches your Vercel URL exactly
- Verify the backend URL is correct in frontend environment variables
