// src/data.ts
// ─────────────────────────────────────────────────────────────────────────────
// ⚠️  SINGLE SOURCE OF TRUTH — JANGAN EDIT sembarangan.
//
// Semua data konten statis ada di sini, termasuk string/teks yang sebelumnya
// hardcoded di dalam komponen. Komponen WAJIB import dari sini.
//
// ════════════════════════════════════════════════════════════════════════════
// DAFTAR ISI
// ════════════════════════════════════════════════════════════════════════════
//
// ① BUSINESS INFO       — info dasar restoran (nama, alamat, kontak, sosmed)
// ② STATS DATA          — statistik pencapaian untuk seksi Stats
//
// ③ PRODUCTS DATA       — daftar menu lengkap
//
// ④ TESTIMONIALS DATA   — ulasan pelanggan untuk seksi Testimonials
//
// ⑤ FAQS DATA           — pertanyaan umum untuk seksi FAQ
//
// ⑥ GALLERY DATA        — item galeri untuk halaman Venue/Gallery
//
// ⑦ STEPS DATA          — langkah-langkah booking
//
// ⑧ TEAM DATA           — profil tim restoran
//
// ─── KONTEN STATIS PER SECTION / KOMPONEN ───────────────────────────────────
//
// ⑨  HERO_DATA           — HeroSection (src/features/home/components/HeroSection)
// ⑩  AMBIENCE_TEASER_DATA & AMBIENCE_TEASER_CONTENT
//                        — AmbienceTeaser (src/features/home/components/AmbienceTeaser)
// ⑪  BEST_SELLERS_CONTENT — BestSellers (src/features/home/components/BestSeller)
// ⑫  TESTIMONIALS_CONTENT — TestimonialsSection (src/features/home/components/TestimonialsSection)
// ⑬  LOCATION_DATA        — LocationSection (src/features/home/components/LocationSection)
// ⑭  FAQ_SECTION_DATA     — FaqSection (src/features/home/components/FaqSection)
// ⑮  GALLERY_PAGE_DATA    — GallerySection (src/features/gallery/components/GallerySection)
// ⑯  NAVBAR_DATA          — Navbar (src/components/layout/Navbar)
// ⑰  FOOTER_DATA          — Footer (src/components/layout/Footer)
//
// ─── UTILITIES ───────────────────────────────────────────────────────────────
//
// buildWALink()          — bangun URL WhatsApp dengan pesan pre-filled
// formatPrice()          — format angka ke Rupiah
// calculateBasketTotal() — hitung total harga keranjang
//
// ─────────────────────────────────────────────────────────────────────────────

import type {
  AmbienceTeaserData,
  AmbienceTeaserItem,
  BestSellersData,
  BusinessInfo,
  FAQItem,
  FaqSectionData,
  FooterData,
  GalleryItem,
  GalleryPageData,
  HeroData,
  InstagramFeedItem,
  LocationData,
  NavbarData,
  Product,
  Stat,
  Step,
  TeamMember,
  TestimonialsData,
  Testimonial,
} from '@/types';

// ════════════════════════════════════════════════════════════════════════════
// ① BUSINESS INFO
// ════════════════════════════════════════════════════════════════════════════
// Dipakai oleh: Navbar, Footer, HeroSection, LocationSection,
//               GallerySection, AmbienceTeaser, FaqSection

export const BUSINESS_INFO: BusinessInfo = {
  name:        'Resto Warung Papatong',
  tagline:     'Tempat Makan Sunda & Seafood Rekomendasi di Cibinong',
  description: 'Menggabungkan cita rasa kuliner Sunda autentik yang gemah ripah dengan kesegaran seafood istimewa. Nikmati area lesehan semi-outdoor yang asri, panggung live music, serta parkir luas yang ramah rombongan besar.',
  phone:       '0813-8849-7651',
  wa:          '6281388497651',
  address:     'Jl. Alternatif GOR Pemda No.9, Nanggewer, Kec. Cibinong, Kabupaten Bogor, Jawa Barat 16912',
  city:        'Cibinong, Bogor',
  hours:       'Setiap Hari, 11:00 - 22:00 WIB',
  instagram:   'restowarungpapatong',
  tiktok:      'warungpapatong',
  email:       'warungpapatong.cibinong@gmail.com',
  mapQuery:    'RESTO+WARUNG+PAPATONG+-+Cibinong-Bogor',
  mapsLink:    'https://www.google.com/maps/place/RESTO+WARUNG+PAPATONG+-+Cibinong-Bogor/@-6.5120209,106.8329725,17z',
  founded:     '2018',
};

// ════════════════════════════════════════════════════════════════════════════
// ② STATS DATA
// ════════════════════════════════════════════════════════════════════════════
// Dipakai oleh: StatsSection (jika ada komponen terpisah)

export const STATS_DATA: Stat[] = [
  {
    value:       4.8,
    suffix:      '★',
    label:       'Rating Google Maps',
    description: 'Dari total 4.076+ ulasan autentik kuliner keluarga.',
  },
  {
    value:       4000,
    suffix:      '+',
    label:       'Ulasan Google',
    description: 'Ulasan dari pelanggan setia Jabodetabek.',
  },
  {
    value:       50,
    suffix:      '+',
    label:       'Kapasitas Meja & Lesehan',
    description: 'Sangat luas untuk kumpul keluarga & reuni kantor.',
  },
  {
    value:       98,
    suffix:      '%',
    label:       'Tingkat Kepuasan',
    description: 'Pelayanan ramah berkelas restoran bintang lima.',
  },
];

// ════════════════════════════════════════════════════════════════════════════
// ③ PRODUCTS DATA
// ════════════════════════════════════════════════════════════════════════════
// Dipakai oleh: HeroSection (featured menu dinamis), BestSellers,
//               MenuPage, PreOrderSystem

