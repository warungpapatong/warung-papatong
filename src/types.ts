// src/types.ts
// ─────────────────────────────────────────────────────────────────────────────
// ⚠️  JANGAN EDIT sembarangan.
// TypeScript interfaces untuk seluruh data di src/data.ts.
// Perubahan di sini berdampak ke semua komponen yang menggunakannya.
//
// Isi:
//   BusinessInfo         — info dasar restoran
//   NavItem              — item navigasi
//   Product              — item menu
//   Testimonial          — ulasan pelanggan
//   Step                 — langkah-langkah booking
//   Stat                 — statistik pencapaian
//   FAQItem              — pertanyaan umum
//   GalleryItem          — item galeri venue
//   PreOrderBasketItem   — item keranjang pre-order
//   TeamMember           — profil tim
//   HeroData             — konten hero section
//   AmbienceTeaserItem   — preview galeri beranda
//   InstagramFeedItem    — feed Instagram teaser
//   GalleryPageData      — konten statis halaman galeri (GallerySection)
//   BestSellersData      — konten statis seksi BestSellers
//   AmbienceTeaserData   — konten statis seksi AmbienceTeaser
//   TestimonialsData     — konten statis seksi Testimonials
//   LocationData         — konten statis seksi Location
//   FaqData              — konten statis seksi FAQ
//   NavbarData           — konten statis Navbar
//   FooterData           — konten statis Footer
// ─────────────────────────────────────────────────────────────────────────────

// ─── Business ──────────────────────────────────────────────────────────────

export interface BusinessInfo {
  name:        string;
  tagline:     string;
  description: string;
  phone:       string;
  wa:          string;        // Format: "6281388497651"
  address:     string;
  city:        string;
  hours:       string;
  instagram:   string;
  tiktok?:     string;
  email?:      string;
  mapQuery:    string;        // Embed query
  mapsLink:    string;        // Link ke Google Maps
  founded?:    string;
}

export interface NavItem {
  label: string;
  href:  string;
}

// ─── Products ─────────────────────────────────────────────────────────────

// Kategori produk — tambahkan di sini jika ada kategori baru
export type ProductCategory = 'seafood' | 'sunda' | 'sayur' | 'minuman';

export interface Product {
  id:             number;
  name:           string;
  category:       ProductCategory;
  categoryLabel:  string;
  description:    string;
  price:          number;         // Numerik untuk kalkulasi pre-order
  priceFormatted: string;         // Misal: "Rp 120.000"
  image:          string;
  badge?:         string;
  waMessage:      string;
  isAvailable:    boolean;        // Simulasi stok dapur
}

// ─── Testimonials ─────────────────────────────────────────────────────────

export interface Testimonial {
  id:       number;
  name:     string;
  city:     string;
  rating:   number;
  review:   string;
  avatar:   string;
  product?: string;
}

// ─── Booking Steps ────────────────────────────────────────────────────────

export interface Step {
  id:          number;
  title:       string;
  description: string;
}

// ─── Stats ────────────────────────────────────────────────────────────────

export interface Stat {
  value:       number;
  suffix:      string;
  label:       string;
  description: string;
}

// ─── FAQ ──────────────────────────────────────────────────────────────────

export interface FAQItem {
  id:       number;
  question: string;
  answer:   string;
}

// ─── Gallery ──────────────────────────────────────────────────────────────

export type GalleryCategory = 'makanan' | 'tempat' | 'live-music';
export type GallerySize     = 'large' | 'medium' | 'small';

export interface GalleryItem {
  id:       number;
  image:    string;
  alt:      string;
  category: GalleryCategory;
  size:     GallerySize;
}

// ─── Pre-Order ────────────────────────────────────────────────────────────

export interface PreOrderBasketItem {
  product:  Product;
  quantity: number;
}

// ─── Team ─────────────────────────────────────────────────────────────────

export interface TeamMember {
  id:          number;
  name:        string;
  role:        string;
  photo:       string;
  bio:         string;
  specialty?:  string;
}

// ─── Hero Section ─────────────────────────────────────────────────────────

export interface HeroData {
  headlineText:       string;
  pillBadge:          string;
  description:        string;
  ctaBookingText:     string;
  ctaMenuText:        string;
  featuredTodayLabel: string;   // Label di atas nama menu dinamis ("Spesial Hari Ini")
  kitchenStatusLabel: string;   // Label pill status dapur ("Dapur Aktif")
  kitchenStatusDesc:  string;   // Deskripsi pill status dapur
  // Stats bar (3 kolom di bawah CTA)
  stats: {
    rating:      string;   // "4.8"
    ratingLabel: string;   // "4K+ Ulasan"
    hours:       string;   // "11–22"
    hoursLabel:  string;   // "Setiap Hari"
    location:    string;   // "Cibinong"
    locationLabel: string; // "Sentul Area"
  };
  // Quick links (Maps & Instagram)
  quickLinks: {
    mapsLabel:      string;   // "Google Maps"
    instagramLabel: string;   // "@restowarungpapatong" — akan di-prefix "@" dari BUSINESS_INFO
  };
  // WhatsApp message pre-filled dari Hero
  waMessage: string;
}

// ─── Ambience Teaser (Beranda) ────────────────────────────────────────────

export interface AmbienceTeaserItem {
  url:     string;
  caption: string;
  desc:    string;
}

// Konten statis seksi AmbienceTeaser (teks, badge, CTA)
export interface AmbienceTeaserData {
  badge:       string;   // Label badge atas ("SUASANA & LINGKUNGAN")
  title:       string;   // Judul section
  description: string;   // Deskripsi section
  ctaText:     string;   // Teks tombol CTA
  ctaHref:     string;   // URL tujuan CTA
  brandLabel:  string;   // Label micro di atas caption card ("WARUNG PAPATONG")
}

