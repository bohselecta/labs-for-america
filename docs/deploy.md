# 🚀 How to Deploy Your Own Labs Portal

This guide will walk you through putting your new Labs portal online in **under 20 minutes**, no coding required.

---

## ✅ What you'll need
- A **GitHub account** (free)
- A **Vercel account** (free for hobby/personal use)
- A web browser

---

## 1. Create a GitHub account
1. Go to [github.com/join](https://github.com/join).
2. Sign up with your email and create a username.
3. Verify your email.

*(GitHub is like Google Drive, but for websites.)*

---

## 2. Create a new repository
1. Once logged in, click the **+** in the top-right → **New repository**.
2. Give it a name, e.g. `civiclabs` or `justicelabs`.
3. Set visibility to **Public**.
4. Click **Create repository**.

---

## 3. Upload your template
1. Download the template bundle from [Labs for America](https://labsforamerica.org/templates).
2. Unzip the download.
3. Go back to your new GitHub repo.
4. Click **Add file → Upload files**.
5. Drag the **unzipped files** into the browser.
6. Scroll down and click **Commit changes**.

🎉 Your code is now on GitHub!

---

## 4. Create a Vercel account
1. Go to [vercel.com/signup](https://vercel.com/signup).
2. Sign up with GitHub (recommended).
3. Authorize Vercel to access your repos.

---

## 5. Deploy to Vercel
1. From your Vercel dashboard, click **Add New → Project**.
2. Select the GitHub repo you just created.
3. Vercel will auto-detect Next.js → hit **Deploy**.
4. Wait a minute for the build to finish.
5. Your site is live at:  

`yourlab.vercel.app`

---

## 6. Customize your domain (optional)
1. In your Vercel dashboard, open your project.
2. Click **Settings → Domains → Add**.
3. If you have a custom domain (like `citylabs.org`), enter it here.
4. Update DNS with your registrar.

---

## 7. Set up Auth (optional)
For logins, Vercel integrates easily with Clerk or Auth0.

Quick start with Clerk:
1. Go to [clerk.com](https://clerk.com), sign up free.
2. Create an app → copy your API keys.
3. In Vercel → **Settings → Environment Variables**:
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`
4. Redeploy.
5. You can now log in with email/Google.

---

## 🎨 Customize your portal
- Go to the **Admin panel**.
- Upload your logo → the site auto-themes with your colors.
- Choose a preset (City, Police, School, Health).

---

## ✨ Recap
- You stood up a **Labs portal** in minutes.
- No coding required.
- Update anytime by uploading new files to GitHub.
- Share your Labs site with your community right away.

---

💡 Want to contribute improvements back? Fork [Labs for America](https://labsforamerica.org) and submit your changes!
