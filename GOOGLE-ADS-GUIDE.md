# Panduan Google Ads, GA4 & Search Console — Warung Papatong

> Dokumen ini ditulis khusus untuk **developer/penanggung jawab yang belum familiar dengan Google Ads**.
> Tujuannya: bikin tracking benar-benar jalan setelah migrasi WordPress → Next.js, lalu mengoptimalkan iklan.
> Status kode di repo: **semua perubahan sudah diimplementasikan**, yang kamu lakukan tinggal mengikuti checklist di bawah.

---

## Bagian A — Google Ads itu apa? (jelasin 2 menit)

Bayangkan Google Ads seperti **iklan di halaman pertama Google** dan **banner di YouTube/Situs lain**.

Cara kerjanya singkat:

1. Orang mengetik "restoran seafood cibinong" di Google.
2. Iklan Warung Papatong muncul di **bagian atas** hasil pencarian (ditandai "Iklan/Sponsored").
3. Kalau dia **klik** iklan, Google menagih biaya ke akun Ads (inilah "Cost per Click" / CPC).
4. Kalau dia **klik tombol WhatsApp** di website, Google mencatat ini sebagai **"Konversi"** — itulah sinyal bahwa iklan berhasil.

> **Poin paling penting**: Google Ads hanya bisa "pintar" kalau tahu mana klik yang jadi **pelanggan**.
> Data konversi itulah yang dipakai algoritma Google untuk menawar otomatis (`Maximize Conversions`)
> supaya uang iklan dipakai seefektif mungkin. **Kalau konversi tidak tercatat, algoritma buta — duit habis tanpa hasil.**

Konversi kita di sini = **klik WhatsApp** (chat admin = lead = calon pelanggan). Tidak ada form, tidak ada e-commerce, jadi WhatsApp click adalah satu-satunya sinyal bisnis.

---

## Bagian B — Yang sudah saya kerjakan di website (kode)

| Perubahan | File | Efek |
|-----------|------|------|
| **GA4 dipasang** | `src/app/layout.tsx`, `src/lib/config.ts` | gtag.js kini men-load `AW-1649827361` **dan** `G-67D0FX5RR7` secara bersamaan |
| **Event `whatsapp_click`** | `src/lib/config.ts` | Setiap klik tombol WA (navbar, hero, menu, checkout, floating, dll.) mengirim event `whatsapp_click` ke GA4 + event `conversion` ke Google Ads |
| **Nilai pesanan** | `src/features/menu/components/CheckoutModal.tsx` | Checkout mengirim `value` (total belanja) + `transaction_id` → Google Ads bisa lapor nilai konversi (bukan cuma hitungan) |
| **Anti-error saat label kosong** | `src/lib/config.ts` | Jika label konversi Ads masih placeholder, event Ads dilewati diam-diam (tidak error) tapi GA4 tetap tercatat |
| **Schema SEO/AEO/GEO** | `layout.tsx`, `page.tsx`, `menu/page.tsx`, `venue/page.tsx`, `about/page.tsx` | Menu schema, BreadcrumbList, WebSite schema, `speakable` di FAQ → agar muncul di Google AI Overviews / asisten suara |
| **Redirect lama** | `next.config.ts` | `/tentang` & `/tentang/` → `/about` (301), plus www → non-www |
| **Sitemap stabil** | `src/app/sitemap.ts` | `lastModified` tidak berubah tiap build |

### Skema tracking sekarang (satu klik, dua tujuan)

```
Tombol WhatsApp diklik
        │
        ├─► Google Ads  : gtag('event','conversion',{ send_to:'AW-1649827361/<LABEL_ASLI>' })
        └─► GA4         : gtag('event','whatsapp_click',{ event_label:'<posisi tombol>' })
```

---

## Bagian C — Yang harus kamu lakukan (checklist teknis, urut)

### Langkah 1 — Set environment variables di Vercel + redeploy ⚠️ WAJIB

`NEXT_PUBLIC_*` disuntikkan **saat build**, jadi harus ada di Vercel sebelum deploy.