export const PRODUCTS_DATA: Product[] = [
  // ── SECTION 1: ANEKA IKAN LAUT & AIR TAWAR ──────────────────────────────
  {
    id: 101, name: 'Ikan Kerapu Segar (ons)', category: 'seafood', categoryLabel: 'Seafood Olahan',
    description: 'Ikan Kerapu hidup berkualitas premium. Pilihan gaya masak: Bakar Jimbaran, Cabe Ijo, Kecap, Polos, Saos Padang, atau Steam Nyonya.',
    price: 18000, priceFormatted: 'Rp 18.000 / ons',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&h=600&fit=crop&q=80',
    badge: 'Terlaris', waMessage: "Halo Warung Papatong, saya ingin memesan menu 'Ikan Kerapu Segar'.", isAvailable: true,
  },
  {
    id: 102, name: 'Ikan Kerapu Lody Premium (ons)', category: 'seafood', categoryLabel: 'Seafood Olahan',
    description: 'Ikan Kerapu Lody merah langka bertekstur daging selembut sutra. Pilihan gaya masak: Bakar Jimbaran, Cabe Ijo, Kecap, Polos, Saos Padang, atau Steam Nyonya.',
    price: 29000, priceFormatted: 'Rp 29.000 / ons',
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=600&h=600&fit=crop&q=80',
    badge: 'Rekomendasi', waMessage: "Halo Warung Papatong, tolong siapkan menu 'Ikan Kerapu Lody Premium' untuk kami.", isAvailable: true,
  },
  {
    id: 103, name: 'Ikan Kuwe Segar Lilin (ons)', category: 'seafood', categoryLabel: 'Seafood Olahan',
    description: 'Ikan Kuwe montok berlemak gurih. Pilihan gaya masak: Bakar Jimbaran, Cabe Ijo, Kecap, Polos, Saos Padang, atau Steam Nyonya.',
    price: 19000, priceFormatted: 'Rp 19.000 / ons',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&h=600&fit=crop&q=80',
    waMessage: "Halo Warung Papatong, saya mau memesan 'Ikan Kuwe Segar'.", isAvailable: true,
  },
  // ── SECTION 2: KEPITING & LOBSTER ───────────────────────────────────────
  {
    id: 104, name: 'Kepiting Bakau Segar (ons)', category: 'seafood', categoryLabel: 'Seafood Olahan',
    description: 'Kepiting Bakau segar berdaging padat manis. Gaya masak: Asap, Lada Hitam, Lumpur, Rebus, Saos Jimbaran, Saos Padang, Saos Tiram, Sop Asam Pedas, atau Sop Bening.',
    price: 34000, priceFormatted: 'Rp 34.000 / ons',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&h=600&fit=crop&q=80',
    badge: 'Terlaris', waMessage: "Halo Warung Papatong, saya ingin 'Kepiting Bakau Saos Padang'.", isAvailable: true,
  },
  {
    id: 105, name: 'Kepiting Soka Krispi Lumer', category: 'seafood', categoryLabel: 'Seafood Olahan',
    description: 'Kepiting Soka cangkang lunak bebas kupas. Pilihan gaya masak: Goreng Tepung (Crispy Fried), Lada Hitam, atau Telur Asin.',
    price: 72000, priceFormatted: 'Rp 72.000',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&h=600&fit=crop&q=80',
    badge: 'Rekomendasi', waMessage: "Halo Warung Papatong, saya booking 'Kepiting Soka Krispi Telur Asin'.", isAvailable: true,
  },
  {
    id: 106, name: 'Lobster Super / Duo Premium (ons)', category: 'seafood', categoryLabel: 'Seafood Olahan',
    description: 'Lobster air tawar super gendut berdaging tebal. Gaya masak: Bakar Jimbaran, Steam, Lada Hitam, Saos Padang, atau Butter Garlic. (Min. 3 ons).',
    price: 58000, priceFormatted: 'Rp 58.000 / ons',
    image: 'https://images.unsplash.com/photo-1551248429-40975aa4de74?w=600&h=600&fit=crop&q=80',
    badge: 'Rekomendasi', waMessage: "Halo Warung Papatong, pesan 'Lobster Super Bakar Butter Garlic' 3 ons.", isAvailable: true,
  },
  // ── SECTION 3: SEAFOOD PLATTERS & MIXES ─────────────────────────────────
  {
    id: 107, name: 'Kerang Mix Corn Feast', category: 'seafood', categoryLabel: 'Seafood Olahan',
    description: 'Kombinasi meriah 5 jenis kerang segar laut dan jagung manis pipilan dimasak dengan saus pilihan andalan Anda.',
    price: 120000, priceFormatted: 'Rp 120.000',
    image: 'https://images.unsplash.com/photo-1551248429-40975aa4de74?w=600&h=600&fit=crop&q=80',
    badge: 'Terlaris', waMessage: "Halo Warung Papatong, tolong pre-order 'Kerang Mix Corn Feast'.", isAvailable: true,
  },
  {
    id: 108, name: 'Kerang Mix Cumi & Udang', category: 'seafood', categoryLabel: 'Seafood Olahan',
    description: 'Paduan melimpah 5 jenis kerang, cumi empuk, udang peci manis, dan jagung manis kuah saus kental.',
    price: 210000, priceFormatted: 'Rp 210.000',
    image: 'https://images.unsplash.com/photo-1551248429-40975aa4de74?w=600&h=600&fit=crop&q=80',
    waMessage: "Halo Warung Papatong, pesan porsi 'Kerang Mix Cumi & Udang'.", isAvailable: true,
  },
  {
    id: 109, name: 'Kerang Mix Special Papatong Sultan (with Crab)', category: 'seafood', categoryLabel: 'Seafood Olahan',
    description: 'Platter paling premium berisi 5 jenis kerang, cumi ring, udang windu, kepiting bakau utuh, dan jagung rebus saus Padang.',
    price: 330000, priceFormatted: 'Rp 330.000',
    image: 'https://images.unsplash.com/photo-1551248429-40975aa4de74?w=600&h=600&fit=crop&q=80',
    badge: 'Rekomendasi', waMessage: "Halo Warung Papatong, siapkan 'Kerang Mix Papatong Sultan' di meja saung kami.", isAvailable: true,
  },
  // ── SECTION 4: UDANG, CUMI, & KERANG ────────────────────────────────────
  {
    id: 110, name: 'Udang Pancet Tiger Prawn (ons)', category: 'seafood', categoryLabel: 'Seafood Olahan',
    description: 'Udang Pancet (Tiger Prawn) super windu. Pilihan: Bakar Jimbaran, Goreng Tepung, Saos Padang, Lada Hitam, Telur Asin, atau Asam Manis.',
    price: 42000, priceFormatted: 'Rp 42.000 / ons',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&h=600&fit=crop&q=80',
    waMessage: "Halo Warung Papatong, kirim pre-order 'Udang Pancet Bakar'.", isAvailable: true,
  },
  {
    id: 111, name: 'Udang Peci Fresh (Porsi)', category: 'seafood', categoryLabel: 'Seafood Olahan',
    description: 'Udang Peci laut manis gurih. Pilihan: Bakar Jimbaran, Goreng Tepung, Saos Padang, Lada Hitam, Telur Asin, atau Asam Manis.',
    price: 58000, priceFormatted: 'Rp 58.000',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&h=600&fit=crop&q=80',
    waMessage: "Halo Warung Papatong, pesan satu porsi 'Udang Peci Saos Padang'.", isAvailable: true,
  },
  {
    id: 112, name: 'Cumi-Cumi Segar Kolam (Porsi)', category: 'seafood', categoryLabel: 'Seafood Olahan',
    description: 'Cumi-cumi segar kenyal nikmat. Pilihan: Bakar Jimbaran, Goreng Tepung, Saos Padang, Lada Hitam, Telur Asin, atau Asam Manis.',
    price: 52000, priceFormatted: 'Rp 52.000',
    image: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=600&h=600&fit=crop&q=80',
    waMessage: "Halo Warung Papatong, pesan satu porsi 'Cumi Goreng Tepung'.", isAvailable: true,
  },
  // ── SECTION 5: AYAM & DAGING ─────────────────────────────────────────────
  {
    id: 113, name: 'Ayam Kampung Utuh (1 Ekor)', category: 'sunda', categoryLabel: 'Paket Sunda',
    description: 'Satu ekor ayam kampung utuh empuk digoreng garing manis. Pilihan: Bakar Jimbaran, Bakar Kecap, Goreng Serundeng, atau Goreng Kremes.',
    price: 115000, priceFormatted: 'Rp 115.000',
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=600&h=600&fit=crop&q=80',
    badge: 'Terlaris', waMessage: "Halo Warung Papatong, pre-order 'Ayam Kampung Utuh Bakar Kecap'.", isAvailable: true,
  },
  {
    id: 114, name: 'Ayam Kampung Quarter (Pejantan)', category: 'sunda', categoryLabel: 'Paket Sunda',
    description: 'Potongan seperempat ayam kampung pejantan krispi beraroma rempah. Pilihan: Bakar Jimbaran, Bakar Kecap, Goreng Serundeng, atau Goreng Kremes.',
    price: 30000, priceFormatted: 'Rp 30.000',
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=600&h=600&fit=crop&q=80',
    waMessage: "Halo Warung Papatong, tambah ayam quarter goreng serundeng.", isAvailable: true,
  },
  {
    id: 115, name: 'Sapi Lada Hitam Empuk', category: 'sunda', categoryLabel: 'Paket Sunda',
    description: 'Tumisan daging tender slices sapi impor dengan cacahan lada hitam pedas aromatik wangi bawang bombay.',
    price: 65000, priceFormatted: 'Rp 65.000',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&h=600&fit=crop&q=80',
    badge: 'Rekomendasi', waMessage: "Halo Warung Papatong, pesan porsi 'Sapi Lada Hitam Empuk'.", isAvailable: true,
  },
  // ── SECTION 6: SAYURAN ───────────────────────────────────────────────────
  {
    id: 116, name: 'Tumis Kangkung Polos Segar', category: 'sayur', categoryLabel: 'Veggies & Co.',
    description: 'Kangkung sawah segar ditumis kilat dengan bawang iris harum garing gurih.',
    price: 18000, priceFormatted: 'Rp 18.000',
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600&h=600&fit=crop&q=80',
    waMessage: "Halo Warung Papatong, pesan kangkung polos satu.", isAvailable: true,
  },
  {
    id: 117, name: 'Kangkung Hotplate (Tauco / Terasi)', category: 'sayur', categoryLabel: 'Veggies & Co.',
    description: 'Kangkung mendidih panas di atas wajan hotplate besi hitam dengan kuah tauco Cianjur atau terasi bakar harum.',
    price: 24000, priceFormatted: 'Rp 24.000',
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600&h=600&fit=crop&q=80',
    badge: 'Terlaris', waMessage: "Halo Warung Papatong, pesan 'Kangkung Hotplate Terasi'.", isAvailable: true,
  },
  {
    id: 118, name: 'Kangkung Seafood Hotplate Jumbo', category: 'sayur', categoryLabel: 'Veggies & Co.',
    description: 'Hotplate kangkung istimewa bertabur udang kupas manis, cumi rings empuk, bakso, dan telur puyuh rebus.',
    price: 38000, priceFormatted: 'Rp 38.000',
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600&h=600&fit=crop&q=80',
    badge: 'Rekomendasi', waMessage: "Halo Warung Papatong, kami pre-order 'Kangkung Seafood Hotplate'.", isAvailable: true,
  },
  // ── SECTION 7: NASI & SAMBAL ─────────────────────────────────────────────
  {
    id: 119, name: 'Nasi Putih Cianjur Pulen', category: 'sunda', categoryLabel: 'Paket Sunda',
    description: 'Nasi putih hangat pulen berlelehan uap wangi dari padi Pandanwangi asli.',
    price: 8000, priceFormatted: 'Rp 8.000',
    image: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?w=600&h=600&fit=crop&q=80',
    waMessage: "Halo Warung Papatong, minta nasi putih piring tambahan.", isAvailable: true,
  },
  {
    id: 120, name: 'Nasi Bakar Papatong (Signature)', category: 'sunda', categoryLabel: 'Paket Sunda',
    description: 'Nasi pulen dibumbui teri medan, pete, kemangi, dibungkus daun pisang lalu dibakar arang kelapa.',
    price: 28000, priceFormatted: 'Rp 28.000',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&h=600&fit=crop&q=80',
    badge: 'Terlaris', waMessage: "Halo Warung Papatong, pesan signature 'Nasi Bakar Papatong'.", isAvailable: true,
  },
];

