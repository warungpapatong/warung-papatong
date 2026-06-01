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
// ③ PRODUCTS DATA       — daftar menu lengkap
// ④ TESTIMONIALS DATA   — ulasan pelanggan untuk seksi Testimonials
// ⑤ FAQS DATA           — pertanyaan umum untuk seksi FAQ
// ⑥ GALLERY DATA        — item galeri untuk halaman Venue/Gallery
// ⑦ STEPS DATA          — langkah-langkah booking
// ⑧ TEAM DATA           — profil tim restoran
//
// ─── KONTEN STATIS PER SECTION / KOMPONEN ───────────────────────────────────
//
// ⑨  HERO_DATA
// ⑩  AMBIENCE_TEASER_DATA & AMBIENCE_TEASER_CONTENT
// ⑪  BEST_SELLERS_CONTENT
// ⑫  TESTIMONIALS_CONTENT
// ⑬  LOCATION_DATA
// ⑭  FAQ_SECTION_DATA
// ⑮  GALLERY_PAGE_DATA
// ⑯  NAVBAR_DATA
// ⑰  FOOTER_DATA
//
// ─── UTILITIES ───────────────────────────────────────────────────────────────
//
// formatProductPrice()   — format harga produk ke Rupiah + satuan (SINGLE SOURCE)
// buildWALink()          — bangun URL WhatsApp dengan pesan pre-filled
// formatPrice()          — format angka mentah ke Rupiah (tanpa satuan)
// calculateBasketTotal() — hitung total harga keranjang
//
// ─── CATATAN HARGA ───────────────────────────────────────────────────────────
//
// `price`      → angka canonical Rupiah, dipakai untuk semua kalkulasi.
// `priceUnit`  → suffix satuan opsional: '/ ons' | '/ porsi' | undefined.
// `priceFormatted` DIHAPUS — gunakan formatProductPrice(product) di mana saja.
//
// Dengan satu sumber ini, UI kartu menu, pesan WA, dan checkout modal
// selalu menampilkan angka yang identik dan tidak bisa drift.
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
  LocationData,
  NavbarData,
  Product,
  Stat,
  TestimonialsData,
  Testimonial,
} from '@/types';

// ════════════════════════════════════════════════════════════════════════════
// ① BUSINESS INFO
// ════════════════════════════════════════════════════════════════════════════

export const BUSINESS_INFO: BusinessInfo = {
  name:        'Resto Warung Papatong',
  tagline:     'Sunda & Seafood',
  description: 'Menggabungkan cita rasa kuliner Sunda autentik yang gemah ripah dengan kesegaran seafood istimewa. Nikmati area lesehan semi-outdoor yang asri, panggung live music, serta parkir luas yang ramah rombongan besar.',
  phone:       '0813-8849-7651',
  wa:          '6281388497651',
  address:     'Jl. Alternatif GOR Pemda No.9, Nanggewer, Kec. Cibinong, Kabupaten Bogor, Jawa Barat 16912',
  city:        'Cibinong, Bogor',
  hours:       'Setiap Hari, 11:00 - 22:00 WIB',
  instagram:   'restowarungpapatong',
  tiktok:      'restowarungpapatong',
  youtube:     'warungpapatong',
  email:       'warungpapatong@gmail.com',
  mapQuery:    'RESTO+WARUNG+PAPATONG+-+Cibinong-Bogor',
  mapsLink:    'https://www.google.com/maps/place/RESTO+WARUNG+PAPATONG+-+Cibinong-Bogor/@-6.5120209,106.8329725,17z',
  founded:     '2018',
};

// ════════════════════════════════════════════════════════════════════════════
// ② STATS DATA
// ════════════════════════════════════════════════════════════════════════════

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
// ⑱ MENU PAGE DATA
// ════════════════════════════════════════════════════════════════════════════

export const MENU_CATEGORIES = [
  { id: 'all',             label: 'Semua'           },
  { id: 'seafood',         label: 'Seafood'         },
  { id: 'ikan-air-tawar',  label: 'Ikan Air Tawar'  },
  { id: 'sunda',           label: 'Sunda'           },
  { id: 'ayam-dan-daging', label: 'Ayam dan Daging' },
  { id: 'sayuran',         label: 'Sayuran'         },
  { id: 'minuman',         label: 'Segar Minuman'   },
] as const

