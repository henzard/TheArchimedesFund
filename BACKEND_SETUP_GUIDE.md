# Backend Setup Guide - The Archimedes Fund

## ✅ What's Been Set Up

### 1. **Database Schema** (`database_schema.sql`)
Tables created for:
- `users` - Admin login (your email)
- `contact_submissions` - Contact form submissions
- `investment_inquiries` - Investment requests
- `application_submissions` - Student applications

### 2. **Netlify Functions** (Serverless Backend)
- `login.js` - Admin authentication
- `submit-contact.js` - Handle contact forms
- `submit-investment.js` - Handle investment inquiries
- `submit-application.js` - Handle student applications
- `admin-get-submissions.js` - Get all submissions (admin only)
- `admin-update-status.js` - Update submission status (admin only)

### 3. **React Pages**
- `Login.jsx` - Admin login page (`/admin/login`)
- `AdminDashboard.jsx` - Admin dashboard (`/admin/dashboard`)
- Updated `Apply.jsx` - Now submits to backend

---

## 🗄️ Step 1: Set Up Your Neon Database

### A. Run the SQL Schema

1. **Go to your Neon Console**: https://console.neon.tech/
2. **Select your database**: `spring-dust-45304607`
3. **Go to SQL Editor**
4. **Copy and paste the contents of `database_schema.sql`**
5. **Click "Run"** to create all tables

This will create:
- All necessary tables
- Indexes for performance
- A placeholder for your admin user

---

## 🔐 Step 2: Configure Environment Variables

### A. For Local Development

Create `archimedes-fund-app/.env` file with:

```env
# Get these from your Neon dashboard
NETLIFY_DATABASE_URL=your_neon_connection_string_here
NETLIFY_DATABASE_URL_UNPOOLED=your_neon_unpooled_connection_string_here

# Generate a random secret (keep this secure!)
JWT_SECRET=your_random_jwt_secret_here

# Your admin credentials
ADMIN_EMAIL=henzardkruger@gmail.com
ADMIN_PASSWORD=Alicia07
```

### B. For Netlify Deployment

When you deploy to Netlify, add these environment variables:

1. **Go to Netlify Dashboard** → Your Site → Site settings
2. **Go to Environment variables**
3. **Add these variables**:

```
NETLIFY_DATABASE_URL = (from Neon dashboard)
NETLIFY_DATABASE_URL_UNPOOLED = (from Neon dashboard - unpooled connection)
JWT_SECRET = (generate a random secure string)
ADMIN_EMAIL = henzardkruger@gmail.com
ADMIN_PASSWORD = Alicia07
```

**To get your Neon connection strings:**
1. Go to Neon Dashboard
2. Click on your database
3. Look for "Connection String"
4. Copy both the pooled and unpooled versions

---

## 🚀 Step 3: Test Locally (Optional)

If you want to test locally first:

```bash
cd archimedes-fund-app

# Install Netlify CLI
npm install -g netlify-cli

# Start local development with functions
netlify dev
```

This will start:
- React app on `http://localhost:8888`
- Netlify Functions on `http://localhost:8888/.netlify/functions/`

---

## 📡 Step 4: Deploy to Netlify

### A. Push Your Code

```bash
cd C:\Project\TheArchimedesFund
git add .
git commit -m "Add backend with Neon database integration"
git push
```

### B. Deploy on Netlify

1. **Go to Netlify**: https://app.netlify.com/
2. **Import your GitHub repo**: `henzard/TheArchimedesFund`
3. **Build settings**:
   - Base directory: `archimedes-fund-app`
   - Build command: `npm run build`
   - Publish directory: `archimedes-fund-app/dist`
   - Functions directory: `netlify/functions` (should auto-detect from `netlify.toml`)

4. **Add Environment Variables** (as mentioned in Step 2B)

5. **Deploy!**

---

## 🔑 Step 5: Access Your Admin Dashboard

### After Deployment:

1. **Visit**: `https://your-site.netlify.app/admin/login`
2. **Login with**:
   - Email: `henzardkruger@gmail.com`
   - Password: `Alicia07`
3. **Access Dashboard**: You'll be redirected to `/admin/dashboard`

### What You Can Do:

- ✅ View all contact form submissions
- ✅ View all investment inquiries
- ✅ View all student applications
- ✅ Update status of each submission
- ✅ Track new vs. responded items

---

## 📊 API Endpoints

Once deployed, your API endpoints will be:

### Public Endpoints (No Auth Required):
- `POST /.netlify/functions/submit-contact` - Submit contact form
- `POST /.netlify/functions/submit-investment` - Submit investment inquiry
- `POST /.netlify/functions/submit-application` - Submit student application
- `POST /.netlify/functions/login` - Admin login

### Admin Endpoints (Auth Required):
- `GET /.netlify/functions/admin-get-submissions` - Get all submissions
- `PUT /.netlify/functions/admin-update-status` - Update submission status

---

## 🔒 Security Notes

1. **Change JWT_SECRET**: Generate a secure random string for production
2. **Use HTTPS**: Netlify provides this automatically
3. **Password Hashing**: Currently using plain text for simplicity. For production, consider implementing bcrypt hashing.
4. **Rate Limiting**: Consider adding rate limiting to prevent abuse
5. **CORS**: Already configured for all origins (`*`). Restrict in production if needed.

---

## 🐛 Troubleshooting

### Functions Not Working?
- Check Netlify Function logs in dashboard
- Verify environment variables are set
- Check that `netlify.toml` is in the root directory

### Database Connection Failed?
- Verify Neon connection string is correct
- Check that database tables exist
- Ensure Neon database is not paused (free tier auto-pauses)

### Can't Login?
- Verify `ADMIN_EMAIL` and `ADMIN_PASSWORD` environment variables
- Check browser console for errors
- Try clearing localStorage and cookies

---

## 📝 Next Steps

After setup:

1. **Test all forms** - Submit test data through the website
2. **Check admin dashboard** - Verify submissions appear
3. **Update statuses** - Practice changing submission statuses
4. **Set up email notifications** (optional future enhancement)
5. **Add more admin features** as needed

---

## 💡 Future Enhancements

Consider adding:
- Email notifications when new submissions arrive
- Export submissions to CSV
- Bulk actions (archive multiple items)
- Search and filter functionality
- Email templates for responses
- Calendar integration for interview scheduling
- Analytics dashboard

---

## 📧 Support

If you encounter issues:
1. Check Netlify function logs
2. Check browser console for errors
3. Verify all environment variables are set
4. Check that SQL schema was run successfully

Your backend is ready to go! 🎉

