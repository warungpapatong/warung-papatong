import { BusinessInfo, Product, Testimonial, FAQItem, GalleryItem, Stat, Step } from './types';

export const BUSINESS_INFO: BusinessInfo = {
  name: "Warung Papatong",
  tagline: "Tempat Makan Sunda & Seafood Rekomendasi di Cibinong",
  description: "Menggabungkan cita rasa kuliner Sunda autentik yang gemah ripah dengan kesegaran seafood istimewa. Nikmati area lesehan semi-outdoor yang asri, panggung live music, serta parkir luas yang ramah rombongan besar.",
  phone: "0813-8849-7651",
  wa: "6281388497651",
  address: "Jl. Alternatif GOR Pemda No.9, Nanggewer, Kec. Cibinong, Kabupaten Bogor, Jawa Barat 16912",
  city: "Cibinong, Bogor",
  hours: "Setiap Hari, 11:00 - 22:00 WIB",
  instagram: "warungpapatong",
  tiktok: "warungpapatong",
  email: "warungpapatong.cibinong@gmail.com",
  mapQuery: "RESTO+WARUNG+PAPATONG+-+Cibinong-Bogor",
  mapsLink: "https://www.google.com/maps/place/RESTO+WARUNG+PAPATONG+-+Cibinong-Bogor/@-6.5120209,106.8329725,17z/data=!3m1!4b1!4m6!3m5!1s0x2e69c1a8054a7b43:0xf582c100380d74a7!8m2!3d-6.5120209!4d106.8329725!16s%2Fg%2F11h12xm87x",
  founded: "2018"
};

export const STATS_DATA: Stat[] = [
  {
    value: 4.8,
    suffix: "★★★★★",
    label: "Rating Google Maps",
    description: "Dari total 4.076+ ulasan autentik kuliner keluarga."
  },
  {
    value: 4000,
    suffix: "+",
    label: "Ulasan Google",
    description: "Ulasan dari pelanggan setia Jabodetabek."
  },
  {
    value: 50,
    suffix: "+",
    label: "Kapasitas Meja & Lesehan",
    description: "Sangat luas untuk kumpul keluarga & reuni kantor."
  },
  {
    value: 98,
    suffix: "%",
    label: "Tingkat Kepuasan",
    description: "Pelayanan ramah berkelas restoran bintang lima."
  }
];