export type MenuCategoryId = typeof MENU_CATEGORIES[number]['id']

export const MENU_PAGE_DATA = {
  badge:                 'Menu Kami',
  title:                 'Daftar Menu',
  titleAccent:           'Hidangan Autentik',
  description:           'Pilih hidangan favorit, masukkan ke keranjang, dan pesan langsung via WhatsApp — mudah & cepat!',
  searchPlaceholder:     'Cari kepiting, timbel, kangkung...',
  searchClearLabel:      'Hapus pencarian',
  emptyStateText:        'Menu tidak ditemukan. Coba kata kunci lain!',
  kitchenReadyLabel:     'Dapur Ready',
  addToCartLabel:        'Keranjang',
  addLabel:              'Tambah porsi',
  reduceLabel:           'Kurangi porsi',
  orderWaLabel:          'Pesan WA',
  porsiSuffix:           'porsi',
  cateringBadge:         'Katering & Corporate Gathering',
  cateringTitle:         'Mengadakan Acara Besar atau Gathering Kantor?',
  cateringDescription:   'Tim dapur Papatong siap menyusun porsi prasmanan, paket besek hantaran, arisan komunitas, hingga tumpeng megah untuk menyukseskan perayaan korporat Anda di Bogor. Hubungi Banquet Manager kami.',
  cateringCtaLabel:      'Diskusi Paket Acara',
  basketItemsLabel:      'item',
  basketCheckoutLabel:   'Checkout',
  watermarkText:         'MENU',
} as const

export const CHECKOUT_MODAL_DATA = {
  title:             'Keranjang Belanja',
  itemSuffix:        'item',
  closeLabel:        'Tutup',
  emptyText:         'Keranjang masih kosong.',
  reduceLabel:       'Kurangi',
  addLabel:          'Tambah',
  totalLabel:        'Total',
  orderWaLabel:      'Pesan via WhatsApp',
  clearLabel:        'Kosongkan Keranjang',
  dialogTitleId:     'checkout-title',
} as const

// ════════════════════════════════════════════════════════════════════════════
// ③ PRODUCTS DATA
// ════════════════════════════════════════════════════════════════════════════
// Dipakai oleh: HeroSection (featured menu dinamis), BestSellers,
//               MenuPage, PreOrderSystem