**Vercel → Project `warung-papatong` → Settings → Environment Variables**, tambahkan (set **Production, Preview, dan Development**):

| Key | Value | Status |
|-----|-------|--------|
| `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID` | `G-67D0FX5RR7` | ✅ Baru, wajib ditambahkan |
| `NEXT_PUBLIC_GOOGLE_ADS_ID` | `AW-1649827361` | Sudah ada (pastikan ada) |
| `NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL` | **label asli (lihat Langkah 4)** | 🚨 MASIH PLACEHOLDER — ganti! |
| `NEXT_PUBLIC_GSC_VERIFICATION_TAG` | `google-site-verification=NMUnW3W72_FhGAopoB_A3CVKRKvj1ouSQmjdjKc-d_Y` | Sudah ada |
| `NEXT_PUBLIC_SITE_URL` | `https://warungpapatong.com` | Disarankan (pasti-kan non-www) |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | `6281388497651` | Sudah ada |

Lalu **redeploy** (Vercel auto-deploy saat kamu `git push`, atau klik Redeploy).

> Cara cek setelah deploy: buka `warungpapatong.com`, klik kanan → View Page Source, cari `G-67D0FX5RR7`.
> Ketemu = GA4 sudah aktif.

### Langkah 2 — Google Search Console (sekali saja)

