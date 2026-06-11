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
  youtube?:    string;
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
export type ProductCategory = 'seafood' | 'ikan-air-tawar' | 'ayam-dan-daging' | 'sunda' | 'sayuran' | 'minuman' | 'snacks';

export interface Product {
  id:            number;
  name:          string;
  category:      ProductCategory;
  categoryLabel: string;
  description:   string;

  // ── Harga ────────────────────────────────────────────────────────────────
  // `price` adalah SINGLE SOURCE OF TRUTH untuk semua kalkulasi & tampilan.
  // `priceUnit` adalah suffix satuan opsional, hanya untuk produk yang dijual
  //   per ons / per porsi (contoh: '/ ons', '/ porsi').
  //
  // ⚠️  `priceFormatted` DIHAPUS — gunakan formatProductPrice(product) dari
  //      src/data.ts untuk mendapatkan string tampilan yang konsisten.
  //      Dengan cara ini UI, WA message, dan checkout selalu sinkron.
  price:         number;        // Numerik canonical — Rp (tanpa pajak)
  priceUnit?:    string;        // Satuan opsional: '/ ons' | '/ porsi' | undefined

  image:         string;
  badge?:        string;

  // ⚠️  waMessage DIHAPUS — pesan WA dibangun otomatis oleh helper
  //     di src/lib/whatsapp.ts.
  //     Lihat: buildMenuWAMessage(), buildMenuWAMessageWithQty()
  isAvailable:   boolean;       // Simulasi stok dapur
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

export type GalleryCategory = 'semua' | 'tempat' | 'aktivitas'| 'makanan' | 'minuman';
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
    rating:        string;   // "4.8"
    ratingLabel:   string;   // "4K+ Ulasan"
    hours:         string;   // "11–22"
    hoursLabel:    string;   // "Setiap Hari"
    location:      string;   // "Cibinong"
    locationLabel: string;   // "Sentul Area"
  };
  // Quick links (Maps & Instagram)
  quickLinks: {
    mapsLabel:      string;   // "Google Maps"
    instagramLabel: string;   // akan di-prefix "@" dari BUSINESS_INFO
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

export interface AmbienceTeaserData {
  badge:       string;
  title:       string;
  description: string;
  ctaText:     string;
  ctaHref:     string;
  brandLabel:  string;
}

// ─── Best Sellers (Beranda) ───────────────────────────────────────────────

export interface BestSellersData {
  badge:           string;
  title:           string;
  description:     string;
  ctaText:         string;
  ctaHref:         string;
  detailCtaText:   string;
  freshBadgeLabel: string;
  intervalMs:      number;
}

// ─── Testimonials (Beranda) ───────────────────────────────────────────────

export interface TestimonialsData {
  sectionLabel:  string;
  title:         string;
  description:   string;
  autoPlayMs:    number;
  ariaLabelPrev: string;
  ariaLabelNext: string;
}

// ─── Location Section (Beranda) ───────────────────────────────────────────

export interface LocationData {
  badge:          string;
  title:          string;
  description:    string;
  labelAddress:   string;
  labelHours:     string;
  labelPhone:     string;
  ctaWaText:      string;
  ctaMapsText:    string;
  waMessage:      string;
  mapsIframeSrc:  string;
}

// ─── FAQ Section (Beranda & FAQ page) ────────────────────────────────────

export interface FaqSectionData {
  sectionLabel:   string;
  title:          string;
  description:    string;
  calloutTitle:   string;
  calloutDesc:    string;
  calloutCtaText: string;
  waMessage:      string;
}

// ─── Gallery Page (src/features/gallery) ─────────────────────────────────

export interface GalleryFilterTab {
  id:    'semua' | 'tempat' | 'aktivitas' | 'makanan' | 'minuman';
  label: string;
}

export interface GalleryPageData {
  badge:            string;
  title:            string;
  titleAccent:      string;
  description:      string;
  filterTabs:       GalleryFilterTab[];
  expandBtnText:    string;
  lightboxTitle:    string;
  lightboxBackText: string;
  lightboxCloseLabel: string   // ← tambahkan ini
  estLabel:           string   // ← tambahkan ini
  instagramBadge:   string;
  instagramTitle:   string;
  instagramDesc:    string;
  instagramCtaText: string;
  elfsightAppId:    string;
}

// ─── Navbar ──────────────────────────────────────────────────────────────

export interface NavbarData {
  ctaDesktopText: string;
  ctaMobileText:  string;
  ctaDrawerText:  string;
  waMessage:      string;
}

// ─── Footer ──────────────────────────────────────────────────────────────

export interface FooterData {
  brandTagline:    string;
  colNavLabel:     string;
  colContactLabel: string;
  labelAddress:    string;
  labelPhone:      string;
  labelEmail:      string;
  waMessage:       string;
  copyrightSuffix: string;
}

// ─── Instagram Feed ───────────────────────────────────────────────────────

export interface InstagramFeedItem {
  id:       number;
  img:      string;
  likes:    string;
  comments: string;
}