// ════════════════════════════════════════════════════════════════════════════
// ④ TESTIMONIALS DATA
// ════════════════════════════════════════════════════════════════════════════
// Dipakai oleh: TestimonialsSection (src/features/home/components/TestimonialsSection)

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 1, name: 'Nafisa Aulia Fahmi', city: 'Cibinong, Bogor (Local Guide)', rating: 5,
    review: 'Restonya mudah ditemukan, berada di pinggir jalan raya alternatif GOR Pakansari. Pesan cumi goreng mentega, udang asam manis, baronang bakar jimbaran, dan genjer. Semuanya enak bumbu meresap gurih. Sangat recommended kesini bersama keluarga besar!',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&q=80',
    product: 'Cumi Goreng Mentega & Baronang Bakar',
  },
  {
    id: 2, name: 'Novianty Wongso', city: 'Cibinong, Bogor (Local Guide)', rating: 5,
    review: 'Coba Warung Papatong karena lihat rating Google yang tinggi ternyata memang tidak mengecewakan! Gurame Telur Asin, Udang Peci Saus Padang, Soka Lada Hitam, dan Cumi Bakar Lumpur semuanya mantap berani bumbu. Pelayanan cepat dan memuaskan.',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&h=120&fit=crop&q=80',
    product: 'Gurame Telur Asin & Udang Peci Saus Padang',
  },
  {
    id: 3, name: 'Vanny Firki', city: 'Bogor (Local Guide)', rating: 5,
    review: 'Pertama kali kesini, makanan yang saya pesan semuanya enak, tidak ada yang gagal. Mantap sekali! Ajak keluarga kesini sangat recommended. Cocok untuk semua ukuran grup.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop&q=80',
    product: 'Paket Bancakan Rombongan',
  },
  {
    id: 4, name: 'Nadi Ekawati', city: 'Cibinong, Bogor', rating: 5,
    review: 'Baru pertama kali dateng kesini terus nyarinya cuma Google doang terus ternyata malah dapet hidden gem!!! Ikan bakar kerapu bumbu jimbaran SANGAT RECOMENDED!!!! Enak bgt plus kangkung taucooo masyaallah, definitely will come back!',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop&q=80',
    product: 'Ikan Kerapu Bakar Jimbaran & Kangkung Tauco',
  },
  {
    id: 5, name: 'Teddy Fazri', city: 'Cibinong (Local Guide)', rating: 5,
    review: 'Makanan Enak, harga terjangkau, ramah anak juga tempatnya, ada playground dan ada saung di bawah... Ayam bakar dan udang nya mantap! Gurame asem manis, kepiting saus jimbaran, kerapu bakar jimbaran semuanya top markotop.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&q=80',
    product: 'Kepiting & Udang Saus Padang',
  },
  {
    id: 6, name: 'Rebecca Indriyani', city: 'Bogor', rating: 5,
    review: 'Makanannya enak enak, pesen gurame asam manis, sapo tahu, fuyunghai semua bumbunya terasa berani bumbu, tempatnya juga nyaman bersih.. pokoknya mantappp!',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&h=120&fit=crop&q=80',
    product: 'Gurame Asam Manis & Sapo Tahu',
  },
  {
    id: 7, name: 'S Herman', city: 'Cibinong, Bogor', rating: 5,
    review: 'Makanan nya semua enak... rasa juga enak.., pelayanan cepat dan memuaskan, recommended buat semua keluarga yang mau makan disini... mantappp!',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&q=80',
    product: 'Lalapan & Ayam Goreng Serundeng',
  },
  {
    id: 8, name: 'Shena Ardyanti', city: 'Bogor (Local Guide)', rating: 5,
    review: 'Makanan nya enak-enak, tempatnya strategis banget pinggir jalan raya, dan harganya OK. Tenang sehingga mudah untuk bicara santai. Waktu tunggu sekitar 10-30 menit.',
    avatar: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?w=120&h=120&fit=crop&q=80',
    product: 'Sapo Tahu Special Papatong',
  },
  {
    id: 9, name: 'Ajeng Maharani', city: 'Cibinong, Bogor (Local Guide)', rating: 5,
    review: 'Makanannya enak banget rasanya, pelayanan nya ramah-ramah baik. Resto nya ada tempat permainan anak-anak jadi anak-anak bisa bermain sambil menunggu pesanan datang. Sangat cocok buat bawa balita.',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=120&h=120&fit=crop&q=80',
    product: 'Nasi Timbel Komplet & Area Playground',
  },
  {
    id: 10, name: 'Erni Herningsih', city: 'Sentul (Local Guide)', rating: 5,
    review: 'Tempatnya lumayan luas. Bisa buat makan keluarga besar atau gathering kantor. Makanan nya ok dan enak.',
    avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=120&h=120&fit=crop&q=80',
    product: 'Ayam Goreng Serundeng Lengkuas',
  },
  {
    id: 11, name: 'Purniawan Abudaffa', city: 'Bogor', rating: 5,
    review: 'Makanan nya enak.. sayurnya juga masih seger-seger bgt... mantap... pelayanannya dari staf ramah serta sigap.',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&h=120&fit=crop&q=80',
    product: 'Tumis Genjer & Kerang Cabe Ijo',
  },
  {
    id: 12, name: 'Hendry Hanapi', city: 'Jakarta (Local Guide)', rating: 5,
    review: 'Tempat lumayan nyaman (makan sore - malam). Untuk rombongan dewasa 8 orang, anak-anak 7 orang makanannya sangat cukup dan kenyang. Semua bahan segar dan overall masakan good taste dan terong baladonya istimewa!',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&h=120&fit=crop&q=80',
    product: 'Liwetan Berlima & Terong Balado',
  },
];

