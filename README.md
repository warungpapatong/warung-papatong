# Resto Warung Papatong Website - Next.js Enterprise Migration Portal
========================================================================

Designed as a high-performance Next.js workspace structure optimized for regional SEO indexation, page performance speed, and active Google Ads conversion tracking.

---

### 1. Exhaustive Project Directory Tree
Below is the directory tree mapping both the current React/Vite preview shell and the Next.js migration layouts:

```text
├── /                         # Project Root Workspace
│   ├── .env.example          # Environment variables template
│   ├── PRD.md                # Product Requirement Document
│   ├── README.md             # This comprehensive handover guide
│   ├── CHANGELOG.md          # Version history log registry
│   ├── package.json          # Dependency and compilation configs
│   ├── tsconfig.json         # TypeScript compiler arguments
│   └── /src                  # Base Application Directory
│       ├── App.tsx           # React Multi-page switcher (Local Preview platform)
│       ├── main.tsx          # React Client Loader
│       ├── index.css         # Global tailwind imports & typography styles
│       ├── types.ts          # Strictly typed Shared Data Models
│       ├── data.ts           # Curated 25-asset image assets & food catalogues
│       ├── /lib
│       │   ├── tracking.ts   # React runtime tracking script
│       │   └── config.ts     # Rigid Client Environment variables & GSC SEO config
│       └── /app              # NEXT.JS ENTERPRISE MIGRATION FILES (Target Export Bundle)
│           ├── layout.tsx    # Root Next.js Layout (Scripts injector & HTML Structure)
│           ├── page.tsx      # Halaman Beranda (Home screen view)
│           ├── /menu
│           │   └── page.tsx  # Halaman Menu (Interactive categories & Filter tabs)
│           ├── /venue
│           │   └── page.tsx  # Halaman Venue (Legacy Gallery path with Lightbox grid)
│           └── /about
│               └── page.tsx  # Halaman Tentang Kami (Core history & Owner transparent trust)
```

---

### 2. Live Platform Build & Compile Instructions
This repository supports both local Vite preview builds and Next.js target compiles:

#### A. Local Development Node Sandbox
1. Populate dependencies cleanly:
   ```bash
   npm install
   ```
2. Initiate the high-performance local dev server on `http://localhost:3000`:
   ```bash
   npm run dev
   ```
3. Verify type correctness & run the linter validation:
   ```bash
   npm run lint
   ```

#### B. Next.js Independent Build Optimization
The files within `/src/app/` represent a clean, enterprise-grade static export bundle. If you are copying these folders into a Next.js App Router template, run:
```bash
npx next build
```

---

### 3. Setup Configuration Matrix (.env.example)
Create a `.env` file at the root of the workspace to override variables at deploy-time:
```env
# Google Ads Campaign Trackings
NEXT_PUBLIC_GOOGLE_ADS_ID=AW-1649827361
NEXT_PUBLIC_GOOGLE_ADS_LABEL=WA_Click_Conversion_Label_XYZ

# Google Search Console Meta Token
NEXT_PUBLIC_GSC_VERIFICATION_TAG=google-site-verification=p1t9_gqXU_someRealLookingVerificationKey2026

# Operational Configurations
NEXT_PUBLIC_WHATSAPP_NUMBER=6281388497651
```

---

### 4. Step-by-Step Handover Protocol
Follow these guidelines to safely transfer the system to owner-agent Kak Steven Moe using the master email project address **warungpapatong.project@gmail.com**:

#### Step 1: Claim Search Console Access
1. Visit the [Google Search Console Dashboard](https://search.google.com/search-console).
2. Log in using `warungpapatong.project@gmail.com`.
3. Select "Add Property" -> Choose "Domain" and insert `warungpapatong.com`.
4. Grab the TXT verification DNS record and inject it under the nameserver registration portal of choice, or use the HTML `<meta>` tag provided within `/src/lib/config.ts`'s parameters.
5. In the users settings panel, type the owner's primary email address and promote them to **Owner** permissions.

#### Step 2: Google Ads Conversion Linking
1. Under [Google Ads](https://ads.google.com/), construct a new conversion action for "WhatsApp Click Tracker".
2. Record the campaign identification tag (e.g. `AW-1649827361`) and conversion label (e.g. `WA_Click_Conversion_Label_XYZ`).
3. Replace these values inside `src/lib/config.ts` under the variables of the static block. All live page interactions will automatically report back to the campaign dashboard.
