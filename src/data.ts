import { BusinessInfo, Product, Testimonial, FAQItem, GalleryItem, Stat, Step, TeamMember, HeroData, AmbienceTeaserItem, InstagramFeedItem } from '@/types';

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
  // SECTION 1: ANEKA IKAN LAUT & AIR TAWAR
  {
    id: 101,
    name: "Ikan Kerapu Segar (ons)",
    category: "seafood",
    categoryLabel: "Seafood Olahan",
    description: "Ikan Kerapu hidup berkualitas premium. Pilihan gaya masak: Bakar Jimbaran, Cabe Ijo, Kecap, Polos, Saos Padang, atau Steam Nyonya.",
    price: 18000,
    priceFormatted: "Rp 18.000 / ons",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&h=600&fit=crop&q=80",
    badge: "Terlaris",
    waMessage: "Halo Resto Warung Papatong, saya ingin memesan menu 'Ikan Kerapu Segar' untuk porsi rombongan kami.",
    isAvailable: true
  },
  {
    id: 102,
    name: "Ikan Kerapu Lody Premium (ons)",
    category: "seafood",
    categoryLabel: "Seafood Olahan",
    description: "Ikan Kerapu Lody merah langka bertekstur daging selembut sutra. Pilihan gaya masak: Bakar Jimbaran, Cabe Ijo, Kecap, Polos, Saos Padang, atau Steam Nyonya.",
    price: 29000,
    priceFormatted: "Rp 29.000 / ons",
    image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=600&h=600&fit=crop&q=80",
    badge: "Rekomendasi",
    waMessage: "Halo Resto Warung Papatong, tolong siapkan menu kukus/bakar 'Ikan Kerapu Lody Premium' untuk kami.",
    isAvailable: true
  },
  {
    id: 103,
    name: "Ikan Kuwe Segar Lilin (ons)",
    category: "seafood",
    categoryLabel: "Seafood Olahan",
    description: "Ikan Kuwe montok berlemak gurih. Pilihan gaya masak: Bakar Jimbaran, Cabe Ijo, Kecap, Polos, Saos Padang, atau Steam Nyonya.",
    price: 19000,
    priceFormatted: "Rp 19.000 / ons",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&h=600&fit=crop&q=80",
    waMessage: "Halo Resto Warung Papatong, saya mau memesan 'Ikan Kuwe Segar'.",
    isAvailable: true
  },
  {
    id: 104,
    name: "Ikan Baronang Bakar (ons)",
    category: "seafood",
    categoryLabel: "Seafood Olahan",
    description: "Ikan Baronang segar tangkapan laut selatan. Pilihan gaya masak: Bakar Jimbaran, Cabe Ijo, Kecap, Polos, Saos Padang, atau Steam Nyonya.",
    price: 19000,
    priceFormatted: "Rp 19.000 / ons",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&h=600&fit=crop&q=80",
    waMessage: "Halo Resto Warung Papatong, tolong disiapkan 'Ikan Baronang Bakar'.",
    isAvailable: true
  },
  {
    id: 105,
    name: "Ikan Ayam-Ayam Garing (ons)",
    category: "seafood",
    categoryLabel: "Seafood Olahan",
    description: "Ikan Ayam-ayam dengan daging tebal padat gurih seperti daging ayam. Pilihan gaya masak: Bakar Jimbaran, Cabe Ijo, Kecap, Polos, Saos Padang, atau Steam Nyonya.",
    price: 16000,
    priceFormatted: "Rp 16.000 / ons",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&h=600&fit=crop&q=80",
    waMessage: "Halo Resto Warung Papatong, saya tertarik memesan 'Ikan Ayam-Ayam Garing'.",
    isAvailable: true
  },
  {
    id: 106,
    name: "Ikan Bawal Putih Segar (ons)",
    category: "seafood",
    categoryLabel: "Seafood Olahan",
    description: "Ikan Bawal Putih kelas ekspor bertulang lunak dan daging halus manis. Pilihan gaya masak: Bakar Jimbaran, Cabe Ijo, Kecap, Polos, Saos Padang, atau Steam Nyonya.",
    price: 31000,
    priceFormatted: "Rp 31.000 / ons",
    image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=600&h=600&fit=crop&q=80",
    badge: "Promo",
    waMessage: "Halo Resto Warung Papatong, saya booking 'Ikan Bawal Putih Segar'.",
    isAvailable: true
  },
  {
    id: 107,
    name: "Ikan Bawal Hitam Segar (ons)",
    category: "seafood",
    categoryLabel: "Seafood Olahan",
    description: "Ikan Bawal Hitam gurih legit sangat nikmat dibakar kecap Priangan. Pilihan gaya masak: Bakar Jimbaran, Cabe Ijo, Kecap, Polos, Saos Padang, atau Steam Nyonya.",
    price: 19000,
    priceFormatted: "Rp 19.000 / ons",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&h=600&fit=crop&q=80",
    waMessage: "Halo Resto Warung Papatong, tolong pesankan 'Ikan Bawal Hitam' versi bakar.",
    isAvailable: true
  },
  {
    id: 108,
    name: "Ikan Gurame Segar (Medium)",
    category: "seafood",
    categoryLabel: "Seafood Olahan",
    description: "Ikan Gurame segar dari kolam Papatong. Porsi sedang yang pas untuk santap keluarga. Pilihan gaya masak: Saos Padang, Asam Manis, Cobek, atau Terbang.",
    price: 62000,
    priceFormatted: "Rp 62.000",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&h=600&fit=crop&q=80",
    badge: "Terlaris",
    waMessage: "Halo Resto Warung Papatong, siapkan 'Ikan Gurame Segar Medium'.",
    isAvailable: true
  },
  {
    id: 109,
    name: "Ikan Gurame Segar (Large)",
    category: "seafood",
    categoryLabel: "Seafood Olahan",
    description: "Ikan Gurame ukuran jumbo montok untuk kepuasan santap bersama rombongan besar. Pilihan gaya masak: Saos Padang, Asam Manis, Cobek, atau Terbang.",
    price: 78000,
    priceFormatted: "Rp 78.000",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&h=600&fit=crop&q=80",
    badge: "Terlaris",
    waMessage: "Halo Resto Warung Papatong, pesan 'Ikan Gurame Segar Large' porsi utama.",
    isAvailable: true
  },
  {
    id: 110,
    name: "Ikan Patin Segar Lembur (ons)",
    category: "seafood",
    categoryLabel: "Seafood Olahan",
    description: "Ikan Patin sungai bertekstur lembut kaya omega-3 dan lezat. Pilihan gaya masak: Bakar Jimbaran, Cabe Ijo, Kecap, Polos, Saos Padang, atau Steam Nyonya.",
    price: 16000,
    priceFormatted: "Rp 16.000 / ons",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&h=600&fit=crop&q=80",
    waMessage: "Halo Resto Warung Papatong, kami pre-order 'Ikan Patin Segar'.",
    isAvailable: true
  },

  // SECTION 2: KEPITING & LOBSTER
  {
    id: 111,
    name: "Kepiting Bakau Segar (ons)",
    category: "seafood",
    categoryLabel: "Seafood Olahan",
    description: "Kepiting Bakau segar berdaging padat manis. Gaya masak: Asap (Smoked), Lada Hitam, Lumpur, Rebus, Saos Jimbaran, Saos Padang, Saos Tiram, Sop Asam Pedas, atau Sop Bening.",
    price: 34000,
    priceFormatted: "Rp 34.000 / ons",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&h=600&fit=crop&q=80",
    badge: "Terlaris",
    waMessage: "Halo Resto Warung Papatong, saya ingin kepiting bakar premium 'Kepiting Bakau Segar Saos Padang'.",
    isAvailable: true
  },
  {
    id: 112,
    name: "Kepiting Soka Krispi Lumer",
    category: "seafood",
    categoryLabel: "Seafood Olahan",
    description: "Kepiting Soka cangkang lunak bebas kupas. Pilihan gaya masak: Goreng Tepung (Crispy Fried), Lada Hitam, atau Telur Asin.",
    price: 72000,
    priceFormatted: "Rp 72.000",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&h=600&fit=crop&q=80",
    badge: "Rekomendasi",
    waMessage: "Halo Resto Warung Papatong, saya booking 'Kepiting Soka Krispi Telur Asin' satu porsi.",
    isAvailable: true
  },
  {
    id: 113,
    name: "Lobster Super / Duo Premium (ons)",
    category: "seafood",
    categoryLabel: "Seafood Olahan",
    description: "Lobster air tawar super gendut berdaging tebal. Gaya masak: Bakar Jimbaran, Steam, Lada Hitam, Saos Padang, atau Butter Garlic. (Minimum 3 ons).",
    price: 58000,
    priceFormatted: "Rp 58.000 / ons",
    image: "https://images.unsplash.com/photo-1551248429-40975aa4de74?w=600&h=600&fit=crop&q=80",
    badge: "Rekomendasi",
    waMessage: "Halo Resto Warung Papatong, pesan 'Lobster Super Premium Bakar Butter Garlic' 3 ons.",
    isAvailable: true
  },

  // SECTION 3: SEAFOOD PLATTERS & MIXES
  {
    id: 114,
    name: "Kerang Mix Corn Feast",
    category: "seafood",
    categoryLabel: "Seafood Olahan",
    description: "Kombinasi meriah 5 jenis kerang segar laut dan jagung manis pipilan yang dimasak dengan saus pilihan andalan Anda.",
    price: 120000,
    priceFormatted: "Rp 120.000",
    image: "https://images.unsplash.com/photo-1551248429-40975aa4de74?w=600&h=600&fit=crop&q=80",
    badge: "Terlaris",
    waMessage: "Halo Resto Warung Papatong, tolong pre-order 'Kerang Mix Corn Feast' lezat hangat.",
    isAvailable: true
  },
  {
    id: 115,
    name: "Kerang Mix Cumi & Udang",
    category: "seafood",
    categoryLabel: "Seafood Olahan",
    description: "Paduan melimpah 5 jenis kerang tumpuk, cincangan cumi empuk, potongan udang peci manis, dan jagung manis kuah saus kental.",
    price: 210000,
    priceFormatted: "Rp 210.000",
    image: "https://images.unsplash.com/photo-1551248429-40975aa4de74?w=600&h=600&fit=crop&q=80",
    waMessage: "Halo Resto Warung Papatong, pesan porsi 'Kerang Mix Cumi & Udang'.",
    isAvailable: true
  },
  {
    id: 116,
    name: "Kerang Mix Special Papatong Sultan (with Crab)",
    category: "seafood",
    categoryLabel: "Seafood Olahan",
    description: "Platter paling premium nan mewah berisi asupan 5 jenis kerang, cumi ring, udang windu, kepiting bakau utuh, dan manisnya jagung rebus saus Padang.",
    price: 330000,
    priceFormatted: "Rp 330.000",
    image: "https://images.unsplash.com/photo-1551248429-40975aa4de74?w=600&h=600&fit=crop&q=80",
    badge: "Rekomendasi",
    waMessage: "Halo Resto Warung Papatong, siapkan hidangan 'Kerang Mix Special Papatong Sultan' di meja saung kami.",
    isAvailable: true
  },

  // SECTION 4: UDANG, CUMI, & KERANG
  {
    id: 117,
    name: "Udang Pancet Tiger Prawn (ons)",
    category: "seafood",
    categoryLabel: "Seafood Olahan",
    description: "Udang Pancet (Tiger Prawn) super windu dibakar Jimbaran, Goreng Tepung, Saos Padang, Lada Hitam, Telur Asin, atau Asam Manis.",
    price: 42000,
    priceFormatted: "Rp 42.000 / ons",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&h=600&fit=crop&q=80",
    waMessage: "Halo Resto Warung Papatong, kirim pre-order 'Udang Pancet Bakar'.",
    isAvailable: true
  },
  {
    id: 118,
    name: "Udang Peci Fresh (Porsi)",
    category: "seafood",
    categoryLabel: "Seafood Olahan",
    description: "Udang Peci laut manis gurih. Gaya masak: Bakar Jimbaran, Goreng Tepung, Saos Padang, Lada Hitam, Telur Asin, atau Asam Manis.",
    price: 58000,
    priceFormatted: "Rp 58.000",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&h=600&fit=crop&q=80",
    waMessage: "Halo Resto Warung Papatong, pesan satu porsi 'Udang Peci Saos Padang'.",
    isAvailable: true
  },
  {
    id: 119,
    name: "Cumi-Cumi Segar Kolam (Porsi)",
    category: "seafood",
    categoryLabel: "Seafood Olahan",
    description: "Cumi-cumi segar kenyal nikmat. Pilihan gaya masak: Bakar Jimbaran, Goreng Tepung, Saos Padang, Lada Hitam, Telur Asin, atau Asam Manis.",
    price: 52000,
    priceFormatted: "Rp 52.000",
    image: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=600&h=600&fit=crop&q=80",
    waMessage: "Halo Resto Warung Papatong, pesan satu porsi 'Cumi Goreng Tepung'.",
    isAvailable: true
  },
  {
    id: 120,
    name: "Kerang Dara Rebus Gurih",
    category: "seafood",
    categoryLabel: "Seafood Olahan",
    description: "Kerang Dara segar pilihan direbus harum rempah, disajikan hangat dengan cocolan saus sambal legendaris.",
    price: 24000,
    priceFormatted: "Rp 24.000",
    image: "https://images.unsplash.com/photo-1551248429-40975aa4de74?w=600&h=600&fit=crop&q=80",
    waMessage: "Halo Resto Warung Papatong, pesan 'Kerang Dara Rebus'.",
    isAvailable: true
  },
  {
    id: 121,
    name: "Kerang Hijau Saung Papatong",
    category: "seafood",
    categoryLabel: "Seafood Olahan",
    description: "Kerang Hijau segar laut dalam. Pilihan gaya masak: Goreng Tepung, Lada Hitam, Lumpur, Rebus, atau Saos Padang.",
    price: 32000,
    priceFormatted: "Rp 32.000",
    image: "https://images.unsplash.com/photo-1551248429-40975aa4de74?w=600&h=600&fit=crop&q=80",
    waMessage: "Halo Resto Warung Papatong, pesan porsi 'Kerang Hijau Saos Padang'.",
    isAvailable: true
  },
  {
    id: 122,
    name: "Kerang Kapak Steam Garlic (Scallops)",
    category: "seafood",
    categoryLabel: "Seafood Olahan",
    description: "Scallops kerang kapak super besar dikukus siraman tumpukan bawang putih wangi, jahe, daun bawang, dan kecap asin.",
    price: 80000,
    priceFormatted: "Rp 80.000",
    image: "https://images.unsplash.com/photo-1551248429-40975aa4de74?w=600&h=600&fit=crop&q=80",
    badge: "Promo",
    waMessage: "Halo Resto Warung Papatong, pesan 'Kerang Kapak Steam Garlic Scallops'.",
    isAvailable: true
  },
  {
    id: 123,
    name: "Kerang Kepa Saus Padang",
    category: "seafood",
    categoryLabel: "Seafood Olahan",
    description: "Kerang putih Kepa segar manis. Pilihan gaya masak: Saos Padang atau Tauco Pedas.",
    price: 32000,
    priceFormatted: "Rp 32.000",
    image: "https://images.unsplash.com/photo-1551248429-40975aa4de74?w=600&h=600&fit=crop&q=80",
    waMessage: "Halo Resto Warung Papatong, pesan 'Kerang Kepa Saos Padang'.",
    isAvailable: true
  },
  {
    id: 124,
    name: "Kerang Bambu Tauco Pedas",
    category: "seafood",
    categoryLabel: "Seafood Olahan",
    description: "Razor clams kerang bambu liar gurih padat ditumis kuah kental tauco pedas harum meresap.",
    price: 42000,
    priceFormatted: "Rp 42.000",
    image: "https://images.unsplash.com/photo-1551248429-40975aa4de74?w=600&h=600&fit=crop&q=80",
    waMessage: "Halo Resto Warung Papatong, pesan 'Kerang Bambu Tauco Pedas'.",
    isAvailable: true
  },

  // SECTION 5: AYAM & DAGING (POULTRY & MEAT)
  {
    id: 125,
    name: "Ayam Kampung Utuh (1 Ekor)",
    category: "sunda",
    categoryLabel: "Paket Sunda",
    description: "Satu ekor ayam kampung utuh empuk digoreng garing manis. Pilihan gaya masak: Bakar Jimbaran, Bakar Kecap, Goreng Serundeng, atau Goreng Kremes.",
    price: 115000,
    priceFormatted: "Rp 115.000",
    image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=600&h=600&fit=crop&q=80",
    badge: "Terlaris",
    waMessage: "Halo Resto Warung Papatong, pre-order 'Ayam Kampung Utuh Bakar Kecap' untuk rombongan makan siang.",
    isAvailable: true
  },
  {
    id: 126,
    name: "Ayam Kampung Quarter (Pejantan)",
    category: "sunda",
    categoryLabel: "Paket Sunda",
    description: "Potongan seperempat dada atau paha ayam kampung pejantan krispi beraroma rempah. Gaya masak: Bakar Jimbaran, Bakar Kecap, Goreng Serundeng, atau Goreng Kremes.",
    price: 30000,
    priceFormatted: "Rp 30.000",
    image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=600&h=600&fit=crop&q=80",
    waMessage: "Halo Resto Warung Papatong, tambah ayam quarter goreng serundeng.",
    isAvailable: true
  },
  {
    id: 127,
    name: "Sapi Lada Hitam Empuk Masak",
    category: "sunda",
    categoryLabel: "Paket Sunda",
    description: "Tumisan daging tender slices murni sapi impor, dengan cacahan lada hitam pedas aromatik wangi bawang bombay.",
    price: 65000,
    priceFormatted: "Rp 65.000",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&h=600&fit=crop&q=80",
    badge: "Rekomendasi",
    waMessage: "Halo Resto Warung Papatong, pesan porsi 'Sapi Lada Hitam Empuk'.",
    isAvailable: true
  },

  // SECTION 6: SAYURAN (VEGETABLES & SIDES)
  {
    id: 128,
    name: "Tumis Kangkung Polos Segar",
    category: "sayur",
    categoryLabel: "Veggies & Co.",
    description: "Kangkung sawah segar ditumis kilat dengan bawang iris harum garing gurih.",
    price: 18000,
    priceFormatted: "Rp 18.000",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600&h=600&fit=crop&q=80",
    waMessage: "Halo Resto Warung Papatong, pesan kangkung polos satu.",
    isAvailable: true
  },
  {
    id: 129,
    name: "Kangkung Hotplate (Tauco / Terasi)",
    category: "sayur",
    categoryLabel: "Veggies & Co.",
    description: "Kangkung mendidih panas di atas wajan hotplate besi hitam dengan kuah tauco Cianjur klasik atau terasi bakar harum.",
    price: 24000,
    priceFormatted: "Rp 24.000",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600&h=600&fit=crop&q=80",
    badge: "Terlaris",
    waMessage: "Halo Resto Warung Papatong, pesan 'Kangkung Hotplate Terasi'.",
    isAvailable: true
  },
  {
    id: 130,
    name: "Kangkung Seafood Hotplate Jumbo",
    category: "sayur",
    categoryLabel: "Veggies & Co.",
    description: "Hotplate kangkung istimewa kental bertabur udang kupas manis, cumi rings empuk, bakso, serta telur puyuh rebus.",
    price: 38000,
    priceFormatted: "Rp 38.000",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600&h=600&fit=crop&q=80",
    badge: "Rekomendasi",
    waMessage: "Halo Resto Warung Papatong, kami pre-order 'Kangkung Seafood Hotplate' terlaris.",
    isAvailable: true
  },
  {
    id: 131,
    name: "Tumis Tauge Polos / Terasi",
    category: "sayur",
    categoryLabel: "Veggies & Co.",
    description: "Tauge kedelai gemuk super renyah ditumis bawang putih iris polos atau bumbu terasi udang lumer.",
    price: 18000,
    priceFormatted: "Rp 18.000",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=600&h=600&fit=crop&q=80",
    waMessage: "Halo Resto Warung Papatong, pesan 'Tauge Terasi' satu.",
    isAvailable: true
  },
  {
    id: 132,
    name: "Tumis Tauge Ikan Asin",
    category: "sayur",
    categoryLabel: "Veggies & Co.",
    description: "Tauge renyah ditumis bumbu bawang putih cabai merah serta taburan gurih dadu ikan asin Jambal roti premium.",
    price: 24000,
    priceFormatted: "Rp 24.000",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=600&h=600&fit=crop&q=80",
    badge: "Terlaris",
    waMessage: "Halo Resto Warung Papatong, pesan 'Tauge Ikan Asin' porsi utama.",
    isAvailable: true
  },
  {
    id: 133,
    name: "Tauge Cah Cumi Asin Cabai Hijau",
    category: "sayur",
    categoryLabel: "Veggies & Co.",
    description: "Sayur tauge renyah asri ditumis bersama cumi asin empuk bawang merah cabe hijau iris besar.",
    price: 28000,
    priceFormatted: "Rp 28.000",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=600&h=600&fit=crop&q=80",
    waMessage: "Halo Resto Warung Papatong, pesan 'Tauge Cah Cumi Asin'.",
    isAvailable: true
  },
  {
    id: 134,
    name: "Sayur Genjer (Polos / Terasi / Tauco)",
    category: "sayur",
    categoryLabel: "Veggies & Co.",
    description: "Sayur genjer sawah empuk ditumis bumbu harum khas Jawa Barat pilihan rasa favorit.",
    price: 18000,
    priceFormatted: "Rp 18.000",
    image: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=600&h=600&fit=crop&q=80",
    waMessage: "Halo Resto Warung Papatong, minta 'Tumis Genjer Terasi' satu porsi.",
    isAvailable: true
  },
  {
    id: 135,
    name: "Tumis Sayur Pucuk Labu Muda",
    category: "sayur",
    categoryLabel: "Veggies & Co.",
    description: "Pucuk daun labu hijau muda segar ditumis gurih empuk wangi di lidah.",
    price: 20000,
    priceFormatted: "Rp 20.000",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=600&fit=crop&q=80",
    waMessage: "Halo Resto Warung Papatong, pesan 'Pucuk Labu'.",
    isAvailable: true
  },
  {
    id: 136,
    name: "Tumis Daun Dewa Herbal",
    category: "sayur",
    categoryLabel: "Veggies & Co.",
    description: "Tumisan daun dewa segar berkhasiat tinggi menjaga kesehatan, bumbu saus tiram bawang putih iris.",
    price: 22000,
    priceFormatted: "Rp 22.000",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=600&fit=crop&q=80",
    waMessage: "Halo Resto Warung Papatong, pesan 'Tumis Daun Dewa Healthy'.",
    isAvailable: true
  },
  {
    id: 137,
    name: "Tahu & Tempe Goreng Kuning",
    category: "sayur",
    categoryLabel: "Veggies & Co.",
    description: "Pendamping setia makan timbel Sunda. Tahu Sumedang sutra lambut & tempe kedelai murni goreng garing.",
    price: 12000,
    priceFormatted: "Rp 12.000",
    image: "https://images.unsplash.com/photo-1541832676-9b763b0239ab?w=600&h=600&fit=crop&q=80",
    waMessage: "Halo Resto Warung Papatong, pesan seporsi 'Tahu Tempe Goreng Kuning'.",
    isAvailable: true
  },
  {
    id: 138,
    name: "Bakwan Jagung Manis Priangan (3 pcs)",
    category: "sayur",
    categoryLabel: "Veggies & Co.",
    description: "Camilan gorengan bakwan berisikan jagung serut murni super manis bertekstur kriuk gurih rempah Priangan asli.",
    price: 18000,
    priceFormatted: "Rp 18.000",
    image: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?w=600&h=600&fit=crop&q=80",
    waMessage: "Halo Resto Warung Papatong, pesan seporsi hangat 'Bakwan Jagung Manis'.",
    isAvailable: true
  },
  {
    id: 139,
    name: "Pete Goreng / Rebus Gurih",
    category: "sayur",
    categoryLabel: "Veggies & Co.",
    description: "Butiran petai hijau montok mulus digoreng layu atau direbus segar, pelengkap absolut saus Padang.",
    price: 15000,
    priceFormatted: "Rp 15.000",
    image: "https://images.unsplash.com/photo-1541832676-9b763b0239ab?w=600&h=600&fit=crop&q=80",
    waMessage: "Halo Resto Warung Papatong, tambah 'Pete Goreng' satu piring.",
    isAvailable: true
  },

  // SECTION 7: NASI & SAMBAL (NASI & SAMBAL)
  {
    id: 140,
    name: "Nasi Putih Cianjur Pulen",
    category: "sunda",
    categoryLabel: "Paket Sunda",
    description: "Nasi putih hangat pulen berlelehan uap wangi dari padi Pandanwangi asli GOR pemda.",
    price: 8000,
    priceFormatted: "Rp 8.000",
    image: "https://images.unsplash.com/photo-1541832676-9b763b0239ab?w=600&h=600&fit=crop&q=80",
    waMessage: "Halo Resto Warung Papatong, minta nasi putih piring tambahan.",
    isAvailable: true
  },
  {
    id: 141,
    name: "Nasi Bakar Papatong (Signature)",
    category: "sunda",
    categoryLabel: "Paket Sunda",
    description: "Nasi pulen dibumbui teri medan, pete, kemangi, dibungkus daun pisang lalu dibakar arang kelapa menyengat nafsu makan Anda.",
    price: 28000,
    priceFormatted: "Rp 28.000",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&h=600&fit=crop&q=80",
    badge: "Terlaris",
    waMessage: "Halo Resto Warung Papatong, pesan signature 'Nasi Bakar Papatong' wajib coba.",
    isAvailable: true
  },
  {
    id: 142,
    name: "Nasi Goreng Seafood Segar",
    category: "sunda",
    categoryLabel: "Paket Sunda",
    description: "Nasi goreng bumbu seafood gurih melimpah bercampur potong cumi, udang peci manis, telur kocok murni.",
    price: 35000,
    priceFormatted: "Rp 35.000",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&h=600&fit=crop&q=80",
    badge: "Rekomendasi",
    waMessage: "Halo Resto Warung Papatong, kami booking 'Nasi Goreng Seafood Segar'.",
    isAvailable: true
  },
  {
    id: 143,
    name: "Nasi Goreng Cumi Asin Cabe Ijo",
    category: "sunda",
    categoryLabel: "Paket Sunda",
    description: "Nasi goreng ditumis gurih bertabur potongan cumi asin empuk ulekan kasar cabe hijau aromatis pas pedasnya.",
    price: 30000,
    priceFormatted: "Rp 30.000",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&h=600&fit=crop&q=80",
    waMessage: "Halo Resto Warung Papatong, pesan 'Nasi Goreng Cumi Asin'.",
    isAvailable: true
  },
  {
    id: 144,
    name: "Aneka Sambal Papatong Segar",
    category: "sunda",
    categoryLabel: "Paket Sunda",
    description: "Satu portion sambal ulek dadakan segar bebas pilih: Sambal Terasi Dadak, Sambal Tomat, Sambal Korek, Sambal Kecap, Sambal Mangga, atau Sambal Gledek.",
    price: 8000,
    priceFormatted: "Rp 8.000",
    image: "https://images.unsplash.com/photo-1541832676-9b763b0239ab?w=600&h=600&fit=crop&q=80",
    badge: "Terlaris",
    waMessage: "Halo Resto Warung Papatong, kami ingin tambah 'Aneka Sambal Papatong' super pedas.",
    isAvailable: true
  },

  // SECTION 8: MINUMAN (BEVERAGES)
  {
    id: 145,
    name: "Es Teh Manis Segar",
    category: "minuman",
    categoryLabel: "Segar Minuman",
    description: "Seduhan daun teh melati wangi legendaris dicampur gula cair es batu super beku.",
    price: 8000,
    priceFormatted: "Rp 8.000",
    image: "https://images.unsplash.com/photo-1553177595-4de2bb0842b9?w=600&h=600&fit=crop&q=80",
    waMessage: "Halo Resto Warung Papatong, pesan 'Es Teh Manis Segar' dingin.",
    isAvailable: true
  },
  {
    id: 146,
    name: "Es Teh Tawar",
    category: "minuman",
    categoryLabel: "Segar Minuman",
    description: "Seduhan daun teh wangi dingin tawar segar penetralisir kolesterol seafood.",
    price: 6000,
    priceFormatted: "Rp 6.000",
    image: "https://images.unsplash.com/photo-1553177595-4de2bb0842b9?w=600&h=600&fit=crop&q=80",
    waMessage: "Halo Resto Warung Papatong, pesan beberapa gelas 'Es Teh Tawar' dingin.",
    isAvailable: true
  },
  {
    id: 147,
    name: "Teh Hangat (Manis / Tawar)",
    category: "minuman",
    categoryLabel: "Segar Minuman",
    description: "Seduhan teh melati Priangan murni disajikan panas mengepul melegakan nafas.",
    price: 6000,
    priceFormatted: "Rp 6.000",
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=600&h=600&fit=crop&q=80",
    waMessage: "Halo Resto Warung Papatong, pesan segelas 'Teh Manis Hangat' pas datang.",
    isAvailable: true
  },
  {
    id: 148,
    name: "Es Jeruk / Jeruk Hangat Alami",
    category: "minuman",
    categoryLabel: "Segar Minuman",
    description: "Perasan murni buah jeruk segar ponorogo, rasa manis asam orisinal dingin alami.",
    price: 18000,
    priceFormatted: "Rp 18.000",
    image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=600&h=600&fit=crop&q=80",
    waMessage: "Halo Resto Warung Papatong, pesan segelas 'Es Jeruk Alami' segar.",
    isAvailable: true
  },
  {
    id: 149,
    name: "Es Kelapa Muda Batangan Segar",
    category: "minuman",
    categoryLabel: "Segar Minuman",
    description: "Satu butir buah kelapa murni hijau pilihan disajikan utuh segar alami di atas meja saung.",
    price: 23000,
    priceFormatted: "Rp 23.000",
    image: "https://images.unsplash.com/photo-1553177595-4de2bb0842b9?w=600&h=600&fit=crop&q=80",
    badge: "Terlaris",
    waMessage: "Halo Resto Warung Papatong, kami pre-order 'Es Kelapa Muda Batangan Segar'.",
    isAvailable: true
  },
  {
    id: 151,
    name: "Es Kelapa Gelas Manis",
    category: "minuman",
    categoryLabel: "Segar Minuman",
    description: "Kerokan serutan daging kelapa muda empuk disajikan manis dingin dalam gelas.",
    price: 15000,
    priceFormatted: "Rp 15.000",
    image: "https://images.unsplash.com/photo-1553177595-4de2bb0842b9?w=600&h=600&fit=crop&q=80",
    waMessage: "Halo Resto Warung Papatong, pesan segelas es kelapa manis.",
    isAvailable: true
  },
  {
    id: 152,
    name: "Es Kelapa Jeruk Segar",
    category: "minuman",
    categoryLabel: "Segar Minuman",
    description: "Kombinasi sehat asri serutan kelapa segar manis nan segar berpadu perasan murni jeruk nipis buah alami.",
    price: 25000,
    priceFormatted: "Rp 25.000",
    image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=600&h=600&fit=crop&q=80",
    badge: "Rekomendasi",
    waMessage: "Halo Resto Warung Papatong, siapkan 'Es Kelapa Jeruk Segar' dua gelas.",
    isAvailable: true
  },
  {
    id: 153,
    name: "Aneka Jus Buah Segar (Alpukat / Mangga / Melon / Jambu / Naga)",
    category: "minuman",
    categoryLabel: "Segar Minuman",
    description: "Jus buah kental segar asli pilihan favorit Anda: Alpukat Mentega, Mangga Madu, Melon Hijau, Strawberry Gunung, Jambu Biji Merah, atau Buah Naga.",
    price: 20000,
    priceFormatted: "Rp 20.000",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&h=600&fit=crop&q=80",
    waMessage: "Halo Resto Warung Papatong, kami pre-order segelas 'Jus Alpukat Mentega Segar'.",
    isAvailable: true
  },
  {
    id: 154,
    name: "Soda Gembira Cerita",
    category: "minuman",
    categoryLabel: "Segar Minuman",
    description: "Minuman soda klasik fanta merah, bersatu susu kental manis dan sirup es beku, meledakkan kegembiraan makan.",
    price: 22000,
    priceFormatted: "Rp 22.000",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&h=600&fit=crop&q=80",
    badge: "Baru",
    waMessage: "Halo Resto Warung Papatong, tolong buatkan 'Soda Gembira' dingin.",
    isAvailable: true
  },
  {
    id: 155,
    name: "Soda Badak Sarsaparilla Khas",
    category: "minuman",
    categoryLabel: "Segar Minuman",
    description: "Minuman soda legenda cap Badak rasa sarsaparilla asli yang langka dan sangat diburu pendamping lauk seafood.",
    price: 20000,
    priceFormatted: "Rp 20.000",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&h=600&fit=crop&q=80",
    waMessage: "Halo Resto Warung Papatong, sediakan sebotol 'Soda Badak' segar.",
    isAvailable: true
  },
  {
    id: 156,
    name: "Air Aqua Mineral Botol",
    category: "minuman",
    categoryLabel: "Segar Minuman",
    description: "Air pegunungan steril dingin jernih pembasuh sisa makan.",
    price: 8000,
    priceFormatted: "Rp 8.000",
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&h=600&fit=crop&q=80",
    waMessage: "Halo Resto Warung Papatong, tolong tambahkan sebotol 'Air Aqua'.",
    isAvailable: true
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 1,
    name: "Nafisa Aulia Fahmi",
    city: "Cibinong, Bogor (Local Guide)",
    rating: 5,
    review: "Restonya mudah ditemukan, berada di pinggir jalan raya alternatif GOR Pakansari. Pesan cumi goreng mentega, udang asam manis, baronang bakar jimbaran, dan genjer. Semuanya rukun enak bumbu meresap gurih. Sangat recommended kesini bersama keluarga besar!",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&q=80",
    product: "Cumi Goreng Mentega & Baronang Bakar"
  },
  {
    id: 2,
    name: "Novianty Wongso",
    city: "Cibinong, Bogor (Local Guide)",
    rating: 5,
    review: "Coba Warung Papatong karena lihat rating Google yang tinggi ternyata memang tidak mengecewakan! Gurame Telur Asin, Udang Peci Saus Padang, Baby Buncis Bawang Putih, Soka Lada Hitam, dan Cumi Bakar Lumpur semuanya mantap berani bumbu. Pelayanan cepat dan memuaskan.",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&h=120&fit=crop&q=80",
    product: "Gurame Telur Asin & Udang Peci Saus Padang"
  },
  {
    id: 3,
    name: "Vanny Firki",
    city: "Bogor (Local Guide)",
    rating: 5,
    review: "Pertama kali kesini, makanan yg saya pesan semuanya enak, tidak ada yg gagal. Mantap sekali! Ada menu paket dan masing-masing.. Ajak keluarga kesini sangat recommended. Tingkat kebisingan ramai tetapi Anda masih dapat bicara dengan nyaman. Cocok untuk semua ukuran grup.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop&q=80",
    product: "Paket Bancakan Rombongan"
  },
  {
    id: 4,
    name: "Nadi Ekawati",
    city: "Cibinong, Bogor",
    rating: 5,
    review: "Baru pertama kali dateng kesini terus nyarinya cuma Google doang terus ternyata malah dapet hidden gem!!! Ikan bakar kerapu bumbu jimbaran VERYYYY RECOMENDED!!!! Enak bgt plus kangkung taucooo masyaallah, definitely will come back!",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop&q=80",
    product: "Ikan Kerapu Bakar Jimbaran & Kangkung Tauco"
  },
  {
    id: 5,
    name: "Teddy Fazri",
    city: "Cibinong (Local Guide)",
    rating: 5,
    review: "Makanan Enak, harga terjangkau, ramah anak juga tempatnya, ada playground dan ada saung di bawah... Ayam bakar dan udang nya mantap! Gurame asem manis, kepiting saus jimbaran, kerapu bakar jimbaran, kangkung belacan semuanya top markotop.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&q=80",
    product: "Kepiting & Udang Saus Padang"
  },
  {
    id: 6,
    name: "Rebecca Indriyani",
    city: "Bogor",
    rating: 5,
    review: "Makanannya enak enak, pesen gurame asam manis, sapo tahu, fuyunghai semua bumbunya terasa berani bumbu, tempatnya juga nyaman bersih .. pokoknya mantappp surantappppp!",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&h=120&fit=crop&q=80",
    product: "Gurame Asam Manis & Sapo Tahu"
  },
  {
    id: 7,
    name: "S Herman",
    city: "Cibinong, Bogor",
    rating: 5,
    review: "Makanan nya semua enak... rasa juga enak.., pelayanan cepat dan memuaskan, recommended buat semua keluarga yg mau makan disini... mantappp!",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&q=80",
    product: "Lalapan & Ayam Goreng Serundeng"
  },
  {
    id: 8,
    name: "Shena Ardyanti",
    city: "Bogor (Local Guide)",
    rating: 5,
    review: "Makanan nya enak-enak, tempatnya strategis banget pinggir jalan raya, dan harganya OK lah.. Tingkat kebisingan tenang sehingga mudah untuk bicara santai. Waktu tunggu sedang sekitar 10-30 menit.",
    avatar: "https://images.unsplash.com/photo-1554151228-14d9def656e4?w=120&h=120&fit=crop&q=80",
    product: "Sapo Tahu Special Papatong"
  },
  {
    id: 9,
    name: "Ajeng Maharani",
    city: "Cibinong, Bogor (Local Guide)",
    rating: 5,
    review: "Makanannya enak banget rasanya, pelayanan nya ramah-ramah baik. Resto nya ada tempat permainan anak-anak jadi anak-anak bisa bermain sambil menunggu pesanan datang. Sangat cocok buat bawa balita.",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=120&h=120&fit=crop&q=80",
    product: "Nasi Timbel Komplet & Area Playground"
  },
  {
    id: 10,
    name: "Erni Herningsih",
    city: "Sentul (Local Guide)",
    rating: 5,
    review: "Tempatnya lumayan luas. Bisa buat makan keluarga besar atau gathering kantor. Makanan nya ok dan enak.",
    avatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=120&h=120&fit=crop&q=80",
    product: "Ayam Goreng Serundeng Lengkuas"
  },
  {
    id: 11,
    name: "Purniawan Abudaffa",
    city: "Bogor",
    rating: 5,
    review: "Makanan nya enak.. sayurnya juga msh seger-seger bgt... mantap... pelayanannya dari staf ramah serta sigap.",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&h=120&fit=crop&q=80",
    product: "Tumis Genjer & Kerang Cabe Ijo"
  },
  {
    id: 12,
    name: "Hendry Hanapi",
    city: "Jakarta (Local Guide)",
    rating: 5,
    review: "Tempat lumayan nyaman (makan sore - malam). Pilih paket berlima B&E. Untuk rombongan dewasa 8 orang, anak-anak 7 orang makanannya sangat cukup dan kenyang. Semua bahan segar except udang asam manis, tapi overall masakan good taste dan terong baladonya istimewa!",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&h=120&fit=crop&q=80",
    product: "Liwetan Berlima & Terong Balado"
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
    alt: "Area Saung Lesehan Semi-Outdoor Warung Papatong yang asri di atas kolam ikan koi",
    category: "tempat",
    size: "large"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1559737607-357893a9efe9?w=900&fit=crop&q=80",
    alt: "Penyajian Seafood Saus Padang Masak Tengah Keluarga dengan piring saji yang hangat",
    category: "makanan",
    size: "medium"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=900&fit=crop&q=80",
    alt: "Paket Nasi Timbel Sunda Komplet Dengan Lalapan Segar dan sambal terasi dadak",
    category: "makanan",
    size: "small"
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=900&fit=crop&q=80",
    alt: "Suara Ramai Pengunjung Rombongan Gathering Reuni kantor menikmati suasana santai",
    category: "tempat",
    size: "medium"
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=900&fit=crop&q=80",
    alt: "Panggung Acoustic Live Music membawa kehangatan malam bersama lagu syahdu request pengunjung",
    category: "live-music",
    size: "large"
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=900&fit=crop&q=80",
    alt: "Momen romantis kencan malam minggu di area saung tepi air berhias lampu bohlam gantung",
    category: "tempat",
    size: "medium"
  },
  {
    id: 7,
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=900&fit=crop&q=80",
    alt: "Pre-order Gurame Bakar Cobek Cianjur mengepul panas siap dihidangkan",
    category: "makanan",
    size: "small"
  },
  {
    id: 8,
    image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=900&fit=crop&q=80",
    alt: "Keriangan kumpul makan bersama keluarga besar merayakan ulang tahun kakek di saung utama",
    category: "tempat",
    size: "large"
  },
  {
    id: 9,
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=900&fit=crop&q=80",
    alt: "Interior area Meja Tengah Semi-Outdoor yang luas, sejuk, dan aman bagi anak-anak beraktivitas",
    category: "tempat",
    size: "medium"
  },
  {
    id: 10,
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=900&fit=crop&q=80",
    alt: "Sate Maranggi Sapi Empuk yang legendaris, aroma panggangan arang tradisional yang menggugah selera",
    category: "makanan",
    size: "small"
  },
  {
    id: 11,
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=900&fit=crop&q=80",
    alt: "Pelanggan menyantap Teh Melati Harum Sore sembari menikmati pertunjukan musik gitar akustik live",
    category: "live-music",
    size: "medium"
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
export const TEAM_DATA: TeamMember[] = [
  {
    id: 1,
    name: "H. Jaka Permana",
    role: "Owner & Founder",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&q=80",
    bio: "Mendirikan Warung Papatong pada tahun 2018 dengan visi menyajikan kuliner Sunda autentik berstandar premium yang ramah untuk kumpul keluarga besar Jabodetabek.",
    specialty: "Visi Bisnis & Pelestarian Budaya Kuliner"
  },
  {
    id: 2,
    name: "Chef Cecep Sunandar",
    role: "Senior Head Chef",
    photo: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop&q=80",
    bio: "Berbekal pengalaman 15+ tahun di bidang hidangan laut nusantara, meracik bumbu legendaris Saus Padang Istimewa dan sambal ulek khas Papatong yang memanjakan lidah.",
    specialty: "Sunda Tradisional & Seafood Fusion"
  },
  {
    id: 3,
    name: "Ibu Rina Sulaeman",
    role: "Banquet & Operational Manager",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&q=80",
    bio: "Menangani kelancaran operasional harian resto, koordinasi pre-order banquet khusus arisan, reuni, corporate gathering, hingga dekorasi meja kejutan ulang tahun Anda.",
    specialty: "Layanan Pelanggan & Koordinasi Rombongan"
  }
];

export const buildWALink = (phone: string, message: string): string =>
  `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

export const formatPrice = (price: number): string =>
  `Rp ${price.toLocaleString('id-ID')}`;

export const HERO_DATA: HeroData = {
  headlineText: "Lezatnya Seafood Segar Berpadu Wanginya Nasi Timbel Sunda Autentik",
  pillBadge: "✦ Kuliner Sunda & Seafood No. 1 Cibinong",
  description: "Ucapkan selamat tinggal pada mengantre lama & kuota kehabisan makan malam! Warung Papatong hadir dengan sistem booking lesehan teratur dan pre-order digital instan untuk rombongan makan Anda.",
  ctaBookingText: "Booking Tempat Sekarang",
  ctaMenuText: "Lihat Daftar E-Menu",
  imageUrl: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=900&h=1100&fit=crop&q=85",
  imageAlt: "Seafood Saus Padang Istimewa Warung Papatong",
  featuredTodayLabel: "Spesial Hari Ini",
  featuredTodayName: "Kepiting Saus Padang Jumbo",
  featuredTodayPrice: "Rp 135k",
  kitchenStatusLabel: "Dapur Aktif",
  kitchenStatusDesc: "Semua Menu Seafood Lengkap Terjaga"
};

export const AMBIENCE_TEASER_DATA: AmbienceTeaserItem[] = [
  {
    url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&fit=crop&q=80",
    caption: "Lesehan di Atas Kolam",
    desc: "Menikmati gemercik air kolam ikan segar yang menenangkan pikiran"
  },
  {
    url: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&fit=crop&q=80",
    caption: "Gazebo Bambu Sejuk",
    desc: "Lanskap rimbun pepohonan hijau sejuk khas pedesaan Jawa Barat"
  },
  {
    url: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&fit=crop&q=80",
    caption: "Meja Tengah & Live Music",
    desc: "Panggung hiburan interaktif akrab bersama yang terkasih"
  }
];

export const INSTAGRAM_FEEDS_DATA: InstagramFeedItem[] = [
  { id: 1, img: "https://images.unsplash.com/photo-1543353071-10c8ba85a904?w=400&h=400&fit=crop&q=80", likes: "1.2k", comments: "109" },
  { id: 2, img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=400&fit=crop&q=80", likes: "896", comments: "78" },
  { id: 3, img: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=400&fit=crop&q=80", likes: "1.5k", comments: "142" },
  { id: 4, img: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=400&h=400&fit=crop&q=80", likes: "721", comments: "54" },
];
