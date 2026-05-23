# Struktur Proyek & Panduan Pengkodean - Warung Papatong

Dokumen ini menjelaskan struktur pengorganisasian berkas kode sumber (Source Code Layout) pada proyek Warung Papatong untuk memastikan arsitektur yang bersih, modular, dan siap dikembangkan di masa mendatang.

---

## 1. Peta Direktori Berkas (File Structure Map)

Proyek ini dikembangkan dengan model hibrida: struktur rute berbasis **Vite Single Page Application (SPA)** yang interaktif berkinerja tinggi, bersanding dengan direktori representasi rute **Next.js App Router** untuk mempersingkat langkah ekspor dan migrasi platform di kemudian hari.

```bash
├── /docs/                       # Folder dokumentasi terpisah untuk penjelasan proyek
│   ├── BRAND_GUIDELINES.md      # Pedoman merek, warna, tipografi, dan pilar instagram
│   ├── MIGRATION_GUIDE.md       # Strategi pengamanan URL WordPress ke Next.js & performa
│   ├── PROJECT_STRUCTURE.md     # Berkas penjelasan struktur folder dan kode ini
│   └── SEO_AND_MARKETING_STACK.md # Integrasi Google Ads, GA4, dan Rich Snippets JSON-LD
├── /public/                     # Berkas statis (ikon, aset gambar mentah)
├── /src/
│   ├── /app/                    # Next.js App Router compatible pages & layouts
│   │   ├── /about/              # Rute www.warungpapatong.com/about
│   │   ├── /menu/               # Rute www.warungpapatong.com/menu
│   │   ├── /venue/              # Rute www.warungpapatong.com/venue
│   │   ├── layout.tsx           # Kerangka dasar metadata & SEO Rich Schema
│   │   └── page.tsx             # Halaman utama (Beranda) Next.js
│   ├── /features/               # Modul fitur reusable & terorganisir
│   │   ├── /common/             # Komponen global (Navbar, Footer, Logo)
│   │   ├── /home/               # Seksi beranda (Hero, Best Seller, Testimonials)
│   │   ├── /menu/               # Komponen saringan menu e-catalog
│   │   ├── /gallery/            # Galeri lanskep suasana saung terapung
│   │   └── /about/              # Profil sejarah dan transparansi tim kuliner
│   ├── /lib/
│   │   ├── config.ts            # Master parameter konfigurasi dinamis hulu (.env)
│   │   ├── tracking.ts          # Integrasi analitik konversi
│   │   └── utils.ts             # Fungsi penunjang utilitas class merger
│   ├── App.tsx                  # Entri poin utama aplikasi React client-side
│   ├── main.tsx                 # Pemicu bootstrap DOM utama
│   ├── types.ts                 # Master deklarasi kontrak tipe data TypeScript
│   └── index.css                # Berkas setelan styles global Tailwind CSS
├── .env.example                 # Berkas panduan variabel lingkungan (tanpa rahasia)
├── package.json                 # Manajer ketergantungan paket Node.js
├── tsconfig.json                # Setelan kompilasi mesin TypeScript
└── vite.config.ts               # Setelan kompilasi kemas aset Vite
```

---

## 2. Praktik Kebersihan Kode & Keamanan (Zero Hardcoding)

1. **Variabel Lingkungan (Environment Variables)**:
   Aset sensitif seperti nomor kontak utama, ID Iklan Google, Google Search Console Token, seluruhnya dimuat dari prefiks `import.meta.env` bersfallback aman di `/src/lib/config.ts`. Hal ini mengeliminasi *security risk* kebocoran rahasia perusahaan dalam repo publik git.

2. **Kepatuhan Tipe Data (Type Safety)**:
   Seluruh tipe data menu kuliner, ulasan rombongan, dan data tim terikat kaku di dalam kontrak `/src/types.ts`. Hindari pemakaian tipe longgar `any` kecuali pada penanganan objek luar dataLayer global.

3. **Optimasi Kumulatif Tata Letak (Cumulative Layout Shift/CLS)**:
   Semua bingkai gambar wajib membungkus elemene penampung bertipe aspect ratio kaku (`aspect-[4/3]`) dengan properti `object-cover` untuk menguji kelayakan rendering tercepat tanpa getaran pemuatan gambar.
