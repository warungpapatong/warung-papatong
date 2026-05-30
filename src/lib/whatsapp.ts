// src/lib/whatsapp.ts
// ─────────────────────────────────────────────────────────────────────────────
// Centralized WhatsApp message builder.
//
// Semua format pesan WA yang berkaitan dengan produk/menu dibangun di sini.
// Komponen & halaman DILARANG menulis format pesan WA secara hardcoded.
//
// DAFTAR FUNGSI
// ─────────────────────────────────────────────────────────────────────────────
//  buildMenuWAMessage()        — pesan order satu item menu (tanpa qty)
//  buildMenuWAMessageWithQty() — pesan order satu item + jumlah porsi
//  buildCartWAMessage()        — pesan checkout seluruh keranjang (multi-item)
//  buildCateringWAMessage()    — pesan inquiry katering / gathering
// ─────────────────────────────────────────────────────────────────────────────

import type { Product } from '@/types'
import { formatProductPrice, formatPrice } from '@/data'

// ────────────────────────────────────────────────────────────────────────────
// Internal helper — gabungkan baris jadi string WhatsApp-friendly
// ────────────────────────────────────────────────────────────────────────────

const lines = (...rows: string[]): string => rows.join('\n')

// ════════════════════════════════════════════════════════════════════════════
// buildMenuWAMessage
// ════════════════════════════════════════════════════════════════════════════
// Dipakai oleh: tombol "Pesan WA" per kartu produk di MenuSection
//               saat qty = 0 (belum ada di keranjang).
//
// @param businessName  — dari BUSINESS_INFO.name
// @param product       — objek Product (price + priceUnit dipakai untuk harga)
// ────────────────────────────────────────────────────────────────────────────

export function buildMenuWAMessage(
  businessName: string,
  product: Pick<Product, 'name' | 'price' | 'priceUnit'>,
): string {
  return lines(
    `Halo ${businessName},`,
    '',
    `Saya tertarik dengan menu *"${product.name}"*.`,
    '',
    `*Harga* : ${formatProductPrice(product)}`,
    '',
    'Apakah menu ini masih tersedia?',
    'Jika masih tersedia saya ingin lanjut memesan.',
    '',
    'Terima kasih.',
  )
}

// ════════════════════════════════════════════════════════════════════════════
// buildMenuWAMessageWithQty
// ════════════════════════════════════════════════════════════════════════════
// Dipakai oleh: tombol "Pesan WA" saat user sudah set qty > 0 di keranjang.
//
// @param businessName  — dari BUSINESS_INFO.name
// @param product       — objek Product
// @param qty           — jumlah porsi yang dipilih
// ────────────────────────────────────────────────────────────────────────────

export function buildMenuWAMessageWithQty(
  businessName: string,
  product: Pick<Product, 'name' | 'price' | 'priceUnit'>,
  qty: number,
): string {
  const totalPrice = formatPrice(product.price * qty)
  return lines(
    `Halo ${businessName},`,
    '',
    `Saya ingin memesan menu *"${product.name}"*.`,
    '',
    `*Jumlah* : ${qty} porsi`,
    `*Harga*  : ${formatProductPrice(product)}`,
    `*Total*  : ${totalPrice}`,
    '',
    'Apakah pesanan ini bisa diproses?',
    '',
    'Terima kasih.',
  )
}

// ════════════════════════════════════════════════════════════════════════════
// buildCartWAMessage
// ════════════════════════════════════════════════════════════════════════════
// Dipakai oleh: CheckoutModal — kirim seluruh isi keranjang sekaligus.
//
// @param businessName  — dari BUSINESS_INFO.name
// @param items         — array item keranjang yang sudah di-resolve ke Product
// @param subtotal      — total harga keranjang (sudah dihitung di komponen)
// @param notes         — catatan opsional dari user (e.g. "meja nomor 5")
// ────────────────────────────────────────────────────────────────────────────

export interface CartItem {
  product: Pick<Product, 'name' | 'price' | 'priceUnit'>
  qty: number
}

export function buildCartWAMessage(
  businessName: string,
  items: CartItem[],
  subtotal: number,
  notes?: string,
): string {
  const itemLines = items.map(({ product, qty }, idx) => {
    const lineTotal = formatPrice(product.price * qty)
    // Tampilkan harga satuan dengan unit-nya agar konsisten dengan UI kartu
    return `${idx + 1}. ${product.name}\n   ${formatProductPrice(product)} × ${qty} = ${lineTotal}`
  })

  return lines(
    `Halo ${businessName},`,
    '',
    'Saya ingin melakukan pre-order dengan daftar berikut:',
    '',
    ...itemLines,
    '',
    `*Total Pesanan* : ${formatPrice(subtotal)}`,
    ...(notes ? ['', `*Catatan* : ${notes}`] : []),
    '',
    'Mohon konfirmasi ketersediaan dan estimasi waktu penyajian.',
    '',
    'Terima kasih.',
  )
}

// ════════════════════════════════════════════════════════════════════════════
// buildCateringWAMessage
// ════════════════════════════════════════════════════════════════════════════
// Dipakai oleh: Banner katering di MenuSection & halaman gathering.
//
// @param businessName  — dari BUSINESS_INFO.name
// ────────────────────────────────────────────────────────────────────────────

export function buildCateringWAMessage(businessName: string): string {
  return lines(
    `Halo ${businessName},`,
    '',
    'Saya ingin berdiskusi mengenai paket katering / gathering acara besar.',
    '',
    'Bisa bantu saya untuk mendapatkan informasi lebih lanjut?',
    '',
    'Terima kasih.',
  )
}