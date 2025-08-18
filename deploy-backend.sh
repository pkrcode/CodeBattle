#!/bin/bash

echo "🚀 Deploying CodeBattle Backend to Render..."
echo ""

echo "📋 Prerequisites:"
echo "1. Make sure you're logged into Render.com"
echo "2. Have your GitHub repository connected"
echo ""

echo "🔧 Deployment Steps:"
echo "1. Go to https://render.com"
echo "2. Click 'New +' → 'Web Service'"
echo "3. Connect repository: pkrcode/CodeBattle"
echo "4. Configure:"
echo "   - Name: codebattle-backend"
echo "   - Root Directory: backend"
echo "   - Environment: Docker"
echo "   - Branch: main"
echo ""
echo "5. Environment Variables:"
echo "   PORT=5111"
echo "   NODE_ENV=production"
echo "   CORS_ORIGIN=https://code-battle-s7yo.vercel.app"
echo ""
echo "6. Click 'Create Web Service'"
echo ""

echo "⏳ Wait for deployment (5-10 minutes)"
echo "📝 Copy the backend URL and update Vercel environment variables"
echo ""

echo "✅ Backend will be available at: https://codebattle-backend-xxxx.onrender.com"
echo "🔄 Frontend will automatically connect once backend is deployed"
