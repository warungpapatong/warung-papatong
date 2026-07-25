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
// ② PRODUCTS DATA       — daftar menu lengkap
// ③ TESTIMONIALS DATA   — ulasan pelanggan untuk seksi Testimonials
// ④ FAQS DATA           — pertanyaan umum untuk seksi FAQ
// ⑤ GALLERY DATA        — item galeri untuk halaman Venue/Gallery
// ⑥ STEPS DATA          — langkah-langkah booking
// ⑦ TEAM DATA           — profil tim restoran
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
// ════════════════════════════════════════════════════════════════════════════
// LINKS
// ════════════════════════════════════════════════════════════════════════════

export const FULL_MENU_PDF_URL = 'https://drive.google.com/file/d/1nUGidEczIAhZNUIEswCxknBtElb7yRcP/view'

// ─── UTILITIES ───────────────────────────────────────────────────────────────
//
// formatProductPrice()   — format harga produk ke Rupiah + satuan (SINGLE SOURCE)
// buildWALink()          — bangun URL WhatsApp dengan pesan pre-filled
// formatPrice()          — format angka mentah ke Rupiah (tanpa satuan)
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
  NavItem,
  Product,
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
  mapsLink:    'https://www.google.com/maps/place/RESTO+WARUNG+PAPATONG+-+Cibinong-Bogor/@-6.5116855,106.8321302,924m/data=!3m1!1e3!4m6!3m5!1s0x2e69c1a8054a7b43:0xf582c100380d74a7!8m2!3d-6.5120209!4d106.8329725!16s%2Fg%2F11h12xm87x?entry=ttu&g_ep=EgoyMDI2MDYxMC4wIKXMDSoASAFQAw%3D%3D',
  founded:     '2019',
};

