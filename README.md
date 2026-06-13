**Project**
- **Name:** Park Buddy — Car parking reservation (Next.js + MongoDB)

**Prerequisites**
- **Node:** Recommended Node 18 or 20. If using Node 25+, see Node note below.
- **Package manager:** Yarn v1 (project is Yarn-first, `yarn.lock` present).

**Quick Start (local)**
- **Install deps:** `yarn install`
- **Run dev:** `yarn dev` (scripts set `NODE_OPTIONS=--no-experimental-webstorage` on Windows)
- **Build production:** `yarn build`
- **Start production:** `yarn start`

**Environment variables**
- **MONGODB_URI** — MongoDB connection string (required)
- **JWT_SECRET** — Secret used for signing JWTs (required)
- **NEXT_PUBLIC_API_BASE_URL** — Optional base URL for client API calls (defaults to `/api`)

Create a `.env` file at the project root with these values for local development. Example:

```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_here
NEXT_PUBLIC_API_BASE_URL="/api"
```
Do not commit this file or any secrets to the repository. The project ignores `.env` files by default.

**Node 25 Web Storage note**
- Node 25 introduced experimental Web Storage which can expose a non-browser `localStorage` during SSR and break Next.js apps. This repository's `package.json` dev/start scripts include `NODE_OPTIONS=--no-experimental-webstorage` on Windows to disable it locally. If you use Node 25 in other environments, either:
  - Use Node 18 or 20 (recommended), or
  - Ensure `NODE_OPTIONS=--no-experimental-webstorage` is set in your environment.

**Vercel deployment (recommended)**
1. Connect your GitHub repository to Vercel.
2. In Project Settings → Environment Variables, add the same variables listed above (`MONGODB_URI`, `JWT_SECRET`, `NEXT_PUBLIC_API_BASE_URL`).
3. Build Command: `yarn build`
4. Output Directory: (leave as default for Next.js)
5. (Optional) Set Node Version: Choose Node 20 in Vercel settings if available. If your Vercel instance uses Node 25, set `NODE_OPTIONS=--no-experimental-webstorage` in Vercel's Environment Variables to disable Web Storage.

**Create an admin account**
1. Sign up with the user you want to promote, or use an existing user account.
2. Set `MONGODB_URI` in your terminal to the same database used by the app.
3. Run:

```bash
yarn make-admin your-email@example.com
```

4. Log out, log back in, and open `/dashboard` or `/users`. The admin menu will appear only for `admin` users.

**Live demo**
- Production URL: https://car-parking-reservation-master.vercel.app


**Repository notes**
- Project uses Yarn (remove `package-lock.json` to avoid mixed lockfiles).
- Client-only UI pieces that require browser APIs are marked with `"use client"` where necessary.

**Where to look in the code**
- API routes: [src/app/api](src/app/api)
- DB connector: [src/lib/db.ts](src/lib/db.ts#L1-L20)
- Auth helpers: [src/lib/auth.ts](src/lib/auth.ts#L1-L40)
- Main app entry: [src/app/layout.tsx](src/app/layout.tsx#L1-L40)

If you want, I can commit this README and push the change, then walk you through connecting the repo to Vercel or deploying via the Vercel CLI.
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