export const PRODUCTS_DATA: Product[] = [
  // Section 1: Seafood
  {
    id: 101, 
    name: 'Cumi Bakar Kecap', 
    category: 'seafood', 
    categoryLabel: 'Seafood',
    description: 'Cumi Bakar fresh berkualitas premium. Pilihan gaya masak lainnya: Bakar Jimbaran / Kecap / Lumpur, Asam Manis, Goreng Tepung / Mentega, Saos Padang / Tiram, atau Cumi Telur Asin.',
    price: 62000, 
    priceUnit: '/ porsi',
    image: '/images/menu/01-seafood/01-cumi-bakar-kecap.webp',
    badge: 'Terlaris', 
    isAvailable: true,
  },
  {
    id: 102, 
    name: 'Kepiting Saus Jimbaran', 
    category: 'seafood', 
    categoryLabel: 'Seafood',
    description: 'kepiting bakau segar berdaging tebal. Pilihan gaya masak lainnya: Asapan, Lada hitam, Lumpur, Rebus, Saus Jimbaran, Saos Padang, Saus Tiram, Sop Asam Pedas, atau Sop Bening.',
    price: 34000, 
    priceUnit: '/ ons',
    image: '/images/menu/01-seafood/02-kepiting-saus-jimbaran.webp',
    badge: 'Rekomendasi', 
    isAvailable: true,
  },
  {
    id: 103, 
    name: 'Kerang Mix Corn Feast', 
    category: 'seafood', 
    categoryLabel: 'Seafood',
    description: 'Kombinasi meriah 5 jenis kerang segar laut dan jagung manis pipilan dimasak dengan saus pilihan andalan Anda.',
    price: 120000, 
    priceUnit: '/ porsi',
    image: '/images/menu/01-seafood/03-kerang-mix-corn-feast.webp',
    badge: 'Terlaris', 
    isAvailable: true,
  },
  {
    id: 104, 
    name: 'Ikan Kuwe Bakar Jimbaran', 
    category: 'seafood', 
    categoryLabel: 'Seafood',
    description: 'Ikan Kuwe Bakar Jimbaran segar berdaging tebal. Pilihan gaya masak lainnya: Bakar cabe ijo, Bakar Kecap, Bakar Polos, atau Saos Padang.',
    price: 19000, 
    priceUnit: '/ ons',
    image: '/images/menu/01-seafood/04-kuwe-bakar-jimbaran.webp',
    badge: 'Terlaris',
    isAvailable: true,
  },
  {
    id: 105, 
    name: 'Lobster Saus Jimbaran', 
    category: 'seafood', 
    categoryLabel: 'Seafood',
    description: 'Lobster Saus Jimbaran segar berdaging tebal. Pilihan gaya masak lainnya: Bakar Jimbaran, Steam, Lada Hitam, Saos Padang, atau Butter Garlic.',
    price: 68000, 
    priceUnit: '/ ons',
    image: '/images/menu/01-seafood/05-lobster-saus-jimbaran.webp',
    badge: 'Rekomendasi', 
    isAvailable: true,
  },
  {
    id: 106, 
    name: 'Lobster Telur Asin', 
    category: 'seafood', 
    categoryLabel: 'Seafood',
    description: 'Lobster Telur Asin segar berdaging tebal. Pilihan gaya masak lainnya: Bakar Jimbaran, Steam, Lada Hitam, Saos Padang, atau Butter Garlic.',
    price: 68000, 
    priceUnit: '/ ons',
    image: '/images/menu/01-seafood/06-lobster-telur-asin.webp',
    badge: 'Rekomendasi', 
    isAvailable: true,
  },
  // Section 2: Ikan Air Tawar
  {
    id: 107, 
    name: 'Gurame Pecak', 
    category: 'ikan-air-tawar', 
    categoryLabel: 'Ikan Air Tawar',
    description: 'Gurame Pecak segar berdaging tebal. Pilihan gaya masak lainnya: Kering, Jimbaran, Kecap, Asam manis, Sop asam pedas, Sop bening/kemangi, Pecak, atau Saus mangga.',
    price: 125000, 
    priceUnit: '/ ekor',
    image: '/images/menu/02-ikan-air-tawar/01-gurame-pecak.webp',
    badge: 'Terlaris', 
    isAvailable: true,
  },
  {
    id: 108, 
    name: 'Gurame Terbang', 
    category: 'ikan-air-tawar', 
    categoryLabel: 'Ikan Air Tawar',
    description: 'Gurame Terbang segar berdaging tebal. Pilihan gaya masak lainnya: Kering, Jimbaran, Kecap, Asam manis, Sop asam pedas, Sop bening/kemangi, Pecak, atau Saus mangga.',
    price: 125000, 
    priceUnit: '/ ekor',
    image: '/images/menu/02-ikan-air-tawar/02-gurame-terbang.webp',
    badge: 'Terlaris', 
    isAvailable: true,
  },
  // Section 3: Ayam & Daging
  {
    id: 109, 
    name: 'Fuyunghai', 
    category: 'ayam-dan-daging', 
    categoryLabel: 'Ayam dan Daging',
    description: 'Fuyunghai telor ditaburi acar dan siraman saus Jimbaran yang pas di lidah Anda.',
    price: 54000, 
    priceUnit: '/ porsi',
    image: '/images/menu/03-ayam-dan-daging/01-fuyunghai.webp',
    badge: 'Rekomendasi', 
    isAvailable: true,
  },
  // Section 4: Sunda
  {
    id: 110, 
    name: 'Nasi Timbel', 
    category: 'sunda', 
    categoryLabel: 'Masakan Sunda',
    description: 'Nasi timbel hangat pulen dibungkus daun pisang wangi khas Cibinong. Cocok dipadukan dengan aneka lauk pauk pilihan seperti ayam goreng, ikan bakar, lalapan segar, dan sambal terasi pedas.',
    price: 54000, 
    priceUnit: '/ porsi',
    image: '/images/menu/04-sunda/01-nasi-timbel.webp',
    badge: 'Rekomendasi', 
    isAvailable: true,
  },
  // Section 5: Sayuran
  {
    id: 111,
    name: 'Kangkung Ebi Balacan',
    category: 'sayuran',
    categoryLabel: 'Sayuran',
    description: 'Kangkung Ebi Balacan segar dengan rasa gurih dan pedas yang menggugah selera.',
    price: 27000,
    priceUnit: '/ porsi',
    image: '/images/menu/05-sayuran/01-kangkung-ebi-balacan.webp',
    badge: 'Rekomendasi',
    isAvailable: true,
  },
  {
    id: 112,
    name: 'Karedok',
    category: 'sayuran',
    categoryLabel: 'Sayuran',
    description: 'Karedok segar dengan rasa gurih dan pedas yang menggugah selera.',
    price: 25000,
    priceUnit: '/ porsi',
    image: '/images/menu/05-sayuran/02-karedok.webp',
    badge: 'Rekomendasi',
    isAvailable: true,
  }
];

