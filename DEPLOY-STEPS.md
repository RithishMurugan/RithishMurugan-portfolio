# Deploy portfolio changes to Vercel (via GitHub)

Your site is already hosted on Vercel and linked to GitHub. To publish your local changes:

## 1. Commit everything

In a terminal, from your project folder (`RITHISH-PORTFOLIO`):

```bash
# Stage all changes (including the resume PDF in public/)
git add .

# Commit with a short message
git commit -m "Update portfolio: resume, experience, mobile-friendly, email, footer"
```

## 2. Push to GitHub

```bash
git push origin main
```

(Use `master` instead of `main` if that’s your default branch.)

## 3. Let Vercel deploy

- Vercel is connected to your GitHub repo, so it will **automatically** start a new deployment when you push.
- Open your Vercel dashboard: [vercel.com/dashboard](https://vercel.com/dashboard)
- You’ll see a new deployment for the latest commit. Wait until it shows **Ready**.
- Your live site will then show all the new changes (resume download, experience, mobile fixes, etc.).

---

**Summary:**  
`git add .` → `git commit -m "your message"` → `git push origin main` → Vercel auto-deploys.

**If you use a different branch:**  
Push that branch (e.g. `git push origin your-branch`) and, in Vercel, either set that branch as the production branch or merge it into `main` and push.
