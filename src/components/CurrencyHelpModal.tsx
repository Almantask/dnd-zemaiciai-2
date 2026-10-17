import React, { useEffect, useState } from 'react';

interface CurrencyHelpModalProps {
  onOpenChange?: (isOpen: boolean) => void;
  /** Hide the corner button while a full-screen reader (book or map) is open. */
  hidden?: boolean;
}

/**
 * Stylized Question Mark (?) fused with Baltic Symbols:
 * 1. Top Curve: Baltic Žaltys (sacred grass snake of wisdom) with geometric diamond scales
 *    and Saulutė (forged sun-cross) rays radiating from the crown
 * 2. Stem: Kryždirbystės cross-bars & Laimos eglutė chevrons
 * 3. Left/Right flanks: Gediminaičių stulpai (Columns of Gediminas) & Rombas (Earth diamond)
 * 4. Bottom Dot: Baltic Auseklis (8-pointed morning star)
 */
export const BalticQuestionIcon: React.FC<{
  className?: string;
  variant?: 'gold' | 'ink';
}> = ({ className = 'w-12 h-12', variant = 'gold' }) => {
  const isInk = variant === 'ink';
  const primaryStroke = isInk ? '#1a0e06' : 'url(#balticGoldMain)';
  const accentStroke = isInk ? '#2b170a' : '#fef08a';
  const subtleStroke = isInk ? '#3b2110' : '#fbbf24';
  const darkFill = isInk ? 'rgba(43, 23, 10, 0.08)' : 'rgba(20, 11, 5, 0.82)';
  const innerCarve = isInk ? '#d5be8e' : '#451a03';

  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {!isInk && (
        <defs>
          <linearGradient
            id="balticGoldMain"
            x1="14"
            y1="6"
            x2="50"
            y2="58"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#fffbeb" />
            <stop offset="28%" stopColor="#fef08a" />
            <stop offset="68%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#b45309" />
          </linearGradient>
          <linearGradient
            id="balticRimGrad"
            x1="0"
            y1="0"
            x2="64"
            y2="64"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#92400e" />
          </linearGradient>
        </defs>
      )}

      {/* Outer Octagonal Baltic Shield Rim */}
      <polygon
        points="20,3 44,3 61,20 61,44 44,61 20,61 3,44 3,20"
        stroke={isInk ? '#1a0e06' : 'url(#balticRimGrad)'}
        strokeWidth="2"
        fill={darkFill}
      />
      <polygon
        points="22,6.5 42,6.5 57.5,22 57.5,42 42,57.5 22,57.5 6.5,42 6.5,22"
        stroke={subtleStroke}
        strokeWidth="0.9"
        strokeDasharray="2.5 2.5"
        opacity="0.7"
      />

      {/* Cardinal Baltic Sun-Diamonds (N, S, E, W) */}
      <g fill={accentStroke}>
        <polygon points="32,1 34.2,4.5 32,8 29.8,4.5" />
        <polygon points="32,56 34.2,59.5 32,63 29.8,59.5" />
        <polygon points="1,32 4.5,29.8 8,32 4.5,34.2" />
        <polygon points="56,32 59.5,29.8 63,32 59.5,34.2" />
      </g>

      {/* Left & Right Flanking Baltic Symbols: Mini Columns of Gediminas + Laimos Chevrons */}
      <g stroke={subtleStroke} strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" opacity="0.88">
        {/* Left Gediminaičių pillar motif */}
        <path d="M9.5 26 L9.5 37 L15.5 37 L15.5 26 M12.5 24 L12.5 37 M9.5 30.5 L12.5 30.5 M12.5 33.5 L15.5 33.5" />
        {/* Right Gediminaičių pillar motif */}
        <path d="M48.5 26 L48.5 37 L54.5 37 L54.5 26 M51.5 24 L51.5 37 M51.5 30.5 L54.5 30.5 M48.5 33.5 L51.5 33.5" />
      </g>

      {/* Forged Baltic Saulutė Crown Rays radiating from the Question Mark Arch */}
      <g stroke={accentStroke} strokeWidth="1.65" strokeLinecap="round">
        <line x1="22" y1="13" x2="18.5" y2="8.8" />
        <line x1="27.8" y1="10.2" x2="26.2" y2="6.2" />
        <line x1="35.5" y1="10.2" x2="37" y2="6.2" />
        <line x1="41.5" y1="13" x2="45" y2="9" />
        <line x1="45" y1="18.5" x2="49.2" y2="16.8" />
      </g>

      {/* MAIN STYLIZED QUESTION MARK (?) — Žaltys Serpentine Curve + Kryždirbystės Stem */}
      {!isInk && (
        <path
          d="M20 22 C20 14.2, 25.5 10.8, 32.8 10.8 C40 10.8, 44.5 14.8, 44.5 21 C44.5 26.5, 40 29.2, 35.5 31.6 C33 33, 32 34.6, 32 37.5 L32 41"
          stroke="#140902"
          strokeWidth="8.5"
          strokeLinecap="round"
        />
      )}
      <path
        d="M20 22 C20 14.2, 25.5 10.8, 32.8 10.8 C40 10.8, 44.5 14.8, 44.5 21 C44.5 26.5, 40 29.2, 35.5 31.6 C33 33, 32 34.6, 32 37.5 L32 41"
        stroke={primaryStroke}
        strokeWidth="5.8"
        strokeLinecap="round"
      />
      {/* Carved Baltic Diamond/Chevron Spine inside the '?' curve */}
      <path
        d="M20 22 C20 14.2, 25.5 10.8, 32.8 10.8 C40 10.8, 44.5 14.8, 44.5 21 C44.5 26.5, 40 29.2, 35.5 31.6 C33 33, 32 34.6, 32 37.5 L32 40"
        stroke={innerCarve}
        strokeWidth="1.5"
        strokeDasharray="2.5 2.5"
        strokeLinecap="round"
      />

      {/* Baltic Cross-Bars (Kryžma) on the Question Mark Stem */}
      <path
        d="M26 37.8 L38 37.8 M28 34.8 L36 34.8"
        stroke={accentStroke}
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      {/* Žaltys / Baltic Rhombus Head at the start of the '?' hook */}
      <polygon
        points="20,27.2 24.8,22 20,16.8 15.2,22"
        fill={primaryStroke}
        stroke={innerCarve}
        strokeWidth="1.1"
      />
      <circle cx="20" cy="22" r="1.4" fill={innerCarve} />

      {/* QUESTION MARK DOT: 8-Pointed Baltic Auseklis Star & Sun-Rhombus */}
      <g transform="translate(32, 50)">
        {/* 8-Pointed Auseklis Star Geometry */}
        <polygon
          points="0,-7.2 2,-2 7.2,0 2,2 0,7.2 -2,2 -7.2,0 -2,-2"
          fill={primaryStroke}
        />
        <polygon
          points="-5,-5 -1.2,-2 5,-5 2,-1.2 5,5 1.2,2 -5,5 -2,1.2"
          fill={subtleStroke}
          opacity="0.9"
        />
        <circle cx="0" cy="0" r="1.6" fill={innerCarve} />
      </g>
    </svg>
  );
};

