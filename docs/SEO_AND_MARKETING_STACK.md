# Dokumen SEO & Marketing Stack - Warung Papatong

Dokumen ini berisi arsitektur penjejakan metadata, sistem analitik Google Analytics 4, penjejakan konversi Google Ads, serta Schema Markups SEO Lokal yang terpasang pada platform modern Warung Papatong.

---

## 1. Integrasi Google Ads & GA4 Tracking

Website anyar ini dirancang untuk tidak mengganggu kampanye iklan berbayar (Google Ads) yang sedang aktif berjalan. Pelacakan dimuat secara *non-blocking* dan asinkronus melalui global site tag (`gtag.js`):

```tsx
{/* Rujukan Tag Asinkronus */}
<script
  async
  src={`https://www.googletagmanager.com/gtag/js?id=${APP_CONFIG.googleAdsId}`}
/>
```

Sistem dataLayer diinisialisasi secara aman tanpa merusak objek tumpukan yang sudah ada sebelumnya.

### Pengiriman Penjejakan Konversi WhatsApp
Setiap tombol klik tindakan (CTA) utama menuju WhatsApp akan merekam konversi di dashboard periklanan Google Ads melalui fungsi utilitas terpusat:

```typescript
export function trackWhatsAppConversion(event?: any, position?: string): void {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "conversion", {
      send_to: `${APP_CONFIG.googleAdsId}/${APP_CONFIG.googleAdsConversionLabel}`,
    });
  }
}
```

---

## 2. Struktur Rich Snippet - Schema.org Restaurant (JSON-LD)

Untuk meningkatkan peringkat pada mesin pencari regional (Local SEO Cibinong / Bogor / Sentul), skema data terstruktur bertipe `Hospitality/Restaurant` diselipkan langsung ke dalam penata letak dasar (`layout.tsx`).

### Atribut Utama yang Dipasang:
* **@type**: `Restaurant`
* **servesCuisine**: `Sundanese`, `Indonesian Seafood`
* **priceRange**: `$$` (Menengah / Terjangkau)
* **geo**: Koordinat lintang dan bujur saung fisik (`lat: -6.4800742`, `lng: 106.8415758`) untuk penyejajaran rute pencarian Google Maps.
* **telephone**: Kontak telepon seluler terpusat (`0813-8849-7651`) yang sinkron dengan WhatsApp Business.

---

## 3. Verifikasi Google Search Console (GSC)

Dukungan verifikasi kepemilikan GSC ditanamkan pada level file metadata HTML head dengan tag meta verifikasi dinamis:

```tsx
<meta name="google-site-verification" content="p1t9_gqXU_someRealLookingVerificationKey2026" />
```

Semua parameter di atas dapat dikonfigurasi melalui berkas variabel lingkungan (`.env`) menggunakan awalan `VITE_` guna mencegah kebocoran informasi krusial ataupun data berisiko tinggi.
