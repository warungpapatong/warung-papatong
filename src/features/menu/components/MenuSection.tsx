import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, Plus, Minus, Search, Sparkles, Utensils, Check } from 'lucide-react';
import { Product } from '@/types';
import { PRODUCTS_DATA, formatPrice } from '@/data';
import { trackWhatsAppConversion } from '@/lib/tracking';

interface MenuSectionProps {
  basket: Record<number, number>;
  onAddToBasket: (product: Product) => void;
  onRemoveFromBasket: (productId: number) => void;
  onOpenBooking: () => void;
}

const CATEGORIES = [
  { id: 'all', label: 'Semua Menu' },
  { id: 'seafood', label: 'Seafood Olahan' },
  { id: 'sunda', label: 'Paket Sunda' },
  { id: 'sayur', label: 'Veggies & Co.' },
  { id: 'minuman', label: 'Segar Minuman' }
];

export default function MenuSection({
  basket,
  onAddToBasket,
  onRemoveFromBasket,
  onOpenBooking
}: MenuSectionProps) {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter products based on search AND category tab
  const filteredProducts = PRODUCTS_DATA.filter(p => {
    const matchesCategory = activeTab === 'all' || p.category === activeTab;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section
      id="menu"
      className="py-20 md:py-24 bg-brand-surface relative z-10"
    >
      {/* Absolute Decorative Ghost Background */}
      <span className="absolute bottom-12 left-8 text-[126px] font-black opacity-[0.03] select-none pointer-events-none font-display text-brand-dark leading-none">
        KULINER
      </span>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-primary/5 text-brand-primary rounded-full text-xs font-bold tracking-widest uppercase mb-4">
            <Utensils className="w-3.5 h-3.5" />
            <span>ESTETIKA GUSTATORI INDONESIA</span>
          </div>
          
          <h2 className="font-display font-black text-3xl md:text-5xl text-brand-dark tracking-tight leading-none">
            E-Menu Digital Interaktif Terlengkap kami
          </h2>
          
          <p className="text-brand-text/80 text-base md:text-lg mt-4 leading-relaxed">
            Pilih menu favorit keluarga Anda terlebih dahulu untuk kami siapkan di meja sebelum Anda tiba, mencegah makanan telat tersaji & bahan menu utama kehabisan di jam malam!
          </p>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 bg-brand-secondary/40 p-4 rounded-2xl border border-brand-border/40">
          
          {/* Categories 2-Column Wrapping Grid on Mobile, Flex on Desktop */}
          <div className="grid grid-cols-2 gap-2 w-full md:flex md:w-auto md:items-center md:gap-1.5 md:max-w-full">
            {CATEGORIES.map((tab, idx) => {
              const isActive = activeTab === tab.id;
              const isLastOdd = idx === CATEGORIES.length - 1 && CATEGORIES.length % 2 !== 0;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-2 py-2 text-[11px] sm:text-xs md:text-sm md:px-4 md:py-2 font-bold rounded-xl md:rounded-full transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary whitespace-normal md:whitespace-nowrap text-center flex items-center justify-center min-h-[36px] md:min-h-0 ${
                    isLastOdd ? 'col-span-2 md:col-span-1' : ''
                  } ${
                    isActive ? 'text-brand-surface' : 'text-brand-text hover:text-brand-dark'
                  }`}
                >
                  <span className="relative z-10 leading-tight">{tab.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeMenuTab"
                      className="absolute inset-0 bg-brand-primary rounded-xl md:rounded-full z-0"
                      transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Search bar widget */}
          <div className="relative max-w-md w-full">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-brand-text/50">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              placeholder="Cari kepiting, timbel, kangkung..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-brand-secondary border border-brand-border/80 focus:border-brand-primary rounded-full text-sm text-brand-dark placeholder:text-brand-text/40 focus:ring-2 focus:ring-brand-primary/10 transition-all outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-brand-text/50 hover:text-brand-dark"
              >
                Clear
              </button>
            )}
          </div>

        </div>

        {/* Magazine Grid Layout (Varied card dimensions) */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-24 bg-brand-secondary/20 rounded-3xl border border-dashed border-brand-border/60">
            <p className="text-brand-text text-base">Menu yang Anda cari tidak ditemukan. Coba ketik kata kunci lain!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product, index) => {
              const qtyInBasket = basket[product.id] || 0;
              // Make all items uniform (disable large featured first card)
              const isLargeFeatured = false;

              return (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-brand-secondary/20 border border-brand-border/40 hover:border-brand-primary/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-brand-dark/5 ${
                    isLargeFeatured ? 'md:col-span-2 lg:flex-row' : 'flex-col'
                  }`}
                >
                  
                  {/* Photo Section */}
                  <div className={`relative overflow-hidden ${
                    isLargeFeatured ? 'lg:w-[48%] h-64 lg:h-full' : 'w-full h-56'
                  }`}>
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Dark gradient blur over image bottom */}
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/40 to-transparent pointer-events-none" />

                    {/* Left overlay badge category */}
                    <div className="absolute top-4 left-4 font-sans font-bold text-[10px] tracking-widest text-[#FFF] uppercase bg-brand-dark/60 backdrop-blur-md px-3 py-1 rounded-full">
                      {product.categoryLabel}
                    </div>

                    {/* Right overlay badge Terlaris / Baru */}
                    {product.badge && (
                      <div className="absolute top-4 right-4 bg-brand-accent text-[#FFF] text-xs font-black px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
                        <Sparkles className="w-3" />
                        <span>{product.badge}</span>
                      </div>
                    )}

                    {/* Active simulated stock label */}
                    <div className="absolute bottom-4 left-4 flex items-center gap-1.5 bg-black/40 backdrop-blur-md py-1 px-2.5 rounded-md text-[10px] font-bold text-white">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      <span>Dapur Ready</span>
                    </div>
                  </div>

                  {/* Text Details Section */}
                  <div className={`p-6 flex flex-col justify-between ${
                    isLargeFeatured ? 'lg:w-[52%]' : 'w-full flex-grow'
                  }`}>
                    <div>
                      {/* Name & Pricing Row */}
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="font-display font-bold text-xl md:text-2xl text-brand-dark group-hover:text-brand-primary transition-colors leading-tight">
                          {product.name}
                        </h3>
                      </div>
                      
                      {/* Price Badge and availability marker */}
                      <div className="flex items-center gap-2 mt-2">
                        <span className="font-display font-black text-lg text-brand-accent">
                          {product.priceFormatted}
                        </span>
                        <span className="text-brand-text/50 text-xs">• Makan Tengah / Rombongan</span>
                      </div>

                      {/* Description with clamping lines as constraint */}
                      <p className="text-brand-text/80 text-sm mt-3 leading-relaxed line-clamp-3">
                        {product.description}
                      </p>
                    </div>

                    {/* Dynamic Action Buttons Block */}
                    <div className="mt-6 pt-5 border-t border-brand-border/40 flex flex-col sm:flex-row items-center justify-between gap-4">
                      
                      {/* Booking cart system */}
                      <div className="w-full sm:w-auto">
                        {qtyInBasket > 0 ? (
                          <div className="flex items-center justify-between bg-brand-primary text-brand-dark p-1 rounded-full w-full sm:w-fit gap-3">
                            <button
                              onClick={() => onRemoveFromBasket(product.id)}
                              className="p-1.5 hover:bg-brand-dark hover:text-white rounded-full transition-colors focus-visible:outline-none cursor-pointer"
                              aria-label="Kurangi jumlah pre-order"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            
                            <span className="font-sans font-bold text-sm min-w-[20px] text-center px-1">
                              {qtyInBasket} porsi
                            </span>
                            
                            <button
                              onClick={() => onAddToBasket(product)}
                              className="p-1.5 hover:bg-brand-dark hover:text-white rounded-full transition-colors focus-visible:outline-none cursor-pointer"
                              aria-label="Tambah jumlah pre-order"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => onAddToBasket(product)}
                            className="w-full sm:w-auto bg-brand-primary/10 hover:bg-brand-primary text-brand-dark font-bold text-xs py-2.5 px-4 rounded-full transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            Pre-Order Porsi
                          </button>
                        )}
                      </div>

                      {/* Immediate WhatsApp order button fallback */}
                      <a
                        href={`https://wa.me/6281388497651?text=${encodeURIComponent(product.waMessage)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => trackWhatsAppConversion(e as any, `Menu Instant Order: ${product.name}`)}
                        className="w-full sm:w-auto text-center border-2 border-brand-primary/20 hover:border-brand-primary text-brand-dark font-bold text-xs py-2.5 px-4 rounded-full transition-all duration-300 flex items-center justify-center gap-1.5 hover:bg-brand-primary/5 cursor-pointer"
                      >
                        <ShoppingCart className="w-3.5 h-3.5 text-brand-accent" />
                        Pesan Instan via WA
                      </a>

                    </div>
                  </div>

                </motion.div>
              );
            })}
          </div>
        )}

        {/* Floating summary of the current Pre-order status triggering checkout */}
        {Object.keys(basket).length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-6 left-6 right-6 lg:left-auto lg:right-12 z-30 max-w-sm glass-panel p-5 rounded-2xl shadow-2xl border-2 border-brand-primary/30"
          >
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-brand-border/40">
              <span className="font-bold text-sm text-brand-dark flex items-center gap-2">
                <ShoppingCart className="w-4 h-4 text-brand-accent" />
                Keranjang Pre-Order Anda
              </span>
              <span className="bg-brand-primary text-brand-dark text-xs font-bold px-2.5 py-0.5 rounded-full">
                {Object.values(basket).reduce((a, b) => a + b, 0)} Item
              </span>
            </div>

            <p className="text-xs text-brand-text/80 mb-4 leading-relaxed">
              Anda telah mengantongi hidangan lezat. Lanjutkan pendaftaran untuk memesan meja duduk kumpul keluarga!
            </p>

            <button
              onClick={onOpenBooking}
              className="w-full bg-brand-accent hover:bg-brand-primary text-white font-bold text-sm py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-lg hover:shadow-brand-accent/20"
            >
              Lanjutkan Booking Meja Lesehan
              <Check className="w-4 h-4" />
            </button>
          </motion.div>
        )}

      </div>
    </section>
  );
}