// ════════════════════════════════════════════════════════════════════════════
// ⑤ FAQS DATA
// ════════════════════════════════════════════════════════════════════════════
// Dipakai oleh: FaqSection (src/features/home/components/FaqSection)

export const FAQS_DATA: FAQItem[] = [
  {
    id: 1,
    question: 'Apakah dikenakan biaya tambahan / Down Payment (DP) untuk booking tempat?',
    answer: 'Untuk pemesanan meja rombongan biasa (<10 orang), pendaftaran reservasi di web ini 100% gratis tanpa DP. Untuk acara kumpul besar (Gathering Kantor, Ulang Tahun, Reuni >20 orang) dengan pre-order banquet melimpah, tim admin kami akan mengkonfirmasi tanda jadi komitmen (DP) minimal 20% demi kelancaran persiapan dapur.',
  },
  {
    id: 2,
    question: 'Bagaimana jika ada menu makanan yang kami pre-order ternyata habis di dapur?',
    answer: 'Kami mengintegrasikan "Live Stock Board" dapur kami dengan menu digital di situs web ini. Jika ketersediaan bahan seafood menipis, status menu di web akan otomatis beralih menjadi "Terbatas". Apabila telah terlanjur booking dan stok mendadak kosong, tim admin kami akan segera menghubungi Anda via WhatsApp maksimal 1 jam sebelum kunjungan untuk menawarkan alternatif menu serupa.',
  },
  {
    id: 3,
    question: 'Apakah tersedia area lesehan outdoor dan ruang VIP ber-AC?',
    answer: 'Ya, kami memiliki variasi area duduk yang super luas! Kami menawarkan "Lesehan Outdoor Asri" di atas kolam ikan koi, "Saung Bambu Keluarga", "Meja Tengah Semi-Outdoor" dekat panggung live music, serta "VIP Room AC Khusus" dengan kapasitas hingga 35 orang untuk acara formal kantor atau gathering tertutup.',
  },
  {
    id: 4,
    question: 'Apakah parkirannya ramah untuk kendaraan besar seperti Bus Pariwisata?',
    answer: 'Sangat ramah! Lokasi kami yang strategis di Alternatif GOR Pemda Cibinong memiliki area parkir mandiri yang sangat luas, mudah menampung hingga 40 kendaraan mobil pribadi atau 4 Bus Pariwisata ukuran besar sekaligus, lengkap dengan bantuan tim juru parkir profesional kami.',
  },
  {
    id: 5,
    question: 'Kapan jadwal live music dimainkan di Warung Papatong?',
    answer: 'Panggung Hiburan Live Music akustik kami hadir menemani makan malam Anda setiap hari mulai pukul 18.30 WIB hingga tutup jam 21.30 WIB. Anda bisa request lagu Sunda tradisional favorit ataupun lagu modern pilihan keluarga, gratis tanpa biaya masuk.',
  },
];