/** Organic scorched rim, in objectBoundingBox units (0–1). */
const SCORCHED_EDGE =
  'M0.075 0.055 C0.15 0.012 0.23 0.042 0.33 0.016 C0.43 0.0 0.52 0.036 0.62 0.01 C0.73 0.0 0.83 0.032 0.915 0.014 C0.962 0.03 0.99 0.072 0.974 0.145 C0.998 0.22 0.958 0.305 0.99 0.4 C0.999 0.5 0.956 0.585 0.992 0.685 C0.999 0.785 0.955 0.865 0.94 0.935 C0.875 0.988 0.77 0.952 0.665 0.99 C0.55 0.96 0.45 0.996 0.35 0.966 C0.25 0.994 0.15 0.958 0.078 0.942 C0.026 0.895 0.044 0.795 0.01 0.69 C0.0 0.575 0.042 0.475 0.008 0.37 C0.0 0.265 0.04 0.17 0.018 0.095 C0.034 0.048 0.052 0.038 0.075 0.055 Z';

/** Inner edge of the char band — closer on the sides, deeper at the corners. */
const SCORCH_INNER =
  'M0.1 0.085 C0.17 0.042 0.26 0.065 0.35 0.04 C0.45 0.026 0.54 0.055 0.64 0.032 C0.74 0.02 0.83 0.046 0.9 0.038 C0.94 0.052 0.962 0.095 0.952 0.155 C0.975 0.235 0.94 0.32 0.97 0.42 C0.98 0.52 0.94 0.6 0.97 0.7 C0.978 0.79 0.94 0.855 0.915 0.905 C0.85 0.95 0.75 0.925 0.65 0.955 C0.54 0.93 0.44 0.962 0.34 0.935 C0.24 0.96 0.15 0.93 0.09 0.905 C0.048 0.855 0.068 0.77 0.035 0.67 C0.02 0.56 0.062 0.47 0.028 0.37 C0.018 0.27 0.058 0.175 0.042 0.115 C0.058 0.068 0.075 0.06 0.1 0.085 Z';