1. Buka [Google Search Console](https://search.google.com/search-console) dengan akun email yang sama dengan pemilik domain.
2. **Add property → Domain**, ketik `warungpapatong.com`, ikuti verifikasi (TXT DNS) — kalau sudah pernah diverifikasi, lewati.
3. Di menu kiri → **Sitemaps**, submit: `https://warungpapatong.com/sitemap.xml`
4. Biarkan 2–7 hari. Cek **Performance** → halaman mana yang muncul, kata kunci apa yang diklik, dan apakah ada halaman **404**.
   > 404 lama dari situs WordPress biasanya muncul di sini. Kalau ada 404, tambahkan redirect-nya ke `next.config.ts` (pola `/tentang` → `/about` sudah saya buatkan).

### Langkah 3 — Google Analytics 4 (GA4)

1. Cek property GA4 ada: [GA4 Admin](https://analytics.google.com) → Admin. ID yang kamu kasih (`G-67D0FX5RR7`) harus milik property ini.
2. Buka **Admin → Events** → cari event **`whatsapp_click`**. Klik saklar **"Mark as conversion"** → jadi ON.
   > Ini penting! Tanpa ini, GA4 cuma merekam event tapi tidak menghitung sebagai "konversi".
3. Setelah beberapa klik WA, cek **Reports → Engagement → Conversions** → `whatsapp_click` muncul.

> Kalau event `whatsapp_click` belum muncul: kemungkinan website belum di-deploy ulang, atau belum ada klik WA. Beri waktu 24–48 jam.

### Langkah 4 — Google Ads: ganti label konversi yang asli (PALING PENTING) ⚠️

Nilai `WA_Click_Conversion_Label_XYZ` di `.env.local`/Vercel adalah **placeholder contoh — bukan label asli**. Selama ini kemungkinan besar **konversi Google Ads TIDAK tercatat** meski website sudah tracking.

Cara ambil label asli:

1. Masuk [Google Ads](https://ads.google.com) → ikon **Tools** (kunci inggris) → **Conversions**.
2. Klik konversi **"WhatsApp Click"** (atau nama apa pun yang dibuat sebelumnya).
3. Pilih menu **Tag setup → Google tag / Settings**.
4. Salin label konversi (string alfanumerik pendek di akhir snippet, formatnya seperti `gtag('event','conversion',{'send_to':'AW-1649827361/ABCDEFGHIJKLMNOP'})` — yang kamu salin bagian **`ABCDEFGHIJKLMNOP`**).
5. Update `NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL` di Vercel dengan label itu → redeploy.

> Kalau konversi "WhatsApp Click" belum ada di akun Ads, buat baru: **Conversions → New conversion action → Website → pakai Google tag → "Click on a link / button"** → beri nama "WhatsApp Click". Google akan kasih labelnya sendiri.

> **Alternatif tanpa label Ads**: cara ini bisa dipakai sekarang juga —
> di Google Ads: **Conversions → New → Import → Google Analytics 4 → pilih `whatsapp_click`**.
> Dengan begitu konversi datang dari GA4 (tidak perlu label `AW-xxxxx/xxxx`). Cara paling tahan-banting.

### Langkah 5 — Verifikasi tracking jalan (testing)

1. Buka website, buka **DevTools → Network**, filter kata `google-analytics` atau `gtag`.
2. Klik salah satu tombol WhatsApp → cari request `collect?...` atau `googleadservices...`.
3. Buka GA4 → **Realtime** (atau **DebugView** dengan ekstensi Google Tag Assistant) → klik tombol WA → lihat event `whatsapp_click` muncul.

---

## Bagian D — Optimasi Google Ads (strategi, bukan cuma teknis)

### D1. Siapkan data konversi dulu (sudah dibahas di atas)

**Tidak ada optimasi Ads yang berarti tanpa konversi yang akurat.** Selesaikan Langkah 4 dulu. Target saran:
- Setiap klik WA yang masuk dari iklan → tercatat sebagai 1 konversi.
- Karena tidak ada data email/form, **Enhanced Conversions tidak relevan** — abaikan.

### D2. Struktur akun yang disarankan

Untuk resto keluarga lokal seperti ini, jangan terlalu rumit. Sederhana justru lebih murah:

```
Campaign 1 — Search: "restoran seafood/sunda cibinong"
   Ad Group A: Restoran seafood    → kata kunci: resto seafood cibinong, seafood cibinong bogor, ...
   Ad Group B: Restoran sunda      → kata kunci: restoran sunda cibinong, lesehan sunda bogor, ...
   Ad Group C: Makan keluarga      → kata kunci: tempat makan keluarga bogor, saung lesehan, ...
Campaign 2 — Performance Max  (jangkauan luas: YouTube, Gmail, Display)
Campaign 3 (jika budget besar) — Remarketing
```

### D3. Kata kunci (keywords)

- Gunakan **Phrase Match** + **Broad Match (Smart Bidding)** — jangan pakai keyword lama mode Exact Match kaku.
- **Negative keywords wajib** — tambahkan: `resep`, `cara masak`, `harga borong`, `lowongan kerja`, `alamat cv`, `menu pdf` dsb. supaya tidak buang budget ke pencari info.
- Kata kunci lokal lebih murah & konversi lebih tinggi: `seafood cibinong`, `resto sunda bogor`, `tempat gathering cibinong`, `saung lesehan bogor`, `restoran dekat sentul`.

### D4. Iklan (ad copy) & ekstensi

- Tulis headline 2–3 varian; sertakan **harga** dan **bukti sosial**:
  - "Seafood & Sunda Cibinong ★4.8 (4.080+ review)"
  - "Lesehan Saung Bambu + Live Music 18.30–21.30"
  - "Parkir Bus Pariwisata — Booking Rombongan Gratis"
- **Wajib pasang ekstensi:**
  - **Sitelink** → `/menu` (Lihat Menu), `/venue` (Galeri & Suasana), `/about` (Tentang Kami)
  - **Callout** → "Buka Setiap Hari 11–22", "DP hanya untuk rombongan >20 orang", "Parkir luas"
  - **Call** → nomor telepon (kalau aktif)
  - **Location** → tautan Google Business Profile (biar muncul di map)

### D5. Budget & bidding

- Mulai dengan **Maximize Conversions** (karena sudah ada tracking). Kalau baru mulai dan belum ada data, **Maximize Clicks** dulu 2 minggu, lalu pindah ke konversi.
- Budget harian realistis (contoh): Search Rp 75.000–150.000/hari, Performance Max Rp 50.000–100.000/hari. Sesuaikan dengan keuntungan per order.
- Set **Conversion Value** bila ingin lapor nilai — sudah saya siapkan (`value` dikirim otomatis saat checkout).

### D6. Landing page — alihkan ke halaman yang relevan

| Iklan tentang | Final URL |
|---------------|-----------|
| Seafood / menu | `https://warungpapatong.com/menu` |
| Suasana / gathering / venue | `https://warungpapatong.com/venue` |
| Tentang / sejarah | `https://warungpapatong.com/about` |
| Umum | `https://warungpapatong.com/` |

Halaman ini cepat (LCP ~3s), mobile-first, dan tombol WhatsApp jelas — sudah siap untuk ads.

### D7. Migrasi dari WordPress (penting pasca-pindah website)

- ✅ URL lama `/menu/`, `/venue/` → otomatis 301 ke versi tanpa slash (middleware).
- ✅ `/tentang` → `/about` (redirect baru).
- ✅ `www` → non-www (redirect permanen).
- ✅ `?gclid` (Google Click ID) dipertahankan — konversi klik-iklan tetap tersambung.
- ⚠️ **Cek di GSC**: kalau ada URL WordPress lain yang masih 404 (mis. `/wp-*`, `/?page_id=*`), tambahkan redirect. Report 404 ada di GSC → Pages.
- ⚠️ Pastikan **akun Google Ads masih pakai conversion tracking yang lama** — cek apakah tag lama (dari WordPress/GTM lama) sudah dimatikan supaya tidak dobel hitung.

### D8. Remarketing (jika budget memungkinkan)

Pengunjung yang sudah lihat website tapi belum chat → iklankan lagi di YouTube/Display dengan ajakan "Chat WhatsApp untuk info meja". Konversi WA-nya sama (event `whatsapp_click` sudah otomatis jadi sinyal remarketing karena gtag terpasang).

---

## Bagian E — Checklist rutin (bulanan)

- [ ] Cek GSC → ada halaman 404 baru? (redirect kalau perlu)
- [ ] Cek GA4 → `whatsapp_click` masih naik? Breakdown per halaman/tombol.
- [ ] Cek Google Ads → konversi tercatat? (kolom "Conversions" per campaign)
- [ ] Cek tombol WA masih menerima chat & merespons cepat (respons lambat = konversi hilang).
- [ ] Pantau **Search term report** → tambah negative keyword baru.
- [ ] Perbarui menu/harga/alamat di `src/data.ts` — konsistensi NAP penting untuk local SEO & ads.

---

## Bagian F — Istilah singkat

| Istilah | Arti |
|---------|------|
| **CPC** | Harga per klik iklan |
| **Konversi** | Aksi bernilai: klik WA = 1 konversi |
| **Conversion label** | Kode unik untuk memetakan konversi ke iklan (format `AW-xxxxx/xxxxx`) |
| **gclid** | ID klik Google, dipakai Google untuk "menyambung" klik iklan sampai jadi chat WA |
| **Search term** | Kalimat yang benar-benar diketik pengguna (bisa beda dari keyword kamu) |
| **Negative keyword** | Kata kunci yang dilarang — supaya iklan tidak muncul untuk pencari yang tidak relevan |
| **Match type** | Aturan seberapa "ketat" keyword cocok dengan pencarian (Broad / Phrase / Exact) |
| **Maximize Conversions** | Bidding otomatis: Google menawar sendirian demi jumlah konversi terbanyak dengan budget tetap |
| **AEO/GEO** | Optimasi agar konten dikutip mesin jawab AI (ChatGPT, AI Overviews Google) |

---

> **Ringkasan 1 halaman yang paling penting:**
> 1. Tambahkan `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-67D0FX5RR7` di Vercel → redeploy.
> 2. Ambil **label konversi asli** di Google Ads → Conversions → isi `NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL` → redeploy.
> 3. Tandai `whatsapp_click` sebagai conversion di GA4.
> 4. Submit sitemap di GSC, cek 404 lama.
> 5. Sisanya (kata kunci, iklan, ekstensi, budget) bisa dikerjakan bersama tim marketing dengan bagian D.
