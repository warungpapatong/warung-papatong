# Panduan Migrasi WordPress ke Next.js - Warung Papatong

Dokumen ini menjelaskan strategi migrasi menyeluruh dari website lama berbasis WordPress ke website baru yang ultra-moderen menggunakan **Next.js App Router & Vite Hybrid Tier**. Migrasi ini didesain agar meningkatkan performa kecepatan (mencapai skor PageSpeed ~100) serta menjaga kesinambungan brand dan stabilitas kanal pemasaran (Google Ads, Local SEO G-Maps, Instagram).

---

## 1. Strategi Pengamanan URL & Pencegahan 404

Branding yang telah didirikan oleh owner **Kak Steven Moe** sejak tahun 2018 sangat bergantung pada tautan cetak (brosur, banner QR code fisik di saung) serta kampanye online aktif Google Ads. Kita harus menjamin **Zero-Downtime SEO** dengan memetakan URL lama secara identik ke rute baru:

1. **Daftar Menu Makanan**:
   * **Legacy URL (WordPress)**: `https://warungpapatong.com/menu/`
   * **Next.js Route**: `/src/app/menu/page.tsx` (Terlayani di `/menu`)
2. **Galeri & Suasana Venue**:
   * **Legacy URL (WordPress)**: `https://warungpapatong.com/venue/`
   * **Next.js Route**: `/src/app/venue/page.tsx` (Terlayani di `/venue`)
3. **Pilar Tentang Kami (E-E-A-T Transparansi)**:
   * **Legacy URL (WordPress)**: `https://warungpapatong.com/about/`
   * **Next.js Route**: `/src/app/about/page.tsx` (Terlayani di `/about`)

> **ATURAN PENTING**: Jangan pernah memindahkan aset suasana ke rute baru seperti `/gallery` karena dapat memutus indeks tautan Google. Pertahankan rute `/venue` secara mutlak demi stabilitas SEO.

---

## 2. Peningkatan Performa & Skor Kecepatan Tinggi

WordPress cenderung lambat karena tumpukan plugin, stylesheet yang tidak efisien, dan gambar tanpa kompresi. Sistem Next.js Baru mengimplementasikan:

* **Sistem Style Ringan**: Menggunakan utility-first Tailwind CSS, menghilangkan seluruh file CSS berukuran megabyte menjadi bundle tunggal minimalis.
* **Aspect-Ratio Constraint**: Semua gambar yang dimuat dalam grid atau banner dideklarasikan dengan aspect ratio tetap (`aspect-[4/3]` atau `aspect-square`) untuk menghindari **Cumulative Layout Shift (CLS)** saat pemuatan konten.
* **Strict Asset Quota**: Mengatur kuota pemakaian gambar maksimal **25 foto terkurasi**, menjamin unduhan halaman yang kilat untuk pelanggan di koneksi seluler 3G/4G di sepanjang perjalanan menuju Sentul/Cibinong.

---

## 3. Alur Serah Terima (Handover Flow)

Proyek dideklarasikan di bawah akun administrasi pusat:
📧 **warungpapatong.project@gmail.com**

Kanal pembayaran dibagi menjadi struktur termin transparan **40-30-30** dengan investasi total **Rp 1.000.000**:
1. **Termin 1 (DP 40%)**: Rp 400.000 (Persetujuan PRD & Inisiasi struktur rute).
2. **Termin 2 (Mid 30%)**: Rp 300.000 (Integrasi E-Menu interaktif & galeri venue).
3. **Termin 3 (Final 30%)**: Rp 300.000 (Peluncuran penuh, integrasi analytics, penyerahan akun).