export const CurrencyHelpModal: React.FC<CurrencyHelpModalProps> = ({
  onOpenChange,
  hidden = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const updateOpen = (next: boolean) => {
    setIsOpen(next);
    onOpenChange?.(next);
  };

  useEffect(() => {
    if (hidden && isOpen) updateOpen(false);
  }, [hidden, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        updateOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return (
    <>
      {/* Top-Right Stylized Question Mark with Baltic Symbols */}
      {!hidden && (
      <button
        onClick={() => updateOpen(!isOpen)}
        title="Keliautojo atmintinė"
        aria-label="Keliautojo atmintinė"
        className="fixed top-4 right-4 z-[60] group flex items-center justify-center w-[58px] h-[58px] p-1 rounded-2xl bg-gradient-to-b from-[#3b1d06] via-[#1c1008] to-[#0c0704] border-2 border-amber-400/90 shadow-[0_0_25px_rgba(245,158,11,0.55),inset_0_0_12px_rgba(251,191,36,0.3)] hover:scale-105 hover:border-amber-200 hover:shadow-[0_0_36px_rgba(251,191,36,0.85)] transition-all duration-300"
      >
        <BalticQuestionIcon className="w-[46px] h-[46px] group-hover:scale-105 transition-transform duration-300 drop-shadow-[0_0_8px_rgba(251,191,36,0.65)]" />
      </button>
      )}

      {/* One-Pager Aged Parchment Modal (based on "Observations through Prayer" design) */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-[3px] p-2 sm:p-4 overflow-y-auto"
          onClick={() => updateOpen(false)}
        >
          {/* Drop shadow follows the scorched silhouette */}
          <div
            className="relative w-full max-w-[565px] my-auto pointer-events-none"
            style={{ filter: 'drop-shadow(0 22px 18px rgba(0, 0, 0, 0.8))' }}
          >
          <svg width="0" height="0" className="absolute" aria-hidden>
            <defs>
              <clipPath id="scorchedLeaf" clipPathUnits="objectBoundingBox">
                <path d={SCORCHED_EDGE} />
              </clipPath>
            </defs>
          </svg>
          <div
            onClick={(e) => e.stopPropagation()}
            className="pointer-events-auto relative text-[#1e1006] font-manuscript select-text"
            style={{
              backgroundColor: '#c4a36a',
              backgroundImage: `
                radial-gradient(ellipse 70% 68% at 50% 48%, rgba(236, 219, 178, 0.95) 0%, rgba(214, 186, 132, 0.9) 42%, rgba(168, 122, 68, 0.55) 72%, rgba(62, 28, 10, 0.92) 100%),
                radial-gradient(ellipse 28% 22% at 0% 0%, rgba(18, 8, 2, 0.92) 0%, rgba(74, 32, 10, 0.55) 42%, transparent 70%),
                radial-gradient(ellipse 26% 20% at 100% 0%, rgba(22, 8, 2, 0.88) 0%, rgba(90, 36, 12, 0.45) 46%, transparent 72%),
                radial-gradient(ellipse 34% 24% at 100% 100%, rgba(16, 6, 2, 0.95) 0%, rgba(70, 28, 8, 0.55) 48%, transparent 74%),
                radial-gradient(ellipse 30% 22% at 0% 100%, rgba(20, 8, 2, 0.9) 0%, rgba(82, 34, 10, 0.5) 46%, transparent 72%),
                radial-gradient(ellipse 18% 40% at 0% 48%, rgba(48, 20, 6, 0.55) 0%, transparent 70%),
                radial-gradient(ellipse 16% 36% at 100% 52%, rgba(52, 22, 6, 0.5) 0%, transparent 72%),
                radial-gradient(ellipse 55% 14% at 50% 0%, rgba(58, 24, 8, 0.45) 0%, transparent 70%),
                radial-gradient(ellipse 60% 16% at 48% 100%, rgba(42, 18, 6, 0.55) 0%, transparent 72%),
                radial-gradient(ellipse 22% 16% at 78% 12%, rgba(120, 42, 14, 0.38) 0%, transparent 70%),
                radial-gradient(ellipse 18% 14% at 22% 86%, rgba(92, 36, 12, 0.32) 0%, transparent 70%),
                radial-gradient(circle at 64% 46%, rgba(190, 164, 118, 0.28) 0%, transparent 22%),
                repeating-linear-gradient(0deg, rgba(58, 34, 14, 0.03) 0px, rgba(58, 34, 14, 0.03) 1px, transparent 1px, transparent 3px)
              `,
              clipPath: 'url(#scorchedLeaf)',
              boxShadow:
                'inset 0 0 0 14px rgba(18, 7, 2, 0.55), inset 0 0 34px 12px rgba(42, 16, 4, 0.85), inset 0 0 80px 22px rgba(92, 40, 12, 0.5)',
              textShadow: '0 0 0.5px rgba(28, 14, 5, 0.45)',
            }}
          >
            {/* SVG Paper Grain & Organic Stain Blotches Overlay */}
            <svg
              className="pointer-events-none absolute inset-0 w-full h-full opacity-30 mix-blend-multiply"
              xmlns="http://www.w3.org/2000/svg"
            >
              <filter id="parchmentNoise">
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0.75"
                  numOctaves="4"
                  stitchTiles="stitch"
                />
                <feColorMatrix
                  type="matrix"
                  values="0.38 0 0 0 0.14
                          0.26 0 0 0 0.09
                          0.12 0 0 0 0.03
                          0    0 0 0.60 0"
                />
              </filter>
              <rect width="100%" height="100%" filter="url(#parchmentNoise)" />
            </svg>

            {/* Uneven char band: blacker at the rim, browner as it eats inward */}
            <svg
              className="pointer-events-none absolute inset-0 z-20 h-full w-full"
              viewBox="0 0 1 1"
              preserveAspectRatio="none"
              aria-hidden
            >
              <path
                fill="#3a1a08"
                fillRule="evenodd"
                d={`${SCORCHED_EDGE} ${SCORCH_INNER}`}
                opacity="0.72"
              />
              <path d={SCORCHED_EDGE} fill="none" stroke="#120702" strokeWidth="0.02" />
            </svg>

            {/* Subtle Ink Close Mark, kept clear of the scorched corner */}
            <button
              onClick={() => updateOpen(false)}
              title="Užversti pergamentą (Esc)"
              aria-label="Užversti pergamentą"
              className="absolute top-5 right-6 z-30 px-2 py-0.5 text-[#2d180a]/80 hover:text-[#120802] font-gothic text-lg leading-none transition-transform hover:scale-110"
            >
              ✕
            </button>

            {/* One-pager manuscript: gothic headings, plain ink, no struck lines */}
            <div className="relative z-10 px-10 sm:px-14 pt-9 pb-16 text-[15px] sm:text-[16.5px] leading-[1.35]">
              <header className="pb-3 mb-4 border-b border-[#2d190b]/35 text-center">
                <h2 className="font-gothic text-[30px] sm:text-[36px] text-[#170c04] tracking-wide leading-none">
                  Keliautojo atmintinė
                </h2>
              </header>

              <div className="space-y-4">
                <section>
                  <h3 className="font-gothic text-[26px] sm:text-[30px] text-[#170c04] leading-none mb-1">
                    Denaras (CP)
                  </h3>
                  <p>
                    Už jį gali įsigyti duonos kepalą ar bokalą alaus. Smulkiausia apyvartos moneta.
                  </p>
                </section>

                <section>
                  <h3 className="font-gothic text-[26px] sm:text-[30px] text-[#170c04] leading-none mb-1">
                    Grašis (SP)
                  </h3>
                  <p>
                    Prahos sidabras kasdienei prekybai, už jį gausi kepsnį, pirtį ar nakvynę. 1 Grašis = 10 Denarų
                  </p>
                </section>

                <section>
                  <h3 className="font-gothic text-[26px] sm:text-[30px] text-[#170c04] leading-none mb-1">
                    Auksinas (GP)
                  </h3>
                  <p>1 Auksinas = 10 Grašių = 100 Denarų.</p>
                  <p>Bajorų puota ir saugi skrynios menė.</p>
                </section>

                <section className="pt-1">
                  <h3 className="font-gothic text-[26px] sm:text-[30px] text-[#170c04] leading-none mb-1">
                    Navigacija
                  </h3>
                  <p>
                    Kad užeitum į pastatą - tiesiog paspausk ant jo. Taip pat ir su kitais daiktais ar žmonėmis - paspausk ant jų, kad pamatytum detales.
                  </p>
                </section>

                <section>
                  <h3 className="font-gothic text-[26px] sm:text-[30px] text-[#170c04] leading-none mb-1">
                    Išėjimas
                  </h3>
                  <p>
                    Vesk pelę į apatinį ekrano kraštą (vidurinius 3/7). Nušvitus slenksčiui spausk „išeiti“ arba naršyklės Atgal.
                  </p>
                </section>
              </div>
            </div>
          </div>
          </div>
        </div>
      )}
    </>
  );
};
