# Warung Papatong — Panduan Pemilik & Operasional

> Dokumen ini khusus untuk pemilik/pengelola **Resto Warung Papatong**.
> Berisi panduan lengkap mengelola website tanpa perlu memahami kode.

---

## Daftar Isi

1. [Tentang Website Ini](#tentang-website-ini)
2. [Cara Mengupdate Menu Makanan](#cara-mengupdate-menu-makanan)
3. [Cara Mengupdate Info Bisnis](#cara-mengupdate-info-bisnis)
4. [Cara Menambah Foto Baru](#cara-menambah-foto-baru)
5. [Cara Melihat & Mengelola Pemesanan WA](#cara-melihat--mengelola-pemesanan-wa)
6. [Halaman & Route Website](#halaman--route-website)
7. [Integrasi Google Ads](#integrasi-google-ads)
8. [SEO & Google Search](#seo--google-search)
9. [Yang Perlu Diketahui Developer](#yang-perlu-diketahui-developer)
10. [FAQ Pemilik](#faq-pemilik)
11. [Kontak Developer](#kontak-developer)

---

## Tentang Website Ini

### Apa yang Bisa Website Ini Lakukan?

Website **Warung Papatong** (`warungpapatong.com`) adalah platform digital resmi restoran yang mencakup:

| Fitur | Fungsi |
|-------|--------|
| **E-Menu Digital** | Pelanggan bisa lihat menu lengkap dengan foto, deskripsi, dan harga |
| **Pre-Order via WhatsApp** | Pelanggan bisa pilih menu, input jumlah, dan kirim pesanan otomatis ke WA admin |
| **Booking Tempat** | Pelanggan bisa chat WA untuk reservasi meja langsung dari website |
| **Galeri Foto** | Koleksi foto venue dan suasana restoran |
| **Google Maps Terintegrasi** | Pelanggan bisa langsung lihat lokasi dan buka rute |
| **Testimoni Pelanggan** | Ulasan Google Maps ditampilkan langsung di website |
| **FAQ Interaktif** | Pertanyaan umum dengan jawaban yang bisa dibuka/tutup |
| **Google Ads Siap** | Tracking konversi untuk kampanye iklan Google |

### Teknologi yang Dipakai

- **Hosting**: Vercel (cloud hosting — tidak perlu urus server)
- **Domain**: warungpapatong.com (dengan alihkan dari www.warungpapatong.com)
- **Framework**: Next.js 15 (website modern, cepat, SEO-friendly)
- **Penyimpanan Gambar**: Disimpan langsung di dalam project (bisa diganti kapan saja)

---

## Cara Mengupdate Menu Makanan

### Persiapan

Yang Anda butuhkan:
1. File foto menu dalam format **.webp** (bisa minta tolong developer atau desain grafis)
2. Info menu: nama, deskripsi, harga, kategori

### Langkah-langkah

> **Catatan**: Langkah ini perlu dilakukan oleh developer atau seseorang yang bisa mengedit kode. Berikan data berikut ke developer:

#### Untuk Menu Baru

Kirim data berikut ke developer:

```json
{
  "nama": "Cumi Bakar Kecap",
  "kategori": "seafood",
  "deskripsi": "Cumi segar yang dibakar sempurna...",
  "harga": 69000,
  "satuan": "/ porsi",
  "badge": "Terlaris",
  "tersedia": true
}
```

**Kategori yang tersedia**: `seafood`, `ikan-air-tawar`, `ayam-dan-daging`, `sunda`, `sayuran`, `minuman`, `snacks`

**Badge yang tersedia**: `Terlaris`, `Rekomendasi`, atau kosongkan jika tidak perlu.

#### Untuk Mengubah Harga/Caption

Cukup beri tahu developer:
- Nama menu
- Harga baru
- Atau kapan menu tidak tersedia

### Yang Otomatis Terupdate

- Harga di semua halaman (termasuk di pesan WhatsApp)
- Badge "Terlaris" / "Rekomendasi" di kartu menu
- Menu Unggulan di Halaman Utama (bergilir otomatis)
- Status ketersediaan (jika `isAvailable: false`, menu tetap tampil tapi bisa ditandai)

---

## Cara Mengupdate Info Bisnis

Semua info bisnis bisa diubah dengan mengedit satu file: `src/data.ts`

Yang bisa diubah tanpa perlu ubah komponen:

| Info | Variabel | Contoh |
|------|----------|--------|
| Nama Restoran | `BUSINESS_INFO.name` | "Resto Warung Papatong" |
| Tagline | `BUSINESS_INFO.tagline` | "Sunda & Seafood" |
| Nomor WhatsApp | `BUSINESS_INFO.wa` | "6281388497651" |
| Nomor Telepon | `BUSINESS_INFO.phone` | "0813-8849-7651" |
| Alamat | `BUSINESS_INFO.address` | "Jl. Alternatif GOR Pemda No.9..." |
| Jam Operasional | `BUSINESS_INFO.hours` | "Setiap Hari, 11:00 - 22:00 WIB" |
| Link Google Maps | `BUSINESS_INFO.mapsLink` | URL Google Maps |
| Instagram | `BUSINESS_INFO.instagram` | "restowarungpapatong" |
| TikTok | `BUSINESS_INFO.tiktok` | "restowarungpapatong" |
| YouTube | `BUSINESS_INFO.youtube` | "warungpapatong" |
| Email | `BUSINESS_INFO.email` | "warungpapatong@gmail.com" |
| Tahun Berdiri | `BUSINESS_INFO.founded` | "2019" |

**Yang terpengaruh** saat info ini diubah:
- Tampilan di Navbar (navbar)
- Tampilan di Footer (footer)
- Link WhatsApp di seluruh halaman
- Link Google Maps
- Link Instagram, TikTok, YouTube
- Alamat di Section Lokasi
- Jam operasional
- Data SEO Google (JSON-LD Schema)
- PWA Manifest (nama aplikasi)

---

## Cara Menambah Foto Baru

### Menu Makanan

1. **Konversi foto ke format .webp** (bisa pakai tool online seperti convertio.co atau squoosh.app)
2. Beri nama file: **kebab-case dengan nomor urut** (contoh: `08-nama-menu-baru.webp`)
3. Taruh di folder yang sesuai:
   - Seafood → `public/images/menu/01-seafood/`
   - Ikan Air Tawar → `public/images/menu/02-ikan-air-tawar/`
   - Ayam & Daging → `public/images/menu/03-ayam-dan-daging/`
   - Sunda → `public/images/menu/04-sunda/`
   - Sayuran → `public/images/menu/05-sayuran/`
   - Minuman → `public/images/menu/06-minuman/`
   - Snacks → `public/images/menu/07-snacks/`
4. Update data menu di `src/data.ts` dengan path foto baru

### Foto Venue/Galeri

1. Konversi ke **.webp**
2. Beri nama kebab-case (`nama-file.webp`)
3. Taruh di folder `public/images/venue/{nomor-gallery}/` sesuai kategori:
   - `01-gallery/` — Tampak depan & entrance
   - `02-gallery/` — Wall of frame
   - `03-gallery/` — Spot foto & playground
   - `04-gallery/` — Area makan utama
   - `05-gallery/` — Area samping
   - `06-gallery/` — Area lesehan
   - `07-gallery/` — Saung bambu
   - `08-gallery/` — Event & wedding
   - `09-gallery/` — Foto pengunjung
   - `10-gallery/` — Foto tim & waiter
4. Update data di `GALLERY_DATA` di `src/data.ts`

### Yang Otomatis Terjadi

- Foto otomatis dioptimalkan oleh Next.js (lebih cepat loading)
- Foto yang sudah di-cache akan tetap ke versi lama sampai cache dibersihkan
- Foto baru langsung muncul di halaman yang sesuai

---

## Cara Melihat & Mengelola Pemesanan WA

### Alur Pre-Order Menu

1. Pelanggan buka halaman **Menu** (`/menu`)
2. Pelanggan klik **"Keranjang"** pada menu yang diinginkan
3. Pelanggan bisa atur jumlah porsi (+ / -)
4. Klik **"Checkout"** → muncul modal ringkasan pesanan
5. Klik **"Pesan via WhatsApp"** → otomatis terbuka chat WA admin dengan pesan terformat:

```
Halo Resto Warung Papatong,

Saya ingin melakukan pre-order dengan daftar berikut:

1. Cumi Bakar Kecap
   Rp 69.000 / porsi × 2 = Rp 138.000

Total Pesanan: Rp 138.000

Mohon konfirmasi ketersediaan dan estimasi waktu penyajian.
Terima kasih.
```

### Alur Booking Tempat

Pelanggan klik tombol **"Booking Tempat Sekarang"** atau **"Chat WhatsApp"** di:
- Halaman Utama (Hero section)
- Floating WA Button (muncul setelah scroll)
- Navbar
- FAQ Section
- Halaman Tentang Kami

Semua chat masuk ke **nomor WhatsApp bisnis** yang terdaftar.

### Yang Perlu Admin WA Lakukan

- Pre-order menu: konfirmasi ketersediaan menu & estimasi waktu masak
- Booking tempat: konfirmasi ketersediaan meja & jam kedatangan
- Untuk gathering/katering (≥20 orang): follow up via WA sesuai kebijakan DP

---

## Halaman & Route Website

### Daftar Halaman

| URL | Halaman | Isi |
|-----|---------|-----|
| `warungpapatong.com/` | Beranda | Hero, Best Sellers, Suasana, Testimoni, FAQ, Lokasi |
| `warungpapatong.com/menu` | E-Menu Digital | Semua menu + pre-order |
| `warungpapatong.com/venue` | Galeri & Suasana | Foto venue + Instagram feed |
| `warungpapatong.com/about` | Tentang Kami | Cerita resto + info kontak |

> **⚠️ PENTING**: Keempat halaman ini sudah terhubung dengan **Google Ads** yang sedang berjalan. Jangan ubah URL atau nama halaman tanpa koordinasi dengan tim marketing Google Ads.

### Yang Muncul di Google Search

- **Website** → muncul di hasil pencarian Google dengan rich snippet (bintang, harga, jam buka)
- **Google Maps** → terintegrasi dengan listing Google Business Profile
- **Rich Results** → FAQ bisa muncul langsung di halaman pencarian

---

## Integrasi Google Ads

### Cara Kerja

Ketika seseorang mengklik iklan Google dan kemudian mengklik tombol WhatsApp di website, sistem akan mencatat:

1. **Event "conversion"** dikirim ke Google Ads
2. Label konversi: menandai ini sebagai "WhatsApp Click"
3. Parameter UTM/GCLID tetap terbawa di URL

### Yang Perlu Diketahui

| Pertanyaan | Jawaban |
|------------|---------|
| Apakah perlu setup tambahan? | Tidak, sudah terkonfigurasi |
| Apakah biaya tambahan? | Tidak, ini gratis dari Google Ads |
| Bisakah lihat data konversi? | Ya, di dashboard Google Ads → Conversions |
| Apakah data pengunjung tersimpan? | Tidak ada database — semua chat langsung ke WA |
| Bagaimana jika ingin ganti ID Ads? | Update `.env.local` → `NEXT_PUBLIC_GOOGLE_ADS_ID` |

### Parameter Tracking yang Terjaga

- `?gclid=` (Google Click ID) tetap dipertahankan
- UTM parameters tetap terbawa
- Trailing slash dihapus (301 redirect) untuk konsistensi

---

## SEO & Google Search

### Yang Dioptimalkan

| Aspek | Status |
|-------|--------|
| Google Rich Results (bintang) | ✅ Aktif |
| FAQ di pencarian Google | ✅ Aktif |
| Google Maps Local Pack | ✅ Terintegrasi |
| Open Graph (bagikan ke FB/WA) | ✅ Ada gambar & deskripsi |
| Twitter Cards | ✅ Ada |
| Sitemap XML | ✅ Otomatis |
| Robots.txt | ✅ Terkonfigurasi |
| Geo Tags | ✅ Lokasi terdaftar |
| JSON-LD Schema | ✅ Restaurant + Organization + FAQ + Review |

### Cara Submit ke Google Search Console

1. Buka [Google Search Console](https://search.google.com/search-console)
2. Verifikasi kepemilikan domain (sudah dilakukan)
3. Submit sitemap: `https://warungpapatong.com/sitemap.xml`
4. Pantau performa di dashboard

### Tips SEO untuk Pemilik

- **Testimoni asli** dari Google Maps membantu SEO (sudah otomatis ditampilkan)
- **Foto berkualitas** meningkatkan engagement (pastikan foto sharp, tidak blur)
- **Konsistensi NAP** (Name, Address, Phone) — pastikan sama di Google Maps, website, dan media sosial
- **Update menu** secara berkala menunjukkan website aktif

---

## Yang Perlu Diketahui Developer

Jika Anda akan mewariskan project ini ke developer lain, berikut ringkasannya:

### Struktur Project Utama

```bash
warung-papatong/
├── src/
│   ├── app/          # Halaman website (App Router Next.js)
│   ├── components/   # Navbar, Footer, Floating WA
│   ├── features/     # Semua section & fitur
│   │   ├── home/     # Halaman utama (hero, bestsellers, dll)
│   │   ├── menu/     # Halaman menu + checkout
│   │   ├── gallery/  # Halaman galeri
│   │   └── about/    # Halaman tentang kami
│   ├── lib/          # Utilities (WA message, config, cn)
│   ├── data.ts       # ⭐ SEMUA KONTEN ADA DI SINI
│   └── types.ts      # TypeScript type definitions
├── public/images/    # Semua gambar
└── tailwind.config.js # Design system
```

### Prinsip "Single Source of Truth"

Semua teks, harga, info bisnis — **hanya** di `src/data.ts`. Developer tidak perlu mencari-cari teks di komponen.

### Kapan Server vs Client Component

| Jenis | Contoh |
|-------|--------|
| **Server** (tanpa `'use client'`) | Section pembungkus, teks statis, layout |
| **Client** (pakai `'use client'`) | Animasi, tombol klik, state, scroll |

### 3 Hal Paling Penting

1. **JANGAN ubah route /menu, /venue, /about** — terikat Google Ads
2. **JANGAN hardcode teks** — semua di `src/data.ts`
3. **JANGAN tulis format WA manual** — pakai helper dari `src/lib/whatsapp.ts`

---

## FAQ Pemilik

### Apakah website ini punya biaya bulanan?

**Biaya hosting** untuk Vercel (free tier sudah mencakup kebutuhan ini). Domain `warungpapatong.com` punya biaya per tahun.

### Bisakah saya edit sendiri tanpa developer?

Untuk perubahan konten (teks, harga, info) — saat ini perlu developer karena konten ada di file kode. Untuk masa depan, bisa dipertimbangkan pasang **CMS Headless** (seperti Strapi atau Sanity) agar bisa edit via dashboard.

### Apakah data pelanggan tersimpan?

**Tidak.** Website ini tidak punya database. Semua chat WhatsApp langsung ke nomor bisnis. Tidak ada data pelanggan yang disimpan.

### Bagaimana cara pasang/matiin Google Ads?

Tracking Google Ads diatur via environment variable. Jika ingin nonaktifkan, hapus atau kosongkan `NEXT_PUBLIC_GOOGLE_ADS_ID` di file `.env.local`.

### Apakah website ini support HP?

**Ya.** Responsive untuk semua ukuran layar — HP, tablet, laptop, dan desktop.

### Apakah bisa dipasang seperti aplikasi?

**Ya.** Website ini adalah **Progressive Web App (PWA)**. Pengunjung bisa "install" website ke home screen HP mereka seperti aplikasi native.

### Bagaimana cara backup website?

Source code ada di repository Git. Cukup clone repo untuk backup lengkap.

---

## Kontak Developer

Untuk perubahan atau pertanyaan teknis, hubungi developer yang mengerjakan project ini.

### Data yang Perlu Disiapkan Saat Hubungi Developer

Untuk perubahan menu, kirim:
- Nama menu
- Harga baru
- Foto (format .webp)
- Kategori
- Badge (Terlaris/Rekomendasi/tidak ada)

Untuk perubahan info bisnis, sebutkan:
- Bagian mana yang berubah
- Info baru

Untuk masalah teknis:
- URL halaman yang bermasalah
- Screenshot (jika ada)
- Browser yang dipakai (Chrome/Safari/Edge)

---

## Lampiran

### Checklist Berkala (Bulanan)

- [ ] Cek harga menu — apakah ada perubahan?
- [ ] Cek jam operasional — apakah ada perubahan?
- [ ] Cek foto — apakah ada menu/foto baru?
- [ ] Tambah testimoni baru dari Google Maps (jika ada)
- [ ] Cek Google Search Console — apakah ada error?
- [ ] Cek Google Ads — apakah konversi masih jalan?
- [ ] Pastikan nomor WhatsApp aktif & merespon

### Data Penting yang Perlu Dicatat

| Item | Nilai |
|------|-------|
| URL Website | `https://warungpapatong.com` |
| Hosting | Vercel |
| Domain Registar | (cek catatan pembelian domain) |
| Google Search Console | Terverifikasi |
| Google Ads ID | `AW-10835470606` |
| Nomor WhatsApp | `6281388497651` |
| Google Maps Listing | Terverifikasi |
| Instagram | `@restowarungpapatong` |

### Glossary (Istilah Teknis)

| Istilah | Arti |
|---------|------|
| **URL/Route** | Alamat halaman (misal: /menu, /about) |
| **SEO** | Optimasi agar muncul di pencarian Google |
| **JSON-LD** | Data terstruktur untuk Google (bikin rich result) |
| **PWA** | Progressive Web App — bisa diinstal seperti aplikasi |
| **Sitemap** | Daftar semua halaman untuk Google |
| **OG Image** | Gambar yang muncul saat link dibagikan ke WA/FB |
| **Metadata** | Judul & deskripsi yang muncul di hasil pencarian |
| **Server Component** | Bagian website yang di-render di server, lebih cepat |
| **Client Component** | Bagian yang butuh interaksi di browser |

---

> **Warung Papatong** — v2.3.0
> "Surganya masakan Sunda autentik dan hidangan seafood segar di Cibinong."
