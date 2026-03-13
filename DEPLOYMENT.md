# FitCalc Deployment Guide

## Overview
- **Frontend**: Deployed on Vercel
- **Backend**: Deployed on Render
- **Database**: MongoDB Atlas (required)

## Prerequisites
1. GitHub account with code pushed to repository
2. Render account (free tier available)
3. Vercel account (free tier available)
4. MongoDB Atlas account (free tier available)

---

## Step 1: Set Up MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user (username + password)
4. Whitelist IP address: Add `0.0.0.0/0` (allow all IPs) for easier setup
5. Get your connection string:
   - Click "Connect" → "Connect your application"
   - Copy the connection string (looks like: `mongodb+srv://username:<password>@cluster.mongodb.net/fitcalc`)
   - Replace `<password>` with your actual password

---

## Step 2: Deploy Backend on Render

### Option A: Using Render Dashboard (Recommended)

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository: `vishwajeet-backend/FitCalc`
4. Configure the service:
   - **Name**: `fitcalc-backend`
   - **Region**: Choose nearest region
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

5. Add Environment Variables:
   - `NODE_ENV` = `production`
   - `MONGODB_URI` = Your MongoDB Atlas connection string
   - `PORT` = `5000` (or leave empty, Render sets this automatically)
   - `CORS_ORIGIN` = `https://your-app.vercel.app` (update after deploying frontend)
   - `JWT_SECRET` = Generate a random string (e.g., `openssl rand -base64 32`)
   - `EMAIL_USER` = Your Gmail address (optional, for feedback form)
   - `EMAIL_PASSWORD` = Your Gmail app password (optional)

6. Click "Create Web Service"
7. Wait for deployment to complete
8. **Save your backend URL**: It will be something like `https://fitcalc-backend.onrender.com`

### Option B: Using render.yaml (Alternative)

1. The `render.yaml` file is already in your repository
2. Go to Render Dashboard → "New +" → "Blueprint"
3. Connect to your repository
4. Render will auto-detect the `render.yaml` file
5. Add the required environment variables manually

---

## Step 3: Deploy Frontend on Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New" → "Project"
3. Import your GitHub repository: `vishwajeet-backend/FitCalc`
4. Configure the project:
   - **Framework Preset**: Create React App
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`

5. Add Environment Variable:
   - **Key**: `REACT_APP_API_URL`
   - **Value**: `https://fitcalc-backend.onrender.com/api` (your Render backend URL)

6. Click "Deploy"
7. Wait for deployment to complete
8. **Save your frontend URL**: It will be something like `https://fitcalc.vercel.app`

---

## Step 4: Update Backend CORS Settings

1. Go back to Render Dashboard
2. Open your `fitcalc-backend` service
3. Go to "Environment" tab
4. Update the `CORS_ORIGIN` variable to your Vercel URL: `https://fitcalc.vercel.app`
5. Save changes - this will trigger a redeployment

---

## Step 5: Test Your Deployment

1. Visit your Vercel URL: `https://fitcalc.vercel.app`
2. Try using a calculator (e.g., BMI Calculator)
3. Check if the API calls are working
4. Test the feedback form if email is configured

---

## Troubleshooting

### Frontend can't connect to backend
- Check that `REACT_APP_API_URL` in Vercel points to the correct Render URL
- Make sure to include `/api` at the end of the backend URL
- Verify CORS_ORIGIN in Render matches your Vercel URL

### Backend crashes on Render
- Check Render logs for errors
- Verify MongoDB connection string is correct
- Ensure all required environment variables are set

### MongoDB connection issues
- Verify IP whitelist includes `0.0.0.0/0`
- Check database user credentials
- Ensure connection string password is URL-encoded if it contains special characters

---

## Post-Deployment Updates

When you make code changes:

1. **Commit and push to GitHub**:
   ```bash
   git add .
   git commit -m "Your commit message"
   git push origin main
   ```

2. **Automatic Redeployment**:
   - Vercel will automatically redeploy on every push
   - Render will automatically redeploy on every push

---

## Custom Domain (Optional)

### For Vercel (Frontend):
1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed

### For Render (Backend):
1. Go to Service Settings → Custom Domains
2. Add your custom domain
3. Update DNS records as instructed

---

## Important Notes

- **Free Tier Limitations**:
  - Render free tier: Service sleeps after 15 minutes of inactivity (first request after sleep takes ~30 seconds)
  - Vercel free tier: Generous limits for personal projects
  - MongoDB Atlas free tier: 512 MB storage

- **Environment Variables**: Never commit `.env` files to GitHub. Always use platform environment variables.

- **CORS**: Make sure backend CORS_ORIGIN matches your frontend URL exactly (no trailing slash).

---

## URLs to Save

- **GitHub Repository**: https://github.com/vishwajeet-backend/FitCalc
- **Backend (Render)**: [Add after deployment]
- **Frontend (Vercel)**: [Add after deployment]
- **MongoDB Atlas**: [Add your cluster URL]

---

## Next Steps After Deployment

1. Test all calculator functionalities
2. Monitor error logs on both platforms
3. Set up custom domain (optional)
4. Configure email for feedback form
5. Add analytics (Google Analytics, etc.)
6. Set up monitoring/alerts for downtime


## 