// ════════════════════════════════════════════════════════════════════════════
// ② STATS DATA
// ════════════════════════════════════════════════════════════════════════════



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
  { id: 'minuman',         label: 'Minuman Segar'   },
  { id: 'snacks',          label: 'Snack & Camilan' },
] as const

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
    description: 'Cumi segar yang dibakar sempurna hingga menghadirkan aroma smoky yang khas. Dibalut dengan karamelisasi saus kecap manis gurih dan racikan rempah tradisional, setiap gigitannya menawarkan tekstur cumi yang empuk, juicy, dan tidak alot. Sebuah perpaduan rasa manis, gurih, dan aroma panggangan yang siap memanjakan lidah Anda.Cumi segar yang dibakar sempurna hingga menghadirkan aroma smoky yang khas. Dibalut dengan karamelisasi saus kecap manis gurih dan racikan rempah tradisional, setiap gigitannya menawarkan tekstur cumi yang empuk, juicy, dan tidak alot. Sebuah perpaduan rasa manis, gurih, dan aroma panggangan yang siap memanjakan lidah Anda.',
    price: 69000, 
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
    description: 'Hadirkan atmosfer pesisir Bali langsung ke meja makan Anda. Hidangan ini memadukan kepiting segar pilihan berukuran besar yang kaya akan daging manis nan lembut, dengan siraman saus Jimbaran otentik yang legendaris. Menghasilkan perpaduan rasa gurih, sedikit manis, dan jejak pedas yang hangat. Setiap gigitannya menawarkan kemewahan rasa bumbu yang meresap sempurna hingga ke dalam.',
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
    description: 'Nikmati Pesta Seafood dalam satu menu! Perpaduan harmoni dari berbagai jenis kerang segar pilihan—mulai dari kerang dara, kerang hijau, kerang tahu, kerang bambu & kerang kampak. Semuanya dimasak sempurna Bersama jagung manis dan disiram dengan pilihan saus premium.',
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
    description: 'Ikan Kuwe segar pilihan yang dikenal memiliki daging tebal, padat, namun tetap lembut dibakar di atas bara api hingga memicu aroma smoky yang menggoda. Disempurnakan dengan olesan bumbu Jimbaran otentik yang kaya akan rempah. Hidangan eksotis yang menghadirkan cita rasa manis alami ikan dan gurihnya bumbu pesisir Bali di setiap gigitan.',
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
    description: 'Nikmati puncak kemewahan hidangan laut. Lobster laut segar pilihan dengan karakteristik daging yang tebal, padat, dan memiliki rasa manis alami yang khas, disajikan bersama siraman saus Jimbaran otentik, melahirkan cita rasa gurih-manis. Sebuah mahakarya kuliner pesisir yang siap memberikan pengalaman bersantap tak terlupakan.',
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
    description: 'Manjakan diri Anda dengan kemewahan hidangan laut kelas atas. Menu ini menghadirkan lobster laut segar dengan daging yang tebal, padat, dan manis alami, dibalut secara merata oleh saus telur asin (salted egg) premium yang gurih dan bertekstur creamy. Sentuhan daun kari aromatik dan sedikit cabai memberikan keseimbangan rasa yang sempurna menciptakan simfoni rasa gurih, manis, dan sedikit pedas yang meleleh di setiap gigitan.',
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
    description: 'Ikan gurame segar pilihan digoreng garing hingga renyah di luar namun tetap lembut di dalam. Hidangan ini disempurnakan dengan siraman kuah pecak hangat yang kaya rempah. Menghadirkan simfoni rasa pedas, gurih, dan asam segar yang membangkitkan selera makan Anda sejak suapan pertama.',
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
    description: 'Nikmati mahakarya kuliner yang memadukan keindahan seni penyajian dan kelezatan rasa. Ikan gurame segar pilihan difillet dengan teknik khusus hingga kedua sisinya melebar menyerupai sayap yang sedang mengepak, lalu digoreng deep-fry hingga mencapai tingkat kerenyahan emas yang sempurna. Menghadirkan tekstur luar yang luar biasa renyah (crispy) namun tetap menjaga kelembutan dan rasa manis alami daging ikan di dalamnya.',
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
    description: 'Rasakan kelezatan legendaris hidangan klasik Chinese-Indonesian. Dadar telur premium yang tebal, digoreng sempurna hingga menghasilkan tekstur luar yang garing (crispy) namun tetap lembut dan padat di dalam. Diperkaya dengan isian daging ayam cincang, serta sayuran segar yang memberikan sensasi crunchy. Disajikan mewah dengan siraman saus asam manis kemerahan yang kental, lengkap dengan taburan kacang polong segar yang menggugah selera.',
    price: 38000, 
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
    description: 'Rasakan kehangatan tradisi kuliner tatar Sunda dalam seporsi Nasi Timbel Otentik. Nasi putih pulen yang dibungkus dengan daun pisang selagi panas, menghasilkan aroma harum yang khas dan menggugah selera saat dibuka. Disajikan lengkap bersama ayam goreng/bakar bumbu kuning yang meresap, tahu dan tempe goreng, ikan asin renyah, serta kesegaran lalapan khas pasundan. Kelezatannya disempurnakan oleh cocolan Sambal Terasi Dadak yang pedas menggigit. Hidangan bersahaja dengan cita rasa luar biasa.',
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
    description: 'Nikmati kesegaran sayur kangkung pilihan yang ditumis dengan teknik api besar (wok-hei) untuk mengunci warna hijau alami dan tekstur crunchy-nya yang khas. Hidangan ini dibalut dengan bumbu belacan (terasi) otentik yang harum dan gurih, lalu disempurnakan dengan taburan ebi (udang kering) berkualitas yang melimpah. Menghadirkan harmoni rasa gurih, sedikit pedas, dan aroma gurih laut yang memikat di setiap suapan',
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
    description: 'Hidangan sehat ini menyajikan perpaduan sayuran mentah segar pilihan—mulai dari kacang panjang, kol, taoge, terong gelatik, ketimun, hingga daun kemangi yang harum. Semua sayuran dipotong dadakan dan disiram dengan saus kacang legendaris yang diulek mentah bersama kencur, cabai, dan gula aren asli. Menghadirkan harmoni rasa gurih, pedas, sedikit manis, dan sensasi renyah (crunchy) yang murni di setiap gigitan.',
    price: 26000,
    priceUnit: '/ porsi',
    image: '/images/menu/05-sayuran/02-karedok.webp',
    badge: 'Rekomendasi',
    isAvailable: true,
  },
  {
    id: 113,
    name: 'Udang Goreng Bawang',
    category: 'seafood',
    categoryLabel: 'Seafood',
    description: 'Perpaduan sempurna antara udang segar pilihan yang digoreng hingga kuning keemasan, menghasilkan tekstur luar yang crispy namun tetap lembut dan manis di dalam. Dibalut dengan limpahan bawang putih cincang gurih yang ditumis hingga matang sempurna dan bumbu rahasia yang meresap. Setiap gigitan menawarkan harmoni rasa gurih, asin, dan aroma harum bawang yang memikat selera.',
    price: 58000,
    priceUnit: '/ porsi',
    image: '/images/menu/01-seafood/07-udang-goreng-bawang.webp',
    badge: 'Rekomendasi',
    isAvailable: true,
  },
  {
    id: 114,
    name: 'Aneka Minuman Segar',
    category: 'minuman',
    categoryLabel: 'Minuman',
    description:
      'Warung Papatong menyediakan berbagai pilihan minuman untuk segala selera, mulai dari minuman segar berbasis buah, squash, dan mocktail hingga kopi, teh, dan minuman spesial lainnya.',
    price: 5000,
    priceUnit: '- Rp. 29.000',
    image: '/images/menu/06-minuman/01-minuman-segar.webp',
    badge: 'Rekomendasi',
    isAvailable: true,
  },
  {
    id: 115,
    name: 'Aneka Snack & Camilan',
    category: 'snacks',
    categoryLabel: 'Snack & Camilan',
    description:
      'Nikmati berbagai pilihan snack dan camilan favorit Warung Papatong, mulai dari Kentang Goreng, Singkong Goreng, Cireng Goreng, Sosis, Pisang Lumer, Chicken Nugget, hingga Mix Platter yang cocok dinikmati sebagai teman bersantai maupun untuk berbagi bersama keluarga dan teman.',
    price: 20000,
    priceUnit: '- Rp. 45.000',
    image: '/images/menu/07-snacks/01-aneka-snacks.webp',
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
    product: 'Cumi Goreng Mentega & Baronang Bakar',
  },
  {
    id: 2, name: 'Novianty Wongso', city: 'Cibinong, Bogor (Local Guide)', rating: 5,
    review: 'Coba Warung Papatong karena lihat rating Google yang tinggi ternyata memang tidak mengecewakan! Gurame Telur Asin, Udang Peci Saus Padang, Soka Lada Hitam, dan Cumi Bakar Lumpur semuanya mantap berani bumbu. Pelayanan cepat dan memuaskan.',
    product: 'Gurame Telur Asin & Udang Peci Saus Padang',
  },
  {
    id: 3, name: 'Vanny Firki', city: 'Bogor (Local Guide)', rating: 5,
    review: 'Pertama kali kesini, makanan yang saya pesan semuanya enak, tidak ada yang gagal. Mantap sekali! Ajak keluarga kesini sangat recommended. Cocok untuk semua ukuran grup.',
    product: 'Paket Bancakan Rombongan',
  },
  {
    id: 4, name: 'Nadi Ekawati', city: 'Cibinong, Bogor', rating: 5,
    review: 'Baru pertama kali dateng kesini terus nyarinya cuma Google doang terus ternyata malah dapet hidden gem!!! Ikan bakar kerapu bumbu jimbaran SANGAT RECOMENDED!!!! Enak bgt plus kangkung taucooo masyaallah, definitely will come back!',
    product: 'Ikan Kerapu Bakar Jimbaran & Kangkung Tauco',
  },
  {
    id: 5, name: 'Teddy Fazri', city: 'Cibinong (Local Guide)', rating: 5,
    review: 'Makanan Enak, harga terjangkau, ramah anak juga tempatnya, ada playground dan ada saung di bawah... Ayam bakar dan udang nya mantap! Gurame asem manis, kepiting saus jimbaran, kerapu bakar jimbaran semuanya top markotop.',
    product: 'Kepiting & Udang Saus Padang',
  },
  {
    id: 6, name: 'Rebecca Indriyani', city: 'Bogor', rating: 5,
    review: 'Makanannya enak enak, pesen gurame asam manis, sapo tahu, fuyunghai semua bumbunya terasa berani bumbu, tempatnya juga nyaman bersih.. pokoknya mantappp!',
    product: 'Gurame Asam Manis & Sapo Tahu',
  },
  {
    id: 7, name: 'S Herman', city: 'Cibinong, Bogor', rating: 5,
    review: 'Makanan nya semua enak... rasa juga enak.., pelayanan cepat dan memuaskan, recommended buat semua keluarga yang mau makan disini... mantappp!',
    product: 'Lalapan & Ayam Goreng Serundeng',
  },
  {
    id: 8, name: 'Shena Ardyanti', city: 'Bogor (Local Guide)', rating: 5,
    review: 'Makanan nya enak-enak, tempatnya strategis banget pinggir jalan raya, dan harganya OK. Tenang sehingga mudah untuk bicara santai. Waktu tunggu sekitar 10-30 menit.',
    product: 'Sapo Tahu Special Papatong',
  },
  {
    id: 9, name: 'Ajeng Maharani', city: 'Cibinong, Bogor (Local Guide)', rating: 5,
    review: 'Makanannya enak banget rasanya, pelayanan nya ramah-ramah baik. Resto nya ada tempat permainan anak-anak jadi anak-anak bisa bermain sambil menunggu pesanan datang. Sangat cocok buat bawa balita.',
    product: 'Nasi Timbel Komplet & Area Playground',
  },
  {
    id: 10, name: 'Erni Herningsih', city: 'Sentul (Local Guide)', rating: 5,
    review: 'Tempatnya lumayan luas. Bisa buat makan keluarga besar atau gathering kantor. Makanan nya ok dan enak.',
    product: 'Ayam Goreng Serundeng Lengkuas',
  },
  {
    id: 11, name: 'Purniawan Abudaffa', city: 'Bogor', rating: 5,
    review: 'Makanan nya enak.. sayurnya juga masih seger-seger bgt... mantap... pelayanannya dari staf ramah serta sigap.',
    product: 'Tumis Genjer & Kerang Cabe Ijo',
  },
  {
    id: 12, name: 'Hendry Hanapi', city: 'Jakarta (Local Guide)', rating: 5,
    review: 'Tempat lumayan nyaman (makan sore - malam). Untuk rombongan dewasa 8 orang, anak-anak 7 orang makanannya sangat cukup dan kenyang. Semua bahan segar dan overall masakan good taste dan terong baladonya istimewa!',
    product: 'Liwetan Berlima & Terong Balado',
  },
]

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
    image: '/images/venue/01-gallery/new-entrance.webp', 
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
    image: '/images/menu/01-seafood/01-cumi-bakar-kecap.webp', 
    alt: 'Cumi Bakar Kecap Warung Papatong.', 
    category: 'makanan', 
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
    image: '/images/menu/02-ikan-air-tawar/01-gurame-pecak.webp', 
    alt: 'Gurame Pecak Warung Papatong.', 
    category: 'makanan', 
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
    image: '/images/venue/07-gallery/saung-bambu2.webp', 
    alt: 'Saung bambu tradisional Warung Papatong.', 
    category: 'tempat', 
    size: 'medium' 
  },
  { 
    id: 9, 
    image: '/images/venue/09-gallery/pengunjung3.webp', 
    alt: 'Foto pengunjung di Area Makan Utama', 
    category: 'aktivitas', 
    size: 'large'  
  },
  { 
    id: 10,  
    image: '/images/menu/04-sunda/01-nasi-timbel.webp', 
    alt: 'Nasi Timbel Sunda Warung Papatong.', 
    category: 'makanan', 
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
    image: '/images/menu/01-seafood/06-lobster-telur-asin.webp', 
    alt: 'Lobster Telur Asin Warung Papatong.', 
    category: 'makanan', 
    size: 'medium' 
  },
  { 
    id: 13, 
    image: '/images/venue/09-gallery/pengunjung2.webp', 
    alt: 'Foto pengunjung di Area Makan Utama', 
    category: 'aktivitas', 
    size: 'large'  
  },
  { 
    id: 14,  
    image: '/images/menu/05-sayuran/01-kangkung-ebi-balacan.webp', 
    alt: 'Kangkung Ebi Balacan Warung Papatong.', 
    category: 'makanan', 
    size: 'medium' 
  },
  { 
    id: 15, 
    image: '/images/venue/09-gallery/pengunjung.webp', 
    alt: 'Foto pengunjung di Spot foto Ikonik Balon Udara', 
    category: 'aktivitas', 
    size: 'medium' 
  },
  { 
    id: 16, 
    image: '/images/venue/10-gallery/service-waiter.webp', 
    alt: 'Foto pelayan di Warung Papatong', 
    category: 'aktivitas', 
    size: 'medium' 
  },
  { 
    id: 17,  
    image: '/images/venue/03-gallery/playground-atas.webp', 
    alt: 'Tempat bermain anak di Warung Papatong', 
    category: 'tempat', 
    size: 'medium' 
  },
  { 
    id: 18,  
    image: '/images/venue/03-gallery/playground-bawah.webp', 
    alt: 'Tempat bermain anak di dekat saung bambu Warung Papatong', 
    category: 'tempat', 
    size: 'medium' 
  },
    { 
    id: 19,  
    image: '/images/venue/03-gallery/kolam-ikan.webp', 
    alt: 'Kolam ikan koi segar di Warung Papatong', 
    category: 'tempat', 
    size: 'medium' 
  },
  { 
    id: 20,  
    image: '/images/venue/07-gallery/saung-bambu1.webp', 
    alt: 'Tampak dalam saung bambu Warung Papatong', 
    category: 'tempat', 
    size: 'medium' 
  },
];

