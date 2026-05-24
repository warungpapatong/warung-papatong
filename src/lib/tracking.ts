// src/lib/tracking.ts
// ─────────────────────────────────────────────────────────────────────────────
// Re-export barrel — supaya import path tidak berubah saat internal refactor.
// Komponen cukup import dari '@/lib/tracking', bukan '@/lib/config'.
// ─────────────────────────────────────────────────────────────────────────────

export { trackWhatsAppConversion, APP_CONFIG } from './config';