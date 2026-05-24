// src/config/seatTypes.ts
// ─────────────────────────────────────────────────────────────────────────────
// Konfigurasi tipe tempat duduk untuk form reservasi InteractiveBooking.
// Semua data spot / area duduk Warung Papatong ada di sini.
// ─────────────────────────────────────────────────────────────────────────────

export interface SeatType {
  id:             string
  name:           string
  desc:           string
  capacity:       string
  availableCount: number
  image:          string
}

export const SEAT_TYPES: SeatType[] = [
  {
    id:             'lesehan-apung',
    name:           'Lesehan di Atas Kolam',
    desc:           'Menikmati gemercik air kolam ikan koi sambil lesehan nyaman di atas saung apung asri.',
    capacity:       '4–20 Orang',
    availableCount: 6,
    image:          'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&fit=crop&q=80',
  },
  {
    id:             'saung-bambu',
    name:           'Saung Bambu Keluarga',
    desc:           'Gazebo bambu privat sejuk rimbun pepohonan, cocok untuk makan bersama keluarga besar.',
    capacity:       '6–25 Orang',
    availableCount: 4,
    image:          'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=600&fit=crop&q=80',
  },
  {
    id:             'meja-tengah',
    name:           'Meja Tengah Semi-Outdoor',
    desc:           'Area dekat panggung live music — seru, ramai, dan ideal untuk gathering kantor.',
    capacity:       '4–12 Orang',
    availableCount: 8,
    image:          'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=600&fit=crop&q=80',
  },
  {
    id:             'vip-ac',
    name:           'Ruang VIP Ber-AC',
    desc:           'Ruang tertutup ber-AC kapasitas besar — ideal untuk acara formal, arisan, atau rapat kantor.',
    capacity:       '10–35 Orang',
    availableCount: 2,
    image:          'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=600&fit=crop&q=80',
  },
]