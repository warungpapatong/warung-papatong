import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Users, Clock, Map, Phone, AlertCircle, Sparkles, Check, Trash2, MessageSquare } from 'lucide-react';
import { Product, PreOrderBasketItem } from '@/types';
import { PRODUCTS_DATA, formatPrice, BUSINESS_INFO, buildWALink } from '@/data';
import { trackWhatsAppConversion } from '@/lib/tracking';

interface InteractiveBookingProps {
  isOpen: boolean;
  onClose: () => void;
  basket: Record<number, number>;
  onAddToBasket: (product: Product) => void;
  onRemoveFromBasket: (productId: number) => void;
  onClearBasket: () => void;
}

const SEAT_TYPES = [
  {
    id: 'lesehan-apung',
    name: 'Lesehan Terapung Kolam Koi',
    capacity: '4 - 15 Orang',
    desc: 'Area lesehan kayu privat di atas air kolam koi yang asri dan sejuk. Terfavorit untuk anak-anak.',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=250&fit=crop&q=80',
    availableCount: 4
  },
  {
    id: 'saung-bambu',
    name: 'Saung Bambu Tradisional',
    capacity: '2 - 10 Orang',
    desc: 'Bilik bambu anyaman rukun terisolasi di keliling taman asri Sunda.',
    image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=400&h=250&fit=crop&q=80',
    availableCount: 6
  },
  {
    id: 'meja-livemusic',
    name: 'Meja Tengah Semi-Outdoor (Dekat Live Music)',
    capacity: '4 - 30 Orang',
    desc: 'Meja makan panjang berhadapan langsung dengan panggung hiburan live musik gitar akustik.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=250&fit=crop&q=80',
    availableCount: 3
  },
  {
    id: 'vip-ac',
    name: 'VIP Private AC Room',
    capacity: '10 - 45 Orang',
    desc: 'Ruang tertutup ber-AC dingin, TV, serta sound system karaoke, ideal untuk acara rapat dinas / reuni kumpul formal.',
    image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=400&h=250&fit=crop&q=80',
    availableCount: 2
  }
];