// ════════════════════════════════════════════════════════════════════════════
// ⑥ GALLERY DATA
// ════════════════════════════════════════════════════════════════════════════
// Dipakai oleh: GallerySection (src/features/gallery/components/GallerySection)

export const GALLERY_DATA: GalleryItem[] = [
  // ── Featured Main Entrance ───────────────────────────────────────────────
  {
    id: 1,
    image: '/images/venue/01-gallery.webp',
    alt: 'Tampak depan Warung Papatong Sunda Seafood dengan area makan semi-outdoor dan akses parkir luas.',
    category: 'tempat',
    size: 'large',
  },
  // ── Iconic Photo Spot ────────────────────────────────────────────────────
  {
    id: 2,
    image: '/images/venue/05-gallery.webp',
    alt: 'Spot foto balon udara ikonik Warung Papatong dikelilingi pepohonan tropis dan lampu gantung outdoor.',
    category: 'tempat',
    size: 'medium',
  },
  // ── Main Dining Area ─────────────────────────────────────────────────────
  {
    id: 3,
    image: '/images/venue/06-gallery.webp',
    alt: 'Area makan utama semi-outdoor dengan meja panjang luas dan nuansa angin sejuk khas lesehan keluarga.',
    category: 'tempat',
    size: 'large',
  },
  // ── Industrial Dining Space ──────────────────────────────────────────────
  {
    id: 4,
    image: '/images/venue/07-gallery.webp',
    alt: 'Interior area makan industrial modern Warung Papatong dengan mural artistik dan seating keluarga.',
    category: 'tempat',
    size: 'medium',
  },
  // ── Outdoor Seating ──────────────────────────────────────────────────────
  {
    id: 5,
    image: '/images/venue/08-gallery.webp',
    alt: 'Area outdoor semi-terbuka dengan pencahayaan alami dan meja santai cocok untuk makan bersama rombongan.',
    category: 'tempat',
    size: 'medium',
  },
  // ── Warm Night Dining Ambience ────────────────────────────────────────────
  {
    id: 6,
    image: '/images/venue/09-gallery.webp',
    alt: 'Suasana makan malam hangat di area semi-outdoor Warung Papatong dengan lampu rotan estetik dan seating keluarga luas.',
    category: 'tempat',
    size: 'large',
  },
  // ── Spacious Lesehan Area ────────────────────────────────────────────────
  {
    id: 7,
    image: '/images/venue/10-gallery.webp',
    alt: 'Area lesehan modern Warung Papatong dengan konsep terbuka, meja kayu panjang, dan suasana santai khas keluarga.',
    category: 'tempat',
    size: 'medium',
  },
  // ── Garden View Dining Space ─────────────────────────────────────────────
  {
    id: 8,
    image: '/images/venue/11-gallery.webp',
    alt: 'Area makan semi-outdoor menghadap taman hijau tropis dengan suasana adem dan pencahayaan alami.',
    category: 'tempat',
    size: 'medium',
  },
  // ── Traditional Saung & Playground ───────────────────────────────────────
  {
    id: 9,
    image: '/images/venue/12-gallery.webp',
    alt: 'Saung bambu tradisional Warung Papatong lengkap dengan area bermain anak dan nuansa pedesaan asri.',
    category: 'tempat',
    size: 'large',
  },
  // ── Signature Welcome Spot ───────────────────────────────────────────────
  {
    id: 10,
    image: '/images/venue/02-gallery.webp',
    alt: 'Spot welcome wall ikonik Warung Papatong dengan mural tropis artistik yang cocok untuk area foto pengunjung.',
    category: 'tempat',
    size: 'medium',
  },
];

