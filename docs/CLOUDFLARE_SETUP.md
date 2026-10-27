# Better Mind — Cloudflare Deployment Guide

This project is configured to deploy to **Cloudflare Workers & Assets** using **OpenNext** (`@opennextjs/cloudflare`), which is Cloudflare's officially supported standard for Next.js App Router applications.

---

## Architecture Overview

- **Framework**: Next.js 16 (App Router)
- **Deployment Adapter**: OpenNext (`@opennextjs/cloudflare`)
- **Runtime**: Cloudflare Workers with `nodejs_compat`
- **Static Assets**: Cloudflare Native Assets (`.open-next/assets`)
- **Configuration Files**:
  - `wrangler.jsonc` — Defines Worker name, compatibility flags, and assets directory.
  - `open-next.config.ts` — Configures the OpenNext adapter bundling.
  - `.github/workflows/deploy-cloudflare.yml` — Automated CI/CD deployment on push to `main`.

---

## Deployment Options

### Option 1: Automatic GitHub Actions CI/CD (Recommended)

Whenever you push to the `main` branch, the workflow `.github/workflows/deploy-cloudflare.yml` runs tests, verifies TypeScript types, builds the OpenNext bundle, and deploys directly to Cloudflare.

#### Step-by-Step Setup:
1. **Get your Cloudflare Account ID**:
   - Go to the [Cloudflare Dashboard](https://dash.cloudflare.com/).
   - Click on **Workers & Pages** in the left sidebar.
   - Your **Account ID** is displayed in the right sidebar.

2. **Generate a Cloudflare API Token**:
   - In Cloudflare Dashboard, go to **My Profile** > **API Tokens**.
   - Click **Create Token**.
   - Use the **Edit Cloudflare Workers** template (or custom token with `Account: Workers Scripts: Edit` and `Account: Account Settings: Read` permissions).
   - Copy your generated token.

3. **Add Secrets to GitHub Repository**:
   - Go to your repository on GitHub: `https://github.com/muimis/bettermind`
   - Navigate to **Settings** > **Secrets and variables** > **Actions**.
   - Click **New repository secret** and add:
     - `CLOUDFLARE_API_TOKEN`: Your Cloudflare API Token.
     - `CLOUDFLARE_ACCOUNT_ID`: Your Cloudflare Account ID.

4. **Add Environment Variables (Supabase)**:
   - In GitHub Secrets or under **Cloudflare Dashboard > Workers > bettermind > Settings > Variables**, add:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - `SUPABASE_SERVICE_ROLE_KEY` (if used server-side)

---

### Option 2: Deploy Directly from Local Terminal (CLI)

You can also build and deploy directly using Wrangler from your machine:

1. **Log in to Cloudflare**:
   ```bash
   npx wrangler login
   ```
2. **Build and Deploy**:
   ```bash
   npm run deploy:worker
   ```
3. **Local Preview (simulate Cloudflare environment)**:
   ```bash
   npm run preview:worker
   ```

---

### Option 3: Cloudflare Dashboard Git Integration

1. Go to **Workers & Pages** > **Create application**.
2. Select **Pages** or **Workers** > **Connect to Git**.
3. Select `muimis/bettermind`.
4. Build settings:
   - **Framework preset**: None / Custom (or Next.js)
   - **Build command**: `npx opennextjs-cloudflare build`
   - **Deploy directory / output**: `.open-next/assets`
   - Under **Compatibility flags**, add `nodejs_compat`.