// ════════════════════════════════════════════════════════════════════════════
// ④ TESTIMONIALS DATA
// ════════════════════════════════════════════════════════════════════════════

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

export const GALLERY_DATA: GalleryItem[] = [
  { 
    id: 1,  
    image: '/images/venue/01-gallery/entrance.webp', 
    alt: 'Tampak depan Warung Papatong.', 
    category: 'tempat', 
    size: 'large'  
  },
  { 
    id: 2,  
    image: '/images/venue/01-gallery/entrance2.webp', 
    alt: 'Tampak depan Warung Papatong Sunda Seafood dengan area makan semi-outdoor dan akses parkir luas.', 
    category: 'tempat', 
    size: 'medium'  
  },
  { 
    id: 3,  
    image: '/images/venue/02-gallery/wall-of-frame1.webp', 
    alt: 'Spot welcome wall ikonik Warung Papatong dengan mural tropis artistik yang cocok untuk area foto pengunjung.', 
    category: 'tempat', 
    size: 'medium' 
  },
  { 
    id: 4,  
    image: '/images/venue/03-gallery/balon-udara1.webp', 
    alt: 'Spot foto balon udara ikonik Warung Papatong dikelilingi pepohonan tropis dan lampu gantung outdoor.', 
    category: 'tempat', 
    size: 'medium' 
  },
  { 
    id: 5,  
    image: '/images/venue/04-gallery/main-place2.webp', 
    alt: 'Area makan utama semi-outdoor dengan meja panjang luas dan nuansa angin sejuk dan pencahayaan alami.', 
    category: 'tempat', 
    size: 'large'  
  },
  { 
    id: 6,  
    image: '/images/venue/05-gallery/side-place1.webp', 
    alt: 'Interior area makan industrial modern semi outdoor Warung Papatong.', 
    category: 'tempat', 
    size: 'medium' 
  },
  { 
    id: 7,  
    image: '/images/venue/06-gallery/area-lesehan2.webp', 
    alt: 'Area makan lesehan modern dengan konsep terbuka dan suasana santai.', 
    category: 'tempat', 
    size: 'medium' 
  },
  { 
    id: 8,  
    image: '/images/venue/07-gallery/saung-bambu.webp', 
    alt: 'Saung bambu tradisional Warung Papatong lengkap dengan area bermain anak dan nuansa pedesaan asri.', 
    category: 'tempat', 
    size: 'large'  
  },
  { 
    id: 9,  
    image: '/images/venue/08-gallery/wedding4.webp', 
    alt: 'Spot foto pernikahan di Warung Papatong.', 
    category: 'tempat', 
    size: 'medium' 
  },
  { 
    id: 10, 
    image: '/images/venue/09-gallery/pengunjung.webp', 
    alt: 'Foto pengunjung di Spot foto Ikonik Balon Udara', 
    category: 'aktivitas', 
    size: 'medium' 
  },
  { 
    id: 11, 
    image: '/images/venue/09-gallery/pengunjung1.webp', 
    alt: 'Foto pengunjung di Saung Bambu', 
    category: 'aktivitas', 
    size: 'large'  
  },
  { 
    id: 12, 
    image: '/images/venue/09-gallery/pengunjung2.webp', 
    alt: 'Foto pengunjung di Area Makan Utama', 
    category: 'aktivitas', 
    size: 'large'  
  },
  { 
    id: 13, 
    image: '/images/venue/10-gallery/service-waiter.webp', 
    alt: 'Foto pelayan di Warung Papatong', 
    category: 'aktivitas', 
    size: 'medium' 
  },
];

