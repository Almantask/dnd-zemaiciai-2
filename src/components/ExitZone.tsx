import React, { useEffect, useState } from 'react';

interface ExitZoneProps {
  onExit: () => void;
  label?: string;
  disabled?: boolean;
}

/**
 * Exit is only possible by pressing back or by moving the mouse towards the bottom
 * of the screen (the middle 3-7ths of it: from 2/7 = 28.57% to 5/7 = 71.43%) —
 * that lights the bottom of the screen and displays text "išeiti" as if light is
 * coming from outside.
 * Can only appear when all other menus/dialogs are closed (`disabled === false`).
 */
export const ExitZone: React.FC<ExitZoneProps> = ({
  onExit,
  label = 'išeiti',
  disabled = false,
}) => {
  const [isLit, setIsLit] = useState(false);

  useEffect(() => {
    if (disabled) {
      setIsLit(false);
      return;
    }

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
  }, [disabled]);

  if (disabled) {
    return null;
  }

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
      {/* Subtle resting light crack under the closed door */}
      <div
        className={`pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-6 transition-all duration-700 ${
          isLit ? 'opacity-0 scale-x-150' : 'opacity-70 scale-x-100'
        }`}
        style={{
          background:
            'radial-gradient(ellipse 46% 80% at 50% 100%, rgba(254, 243, 199, 0.45) 0%, rgba(245, 158, 11, 0.16) 55%, transparent 92%)',
          filter: 'blur(4px)',
        }}
      />

      {/* Broad ambient floor illumination spreading wide across the room */}
      <div
        className={`pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[220%] h-72 md:h-96 origin-bottom transition-all duration-700 ease-out ${
          isLit ? 'opacity-100 scale-x-100 scale-y-100' : 'opacity-0 scale-x-50 scale-y-75'
        }`}
        style={{
          background:
            'radial-gradient(ellipse 47% 84% at 50% 100%, rgba(254, 243, 199, 0.72) 0%, rgba(251, 191, 36, 0.46) 32%, rgba(217, 119, 6, 0.22) 58%, rgba(180, 83, 9, 0.06) 76%, transparent 92%)',
          filter: 'blur(20px)',
        }}
      />

      {/* Wide-angle doorway light cone / shafts fanning far left and right as the door opens */}
      <div
        className={`pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[210%] h-64 md:h-80 origin-bottom transition-all duration-700 ease-out ${
          isLit ? 'opacity-100 scale-x-100 scale-y-100' : 'opacity-0 scale-x-45 scale-y-65'
        }`}
        style={{
          background:
            'conic-gradient(from 270deg at 50% 116%, transparent 0deg, transparent 8deg, rgba(180, 83, 9, 0.12) 18deg, rgba(245, 158, 11, 0.34) 32deg, rgba(253, 224, 71, 0.52) 48deg, rgba(251, 191, 36, 0.42) 60deg, rgba(255, 251, 235, 0.85) 76deg, rgba(254, 243, 199, 0.72) 90deg, rgba(255, 251, 235, 0.88) 104deg, rgba(251, 191, 36, 0.42) 120deg, rgba(253, 224, 71, 0.52) 132deg, rgba(245, 158, 11, 0.34) 148deg, rgba(180, 83, 9, 0.12) 162deg, transparent 172deg, transparent 180deg)',
          maskImage:
            'radial-gradient(ellipse 47% 85% at 50% 100%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.88) 34%, rgba(0,0,0,0.45) 62%, rgba(0,0,0,0.1) 80%, transparent 92%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 47% 85% at 50% 100%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.88) 34%, rgba(0,0,0,0.45) 62%, rgba(0,0,0,0.1) 80%, transparent 92%)',
          filter: 'blur(14px)',
        }}
      />

      {/* Wide warm threshold core glow across the open doorway sill */}
      <div
        className={`pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[165%] h-36 md:h-44 origin-bottom transition-all duration-500 ease-out ${
          isLit ? 'opacity-100 scale-x-100 scale-y-100' : 'opacity-0 scale-x-50 scale-y-50'
        }`}
        style={{
          background:
            'radial-gradient(ellipse 45% 74% at 50% 105%, rgba(255, 253, 244, 0.96) 0%, rgba(254, 243, 199, 0.8) 32%, rgba(251, 191, 36, 0.42) 60%, rgba(217, 119, 6, 0.1) 78%, transparent 92%)',
          filter: 'blur(10px)',
        }}
      />

      {/* Text "išeiti" illuminated by outside light */}
      <span
        className={`relative z-10 font-display text-lg md:text-2xl tracking-[0.35em] uppercase font-bold transition-all duration-500 ${
          isLit
            ? 'opacity-100 translate-y-0 text-stone-950 drop-shadow-[0_0_18px_rgba(255,251,235,1)]'
            : 'opacity-0 translate-y-3 text-amber-100'
        }`}
      >
        {label}
      </span>
    </div>
  );
};
