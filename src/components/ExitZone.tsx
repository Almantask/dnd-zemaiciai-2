import React, { useEffect, useState } from 'react';

interface ExitZoneProps {
  onExit: () => void;
  label?: string;
}

/**
 * Exit is only possible by pressing back or by moving the mouse towards the bottom
 * of the screen (the middle 3-7ths of it: from 2/7 = 28.57% to 5/7 = 71.43%) —
 * that lights the bottom of the screen and displays text "išeiti" as if light is
 * coming from outside.
 */
export const ExitZone: React.FC<ExitZoneProps> = ({ onExit, label = 'išeiti' }) => {
  const [isLit, setIsLit] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const xRatio = e.clientX / vw;
      const yRatio = e.clientY / vh;

      // Middle 3/7ths horizontally: from 2/7 (~0.2857) to 5/7 (~0.7143)
      // Bottom ~12% of the screen vertically
      const inMiddleThreeSevenths = xRatio >= 2 / 7 && xRatio <= 5 / 7;
      const nearBottom = yRatio >= 0.86;

      setIsLit(inMiddleThreeSevenths && nearBottom);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      style={{
        left: '28.5714%',
        width: '42.8571%',
      }}
      onMouseEnter={() => setIsLit(true)}
      onMouseLeave={() => setIsLit(false)}
      onClick={onExit}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onExit();
      }}
      aria-label="Išeiti į miestelį"
      className="fixed bottom-0 h-24 z-30 cursor-pointer flex flex-col items-center justify-end pb-3 select-none group"
    >
      {/* Subtle resting doorway threshold hint */}
      <div
        className={`w-28 h-1 rounded-full transition-all duration-500 ${
          isLit ? 'opacity-0' : 'bg-amber-200/20 opacity-60'
        }`}
      />

      {/* Outside daylight flood when cursor enters the middle 3/7ths bottom zone */}
      <div
        className={`pointer-events-none absolute inset-x-0 bottom-0 h-32 transition-all duration-500 ease-out ${
          isLit ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
        style={{
          background:
            'radial-gradient(ellipse 65% 95% at 50% 100%, rgba(254, 243, 199, 0.92) 0%, rgba(251, 191, 36, 0.55) 38%, rgba(217, 119, 6, 0.18) 68%, rgba(0, 0, 0, 0) 100%)',
        }}
      />

      {/* Extra upward light rays */}
      <div
        className={`pointer-events-none absolute bottom-0 w-4/5 h-24 transition-all duration-500 ${
          isLit ? 'opacity-90 scale-105' : 'opacity-0 scale-95'
        }`}
        style={{
          background:
            'conic-gradient(from 245deg at 50% 110%, transparent 0deg, rgba(254,240,138,0.45) 35deg, rgba(255,251,235,0.8) 55deg, rgba(254,240,138,0.45) 75deg, transparent 110deg)',
          filter: 'blur(8px)',
        }}
      />

      {/* Text "išeiti" illuminated by outside light */}
      <span
        className={`relative z-10 font-display text-lg md:text-2xl tracking-[0.35em] uppercase font-bold transition-all duration-300 ${
          isLit
            ? 'opacity-100 translate-y-0 text-stone-950 drop-shadow-[0_0_14px_rgba(255,251,235,1)]'
            : 'opacity-0 translate-y-3 text-amber-100'
        }`}
      >
        {label}
      </span>
    </div>
  );
};