// ════════════════════════════════════════════════════════════════════════════
// ⑦ STEPS DATA
// ════════════════════════════════════════════════════════════════════════════
// Dipakai oleh: BookingSteps / HowItWorks section

export const STEPS_DATA: Step[] = [
  {
    id: 1, title: 'Tentukan Jadwal & Pilih Saung',
    description: 'Pilih tanggal makan bersama rombongan Anda, tentukan jam kedatangan, serta tentukan lokasi meja duduk favorit (Lesehan di atas air, Saung Bambu, Meja Tengah, atau Kursi VIP AC).',
  },
  {
    id: 2, title: 'Pre-Order Menu Hidangan',
    description: 'Pilih hidangan Sunda legendaris & Seafood segar unggulan langsung dari daftar e-menu interaktif kami untuk mencegah masakan lama disajikan atau kehabisan bahan menu utama di malam hari.',
  },
  {
    id: 3, title: 'Konfirmasi Instan via WhatsApp',
    description: 'Sistem web kami akan memformat rapi seluruh pilihan menu, total harga, dan denah saung Anda. Cukup 1-klik untuk langsung mengirim data booking ke admin resmi kami di WhatsApp.',
  },
  {
    id: 4, title: 'Datang & Tinggal Saji dalam 10 Menit!',
    description: 'Saat Anda tiba bersama keluarga besar atau rombongan kantor, meja kursi sudah steril didekor, dan masakan hangat mengepul siap disajikan dalam kurun waktu kurang dari 10 menit!',
  },
];

// ════════════════════════════════════════════════════════════════════════════
// ⑧ TEAM DATA
// ════════════════════════════════════════════════════════════════════════════
// Dipakai oleh: AboutPage / TeamSection

export const TEAM_DATA: TeamMember[] = [
  {
    id: 1, name: 'H. Jaka Permana', role: 'Owner & Founder',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&q=80',
    bio: 'Mendirikan Warung Papatong pada tahun 2018 dengan visi menyajikan kuliner Sunda autentik berstandar premium yang ramah untuk kumpul keluarga besar Jabodetabek.',
    specialty: 'Visi Bisnis & Pelestarian Budaya Kuliner',
  },
  {
    id: 2, name: 'Chef Cecep Sunandar', role: 'Senior Head Chef',
    photo: 'https://images.unsplash.com/photo-1583394293214-28ded15ee548?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y2hlZnxlbnwwfHwwfHx8MA%3D%3D',
    bio: 'Berbekal pengalaman 15+ tahun di bidang hidangan laut nusantara, meracik bumbu legendaris Saus Padang Istimewa dan sambal ulek khas Papatong yang memanjakan lidah.',
    specialty: 'Sunda Tradisional & Seafood Fusion',
  },
  {
    id: 3, name: 'Ibu Rina Sulaeman', role: 'Banquet & Operational Manager',
    photo: 'https://plus.unsplash.com/premium_photo-1690407617542-2f210cf20d7e?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    bio: 'Menangani kelancaran operasional harian resto, koordinasi pre-order banquet khusus arisan, reuni, corporate gathering, hingga dekorasi meja kejutan ulang tahun.',
    specialty: 'Layanan Pelanggan & Koordinasi Rombongan',
  },
];

// ════════════════════════════════════════════════════════════════════════════
// ⑨ HERO DATA
// ════════════════════════════════════════════════════════════════════════════
// Dipakai oleh: HeroSection (src/features/home/components/HeroSection)

export const HERO_DATA: HeroData = {
  pillBadge:          'Kuliner Sunda & Seafood No. 1 Cibinong',
  headlineText:       'Lezatnya Seafood Segar Berpadu Wanginya Nasi Timbel Sunda Autentik',
  description:        'Ucapkan selamat tinggal pada mengantre lama & kuota kehabisan makan malam! Warung Papatong hadir dengan sistem booking lesehan teratur dan pre-order digital instan untuk rombongan makan Anda.',
  ctaBookingText:     'Booking Tempat Sekarang',
  ctaMenuText:        'Lihat Daftar Menu',
  featuredTodayLabel: 'Spesial Hari Ini',
  kitchenStatusLabel: 'Dapur Aktif',
  kitchenStatusDesc:  'Semua Menu Seafood Lengkap Terjaga',
  // Stats bar 3-kolom di bawah tombol CTA
  stats: {
    rating:        '4.8',
    ratingLabel:   '4K+ Ulasan',
    hours:         '11.00 – 22.00',
    hoursLabel:    'Setiap Hari',
    location:      'Cibinong',
    locationLabel: 'Sentul Area',
  },
  // Quick link pills (Maps & Instagram)
  quickLinks: {
    mapsLabel:      'Google Maps',
    instagramLabel: 'Instagram',   // komponen akan prefix "@" dari BUSINESS_INFO.instagram
  },
  // Pre-filled WA message dari tombol "Booking Tempat Sekarang"
  waMessage: 'Halo Admin Warung Papatong, saya ingin tanya info reservasi meja dan menu yang tersedia. Apakah bisa bantu saya?',
};