// ════════════════════════════════════════════════════════════════════════════
// ⑨ HERO DATA
// ════════════════════════════════════════════════════════════════════════════

export const HERO_DATA: HeroData = {
  pillBadge:          'Kuliner Sunda & Seafood No. 1 Cibinong',
  headlineText:       'Lezatnya Seafood Segar Berpadu Wanginya Nasi Timbel Sunda Autentik',
  description:        'Ucapkan selamat tinggal pada mengantre lama & kuota kehabisan makan malam! Warung Papatong hadir dengan sistem booking lesehan teratur dan pre-order digital instan untuk rombongan makan Anda.',
  ctaBookingText:     'Booking Tempat Sekarang',
  ctaMenuText:        'Lihat Daftar Menu',
  featuredTodayLabel: 'Spesial Hari Ini',
  kitchenStatusLabel: 'Dapur Aktif',
  kitchenStatusDesc:  'Semua Menu Seafood Lengkap Terjaga',
  stats: {
    rating:        '4.8',
    ratingLabel:   '4K+ Ulasan',
    hours:         '11.00 – 22.00',
    hoursLabel:    'Setiap Hari',
    location:      'Cibinong',
    locationLabel: 'Sentul Area',
  },
  quickLinks: {
    mapsLabel:      'Google Maps',
    instagramLabel: 'Instagram',
  },
  waMessage: 'Halo Admin Warung Papatong, saya ingin tanya info reservasi meja dan menu yang tersedia. Apakah bisa bantu saya?',
};

// ════════════════════════════════════════════════════════════════════════════
// ⑩ AMBIENCE TEASER DATA
// ════════════════════════════════════════════════════════════════════════════

export const AMBIENCE_TEASER_DATA: AmbienceTeaserItem[] = [
  { 
    url: '/images/venue/06-gallery/area-lesehan1.webp', 
    caption: 'Lesehan Semi Outdoor',  
    desc: 'Menikmati makan dengan susana teduh sembari lesehan' 
  },
  { 
    url: '/images/venue/07-gallery/saung-bambu.webp', 
    caption: 'Saung Bambu',    
    desc: 'Lanskap rimbun pepohonan hijau sejuk khas pedesaan Jawa Barat' 
  },
  { 
    url: '/images/venue/03-gallery/balon-udara2.webp', 
    caption: 'Spot Foto Ikonik', 
    desc: 'Spot foto balon udara ikonik Warung Papatong.' 
  },
];

export const AMBIENCE_TEASER_CONTENT: AmbienceTeaserData = {
  badge:       'SUASANA & LINGKUNGAN',
  title:       'Oase Kesejukan Alami di Tengah GOR Pemda',
  description: 'Warung Papatong dirancang khusus memanjakan seluruh pancaindra keluarga Anda. Nikmati perpaduan asri antara saung bilik bambu tradisional, lanskap taman asri, kolam ikan koi segar, hingga semilir angin sejuk yang menyegarkan dahaga kehidupan urban.',
  ctaText:     'Tampilkan Galeri Foto Resto',
  ctaHref:     '/venue',
  brandLabel:  'WARUNG PAPATONG',
};

// ════════════════════════════════════════════════════════════════════════════
// ⑪ BEST SELLERS CONTENT
// ════════════════════════════════════════════════════════════════════════════

