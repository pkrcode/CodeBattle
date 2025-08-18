# Vercel Deployment Guide for CodeBattle

## Quick Deployment Steps

### 1. Automatic Deployment (Recommended)
1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "New Project"
4. Import: `pkrcode/CodeBattle`
5. Click "Deploy" (Vercel will auto-detect React settings)

### 2. Manual Configuration (if needed)
- **Framework**: React
- **Root Directory**: `./`
- **Build Command**: `npm run build`
- **Output Directory**: `build`
- **Install Command**: `npm install`

### 3. Environment Variables (if using Firebase)
Add these in Vercel Project Settings → Environment Variables:
```
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

### 4. Backend URL (if using Render)
Add this environment variable:
```
REACT_APP_BACKEND_URL=https://your-render-backend-url.onrender.com
```

## Deployment Status
✅ GitHub repository updated with latest code
✅ Ready for Vercel deployment
🔄 Next: Deploy on Vercel dashboard

Your project is now ready for deployment!