export const PRODUCTS_DATA: Product[] = [
  {
    id: 1,
    name: "Kepiting Jumbo Saus Padang Istimewa",
    category: "seafood",
    categoryLabel: "Seafood Olahan",
    description: "Kepiting soka segar berukuran besar yang disiram saus Padang kental pedas manis beraroma rempah. Menu primadona untuk makan tengah keluarga.",
    price: 135000,
    priceFormatted: "Rp 135.000",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&h=600&fit=crop&q=80",
    badge: "Terlaris",
    waMessage: "Halo Resto Warung Papatong, saya ingin memesan menu 'Kepiting Jumbo Saus Padang Istimewa' untuk pre-order rombongan kami.",
    isAvailable: true
  },
  {
    id: 2,
    name: "Paket Nasi Timbel Sunda Lengkap",
    category: "sunda",
    categoryLabel: "Paket Sunda",
    description: "Nasi timbel wangi yang dibungkus daun pisang, disajikan bersama ayam goreng kampung, tahu-tempe goreng, kelapa serundeng, lalapan segar, serta sambal dadak.",
    price: 55000,
    priceFormatted: "Rp 55.000",
    image: "https://images.unsplash.com/photo-1541832676-9b763b0239ab?w=600&h=600&fit=crop&q=80",
    badge: "Rekomendasi",
    waMessage: "Halo Resto Warung Papatong, saya tertarik dengan 'Paket Nasi Timbel Sunda Lengkap'.",
    isAvailable: true
  },
  {
    id: 3,
    name: "Udang Windu Bakar Madu Sembur",
    category: "seafood",
    categoryLabel: "Seafood Olahan",
    description: "Udang windu segar ukuran besar yang dibakar di atas arang batu dengan polesan madu hutan murni dan bumbu kuning khas Papatong.",
    price: 95000,
    priceFormatted: "Rp 95.000",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&h=600&fit=crop&q=80",
    waMessage: "Halo Resto Warung Papatong, saya mau pesan 'Udang Windu Bakar Madu Sembur' dlm porsi rombongan.",
    isAvailable: true
  },
  {
    id: 4,
    name: "Gurame Terbang Saus Asam Manis",
    category: "seafood",
    categoryLabel: "Seafood Olahan",
    description: "Ikan Gurame hidup seberat 600 gram digoreng garing berbentuk sayap membentang, disiram dengan saus asam manis nanas yang segar merona.",
    price: 85000,
    priceFormatted: "Rp 85.000",
    image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=600&h=600&fit=crop&q=80",
    badge: "Terlaris",
    waMessage: "Halo Resto Warung Papatong, tolong siapkan 'Gurame Terbang Saus Asam Manis' untuk pre-order kami.",
    isAvailable: true
  },
  {
    id: 5,
    name: "Cumi Goreng Tepung Krispi Papatong",
    category: "seafood",
    categoryLabel: "Seafood Olahan",
    description: "Cumi ring segar dilapisi tepung bumbu rahasia bertekstur super renyah di luar dan tetap lembut di dalam. Sangat disukai anak-anak.",
    price: 68000,
    priceFormatted: "Rp 68.000",
    image: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=600&h=600&fit=crop&q=80",
    badge: "Baru",
    waMessage: "Halo Resto Warung Papatong, saya mau order 'Cumi Goreng Tepung Krispi Papatong' utk porsi pre-order.",
    isAvailable: true
  },
  {
    id: 6,
    name: "Ayam Bakar Taliwang Kampung",
    category: "sunda",
    categoryLabel: "Paket Sunda",
    description: "Setengah ekor Ayam Kampung muda dipanggang dengan baluran bumbu pedas manis gurih membakar lidah, sangat pas disandingkan dengan plecing kangkung.",
    price: 65000,
    priceFormatted: "Rp 65.000",
    image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=600&h=600&fit=crop&q=80",
    waMessage: "Halo Resto Warung Papatong, tolong masukkan 'Ayam Bakar Taliwang Kampung' ke dalam reservasi meja kami.",
    isAvailable: true
  },
  {
    id: 7,
    name: "Sayur Asem Sunda Asli GOR Pemda",
    category: "sayur",
    categoryLabel: "Menu Pendamping",
    description: "Sup kuah asam manis gurih berisi labu siam, nangka muda, kacang panjang, melinjo, jagung manis, dan kacang tanah. Disajikan panas beruap.",
    price: 18000,
    priceFormatted: "Rp 18.000",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=600&h=600&fit=crop&q=80",
    waMessage: "Halo Resto Warung Papatong, saya ingin tambah menu 'Sayur Asem Sunda' di pre-order makanan kami.",
    isAvailable: true
  },
  {
    id: 8,
    name: "Tumis Kangkung Belacan Panas",
    category: "sayur",
    categoryLabel: "Menu Pendamping",
    description: "Sayur kangkung hijau segar yang ditumis kilat dengan api besar, dipadukan terasi Udang Cirebon premium beraroma menggugah selera.",
    price: 22000,
    priceFormatted: "Rp 22.000",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600&h=600&fit=crop&q=80",
    waMessage: "Halo Resto Warung Papatong, mau pesan 'Tumis Kangkung Belacan' untuk melengkapi santapan kami.",
    isAvailable: true
  },
  {
    id: 9,
    name: "Kelapa Muda Segar Batokan",
    category: "minuman",
    categoryLabel: "Aneka Minuman",
    description: "Satu buah kelapa muda utuh pilihan yang disajikan dingin. Air kelapa murni yang menyegarkan dahaga setelah menyantap sajian pedas saus Padang.",
    price: 25000,
    priceFormatted: "Rp 25.000",
    image: "https://images.unsplash.com/photo-1553177595-4de2bb0842b9?w=600&h=600&fit=crop&q=80",
    waMessage: "Halo Resto Warung Papatong, saya mau kelapa muda segar batokan sebagai minuman pre-order kami.",
    isAvailable: true
  },
  {
    id: 10,
    name: "Es Jeruk Peras Gula Aren",
    category: "minuman",
    categoryLabel: "Aneka Minuman",
    description: "Jeruk peras segar alami yang dipadukan dengan lelehan sirup gula aren organic asli dan es batu dingin, manis madu berpadu rasa asam jeruk segar.",
    price: 18000,
    priceFormatted: "Rp 18.000",
    image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=600&h=600&fit=crop&q=80",
    waMessage: "Halo Resto Warung Papatong, saya pre-order 'Es Jeruk Peras Gula Aren'.",
    isAvailable: true
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 1,
    name: "Budi Hermawan",
    city: "Sentul, Bogor",
    rating: 5,
    review: "Kami datang membawa rombongan kantor 22 orang hari Sabtu malam. Untungnya sudah pre-order Kepiting Saus Padang dan Gurame via web interaktif ini! Begitu kami sampai, makanan langsung disajikan dalam 10 menit tanpa harus antre berjam-jam. Area lesehan luar biasa asri dan live music-nya ramah di telinga.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&q=80",
    product: "Kepiting Jumbo Saus Padang Istimewa"
  },
  {
    id: 2,
    name: "Dewi Lestari",
    city: "Cibinong Indah, Bogor",
    rating: 5,
    review: "Warung Papatong ini selalu jadi rujukan utama kalau keluarga besar datang dari Purwakarta. Rasa Nasi Timbel-nya Sunda totok asli, dan kepitingnya segar sekali tidak bau amis lambat saji. Paling krusial adalah websitenya sekarang sangat canggih, bisa reservasi lesehan favorit anak-anak dekat pojok kolam ikan!",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&q=80",
    product: "Paket Nasi Timbel Sunda Lengkap"
  },
  {
    id: 3,
    name: "Hartono Kusuma",
    city: "Cibubur, Jakarta Timur",
    rating: 5,
    review: "Sering mampir selepas exit toll Sentul sepulang wisata Bogor. Rekomendasi Udang windu bakar madunya juara dunia manis gurihnya meresap tajam ke kulit cangkang. Adanya fitur cek stock real-time di web ini sangat menolong kami yang datang larut malam di jam 9, jadi tidak kecewa ada menu kosong favorit.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&q=80",
    product: "Udang Windu Bakar Madu Sembur"
  }
];