export default function InteractiveBooking({
  isOpen,
  onClose,
  basket,
  onAddToBasket,
  onRemoveFromBasket,
  onClearBasket
}: InteractiveBookingProps) {
  
  // Form states
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [guestCount, setGuestCount] = useState(6);
  const [date, setDate] = useState('');
  const [arrivalTime, setArrivalTime] = useState('12:00');
  const [selectedSeat, setSelectedSeat] = useState('lesehan-apung');
  const [specialNote, setSpecialNote] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [generatedMessage, setGeneratedMessage] = useState('');

  // Set default date to today or tomorrow
  useEffect(() => {
    const today = new Date();
    // Format YYYY-MM-DD
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    setDate(`${yyyy}-${mm}-${dd}`);
  }, []);

  // Calculate pre-order sum
  const basketItems: PreOrderBasketItem[] = Object.entries(basket)
    .map(([idStr, qty]) => {
      const p = PRODUCTS_DATA.find(product => product.id === parseInt(idStr));
      return p ? { product: p, quantity: qty } : null;
    })
    .filter((item): item is PreOrderBasketItem => item !== null);

  const subtotal = basketItems.reduce((acc, item) => {
    return acc + (item.product.price * item.quantity);
  }, 0);

  const isPartyLarge = guestCount >= 10;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMessage('Tolong masukkan Nama Pemesan terlebih dahulu.');
      return;
    }
    if (!phone.trim()) {
      setErrorMessage('Tolong masukkan nomor WhatsApp aktif Anda.');
      return;
    }
    if (!date) {
      setErrorMessage('Tolong pilih tanggal rencana kedatangan Anda.');
      return;
    }

    setErrorMessage(null);

    // Get seat label
    const seatObj = SEAT_TYPES.find(s => s.id === selectedSeat);
    const seatName = seatObj ? seatObj.name : selectedSeat;

    // Compile message
    let message = `*FORM RESERVASI MEJA & PRE-ORDER WARUNG PAPATONG*\n`;
    message += `──────────────────\n`;
    message += `👤 *Nama Pemesan* : ${name}\n`;
    message += `📞 *No. WhatsApp* : ${phone}\n`;
    message += `👥 *Sensus Tamu*   : ${guestCount} Orang\n`;
    message += `📅 *Rencana Makan* : ${date}\n`;
    message += `⏰ *Jam Kedatangan*: pukul ${arrivalTime} WIB\n`;
    message += `🪑 *Pilihan Spot*  : ${seatName}\n`;
    if (specialNote) {
      message += `✍️ *Catatan Tambah* : "${specialNote}"\n`;
    }
    message += `──────────────────\n`;

    if (basketItems.length > 0) {
      message += `🍽️ *DAFTAR PRE-ORDER HIDANGAN*\n`;
      basketItems.forEach((item, index) => {
        message += `${index + 1}. _${item.product.name}_ (${item.quantity} Porsi) -> ${formatPrice(item.product.price * item.quantity)}\n`;
      });
      message += `\n💰 *Total Estimasi Tagihan Kuliner* : *${formatPrice(subtotal)}*\n`;
      message += `──────────────────\n`;
      message += `_Mohon bantu verifikasi kesiapan meja lesehan & dapur untuk porsi di atas sebelum kedatangan kami._ \n`;
    } else {
      message += `⚠️ _Rombongan kami belum menyertakan pre-order hidangan (Kami mengerti antrean penyajian mungkin berjalan normal)._\n`;
    }

    setGeneratedMessage(message);
    const waURL = buildWALink(BUSINESS_INFO.wa, message);
    trackWhatsAppConversion(e as any, `Reservation Form Submit: ${name}`);
    
    try {
      window.open(waURL, '_blank');
    } catch (err) {
      console.warn("Popup blocked or direct redirect disabled, fallback to manual success button screen", err);
    }
    
    setIsSubmitted(true);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      
      {/* Immersive backdrop */}
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-brand-dark/70 backdrop-blur-sm transition-opacity"
          aria-hidden="true"
        />

        {/* Trick to center modal content in vertical viewport */}
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 30 }}
          transition={{ type: 'spring', duration: 0.5 }}
          className="inline-block align-bottom bg-brand-secondary rounded-[2rem] text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full border border-brand-border"
        >
          
          {/* Header */}
          <div className="bg-brand-primary p-6 md:p-8 text-brand-dark relative">
            <button
              onClick={onClose}
              className="absolute top-6 right-6 text-brand-dark/80 hover:text-black bg-brand-dark/10 hover:bg-brand-dark/20 p-2 rounded-full transition-colors focus-visible:outline-none"
              aria-label="Tutup Panel"
            >
              ✕
            </button>
            <div className="flex items-center gap-2 text-brand-accent mb-2">
              <Sparkles className="w-5 h-5 text-brand-accent animate-spin" style={{ animationDuration: '4s' }} />
              <span className="text-xs font-black tracking-widest uppercase">LAYANAN RESERVASI ONLINE</span>
            </div>
            <h2 className="font-display font-black text-2xl md:text-3xl tracking-tight leading-none">
              Sistem Reservasi Meja & Pre-Order Hidangan
            </h2>
            <p className="text-brand-dark/85 text-xs md:text-sm mt-3 leading-relaxed">
              Membantu rombongan Anda mengunci tempat makan terapung ternyaman & memotong antrean penyajian dapur Warung Papatong Cibinong.
            </p>
          </div>

          <div className="p-6 md:p-8 max-h-[70vh] overflow-y-auto w-full">
            {isSubmitted ? (
              <div className="flex flex-col items-center text-center py-8 px-4">
                {/* Green concentric animation rings */}
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-emerald-500/20 rounded-full animate-ping" />
                  <div className="relative w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center text-white">
                    <Check className="w-8 h-8 stroke-[3]" />
                  </div>
                </div>

                <h3 className="font-display font-black text-2xl text-brand-dark mb-2">
                  Formulir Reservasi Siap Dikirim!
                </h3>
                
                <p className="text-brand-text/85 text-xs md:text-sm max-w-lg mb-6 leading-relaxed">
                  Detail reservasi atas nama <strong className="text-brand-primary">{name}</strong> untuk (<strong className="font-mono text-xs">{guestCount} Orang</strong>) pada <strong>{date} pukul {arrivalTime} WIB</strong> telah tersimpan di sistem.
                </p>

                {/* Summary Structure */}
                <div className="w-full max-w-md bg-brand-primary/5 binder border-brand-border/60 rounded-2xl p-4 mb-6 text-left space-y-2.5 shadow-sm">
                  <div className="text-[10px] uppercase font-bold tracking-widest text-brand-text/50 border-b border-brand-border/45 pb-1.5 flex justify-between">
                    <span>STRUK PRE-ORDER & MEJA</span>
                    <span className="text-emerald-600 font-extrabold flex items-center gap-1 font-mono">● READY TO SEND</span>
                  </div>
                  <div className="grid grid-cols-2 gap-y-1.5 text-xs text-brand-dark font-semibold">
                    <div>Pilihan Spot:</div>
                    <div className="text-right font-extrabold text-brand-primary">{SEAT_TYPES.find(s => s.id === selectedSeat)?.name || selectedSeat}</div>
                    
                    <div>Kontak WhatsApp:</div>
                    <div className="text-right font-mono">{phone}</div>

                    <div>Item Pre-Order:</div>
                    <div className="text-right font-mono text-brand-accent font-extrabold">{basketItems.length} menu</div>

                    {basketItems.length > 0 && (
                      <>
                        <div className="pt-1.5 border-t border-brand-border/30">Total Estimasi Kuliner:</div>
                        <div className="text-right font-display font-black text-sm text-brand-accent pt-1.5 border-t border-brand-border/30">{formatPrice(subtotal)}</div>
                      </>
                    )}
                  </div>
                </div>

                <div className="w-full max-w-md space-y-3">
                  <a
                    href={buildWALink(BUSINESS_INFO.wa, generatedMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => trackWhatsAppConversion(e as any, `Success Screen Open WA: ${name}`)}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-[#FFF] font-extrabold text-sm py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-lg hover:shadow-emerald-600/20"
                  >
                    <MessageSquare className="w-4 h-4 text-[#FFF]" />
                    Kirim Pesan Ke WhatsApp Admin
                  </a>

                  <button
                    type="button"
                    onClick={() => {
                      onClearBasket();
                      setIsSubmitted(false);
                      setErrorMessage(null);
                      setName('');
                      setPhone('');
                      setSpecialNote('');
                      onClose();
                    }}
                    className="w-full bg-brand-dark hover:bg-black text-[#FFF] font-semibold text-xs py-3 px-4 rounded-xl transition-all cursor-pointer"
                  >
                    Selesai & Bersihkan Keranjang
                  </button>

                  <p className="text-[10px] text-zinc-500 leading-relaxed max-w-xs mx-auto">
                    *Membuka aplikasi WhatsApp resmi di browser / telepon secara aman untuk mengirimkan detail pemesanan ke admin Warung Papatong.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Left Column - 7 Columns for Form Details */}
                <div className="lg:col-span-7 space-y-6 font-medium">
                  
                  {errorMessage && (
                    <div className="bg-red-50 text-red-700 text-xs font-bold p-3.5 rounded-xl border border-red-200 flex items-start gap-2.5">
                      <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                      <span>{errorMessage}</span>
                    </div>
                  )}
                
                {/* Section 1: Customer Bio */}
                <div className="space-y-4">
                  <h3 className="font-display font-bold text-lg text-brand-dark border-b border-brand-border/60 pb-1.5 flex items-center gap-2">
                    <span className="w-5 h-5 bg-brand-primary/10 text-brand-primary text-xs font-bold rounded-full flex items-center justify-center">1</span>
                    Kontak & Detail Profil
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-brand-dark uppercase tracking-wider mb-1.5">Nama Pemesan</label>
                      <input
                        type="text"
                        required
                        placeholder="Contoh: Ibu Ranti (Arisan GOR)"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 bg-brand-surface border border-brand-border/80 rounded-xl text-sm focus:border-brand-primary outline-none focus:ring-4 focus:ring-brand-primary/5 transition-all text-brand-dark placeholder:text-brand-text/40"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs font-bold text-brand-dark uppercase tracking-wider mb-1.5">No WhatsApp Aktif</label>
                      <input
                        type="tel"
                        required
                        placeholder="Contoh: 081234567890"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-4 py-3 bg-brand-surface border border-brand-border/80 rounded-xl text-sm focus:border-brand-primary outline-none focus:ring-4 focus:ring-brand-primary/5 transition-all text-brand-dark placeholder:text-brand-text/40"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 2: Guest Sizing & Time */}
                <div className="space-y-4 pt-1">
                  <h3 className="font-display font-bold text-lg text-brand-dark border-b border-brand-border/60 pb-1.5 flex items-center gap-2">
                    <span className="w-5 h-5 bg-brand-primary/10 text-brand-primary text-xs font-bold rounded-full flex items-center justify-center">2</span>
                    Kehadiran & Tanggal
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    
                    {/* Guest Counter */}
                    <div>
                      <label className="block text-xs font-bold text-brand-dark uppercase tracking-wider mb-1.5 flex justify-between">
                        <span>Porsi Tamu</span>
                        <span className="text-brand-accent font-black text-xs">{guestCount} Orang</span>
                      </label>
                      <input
                        type="range"
                        min="2"
                        max="40"
                        value={guestCount}
                        onChange={(e) => setGuestCount(parseInt(e.target.value))}
                        className="w-full h-2 bg-brand-border rounded-lg appearance-none cursor-pointer accent-brand-accent"
                      />
                      <div className="flex justify-between text-[10px] text-brand-text/60 mt-1 font-bold">
                        <span>Min (2)</span>
                        <span>Med (15)</span>
                        <span>Max (40+)</span>
                      </div>
                    </div>

                    {/* Date picker */}
                    <div>
                      <label className="block text-xs font-bold text-brand-dark uppercase tracking-wider mb-1.5">Tanggal Main</label>
                      <div className="relative">
                        <Calendar className="w-4 h-4 text-brand-text/50 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="date"
                          required
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          className="w-full pl-9 pr-3 py-2.5 bg-brand-surface border border-brand-border/80 rounded-xl text-sm focus:border-brand-primary outline-none text-brand-dark"
                        />
                      </div>
                    </div>

                    {/* Arrival time dropdown */}
                    <div>
                      <label className="block text-xs font-bold text-brand-dark uppercase tracking-wider mb-1.5">Jam Saji</label>
                      <div className="relative">
                        <Clock className="w-4 h-4 text-brand-text/50 absolute left-3 top-1/2 -translate-y-1/2" />
                        <select
                          value={arrivalTime}
                          onChange={(e) => setArrivalTime(e.target.value)}
                          className="w-full pl-9 pr-3 py-2.5 bg-brand-surface border border-brand-border/80 rounded-xl text-sm focus:border-brand-primary outline-none text-brand-dark appearance-none"
                        >
                          <option value="11:00">11:00 WIB (Siang)</option>
                          <option value="12:00">12:00 WIB</option>
                          <option value="13:00">13:00 WIB</option>
                          <option value="14:00">14:00 WIB</option>
                          <option value="15:00">15:00 WIB (Sore)</option>
                          <option value="16:00">16:00 WIB</option>
                          <option value="17:50">17:50 WIB (Senja)</option>
                          <option value="18:30">18:30 WIB (Live Rekomendasi)</option>
                          <option value="19:30">19:30 WIB</option>
                          <option value="20:30">20:30 WIB (Maksimal)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Warning Cerdas for parties larger than 10 */}
                  <AnimatePresence>
                    {isPartyLarge && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-brand-accent/5 border border-brand-accent/20 rounded-xl p-3 flex items-start gap-2.5 text-brand-dark"
                      >
                        <AlertCircle className="w-5 h-5 text-brand-accent shrink-0 mt-0.5" />
                        <div>
                          <p className="font-bold text-xs">Pemberitahuan Rombongan Besar (&ge;10 Orang)</p>
                          <p className="text-[11px] text-brand-text/90 mt-0.5 leading-relaxed">
                            Pemesanan di atas 10 orang sangat disarankan untuk melakukan Pre-order makanan agar masakan langsung disajikan dalam 10 menit sesudah rombongan tiba, menjamin kelancaran kumpul keluarga tanpa menanti lama.
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Section 3: Seat Layout Picker */}
                <div className="space-y-3 pt-1">
                  <h3 className="font-display font-bold text-lg text-brand-dark border-b border-brand-border/60 pb-1.5 flex items-center gap-2">
                    <span className="w-5 h-5 bg-brand-primary/10 text-brand-primary text-xs font-bold rounded-full flex items-center justify-center">3</span>
                    Pilih Desain Spot & Lokasi Duduk
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {SEAT_TYPES.map((seat) => {
                      const isSelected = selectedSeat === seat.id;
                      return (
                        <div
                          key={seat.id}
                          onClick={() => setSelectedSeat(seat.id)}
                          className={`group cursor-pointer rounded-2xl overflow-hidden border-2 transition-all duration-300 flex flex-col justify-between ${
                            isSelected
                              ? 'border-brand-primary bg-brand-primary/10 shadow-md shadow-brand-primary/10 scale-[1.01]'
                              : 'border-brand-border/60 bg-brand-surface hover:border-brand-primary/20'
                          }`}
                        >
                          <div className="aspect-[16/8] overflow-hidden relative">
                            <img src={seat.image} alt={seat.name} className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-3">
                              <span className="text-[10px] font-black tracking-widest text-[#FFF] uppercase bg-brand-accent px-2 py-0.5 rounded-full">
                                Kapasitas: {seat.capacity}
                              </span>
                            </div>
                            
                            {/* Live available ring tracker */}
                            <div className="absolute top-2 right-2 bg-brand-dark/80 text-[#FFF] text-[9px] font-bold py-1 px-2 rounded backdrop-blur-md flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                              <span>Sisa {seat.availableCount} Area</span>
                            </div>
                          </div>
                          
                          <div className="p-3.5 flex flex-col justify-between flex-grow">
                            <h4 className="font-bold text-xs md:text-sm text-brand-dark group-hover:text-brand-primary">
                              {seat.name}
                            </h4>
                            <p className="text-[10px] text-brand-text/70 mt-1 leading-relaxed">
                              {seat.desc}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Section 4: Customer Note */}
                <div className="space-y-2 pt-1">
                  <label className="block text-xs font-bold text-brand-dark uppercase tracking-wider">Catatan Khusus Pengelola (Opsional)</label>
                  <textarea
                    placeholder="Contoh: 'Butuh 3 Kursi Bayi (Baby Chair)', 'Dekat panggung jika memungkinkan', 'Ulang Tahun Nenek silakan dibantu lilin'."
                    value={specialNote}
                    onChange={(e) => setSpecialNote(e.target.value)}
                    className="w-full px-4 py-3 bg-brand-surface border border-brand-border/80 rounded-xl text-sm focus:border-brand-primary outline-none focus:ring-4 focus:ring-brand-primary/5 transition-all text-brand-dark h-20 resize-none placeholder:text-brand-text/40"
                  />
                </div>

              </div>

              {/* Right Column - 5 Columns for Pre-Order Live Calculator Receipts */}
              <div className="lg:col-span-5 bg-brand-primary/5 p-6 rounded-3xl border border-brand-border flex flex-col justify-between">
                
                {/* Header of Calc */}
                <div>
                  <div className="border-b border-brand-border/60 pb-3 mb-4">
                    <h3 className="font-display font-bold text-lg text-brand-dark flex items-center justify-between">
                      <span>Rincian Pre-Order</span>
                      {basketItems.length > 0 && (
                        <button
                          type="button"
                          onClick={onClearBasket}
                          className="text-xs text-red-600 hover:text-red-700 flex items-center gap-1.5 p-1 rounded hover:bg-red-50"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          Kosongkan
                        </button>
                      )}
                    </h3>
                    <p className="text-xs text-brand-text/70 mt-1">Hidangan yang dimasak sebelum Anda mendarat.</p>
                  </div>

                  {/* List of items */}
                  {basketItems.length === 0 ? (
                    <div className="py-12 px-4 text-center border-2 border-dashed border-brand-border/60 rounded-2xl bg-brand-surface/40">
                      <p className="text-sm font-medium text-brand-text/80 leading-relaxed">
                        Belum ada masakan terpilih di Keranjang Anda.
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          onClose();
                          document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="text-xs font-bold text-brand-primary mt-2 border border-brand-primary/30 px-3 py-1.5 rounded-full hover:bg-brand-primary/10 transition-colors"
                      >
                        + Temukan Menu Seafood & Sunda
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3 max-h-[30vh] overflow-y-auto pr-1">
                      {basketItems.map((item) => (
                        <div key={item.product.id} className="flex items-center justify-between bg-brand-surface p-3 rounded-xl border border-brand-border/40 shadow-xs">
                          <div className="flex-grow pr-3">
                            <h4 className="font-bold text-xs text-brand-dark line-clamp-1">{item.product.name}</h4>
                            <p className="text-[10px] text-brand-text/60 font-sans mt-0.5">{formatPrice(item.product.price)} x {item.quantity} porsi</p>
                          </div>
                          
                          {/* Mini counters */}
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => onRemoveFromBasket(item.product.id)}
                              className="w-5 h-5 bg-brand-secondary border border-brand-border rounded-full flex items-center justify-center text-xs text-brand-dark hover:bg-brand-border"
                            >
                              -
                            </button>
                            <span className="font-sans font-bold text-xs w-[16px] text-center text-brand-dark">{item.quantity}</span>
                            <button
                              type="button"
                              onClick={() => onAddToBasket(item.product)}
                              className="w-5 h-5 bg-brand-secondary border border-brand-border rounded-full flex items-center justify-center text-xs text-brand-dark hover:bg-brand-border"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Bill Subtotals calculation */}
                  {basketItems.length > 0 && (
                    <div className="mt-6 pt-4 border-t border-brand-border space-y-2">
                      <div className="flex items-center justify-between text-xs text-brand-text/80">
                        <span>Porsi Hidangan Total</span>
                        <span className="font-sans font-medium">{basketItems.reduce((a, b) => a + b.quantity, 0)} Porsi</span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-brand-text/80">
                        <span>Layanan Meja & Sterilisasi</span>
                        <span className="text-brand-primary font-black uppercase text-[10px]">Gratis</span>
                      </div>
                      
                      <div className="flex items-center justify-between pt-2 border-t border-brand-border/40 text-brand-dark">
                        <span className="font-bold text-sm">Estimasi Pembayaran</span>
                        <span className="font-display font-black text-lg text-brand-accent">{formatPrice(subtotal)}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Final Form Submission Trigger */}
                <div className="mt-8 space-y-4">
                  <div className="bg-brand-dark text-brand-secondary p-3.5 rounded-xl border border-brand-primary text-[11px] leading-relaxed flex items-center gap-2">
                    <Check className="w-5 h-5 min-w-[20px] text-brand-accent shrink-0" />
                    <span>Meja terpilih Anda akan langsung dipending selama 60 menit sesudah admin membalas pesan WhatsApp reservasi masuk.</span>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-brand-accent hover:bg-brand-primary text-white font-black text-base py-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-xl hover:shadow-brand-accent/25 transform hover:-translate-y-0.5"
                  >
                    <MessageSquare className="w-5 h-5 text-white animate-pulse" />
                    Kirim Form via WhatsApp
                  </button>

                  <p className="text-[10px] text-center text-brand-text/75">
                    *Membuka halaman chat WA resmi Warung Papatong Cibinong secara instan dan aman.
                  </p>
                </div>

              </div>

            </form>
          )}
          </div>

        </motion.div>
      </div>

    </div>
  );
}