// ════════════════════════════════════════════════════════════════════════════
// ⑩ AMBIENCE TEASER DATA
// ════════════════════════════════════════════════════════════════════════════
// Dipakai oleh: AmbienceTeaser (src/features/home/components/AmbienceTeaser)

// Data item kartu gambar
export const AMBIENCE_TEASER_DATA: AmbienceTeaserItem[] = [
  { url: '/images/venue/10-gallery.webp', caption: 'Lesehan Semi Outdoor', desc: 'Menikmati makan dengan susana teduh sembari lesehan'},
  { url: '/images/venue/12-gallery.webp', caption: 'Gazebo Bambu Sejuk', desc: 'Lanskap rimbun pepohonan hijau sejuk khas pedesaan Jawa Barat' },
  { url: '/images/venue/05-gallery.webp', caption: 'Spot Foto Ikonik', desc: 'Spot foto balon udara ikonik Warung Papatong dikelilingi pepohonan tropis dan lampu gantung outdoor.' },
];

// Konten teks statis seksi AmbienceTeaser
export const AMBIENCE_TEASER_CONTENT: AmbienceTeaserData = {
  badge:       'SUASANA & LINGKUNGAN',
  title:       'Oase Kesejukan Alami di Tengah GOR Pemda',
  description: 'Warung Papatong dirancang khusus memanjakan seluruh pancaindra keluarga Anda. Nikmati perpaduan asri antara saung bilik bambu tradisional, lanskap taman asri, kolam ikan koi segar, hingga semilir angin sejuk yang menyegarkan dahaga kehidupan urban.',
  ctaText:     'Tampilkan Galeri Foto Resto',
  ctaHref:     '/venue',
  brandLabel:  'WARUNG PAPATONG',   // Label micro di pojok kiri bawah setiap card gambar
};

// ════════════════════════════════════════════════════════════════════════════
// ⑪ BEST SELLERS CONTENT
// ════════════════════════════════════════════════════════════════════════════
// Dipakai oleh: BestSellers (src/features/home/components/BestSeller)

export const BEST_SELLERS_CONTENT: BestSellersData = {
  badge:           'MENU PRIMADONA TERLARIS',
  title:           'Menu Terpopuler Rekomendasi Hari Ini',
  description:     'Daftar resep rahasia paling dicari penikmat kuliner di Jabodetabek. Diramu menggunakan resep autentik dapur legendaris Warung Papatong sejak 2018.',
  ctaText:         'Sajian E-Menu Selengkapnya',
  ctaHref:         '/menu',
  detailCtaText:   'Detail & Pesan',
  freshBadgeLabel: 'Bahan Segar Pilihan',
  intervalMs:      30_000,   // Rotasi kartu setiap 30 detik
};

// ════════════════════════════════════════════════════════════════════════════
// ⑫ TESTIMONIALS CONTENT
// ════════════════════════════════════════════════════════════════════════════
// Dipakai oleh: TestimonialsSection (src/features/home/components/TestimonialsSection)

export const TESTIMONIALS_CONTENT: TestimonialsData = {
  sectionLabel:  'SUARA KONSUMEN AUTENTIK',
  title:         'Ulasan Kejujuran dari 4.080+ Keluarga di Google Maps',
  description:   'Kepuasan rasa makan keluarga adalah kehormatan bagi kami. Simak penuturan asli dari pelanggan setia setelah berkunjung dan bersantap hangat di saung lesehan Warung Papatong Cibinong.',
  autoPlayMs:    5_500,   // Interval auto-advance carousel
  ariaLabelPrev: 'Ulasan Sebelumnya',
  ariaLabelNext: 'Ulasan Selanjutnya',
};

// ════════════════════════════════════════════════════════════════════════════
// ⑬ LOCATION DATA
// ════════════════════════════════════════════════════════════════════════════
// Dipakai oleh: LocationSection (src/features/home/components/LocationSection)

export const LOCATION_DATA: LocationData = {
  badge:         'DENGAN AKSES STRATEGIS',
  title:         'Mudah Dijangkau, Bersebelahan GOR Pemda',
  description:   'Berlokasi prima di Nanggewer, Cibinong, hanya terpaut beberapa menit dari Exit Toll Sirkuit Sentul. Area kami di tepi jalan raya utama GOR Pemda, menjamin kemudahan manuver putar balik untuk Bus Wisata ataupun rombongan besar.',
  // Label info card
  labelAddress:  'Alamat Lengkap',
  labelHours:    'Jam Operasional',
  labelPhone:    'Kontak Seluler Resmi',
  // Tombol CTA
  ctaWaText:     'Chat WhatsApp Sekarang',
  ctaMapsText:   'Rute di Google Maps',
  // Pre-filled WA message dari seksi lokasi
  waMessage:     'Halo Admin Resto Warung Papatong, rombongan kami ingin datang dalam waktu dekat. Bisa dibantu infokan meja lesehan yang tersedia?',
  // Google Maps embed iframe src — ganti di sini jika lokasi berubah
  mapsIframeSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.8821948834465!2d106.83078381744384!3d-6.512020895289522!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69c1a8054a7b43%3A0xf582c100380d74a7!2sRESTO%20WARUNG%20PAPATONG%20-%20Cibinong-Bogor!5e0!3m2!1sid!2sid!4v1716301234567!5m2!1sid!2sid',
};

// ════════════════════════════════════════════════════════════════════════════
// ⑭ FAQ SECTION DATA
// ════════════════════════════════════════════════════════════════════════════
// Dipakai oleh: FaqSection (src/features/home/components/FaqSection)