export const BEST_SELLERS_CONTENT: BestSellersData = {
  badge:           'MENU PRIMADONA TERLARIS',
  title:           'Menu Terpopuler Rekomendasi Hari Ini',
  description:     'Daftar resep rahasia paling dicari penikmat kuliner di Jabodetabek. Diramu menggunakan resep autentik dapur legendaris Warung Papatong sejak 2018.',
  ctaText:         'Sajian E-Menu Selengkapnya',
  ctaHref:         '/menu',
  detailCtaText:   'Detail & Pesan',
  freshBadgeLabel: 'Bahan Segar Pilihan',
  intervalMs:      30_000,
};

// ════════════════════════════════════════════════════════════════════════════
// ⑫ TESTIMONIALS CONTENT
// ════════════════════════════════════════════════════════════════════════════

export const TESTIMONIALS_CONTENT: TestimonialsData = {
  sectionLabel:  'SUARA KONSUMEN AUTENTIK',
  title:         'Ulasan Kejujuran dari 4.080+ Keluarga di Google Maps',
  description:   'Kepuasan rasa makan keluarga adalah kehormatan bagi kami. Simak penuturan asli dari pelanggan setia setelah berkunjung dan bersantap hangat di saung lesehan Warung Papatong Cibinong.',
  autoPlayMs:    5_500,
  ariaLabelPrev: 'Ulasan Sebelumnya',
  ariaLabelNext: 'Ulasan Selanjutnya',
};

// ════════════════════════════════════════════════════════════════════════════
// ⑬ LOCATION DATA
// ════════════════════════════════════════════════════════════════════════════

export const LOCATION_DATA: LocationData = {
  badge:         'DENGAN AKSES STRATEGIS',
  title:         'Mudah Dijangkau, Berdekatan dengan GOR Pemda',
  description:   'Berlokasi prima di Nanggewer, Cibinong, hanya terpaut beberapa menit dari Exit Toll Sirkuit Sentul. Area kami di tepi jalan raya utama GOR Pemda, menjamin kemudahan manuver putar balik untuk Bus Wisata ataupun rombongan besar.',
  labelAddress:  'Alamat Lengkap',
  labelHours:    'Jam Operasional',
  labelPhone:    'Kontak Seluler Resmi',
  ctaWaText:     'Chat WhatsApp Sekarang',
  ctaMapsText:   'Rute di Google Maps',
  waMessage:     'Halo Admin Resto Warung Papatong, rombongan kami ingin datang dalam waktu dekat. Bisa dibantu infokan meja lesehan yang tersedia?',
  mapsIframeSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.8821948834465!2d106.83078381744384!3d-6.512020895289522!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69c1a8054a7b43%3A0xf582c100380d74a7!2sRESTO%20WARUNG%20PAPATONG%20-%20Cibinong-Bogor!5e0!3m2!1sid!2sid!4v1716301234567!5m2!1sid!2sid',
};

// ════════════════════════════════════════════════════════════════════════════
// ⑭ FAQ SECTION DATA
// ════════════════════════════════════════════════════════════════════════════

export const FAQ_SECTION_DATA: FaqSectionData = {
  sectionLabel:   'PERTANYAAN UMUM (FAQ)',
  title:          'Ragu Terkait Rencana Acara Rombongan Anda?',
  description:    'Berikut rangkuman hal-hal krusial yang paling sering ditanyakan oleh koordinator reuni, sekretaris dinas, dan pengelola arisan keluarga besar sebelum melakukan pemesanan tempat di Warung Papatong Cibinong.',
  calloutTitle:   'Jawaban Belum Menjawab?',
  calloutDesc:    'Punya request istimewa, jumlah rombongan sangat besar, atau butuh bantuan dekorasi khusus? Hubungi admin resmi kami via WhatsApp.',
  calloutCtaText: 'Chat Langsung Sekarang',
  waMessage:      'Halo Admin Warung Papatong, saya ingin bertanya terkait rencana acara rombongan kami.',
};

// ════════════════════════════════════════════════════════════════════════════
// ⑮ GALLERY PAGE DATA
// ════════════════════════════════════════════════════════════════════════════