// ════════════════════════════════════════════════════════════════════════════
// ⑨ HERO DATA
// ════════════════════════════════════════════════════════════════════════════

export const HERO_DATA: HeroData = {
  pillBadge:          'Kuliner Sunda & Seafood No. 1 Cibinong',
  headlineText:       'Rasakan Sensasi Sunda dan Segarnya Seafood di Tengah Sejuknya Bogor!',
  description:        'Selamat datang di tempat di mana kelezatan tradisi Sunda bertemu dengan kesegaran hidangan laut pilihan. Dengan konsep semi-outdoor yang asri dan deretan saung yang nyaman, kami siap menjadi ruang berkumpul terbaik untuk keluarga, sahabat, hingga acara besar Anda. Yuk, sejenak lepas penat dan nikmati momen hangat bersama kami! Booking sekarang juga!',
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
    url: '/images/venue/06-gallery/area-lesehan2.webp', 
    caption: 'Lesehan Semi Outdoor',  
    desc: 'Menikmati makan dengan susana teduh sembari lesehan' 
  },
  { 
    url: '/images/venue/07-gallery/saung-bambu2.webp', 
    caption: 'Saung Bambu',    
    desc: 'Lanskap rimbun pepohonan hijau sejuk khas pedesaan Cibinong' 
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
  ctaText:         'Sajian Menu Selengkapnya',
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
    { id: 'aktivitas', label: 'Aktivitas Resto'    },
    { id: 'makanan',  label: 'Sajian Makanan'     },
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
  waMessage:
    'Halo Admin Warung Papatong, saya ingin melakukan reservasi.',

  infoSectionBadge:
    'Kontak & Lokasi',

  infoSectionTitle:
    'Kunjungi Warung Papatong',

  infoSectionDesc:
    'Nikmati masakan Sunda autentik dan seafood segar dalam suasana semi-outdoor yang nyaman di Cibinong.',

  mapsLabel:
    'Buka di Google Maps',

  mapsIframeTitle:
    'Lokasi Warung Papatong',

  addressCardTitle:
    'Alamat',

  hoursCardTitle:
    'Jam Operasional',

  contactCardTitle:
    'Hubungi Kami',

  openNowLabel:
    'Buka Setiap Hari',

  waResponseDesc:
    'Reservasi dan informasi tersedia melalui WhatsApp selama jam operasional.',

  statsCapacity:
    '200+',

  statsCapacityLabel:
    'Kapasitas Tamu',

  statsFounded:
    '2019',

  statsFoundedLabel:
    'Tahun Berdiri',

  statsRating:
    '4.8',

  statsRatingLabel:
    'Rating Google',

  ctaBadge:
    'Reservasi Mudah',

  ctaTitle:
    'Rayakan Momen',

  ctaTitleAccent:
    'Bersama Kami',

  ctaDesc:
    'Mulai dari makan keluarga, arisan, gathering perusahaan, hingga acara spesial lainnya. Reservasikan tempat Anda dan nikmati suasana khas Warung Papatong.',

  waCtaLabel:
    'Reservasi WhatsApp',

  igCtaLabel:
    'Instagram',

  ytCtaLabel:
    'YouTube',

  ttCtaLabel:
    'TikTok',
} as const