export const FAQS_DATA: FAQItem[] = [
  {
    id: 1,
    question: "Apakah dikenakan biaya tambahan / Down Payment (DP) untuk booking tempat?",
    answer: "Untuk pemesanan meja rombongan biasa (<10 orang), pendaftaran reservasi di web ini 100% gratis tanpa DP. Untuk acara kumpul besar (Gathering Kantor, Ulang Tahun, Reuni >20 orang) dengan pre-order banquet melimpah, tim admin kami akan mengkonfirmasi tanda jadi komitmen (DP) minimal 20% demi kelancaran persiapan dapur."
  },
  {
    id: 2,
    question: "Bagaimana jika ada menu makanan yang kami pre-order ternyata habis di dapur?",
    answer: "Kami mengintegrasikan 'Live Stock Board' dapur kami dengan menu digital di situs web ini. Jika ketersediaan bahan seafood menipis, status menu di web akan otomatis beralih menjadi 'Terbatas'. Apabila telah terlanjur booking dan stok mendadak kosong, tim admin kami akan segera menghubungi Anda via WhatsApp maksimal 1 jam sebelum kunjungan untuk menawarkan alternatif menu serupa."
  },
  {
    id: 3,
    question: "Apakah tersedia area lesehan outdoor dan ruang VIP ber-AC?",
    answer: "Ya, kami memiliki variasi area duduk yang super luas! Kami menawarkan 'Lesehan Outdoor Asri' di atas kolam ikan koi, 'Saung Bambu Keluarga', 'Meja Tengah Semi-Outdoor' dekat panggung live music, serta 'VIP Room AC Khusus' dengan kapasitas hingga 35 orang untuk acara formal kantor atau gathering tertutup."
  },
  {
    id: 4,
    question: "Apakah parkirannya ramah untuk kendaraan besar seperti Bus Pariwisata?",
    answer: "Sangat ramah! Lokasi kami yang strategis di Alternatif GOR Pemda Cibinong memiliki area parkir mandiri yang sangat luas, mudah menampung hingga 40 kendaraan mobil pribadi atau 4 Bus Pariwisata ukuran besar sekaligus, lengkap dengan bantuan tim juru parkir profesional kami."
  },
  {
    id: 5,
    question: "Kapan jadwal live music dimainkan di Warung Papatong?",
    answer: "Panggung Hiburan Live Music akustik kami hadir menemani makan malam Anda setiap hari mulai pukul 18.30 WIB hingga tutup jam 21.30 WIB. Anda bisa request lagu Sunda tradisional favorit ataupun lagu modern pilihan keluarga, gratis tanpa biaya masuk."
  }
];