export const GALLERY_PAGE_DATA: GalleryPageData = {
  badge:              'Lanskap Saung Pasundan',
  title:              'Galeri & Suasana',
  titleAccent:        'Warung Papatong',
  description:        'Menatap kenyamanan saung lesehan semi-outdoor, area keluarga yang luas, hingga atmosfer santai khas Sunda yang membuat pengunjung betah menikmati waktu bersama.',
  filterTabs: [
    { id: 'semua',     label: 'Semua Koleksi'           },
    { id: 'tempat',   label: 'Suasana Resto & Lesehan' },
    { id: 'aktivitas', label: 'Aktivitas & Hidangan'    },
  ],
  expandBtnText:      'Perbesar',
  lightboxTitle:      'Detail Galeri Foto',
  lightboxBackText:   'Kembali ke Koleksi',
  lightboxCloseLabel: 'Tutup galeri',
  estLabel:           'Est.',
  instagramBadge:     'Live Instagram Feed',
  instagramTitle:     'Aktivitas Terbaru dari @{instagram}',
  instagramDesc:      'Intip suasana hangat Warung Papatong mulai dari saung lesehan, live music malam hari, sampai momen seru para pengunjung yang menikmati kebersamaan di setiap sudut restoran.',
  instagramCtaText:   'Kunjungi Instagram Resmi',
  elfsightAppId:      'elfsight-app-f0efd7c9-1075-4d19-aa42-d8afd8399e02',
};

// ════════════════════════════════════════════════════════════════════════════
// ⑲ ABOUT PAGE DATA
// ════════════════════════════════════════════════════════════════════════════

export const ABOUT_CTA_DATA = {
  waMessage:          'Halo Admin Papatong, saya ingin reservasi meja saung lesehan.',

  infoSectionBadge:   'Temukan Kami',
  infoSectionTitle:   'Informasi & Lokasi Warung Papatong',
  infoSectionDesc:    'Kami siap menyambut Anda - dari reservasi dadakan hingga gathering ratusan orang.',

  mapsLabel:          'Buka di Google Maps',
  mapsIframeTitle:    'Lokasi Warung Papatong di Google Maps',
  addressCardTitle:   'Alamat',
  hoursCardTitle:     'Jam Operasional',
  contactCardTitle:   'Hubungi Kami',
  openNowLabel:       'Sedang Buka Sekarang',
  waResponseDesc:     'Respons cepat via WhatsApp - tersedia setiap hari selama jam operasional',

  statsCapacity:      '200+',
  statsCapacityLabel: 'Kursi Kapasitas',
  statsRating:        '4.9★',
  statsRatingLabel:   'Rating Pelanggan',
  statsFoundedLabel:  'Tahun Berdiri',

  ctaBadge:           'Reservasi Online Cepat',
  ctaTitle:           'Kunci Saung Lesehan',
  ctaTitleAccent:     'Favorit Anda Sekarang',
  ctaDesc:            'Amankan lokasi saung lesehan untuk rombongan dinas, arisan keluarga, atau rapat korporat. Potong waktu tunggu dapur dengan pre-order langsung via WhatsApp.',

  waCtaLabel:         'Booking via WhatsApp',
  igCtaLabel:         'Follow Instagram',
  ytCtaLabel:         'Tonton di YouTube',
  ttCtaLabel:         'Ikuti di TikTok',
} as const