// ─── Best Sellers (Beranda) ───────────────────────────────────────────────

// Konten statis seksi BestSellers
export interface BestSellersData {
  badge:           string;   // Label badge atas ("MENU PRIMADONA TERLARIS")
  title:           string;   // Judul section
  description:     string;   // Deskripsi section
  ctaText:         string;   // Teks tombol "Lihat Semua Menu"
  ctaHref:         string;   // URL tujuan CTA
  detailCtaText:   string;   // Teks link kecil per card ("Detail & Pesan")
  freshBadgeLabel: string;   // Label kecil di footer card ("Bahan Segar Pilihan")
  intervalMs:      number;   // Interval rotasi kartu (ms), default 30_000
}

// ─── Testimonials (Beranda) ───────────────────────────────────────────────

// Konten statis seksi Testimonials
export interface TestimonialsData {
  sectionLabel:  string;   // Sub-label kecil di atas judul ("SUARA KONSUMEN AUTENTIK")
  title:         string;   // Judul section
  description:   string;   // Deskripsi section
  autoPlayMs:    number;   // Interval auto-advance carousel (ms), default 5_500
  ariaLabelPrev: string;   // Aria label tombol prev ("Ulasan Sebelumnya")
  ariaLabelNext: string;   // Aria label tombol next ("Ulasan Selanjutnya")
}

// ─── Location Section (Beranda) ───────────────────────────────────────────

// Konten statis seksi LocationSection
export interface LocationData {
  badge:          string;   // Label badge ("DENGAN AKSES STRATEGIS")
  title:          string;   // Judul section
  description:    string;   // Deskripsi section
  // Label info card
  labelAddress:   string;   // "Alamat Lengkap"
  labelHours:     string;   // "Jam Operasional"
  labelPhone:     string;   // "Kontak Seluler Resmi"
  // Tombol CTA
  ctaWaText:      string;   // "Chat WhatsApp Sekarang"
  ctaMapsText:    string;   // "Rute di Google Maps"
  // Pre-filled WhatsApp message
  waMessage:      string;
  // Google Maps embed iframe src
  mapsIframeSrc:  string;
}

// ─── FAQ Section (Beranda & FAQ page) ────────────────────────────────────

// Konten statis seksi FAQ (selain array FAQS_DATA)
export interface FaqSectionData {
  sectionLabel:      string;   // Sub-label kecil ("PERTANYAAN UMUM (FAQ)")
  title:             string;   // Judul section
  description:       string;   // Deskripsi section
  // CTA callout di bawah accordion
  calloutTitle:      string;   // Judul callout ("Jawaban Belum Menjawab?")
  calloutDesc:       string;   // Deskripsi callout
  calloutCtaText:    string;   // Teks tombol callout ("Chat Langsung Sekarang")
  // Pre-filled WhatsApp message
  waMessage:         string;
}

// ─── Gallery Page (src/features/gallery) ─────────────────────────────────

// Filter tab untuk halaman galeri
export interface GalleryFilterTab {
  id:    'semua' | 'suasana' | 'aktivitas';
  label: string;
}

// Konten statis halaman GallerySection
export interface GalleryPageData {
  badge:             string;   // Label badge atas ("Lanskap Saung Pasundan")
  title:             string;   // Judul halaman ("Galeri & Suasana")
  titleAccent:       string;   // Baris accent judul ("Warung Papatong")
  description:       string;   // Sub-deskripsi halaman
  filterTabs:        GalleryFilterTab[];
  // Teks tombol per card
  expandBtnText:     string;   // "Perbesar"
  // Lightbox
  lightboxTitle:     string;   // "Detail Galeri Foto"
  lightboxBackText:  string;   // "Kembali ke Koleksi"
  // Instagram feed section
  instagramBadge:    string;   // "Live Instagram Feed"
  instagramTitle:    string;   // Judul section Instagram (gunakan {instagram} sebagai placeholder)
  instagramDesc:     string;   // Deskripsi section Instagram
  instagramCtaText:  string;   // "Kunjungi Instagram Resmi"
  // Elfsight widget app ID
  elfsightAppId:     string;   // "elfsight-app-f0efd7c9-1075-4d19-aa42-d8afd8399e02"
}

// ─── Navbar ──────────────────────────────────────────────────────────────

// Konten statis Navbar
export interface NavbarData {
  ctaDesktopText: string;   // "Pesan Sekarang"
  ctaMobileText:  string;   // "Pesan Via WA"
  ctaDrawerText:  string;   // "Pesan via WhatsApp"
  // Pre-filled WhatsApp message saat klik tombol WA di navbar
  waMessage:      string;
}

// ─── Footer ──────────────────────────────────────────────────────────────

// Konten statis Footer
export interface FooterData {
  brandTagline:     string;   // Tagline singkat di bawah logo
  // Label kolom
  colNavLabel:      string;   // "Navigasi"
  colContactLabel:  string;   // "Hubungi Kami"
  // Label info kontak
  labelAddress:     string;   // "Alamat"
  labelPhone:       string;   // "Telepon"
  labelEmail:       string;   // "Email"
  // Pre-filled WhatsApp message dari footer
  waMessage:        string;
  // Teks copyright (tahun di-inject dinamis)
  copyrightSuffix:  string;   // "· All Rights Reserved."
}

// ─── Instagram Feed ───────────────────────────────────────────────────────

export interface InstagramFeedItem {
  id:       number;
  img:      string;
  likes:    string;
  comments: string;
}