export const GALLERY_DATA: GalleryItem[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=900&fit=crop&q=80",
    alt: "Area Saung Lesehan Semi-Outdoor Warung Papatong",
    category: "tempat",
    size: "large"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1559737607-357893a9efe9?w=900&fit=crop&q=80",
    alt: "Penyajian Seafood Saus Padang Masak Tengah Keluarga",
    category: "makanan",
    size: "medium"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=900&fit=crop&q=80",
    alt: "Paket Nasi Timbel Sunda Komplet Dengan Lalapan Segar",
    category: "makanan",
    size: "small"
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=900&fit=crop&q=80",
    alt: "Suara Ramai Pengunjung Rombongan Gathering Reuni",
    category: "tempat",
    size: "medium"
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=900&fit=crop&q=80",
    alt: "Panggung Acoustic Live Music Membawa Kehangatan Malam",
    category: "live-music",
    size: "large"
  }
];

export const STEPS_DATA: Step[] = [
  {
    id: 1,
    title: "Tentukan Jadwal & Pilih Saung",
    description: "Pilih tanggal makan bersama rombongan Anda, tentukan jam kedatangan, serta tentukan lokasi meja duduk favorit (Lesehan di atas air, Saung Bambu, Meja Tengah, atau Kursi VIP AC)."
  },
  {
    id: 2,
    title: "Pre-Order Menu Hidangan",
    description: "Pilih hidangan Sunda legendaris & Seafood segar unggulan langsung dari daftar e-menu interaktif kami untuk mencegah masakan lama disajikan atau kehabisan bahan menu utama di malam hari."
  },
  {
    id: 3,
    title: "Konfirmasi Instan via WhatsApp",
    description: "Sistem web kami akan memformat rapi seluruh pilihan menu, total harga, dan denah saung Anda. Cukup 1-klik untuk langsung mengirim data booking ke admin resmi kami di WhatsApp."
  },
  {
    id: 4,
    title: "Datang & Tinggal Saji dalam 10 Menit!",
    description: "Saat Anda tiba bersama keluarga besar atau rombongan kantor, meja kursi sudah steril didekor, dan masakan hangat mengepul siap disajikan dalam kurun waktu kurang dari 10 menit!"
  }
];
export const buildWALink = (phone: string, message: string): string =>
  `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

export const formatPrice = (price: number): string =>
  `Rp ${price.toLocaleString('id-ID')}`;
