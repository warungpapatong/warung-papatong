// src/types/global.d.ts
// ─────────────────────────────────────────────────────────────────────────────
// Global TypeScript type augmentations
// ─────────────────────────────────────────────────────────────────────────────

export {};

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
    gtag:      (...args: unknown[]) => void;
  }
}

// CSS Modules (jika dipakai)
declare module '*.module.css' {
  const styles: Record<string, string>;
  export default styles;
}

declare module '*.module.scss' {
  const styles: Record<string, string>;
  export default styles;
}

// Tambahkan ini untuk handle global CSS biasa (seperti globals.css)
declare module '*.css' {
  const content: unknown;
  export default content;
}

// SVG imports (jika dipakai sebagai React component via SVGR)
declare module '*.svg' {
  import type React from 'react';
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}