import React, { useEffect, useState } from 'react';

interface CurrencyHelpModalProps {
  onOpenChange?: (isOpen: boolean) => void;
  /** Hide the corner button while a full-screen reader (book or map) is open. */
  hidden?: boolean;
}

/**
 * Simple, understated question mark icon with a subtle diamond dot.
 */
export const BalticQuestionIcon: React.FC<{
  className?: string;
}> = ({ className = 'w-6 h-6' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M8.2 7.8a3.8 3.8 0 0 1 7.6 0c0 2.2-2.1 3-3.1 4.1-.55.58-.7 1.15-.7 2.1v.6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <polygon
      points="12,17.2 13.6,18.8 12,20.4 10.4,18.8"
      fill="currentColor"
    />
  </svg>
);

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
      {/* Top-Right Help Button */}
      {!hidden && (
      <button
        onClick={() => updateOpen(!isOpen)}
        title="Keliautojo atmintinė"
        aria-label="Keliautojo atmintinė"
        className="fixed top-4 right-4 z-[60] flex items-center justify-center w-10 h-10 rounded-lg bg-stone-900/85 hover:bg-stone-800 border border-amber-700/50 hover:border-amber-600/70 text-amber-200/80 hover:text-amber-100 backdrop-blur-md shadow-md transition-colors"
      >
        <BalticQuestionIcon className="w-6 h-6" />
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