export const ABOUT_STORY_DATA = {
  badge:           'Warisan Rasa Sunda & Seafood',
  heroTitle:       'Kisah di Balik',
  heroTitleAccent: 'Saung Papatong',
  heroDesc:        'Dari kecintaan mendalam pada kuliner Parahyangan, Warung Papatong hadir membawa kehangatan saung lesehan terapung di jantung Cibinong sejak 2018.',

  storyImage:      '/images/venue/03-gallery/balon-udara2.webp',
  storyImageAlt:   'Spot foto balon udara Ikonik Warung Papatong',

  storyLabel:      'Sejarah & Tradisi Kuliner',
  storyTitle:      'Warisan Rasa Saung Sunda & Hasil Nelayan Nusantara',

  p1Before:  'Didirikan dengan kecintaan mendalam pada pusaka kuliner Parahyangan,',
  p1Bold:    'Warung Papatong',
  p1After:   'mengawinkan kelembutan timbel tradisional dengan gairah kuliner seafood segar yang diolah langsung pasca-tangkapan kolam.',

  p2Before:  'Nama',
  p2Italic:  'Papatong',
  p2After:   '(artinya capung dalam Bahasa Sunda) dipilih sebagai cerminan harmoni dengan alam terbuka. Di sini, pengunjung tidak hanya bersantap — melainkan mengikat silaturahmi di saung terapung, ditemani gemericik air dan petikan musik akustik live.',

  highlights: [
    {
      title: 'Tradisi Pilihan',
      body:  'Kami hanya memanen ikan segar langsung dari kolam saung sesaat sebelum dinikmati pelanggan.',
    },
    {
      title: 'Bumbu Ulekan Asli',
      body:  'Rempah ditumbuk tradisional tanpa pengawet sintetik — jaminan kesegaran rasa setiap sajian.',
    },
  ],

  blockquote:       'Kebahagiaan paling murni adalah ketika melihat keluarga besar duduk mengitari saung lesehan, tertawa lepas sembari berebut kepiting saus Padang di bawah angin sewayup Papatong.',
  blockquoteAttrib: '~ Keluarga Besar Pengelola Warung Papatong',
  watermarkText:    'TENTANG',
} as const

// ════════════════════════════════════════════════════════════════════════════
// ⑯ NAVBAR DATA
// ════════════════════════════════════════════════════════════════════════════

export const NAVBAR_DATA: NavbarData = {
  ctaDesktopText: 'Pesan Sekarang',
  ctaMobileText:  'Pesan Via WA',
  ctaDrawerText:  'Pesan via WhatsApp',
  waMessage:      'Halo Admin Papatong, saya ingin pesan / tanya menu yang tersedia.',
};

// ════════════════════════════════════════════════════════════════════════════
// ⑰ FOOTER DATA
// ════════════════════════════════════════════════════════════════════════════

export const FOOTER_DATA: FooterData = {
  brandTagline:    'Surganya masakan Sunda autentik dan hidangan seafood segar di Cibinong. Tempat silaturahmi favorit keluarga Jabodetabek sejak',
  colNavLabel:     'Navigasi',
  colContactLabel: 'Hubungi Kami',
  labelAddress:    'Alamat',
  labelPhone:      'Telepon',
  labelEmail:      'Email',
  waMessage:       'Halo Admin Papatong, saya ingin bertanya mengenai reservasi.',
  copyrightSuffix: '· All Rights Reserved.',
};

// ════════════════════════════════════════════════════════════════════════════
// UTILITIES
// ════════════════════════════════════════════════════════════════════════════

/**
 * Format harga produk ke string tampilan Rupiah + satuan.
 * INI adalah satu-satunya fungsi yang boleh dipakai untuk menampilkan
 * harga produk — di UI kartu, di pesan WA, di checkout modal.
 *
 * Contoh output:
 *   price: 52000, priceUnit: '/ porsi'  → 'Rp 52.000 / porsi'
 *   price: 34000, priceUnit: '/ ons'    → 'Rp 34.000 / ons'
 *   price: 120000, priceUnit: undefined → 'Rp 120.000'
 */
export const formatProductPrice = (
  product: Pick<Product, 'price' | 'priceUnit'>
): string => {
  const base = `Rp ${product.price.toLocaleString('id-ID')}`;
  return product.priceUnit ? `${base} ${product.priceUnit}` : base;
};

/** Bangun URL WhatsApp dengan pesan pre-filled. */
export const buildWALink = (phone: string, message: string): string =>
  `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

/**
 * Format angka mentah ke Rupiah — untuk nilai yang BUKAN dari Product.price
 * (contoh: subtotal keranjang, total kalkulasi, bukan harga satuan produk).
 * Untuk harga produk, selalu gunakan formatProductPrice().
 */
export const formatPrice = (price: number): string =>
  `Rp ${price.toLocaleString('id-ID')}`;

/** Hitung total harga dari array item keranjang pre-order. */
export const calculateBasketTotal = (
  items: Array<{ price: number; quantity: number }>
): number => items.reduce((sum, item) => sum + item.price * item.quantity, 0);