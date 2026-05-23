# Product Requirement Document (PRD)

## Project Information
* **Client / Owner**: Resto Warung Papatong (Owner: Kak Steven Moe)
* **Strategic Location**: Jl. Alternatif GOR Pemda No.9, Nanggewer Mekar, Kec. Cibinong, Kabupaten Bogor, Jawa Barat 16912 (Strategic Landmark: Dekat exit toll Sirkuit Sentul).
* **Target Domain**: warungpapatong.com
* **Master Project Account**: warungpapatong.project@gmail.com
* **Development Tier**: Professional Migration Tier (WordPress to Next.js Latest App Router)

---

## 1. Executive Summary & Objective
This project defines the migration of the business web portal for **Resto Warung Papatong** from a legacy, heavy WordPress system to a light-speed, fully optimized, and type-safe **Next.js Latest App Router** structure. The primary business outcomes are:
- Minimizing load speed overhead to attain an ideal **~100 Google PageSpeed Insights Score**.
- Ensuring complete link mapping immunity against active Google Ads campaigns and organic Google Search console crawlers.
- Encouraging direct pre-orders, reservations, and group booking leads immediately via a structured WhatsApp checkout schema.

---

## 2. Real-World Client Audit Data & Core Metrics

### A. Strict Local SEO NAP (Name, Address, Phone)
To rank securely on regional search clusters and maintain alignment with Google Business Profile (GBP) indices, the NAP structure must remain immutable:
* **Business Name**: Resto Warung Papatong
* **Postal Address**: Jl. Alternatif GOR Pemda No.9, Nanggewer Mekar, Kec. Cibinong, Kabupaten Bogor, Jawa Barat 16912 (Strategic Landmark: Dekat exit toll Sirkuit Sentul).
* **Direct Office Phone / WhatsApp**: `0813-8849-7651` (Raw API format: `6281388497651`).
* **Operating Hours**: Senin–Minggu: 11:00 AM – 10:00 PM (Setiap hari Jam 11.00 Siang hingga jam 22.00 Malam).

### B. Financial Milestones (40-30-30 Structure)
Budget allocations are locked at a Grand Total of **Rp 1.000.000**, split into three transparent payment execution loops:
1. **Termin 1 (DP / On-Sign)**: Rp 400.000 (Activated upon repo structure bootstrap & PRD approval).
2. **Termin 2 (Mid-Term Alpha)**: Rp 300.000 (Released after UI integration of E-Menu categories and reservation testing).
3. **Termin 3 (Final Release)**: Rp 300.000 (Released upon GSC, GA4, Ads verification testing & project handover).

### C. Visual Identity Profiling
Aligning closely with the client's official Instagram avatar and physical menus:
* **Backdrop**: Crisp minimalist white canvas background (`#F8F9FA` / `#FFFFFF`) to encourage readable customer experiences and eliminate visual fatigue.
* **Primary Accent**: "Kuning Terang" (Bright Yellow #FFCC00) associated with the official brand logo.
* **Secondary Accent**: "Merah Cabai" (Chili Red #E60000) for highlighting high-appetite CTA elements, discounts, and main banners.
* **Contrast Copy**: Dark charcoal and heavy rich black (`#202124` / `#000000`) for text.

### D. Asset Budget Limits (Max 25 Photos)
To ensure optimal image download speeds, the site uses a strict viewport quota:
- Absolute upper cap: **25 curated photos** (including banners, logo formats, culinary selections, and ambience portraits).
- Image elements require pre-allocated aspect ratios (`aspect-video`, `aspect-square`) to eliminate **Cumulative Layout Shift (CLS)**.

---

## 3. Route Mapping & Legacy Protection
To ensure that existing Google Ads campaigns or physical QR codes on print materials do not guide users to dead 404 pages during migration, legacy URLs must be safely mapped:
* **Legacy Menu Link**: `warungpapatong.com/menu/` maps to `app/menu/page.tsx`
* **Legacy Venue Link**: `warungpapatong.com/venue/` maps to `app/venue/page.tsx`
* *Note*: Do NOT move the atmosphere and picture grids over to an arbitrary `/gallery` route. It must reside in `/venue` to maintain continuous indexing.

---

## 4. Google Marketing Stack & Schema.org Structured Metadata
1. **Google ads Integration**: Dynamic loading of `gtag.js` tracking script through non-blocking asynchronous scripts.
2. **Conversion Tracking**: Mandatory attachment of `trackWhatsAppConversion(MouseEvent, position)` events to every primary call-to-action on the page to register conversions with Google Ads of the sales team.
3. **Google Search Console**: Verification with a site-wide HTML meta header placeholder inside the Head context.
4. **LocalBusiness Restaurant Schema (JSON-LD)**: Injected dynamically on layouts to inform indexing crawlers about geographic coordinates, phone links, and cuisine categories (Traditional Sundanese and Indonesian Seafood).