export const FAQ_SECTION_DATA: FaqSectionData = {
  sectionLabel:   'PERTANYAAN UMUM (FAQ)',
  title:          'Ragu Terkait Rencana Acara Rombongan Anda?',
  description:    'Berikut rangkuman hal-hal krusial yang paling sering ditanyakan oleh koordinator reuni, sekretaris dinas, dan pengelola arisan keluarga besar sebelum melakukan pemesanan tempat di Warung Papatong Cibinong.',
  // CTA callout di bawah accordion
  calloutTitle:   'Jawaban Belum Menjawab?',
  calloutDesc:    'Punya request istimewa, jumlah rombongan sangat besar, atau butuh bantuan dekorasi khusus? Hubungi admin resmi kami via WhatsApp.',
  calloutCtaText: 'Chat Langsung Sekarang',
  // Pre-filled WA message dari FAQ CTA
  waMessage:      'Halo Admin Warung Papatong, saya ingin bertanya terkait rencana acara rombongan kami.',
};

// ════════════════════════════════════════════════════════════════════════════
// ⑮ GALLERY PAGE DATA
// ════════════════════════════════════════════════════════════════════════════
// Dipakai oleh: GallerySection (src/features/gallery/components/GallerySection)

export const GALLERY_PAGE_DATA: GalleryPageData = {
  // Hero teks halaman
  badge:            'Lanskap Saung Pasundan',
  title:            'Galeri & Suasana',
  titleAccent:      'Warung Papatong',     // Baris kedua dengan warna aksen
  description:      'Menatap kenyamanan saung lesehan semi-outdoor, area keluarga yang luas, hingga atmosfer santai khas Sunda yang membuat pengunjung betah menikmati waktu bersama.',
  // Filter tabs
  filterTabs: [
    { id: 'semua',     label: 'Semua Koleksi'           },
    { id: 'suasana',   label: 'Suasana Resto & Lesehan' },
    { id: 'aktivitas', label: 'Aktivitas & Hidangan'    },
  ],
  // Tombol per card galeri
  expandBtnText:    'Perbesar',
  // Lightbox modal
  lightboxTitle:    'Detail Galeri Foto',
  lightboxBackText: 'Kembali ke Koleksi',
  // Seksi Instagram feed
  instagramBadge:   'Live Instagram Feed',
  // Gunakan {instagram} sebagai placeholder — komponen menggantinya dengan BUSINESS_INFO.instagram
  instagramTitle:   'Aktivitas Terbaru dari @{instagram}',
  instagramDesc:    'Intip suasana hangat Warung Papatong mulai dari saung lesehan, live music malam hari, sampai momen seru para pengunjung yang menikmati kebersamaan di setiap sudut restoran.',
  instagramCtaText: 'Kunjungi Instagram Resmi',
  // ID widget Elfsight — ganti jika widget berubah
  elfsightAppId:    'elfsight-app-f0efd7c9-1075-4d19-aa42-d8afd8399e02',
};

// ════════════════════════════════════════════════════════════════════════════
// ⑯ NAVBAR DATA
// ════════════════════════════════════════════════════════════════════════════
// Dipakai oleh: Navbar (src/components/layout/Navbar)

export const NAVBAR_DATA: NavbarData = {
  ctaDesktopText: 'Pesan Sekarang',
  ctaMobileText:  'Pesan Via WA',
  ctaDrawerText:  'Pesan via WhatsApp',
  // Pre-filled WA message dari tombol di Navbar
  waMessage:      'Halo Admin Papatong, saya ingin pesan / tanya menu yang tersedia.',
};

// ════════════════════════════════════════════════════════════════════════════
// ⑰ FOOTER DATA
// ════════════════════════════════════════════════════════════════════════════
// Dipakai oleh: Footer (src/components/layout/Footer)

export const FOOTER_DATA: FooterData = {
  // Tagline singkat di bawah logo
  brandTagline:    'Surganya masakan Sunda autentik dan hidangan seafood segar di Cibinong. Tempat silaturahmi favorit keluarga Jabodetabek sejak',
  // Label kolom
  colNavLabel:     'Navigasi',
  colContactLabel: 'Hubungi Kami',
  // Label item kontak
  labelAddress:    'Alamat',
  labelPhone:      'Telepon',
  labelEmail:      'Email',
  // Pre-filled WA message dari footer
  waMessage:       'Halo Admin Papatong, saya ingin bertanya mengenai reservasi.',
  // Suffix copyright — tahun di-inject dinamis oleh komponen
  copyrightSuffix: '· All Rights Reserved.',
};

// ════════════════════════════════════════════════════════════════════════════
// INSTAGRAM FEEDS DATA (legacy — untuk komponen InstagramFeeds jika terpisah)
// ════════════════════════════════════════════════════════════════════════════

export const INSTAGRAM_FEEDS_DATA: InstagramFeedItem[] = [
  { id: 1, img: 'https://images.unsplash.com/photo-1543353071-10c8ba85a904?w=400&h=400&fit=crop&q=80', likes: '1.2k', comments: '109' },
  { id: 2, img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=400&fit=crop&q=80', likes: '896',  comments: '78'  },
  { id: 3, img: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=400&fit=crop&q=80', likes: '1.5k', comments: '142' },
  { id: 4, img: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=400&h=400&fit=crop&q=80', likes: '721', comments: '54'  },
];

// ════════════════════════════════════════════════════════════════════════════
// UTILITIES
// ════════════════════════════════════════════════════════════════════════════

/** Bangun URL WhatsApp dengan pesan pre-filled. */
export const buildWALink = (phone: string, message: string): string =>
  `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

/** Format angka ke format Rupiah. */
export const formatPrice = (price: number): string =>
  `Rp ${price.toLocaleString('id-ID')}`;

/** Hitung total harga dari array item keranjang pre-order. */
export const calculateBasketTotal = (
  items: Array<{ price: number; quantity: number }>
): number => items.reduce((sum, item) => sum + item.price * item.quantity, 0);