export const ABOUT_STORY_DATA = {
  badge:           'Kuliner Sunda & Seafood Sejak 2019',

  heroTitle:       'Cerita di Balik',
  heroTitleAccent: 'Warung Papatong',

  heroDesc:
    'Berdiri sejak tahun 2019 di kawasan Cibinong, Warung Papatong menghadirkan perpaduan cita rasa khas Sunda dan seafood segar dalam suasana semi-outdoor yang nyaman untuk keluarga, sahabat, dan berbagai acara kebersamaan.',

  storyImage:      '/images/venue/03-gallery/balon-udara2.webp',
  storyImageAlt:   'Suasana Warung Papatong',

  storyLabel:      'Tentang Kami',

  storyTitle:
    'Menghadirkan Kehangatan Kuliner Nusantara dalam Suasana Asri',

  p1Before:
    'Berawal dari kecintaan terhadap kekayaan kuliner Nusantara, khususnya masakan Sunda dan seafood segar,',

  p1Bold:
    ' Warung Papatong ',

  p1After:
    'hadir sebagai tempat berkumpul yang mengutamakan kualitas rasa, kenyamanan suasana, dan pengalaman bersantap yang berkesan bagi setiap pengunjung.',

  p2Before:
    'Nama',

  p2Italic:
    ' Papatong ',

  p2After:
    '(capung dalam bahasa Sunda) dipilih sebagai simbol keberuntungan, kelincahan, dan keharmonisan dengan alam. Filosofi tersebut tercermin dalam konsep semi-outdoor kami yang memadukan suasana terbuka, udara segar, serta nuansa alami yang menenangkan.',

  highlights: [
    {
      title: 'Masakan Sunda Otentik',
      body:
        'Menyajikan berbagai hidangan khas Sunda dengan cita rasa tradisional yang dijaga secara konsisten oleh tim dapur berpengalaman.',
    },
    {
      title: 'Seafood Segar Berkualitas',
      body:
        'Menggunakan bahan baku seafood pilihan yang dipasok secara rutin untuk menjaga kualitas, kesegaran, dan kelezatan setiap sajian.',
    },
    {
      title: 'Tempat untuk Kebersamaan',
      body:
        'Dengan kapasitas hingga 200 orang dan area Floor, Lesehan, Café, serta Saung, Warung Papatong menjadi pilihan ideal untuk keluarga, komunitas, maupun gathering perusahaan.',
    },
  ],

  blockquote:
    'Kami percaya bahwa makanan terbaik bukan hanya tentang rasa, tetapi juga tentang kebersamaan yang tercipta di setiap meja.',

  blockquoteAttrib:
    '~ Warung Papatong',

  watermarkText:
    'PAPATONG',
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
// NAV ITEMS
// ════════════════════════════════════════════════════════════════════════════

export const NAV_ITEMS: NavItem[] = [
  { label: 'Beranda',         href: '/' },
  { label: 'Menu Kami',       href: '/menu' },
  { label: 'Galeri & Suasana', href: '/venue' },
  { label: 'Tentang Kami',    href: '/about' },
] as const;

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

