// tailwind.config.js
// ─────────────────────────────────────────────────────────────────────────────
// Warung Papatong — Tailwind CSS v3 Design System
// Single source of truth untuk semua design tokens.
// Import di globals.css via @tailwind directives (BUKAN @theme).
// ─────────────────────────────────────────────────────────────────────────────

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // ─── COLOR PALETTE ────────────────────────────────────────────────────
      // Sumber: Logo brand (kuning #FFCC00, merah #E60000) + UI system tokens
      colors: {
        brand: {
          // Primary — kuning "capung Papatong", untuk CTA utama & accents
          primary:   '#FFCC00',
          'primary-hover': '#F5C200',
          'primary-light': '#FFF3B0',
          'primary-dark':  '#CC9900',

          // Accent — merah cabai, untuk badge promo, label hot, error states
          red:       '#E60000',
          'red-hover': '#CC0000',
          'red-light': '#FFE5E5',

          // Neutrals — UI structure
          dark:      '#202124',   // Rich black — heading, navbar bg
          text:      '#3D3D3D',   // Body text
          muted:     '#6B7280',   // Secondary text, placeholders
          subtle:    '#9CA3AF',   // Disabled, faint labels

          // Backgrounds
          bg:        '#F8F9FA',   // Page background (warm off-white)
          surface:   '#FFFFFF',   // Card, modal, sheet
          'surface-2': '#F3F4F6', // Nested card background

          // Borders & dividers
          border:    '#E5E7EB',
          'border-strong': '#D1D5DB',

          // Semantic / status
          success:   '#16A34A',
          'success-light': '#DCFCE7',
          warning:   '#D97706',
          'warning-light': '#FEF3C7',
          info:      '#2563EB',
          'info-light': '#DBEAFE',
        },

        // WhatsApp brand — hanya dipakai untuk tombol WA, JANGAN override
        wa: {
          DEFAULT: '#25D366',
          hover:   '#1EBE5C',
          dark:    '#128C7E',
        },
      },

      // ─── TYPOGRAPHY ───────────────────────────────────────────────────────
      fontFamily: {
        // Body & UI — keterbacaan tinggi di mobile
        sans:    ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        // Display / heading — karakter kuat, modern
        display: ['var(--font-display)', 'ui-sans-serif', 'sans-serif'],
        // Monospace — harga, kode, koordinat, jam operasional
        mono:    ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },

      fontSize: {
        // Custom scale melengkapi Tailwind default
        '2xs': ['0.625rem', { lineHeight: '0.875rem' }],  // 10px
        'display-sm': ['2rem',    { lineHeight: '2.4rem',  letterSpacing: '-0.02em' }],
        'display':    ['2.75rem', { lineHeight: '3.25rem', letterSpacing: '-0.03em' }],
        'display-lg': ['3.5rem',  { lineHeight: '4rem',    letterSpacing: '-0.04em' }],
        'display-xl': ['4.5rem',  { lineHeight: '5rem',    letterSpacing: '-0.04em' }],
      },

      fontWeight: {
        // Tailwind defaults cukup, tapi kita alias untuk konsistensi
        body:    '400',
        medium:  '500',
        semibold:'600',
        bold:    '700',
        black:   '900',
      },

      // ─── SPACING (custom scale) ───────────────────────────────────────────
      spacing: {
        '4.5': '1.125rem',
        '13':  '3.25rem',
        '15':  '3.75rem',
        '18':  '4.5rem',
        '22':  '5.5rem',
        '30':  '7.5rem',
        '34':  '8.5rem',
      },

      // ─── BORDER RADIUS ────────────────────────────────────────────────────
      borderRadius: {
        'xs':  '0.25rem',
        '4xl': '2rem',
        '5xl': '2.5rem',
      },

      // ─── SHADOWS ──────────────────────────────────────────────────────────
      boxShadow: {
        // Soft card shadows — brand-aware
        'card':     '0 2px 8px 0 rgba(32, 33, 36, 0.08)',
        'card-md':  '0 4px 16px 0 rgba(32, 33, 36, 0.12)',
        'card-lg':  '0 8px 32px 0 rgba(32, 33, 36, 0.16)',

        // Yellow glow — untuk hover CTA
        'glow-primary': '0 0 0 3px rgba(255, 204, 0, 0.35)',
        'glow-primary-lg': '0 8px 32px -4px rgba(255, 204, 0, 0.5)',

        // Red glow — untuk badge promo
        'glow-red': '0 0 0 3px rgba(230, 0, 0, 0.2)',

        // WA green glow
        'glow-wa': '0 4px 20px 0 rgba(37, 211, 102, 0.4)',

        // Inset untuk input focus
        'inner-brand': 'inset 0 0 0 2px #FFCC00',
      },

      // ─── BACKGROUND GRADIENTS (via arbitrary values, dokumentasi di sini) ─
      // Dipakai langsung di className:
      // bg-gradient-to-br from-brand-primary to-brand-primary-dark
      // bg-gradient-to-b  from-brand-dark to-[#2d2f32]

      // ─── ANIMATION ────────────────────────────────────────────────────────
      keyframes: {
        'fade-up': {
          '0%':   { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in': {
          '0%':   { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'slide-in-right': {
          '0%':   { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)',    opacity: '1' },
        },
        'slide-in-left': {
          '0%':   { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)',     opacity: '1' },
        },
        'bounce-subtle': {
          '0%, 100%': { transform: 'translateY(-4px)' },
          '50%':      { transform: 'translateY(0)' },
        },
        'pulse-ring': {
          '0%':   { transform: 'scale(1)',    opacity: '0.8' },
          '100%': { transform: 'scale(1.5)', opacity: '0' },
        },
        'shimmer': {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-8px)' },
        },
      },

      animation: {
        'fade-up':       'fade-up 0.4s ease-out',
        'fade-up-slow':  'fade-up 0.6s ease-out',
        'fade-in':       'fade-in 0.3s ease-out',
        'scale-in':      'scale-in 0.2s ease-out',
        'slide-right':   'slide-in-right 0.35s cubic-bezier(0.32, 0.72, 0, 1)',
        'slide-left':    'slide-in-left 0.35s cubic-bezier(0.32, 0.72, 0, 1)',
        'bounce-subtle': 'bounce-subtle 2s ease-in-out infinite',
        'pulse-ring':    'pulse-ring 1.4s cubic-bezier(0.215, 0.61, 0.355, 1) infinite',
        'shimmer':       'shimmer 2s linear infinite',
        'float':         'float 3s ease-in-out infinite',
      },

      // ─── TRANSITIONS ──────────────────────────────────────────────────────
      transitionTimingFunction: {
        'brand': 'cubic-bezier(0.32, 0.72, 0, 1)',  // Apple-style spring
        'ease-spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)', // Overshoot spring
      },

      transitionDuration: {
        '250': '250ms',
        '350': '350ms',
        '400': '400ms',
      },

      // ─── Z-INDEX SYSTEM ───────────────────────────────────────────────────
      zIndex: {
        'navbar':   '100',
        'overlay':  '200',
        'modal':    '300',
        'toast':    '400',
        'floating': '500',
      },

      // ─── CONTAINER ────────────────────────────────────────────────────────
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '1.5rem',
          lg: '2rem',
          xl: '2.5rem',
        },
      },

      // ─── SCREEN BREAKPOINTS ───────────────────────────────────────────────
      screens: {
        'xs': '480px',
        // sm: 640px  (default)
        // md: 768px  (default)
        // lg: 1024px (default)
        // xl: 1280px (default)
        '2xl': '1440px',
        '3xl': '1920px',
      },

      // ─── ASPECT RATIOS ────────────────────────────────────────────────────
      aspectRatio: {
        'card':    '4 / 3',
        'hero':    '16 / 9',
        'product': '1 / 1',
        'banner':  '3 / 1',
      },

      // ─── GRID TEMPLATE COLUMNS ────────────────────────────────────────────
      gridTemplateColumns: {
        'auto-fill-sm':  'repeat(auto-fill, minmax(160px, 1fr))',
        'auto-fill-md':  'repeat(auto-fill, minmax(240px, 1fr))',
        'auto-fill-lg':  'repeat(auto-fill, minmax(320px, 1fr))',
        'auto-fit-card': 'repeat(auto-fit, minmax(280px, 1fr))',
      },
    },
  },

  plugins: [
    // ─── Utility plugin: typography variants & custom classes ───────────────
    function({ addUtilities, addComponents, theme }) {
      // ─── Skeleton shimmer pattern ──────────────────────────────────────
      addUtilities({
        '.skeleton': {
          background: `linear-gradient(90deg, ${theme('colors.brand.surface-2')} 25%, ${theme('colors.brand.border')} 50%, ${theme('colors.brand.surface-2')} 75%)`,
          backgroundSize: '200% 100%',
          animation: theme('animation.shimmer'),
        },
      });

      // ─── Text gradient utilities ───────────────────────────────────────
      addUtilities({
        '.text-gradient-brand': {
          background: `linear-gradient(135deg, ${theme('colors.brand.primary')}, ${theme('colors.brand.red')})`,
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          'background-clip': 'text',
        },
        '.text-gradient-dark': {
          background: `linear-gradient(135deg, ${theme('colors.brand.dark')}, ${theme('colors.brand.muted')})`,
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          'background-clip': 'text',
        },
      });

      // ─── Focus ring brand ─────────────────────────────────────────────
      addUtilities({
        '.focus-brand': {
          '&:focus-visible': {
            outline: 'none',
            boxShadow: theme('boxShadow.glow-primary'),
          },
        },
      });

      // ─── Glass morphism ───────────────────────────────────────────────
      addUtilities({
        '.glass': {
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(12px)',
          '-webkit-backdrop-filter': 'blur(12px)',
          border: `1px solid ${theme('colors.brand.border')}`,
        },
        '.glass-dark': {
          background: 'rgba(32, 33, 36, 0.8)',
          backdropFilter: 'blur(12px)',
          '-webkit-backdrop-filter': 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        },
      });

      // ─── Reusable component tokens ────────────────────────────────────
      addComponents({
        // Badge variants
        '.badge': {
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.25rem',
          padding: '0.125rem 0.5rem',
          borderRadius: '9999px',
          fontSize: '0.6875rem',
          fontWeight: '600',
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
          lineHeight: '1.4',
        },
        '.badge-primary': {
          backgroundColor: theme('colors.brand.primary'),
          color: theme('colors.brand.dark'),
        },
        '.badge-red': {
          backgroundColor: theme('colors.brand.red'),
          color: '#FFFFFF',
        },
        '.badge-dark': {
          backgroundColor: theme('colors.brand.dark'),
          color: '#FFFFFF',
        },
        '.badge-outline': {
          backgroundColor: 'transparent',
          color: theme('colors.brand.text'),
          border: `1px solid ${theme('colors.brand.border-strong')}`,
        },
        '.badge-success': {
          backgroundColor: theme('colors.brand.success-light'),
          color: theme('colors.brand.success'),
        },

        // Button base
        '.btn': {
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
          borderRadius: '0.75rem',
          fontWeight: '600',
          transition: 'all 200ms cubic-bezier(0.32, 0.72, 0, 1)',
          cursor: 'pointer',
          border: 'none',
          outline: 'none',
          position: 'relative',
          overflow: 'hidden',
          '&:focus-visible': {
            boxShadow: theme('boxShadow.glow-primary'),
          },
          '&:disabled': {
            opacity: '0.5',
            cursor: 'not-allowed',
          },
        },
        '.btn-sm':  { padding: '0.5rem 1rem',   fontSize: '0.875rem' },
        '.btn-md':  { padding: '0.75rem 1.5rem', fontSize: '0.9375rem' },
        '.btn-lg':  { padding: '1rem 2rem',      fontSize: '1rem' },
        '.btn-xl':  { padding: '1.125rem 2.5rem', fontSize: '1.0625rem' },

        '.btn-primary': {
          backgroundColor: theme('colors.brand.primary'),
          color: theme('colors.brand.dark'),
          '&:hover': {
            backgroundColor: theme('colors.brand.primary-hover'),
            boxShadow: theme('boxShadow.glow-primary-lg'),
            transform: 'translateY(-1px)',
          },
          '&:active': { transform: 'translateY(0)' },
        },
        '.btn-dark': {
          backgroundColor: theme('colors.brand.dark'),
          color: '#FFFFFF',
          '&:hover': {
            backgroundColor: '#2d2f32',
            transform: 'translateY(-1px)',
          },
        },
        '.btn-outline': {
          backgroundColor: 'transparent',
          color: theme('colors.brand.dark'),
          border: `1.5px solid ${theme('colors.brand.border-strong')}`,
          '&:hover': {
            borderColor: theme('colors.brand.primary'),
            backgroundColor: theme('colors.brand.primary-light'),
          },
        },
        '.btn-wa': {
          backgroundColor: theme('colors.wa.DEFAULT'),
          color: '#FFFFFF',
          '&:hover': {
            backgroundColor: theme('colors.wa.hover'),
            boxShadow: theme('boxShadow.glow-wa'),
            transform: 'translateY(-1px)',
          },
        },

        // Card base
        '.card': {
          backgroundColor: theme('colors.brand.surface'),
          borderRadius: '1rem',
          border: `1px solid ${theme('colors.brand.border')}`,
          boxShadow: theme('boxShadow.card'),
          overflow: 'hidden',
          transition: 'all 300ms cubic-bezier(0.32, 0.72, 0, 1)',
        },
        '.card-hover': {
          '&:hover': {
            boxShadow: theme('boxShadow.card-lg'),
            transform: 'translateY(-2px)',
            borderColor: theme('colors.brand.primary'),
          },
        },

        // Section container
        '.section': {
          padding: '4rem 0',
          '@screen lg': { padding: '6rem 0' },
        },
        '.section-inner': {
          maxWidth: '1280px',
          margin: '0 auto',
          paddingLeft: '1rem',
          paddingRight: '1rem',
          '@screen sm': { paddingLeft: '1.5rem', paddingRight: '1.5rem' },
          '@screen lg': { paddingLeft: '2rem',   paddingRight: '2rem' },
        },

        // Section heading
        '.section-label': {
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.375rem',
          fontSize: '0.75rem',
          fontWeight: '700',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: theme('colors.brand.primary-dark'),
          marginBottom: '0.75rem',
        },
        '.section-title': {
          fontSize: '1.875rem',
          fontWeight: '700',
          color: theme('colors.brand.dark'),
          letterSpacing: '-0.02em',
          lineHeight: '1.2',
          '@screen lg': { fontSize: '2.5rem' },
        },
        '.section-subtitle': {
          fontSize: '1.0625rem',
          color: theme('colors.brand.muted'),
          lineHeight: '1.7',
          marginTop: '0.75rem',
        },

        // Input base
        '.input': {
          width: '100%',
          padding: '0.75rem 1rem',
          backgroundColor: theme('colors.brand.surface'),
          border: `1.5px solid ${theme('colors.brand.border')}`,
          borderRadius: '0.75rem',
          fontSize: '0.9375rem',
          color: theme('colors.brand.text'),
          transition: 'all 200ms',
          outline: 'none',
          '&::placeholder': { color: theme('colors.brand.subtle') },
          '&:focus': {
            borderColor: theme('colors.brand.primary'),
            boxShadow: theme('boxShadow.inner-brand'),
          },
        },

        // Divider dengan label
        '.divider': {
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          '&::before, &::after': {
            content: '""',
            flex: '1',
            height: '1px',
            backgroundColor: theme('colors.brand.border'),
          },
        },
      });
    },
  ],
};