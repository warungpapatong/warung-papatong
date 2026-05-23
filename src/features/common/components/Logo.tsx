import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function Logo({ className = '', size = 'md' }: LogoProps) {
  // Determine standard width/height based on size prop
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-12 h-12 md:w-14 md:h-14',
    lg: 'w-16 h-16 md:w-20 md:h-20'
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Decorative Brand SVG Circle Mark inspired by IG profiling */}
      <div className={`relative ${sizeClasses[size]} rounded-full overflow-hidden shrink-0 shadow-lg border-2 border-[#FDF6EE]/10 bg-gradient-to-tr from-[#FF8C00] via-[#FFD000] to-[#FFE600]`}>
        {/* Soft radial glow ring */}
        <div className="absolute inset-0 bg-radial from-transparent via-transparent to-[#D26900]/10 pointer-events-none" />
        
        {/* SVG Composition of Logo elements */}
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full select-none"
        >
          {/* Green Dragonfly (Papatong) Icon - left-top alignment */}
          <g transform="translate(14, 25) scale(0.65)" className="opacity-95">
            {/* Dragonfly Body */}
            <path
              d="M30 45 C30 45, 52 14, 55 12 C57 10, 59 11, 58 13 C56 16, 34 47, 34 47 Z"
              fill="#2E7D32"
              stroke="#1B5E20"
              strokeWidth="0.5"
            />
            {/* Upper Wings */}
            <path
              d="M32 30 C12 25, 8 10, 24 18 C35 24, 38 31, 38 31 Z"
              fill="#81C784"
              fillOpacity="0.75"
              stroke="#2E7D32"
              strokeWidth="0.75"
            />
            <path
              d="M33 32 C48 14, 62 10, 48 24 C38 34, 34 32, 34 32 Z"
              fill="#81C784"
              fillOpacity="0.75"
              stroke="#2E7D32"
              strokeWidth="0.75"
            />
            {/* Lower Wings */}
            <path
              d="M31 36 C18 36, 12 26, 26 31 C32 34, 33 37, 33 37 Z"
              fill="#A5D6A7"
              fillOpacity="0.7"
              stroke="#2E7D32"
              strokeWidth="0.5"
            />
            <path
              d="M32 37 C44 26, 52 24, 43 34 C36 40, 33 38, 33 38 Z"
              fill="#A5D6A7"
              fillOpacity="0.7"
              stroke="#2E7D32"
              strokeWidth="0.5"
            />
            {/* Sparkle or head */}
            <circle cx="49" cy="18" r="1.5" fill="#1B5E20" />
          </g>

          {/* Label "WARUNG" in curved-like structure */}
          <text
            x="50"
            y="26"
            textAnchor="middle"
            fill="#2E7D32"
            fontFamily="sans-serif"
            fontWeight="900"
            fontSize="8"
            letterSpacing="2"
            transform="rotate(-5 50 26)"
          >
            WARUNG
          </text>

          {/* Script Stylized "Papatong" */}
          <text
            x="50"
            y="64"
            textAnchor="middle"
            fill="#C62828" 
            fontFamily="'Playfair Display', Georgia, serif"
            fontWeight="bold"
            fontStyle="italic"
            fontSize="26"
            className="drop-shadow-[0_1px_1px_rgba(255,255,255,0.4)]"
          >
            Papatong
          </text>

          {/* Underline Flourish */}
          <path
            d="M20 72 Q 50 82, 80 72"
            stroke="#C62828"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
            className="opacity-90"
          />
        </svg>
      </div>

      {/* Brand title on side */}
      <div className="flex flex-col">
        <h1 className="font-display font-black text-xl md:text-2xl text-brand-dark tracking-tight leading-none">
          Warung Papatong
        </h1>
        <span className="text-[10px] font-bold text-brand-accent tracking-widest uppercase mt-1 leading-none">
          Sunda & Seafood Culinary
        </span>
      </div>
    </div>
  );
}
