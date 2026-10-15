import React, { useState } from 'react';
import { Lock, MapPin, Compass } from 'lucide-react';
import { PlaceId, TownBuilding } from '../types';
import { TOWN_BUILDINGS } from '../data/townBuildings';
import { AmbientEffects } from './AmbientEffects';

interface TownViewProps {
  onSelectPlace: (place: PlaceId) => void;
}

export const TownView: React.FC<TownViewProps> = ({ onSelectPlace }) => {
  const [hoveredBuilding, setHoveredBuilding] = useState<TownBuilding | null>(null);
  const [closedModalBuilding, setClosedModalBuilding] = useState<TownBuilding | null>(null);
  const [walkingTo, setWalkingTo] = useState<TownBuilding | null>(null);
  const [showAllLabels, setShowAllLabels] = useState(true);

  const handleBuildingClick = (building: TownBuilding) => {
    if (walkingTo) return; // Prevent double navigation during 1s footstep animation

    if (!building.isOpen) {
      setClosedModalBuilding(building);
      return;
    }

    // Preload the next page background image while the 1s footsteps animation plays
    if (building.preloadImage) {
      const img = new Image();
      img.src = building.preloadImage;
    }

    setWalkingTo(building);

    window.setTimeout(() => {
      onSelectPlace(building.id);
      setWalkingTo(null);
    }, 1000);
  };

  return (
    <div className="relative w-screen h-screen bg-stone-950 overflow-hidden flex items-center justify-center select-none">
      {/* Main Interactive Scene Wrapper */}
      <div className="relative w-full h-full">
        <img
          src="/images/town.jpg"
          alt="Žemaitijos miestelis"
          className="w-full h-full object-cover object-center"
          draggable={false}
        />

        {/* Subtle dark vignette around edges */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at center, transparent 60%, rgba(12, 10, 9, 0.65) 100%)',
          }}
        />

        {/* Atmospheric animations (smoke, forge fire, lanterns, birds) */}
        <AmbientEffects scene="town" />

        {/* Top-left Title Banner & Label Toggle */}
        <div className="absolute top-4 left-4 z-30 flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="px-4 py-2.5 rounded-xl bg-stone-950/85 border border-amber-700/60 backdrop-blur-md shadow-[0_6px_25px_rgba(0,0,0,0.7)]">
            <div className="flex items-center gap-2.5">
              <Compass className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <h1 className="font-display text-base md:text-lg font-bold text-amber-200 tracking-wide leading-tight">
                  Žemaitijos Pasienio Miestelis
                </h1>
                <p className="text-xs text-amber-400/80">
                  Paspauskite ant pastato, į kurį norite užeiti
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowAllLabels((prev) => !prev)}
            className="px-3.5 py-2 rounded-lg bg-stone-900/85 hover:bg-stone-800 border border-amber-700/50 text-amber-200 text-xs font-display tracking-wider uppercase transition-all shadow-md"
          >
            {showAllLabels ? 'Slėpti vietų pavadinimus' : 'Rodyti vietų pavadinimus'}
          </button>
        </div>

        {/* Building Interactive Hotspots */}
        {TOWN_BUILDINGS.map((building) => {
          const isHovered = hoveredBuilding?.id === building.id;
          const isWalkingTarget = walkingTo?.id === building.id;

          return (
            <React.Fragment key={building.id}>
              {/* Clickable Polygon/Box over Building */}
              <div
                onClick={() => handleBuildingClick(building)}
                onMouseEnter={() => setHoveredBuilding(building)}
                onMouseLeave={() => setHoveredBuilding(null)}
                role="button"
                tabIndex={0}
                aria-label={building.name}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') handleBuildingClick(building);
                }}
                style={{
                  left: `${building.hotspot.x}%`,
                  top: `${building.hotspot.y}%`,
                  width: `${building.hotspot.width}%`,
                  height: `${building.hotspot.height}%`,
                }}
                className={`absolute z-20 rounded-2xl transition-all duration-300 cursor-pointer ${
                  building.isOpen
                    ? isHovered || isWalkingTarget
                      ? 'bg-amber-400/15 ring-2 ring-amber-300/80 shadow-[0_0_35px_rgba(251,191,36,0.45)]'
                      : 'hover:bg-amber-400/10'
                    : isHovered
                    ? 'bg-stone-900/25 ring-1 ring-stone-400/60'
                    : ''
                }`}
              />

              {/* Floating Pin / Nameplate */}
              {(showAllLabels || isHovered || isWalkingTarget) && (
                <div
                  onClick={() => handleBuildingClick(building)}
                  onMouseEnter={() => setHoveredBuilding(building)}
                  onMouseLeave={() => setHoveredBuilding(null)}
                  style={{
                    left: `${building.labelPos.x}%`,
                    top: `${building.labelPos.y}%`,
                  }}
                  className="absolute z-25 -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                >
                  <div
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full border backdrop-blur-md transition-all duration-200 shadow-lg ${
                      building.isOpen
                        ? isHovered || isWalkingTarget
                          ? 'bg-amber-900/95 border-amber-300 text-amber-50 scale-110 shadow-[0_0_20px_rgba(251,191,36,0.6)]'
                          : 'bg-stone-950/85 border-amber-500/70 text-amber-200 hover:scale-105'
                        : isHovered
                        ? 'bg-stone-900/95 border-stone-400 text-stone-200 scale-105'
                        : 'bg-stone-950/75 border-stone-600/60 text-stone-400'
                    }`}
                  >
                    {building.isOpen ? (
                      <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 animate-pulse" />
                    ) : (
                      <Lock className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                    )}
                    <span className="font-display text-xs md:text-sm font-bold whitespace-nowrap">
                      {building.name}
                    </span>
                  </div>
                </div>
              )}
            </React.Fragment>
          );
        })}

        {/* Hover Information Card at Bottom Left */}
        {hoveredBuilding && !walkingTo && (
          <div className="pointer-events-none absolute bottom-5 left-5 z-30 max-w-md p-4 rounded-xl bg-stone-950/90 border border-amber-700/60 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.85)] transition-all">
            <div className="flex items-center justify-between gap-3 mb-1">
              <h3 className="font-display text-base md:text-lg font-bold text-amber-200">
                {hoveredBuilding.name}
              </h3>
              <span
                className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                  hoveredBuilding.isOpen
                    ? 'bg-emerald-950/80 border-emerald-500/60 text-emerald-300'
                    : 'bg-stone-800 border-stone-600 text-stone-300'
                }`}
              >
                {hoveredBuilding.isOpen
                  ? 'Atidaryta (Iteracija I)'
                  : `Uždaryta (Iteracija ${hoveredBuilding.iteration})`}
              </span>
            </div>
            <p className="text-xs text-amber-400/90 font-semibold mb-1.5">
              {hoveredBuilding.subtitle} • Vieta: {hoveredBuilding.locationNote}
            </p>
            <p className="text-sm text-amber-100/90 leading-snug">
              {hoveredBuilding.description}
            </p>
          </div>
        )}

        {/* 1-Second Footsteps Animation Overlay */}
        {walkingTo && (
          <div className="pointer-events-none absolute inset-0 z-30">
            {walkingTo.footsteps.map((step, idx) => {
              const delayMs = idx * (750 / Math.max(1, walkingTo.footsteps.length));
              return (
                <div
                  key={idx}
                  style={{
                    left: `${step.x}%`,
                    top: `${step.y}%`,
                    animation: `footstepFade 950ms ease-out ${delayMs}ms forwards`,
                    opacity: 0,
                  }}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                >
                  <div
                    style={{
                      transform: `rotate(${step.angle}deg)`,
                    }}
                    className="flex flex-col items-center"
                  >
                    {/* Boot sole & heel SVG */}
                    <svg
                      width="22"
                      height="32"
                      viewBox="0 0 24 34"
                      className="drop-shadow-[0_0_8px_rgba(251,191,36,0.95)]"
                    >
                      <ellipse
                        cx={step.isLeft ? '10' : '14'}
                        cy="11"
                        rx="6"
                        ry="9"
                        fill="#fde68a"
                        stroke="#78350f"
                        strokeWidth="2"
                      />
                      <ellipse
                        cx={step.isLeft ? '10' : '14'}
                        cy="26"
                        rx="4.5"
                        ry="5"
                        fill="#fbbf24"
                        stroke="#78350f"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                </div>
              );
            })}

            {/* Walking status toast */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 px-6 py-2.5 rounded-full bg-stone-950/90 border-2 border-amber-400/80 text-amber-200 font-display text-sm md:text-base font-bold tracking-wider shadow-[0_0_25px_rgba(251,191,36,0.5)]">
              Žengiama į: {walkingTo.name}...
            </div>
          </div>
        )}
      </div>

      {/* Closed Establishment Modal ("OK" Modal) */}
      {closedModalBuilding && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4"
          onClick={() => setClosedModalBuilding(null)}
        >
          <div
            className="w-full max-w-md rounded-xl bg-gradient-to-b from-stone-900 to-stone-950 border-2 border-amber-700/70 shadow-[0_0_40px_rgba(0,0,0,0.9)] overflow-hidden text-amber-50"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-4 bg-stone-950/80 border-b border-amber-800/40 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-stone-800 border border-stone-600 text-amber-400">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-display text-lg font-bold text-amber-200">
                  {closedModalBuilding.name} — Uždaryta
                </h2>
                <p className="text-xs text-stone-400">
                  Suplanuota: Iteracija {closedModalBuilding.iteration}
                </p>
              </div>
            </div>

            <div className="p-6 space-y-3">
              <p className="text-amber-100/95 text-base leading-relaxed">
                Durys šiuo metu užrakintos. Ši vieta bus atidaryta{' '}
                <strong className="text-amber-300">
                  {closedModalBuilding.iteration}-ojoje iteracijoje
                </strong>
                .
              </p>
              <div className="p-3.5 rounded-lg bg-stone-900/90 border border-stone-700/70 text-sm text-stone-300 space-y-1">
                <div>
                  <span className="text-amber-400/90 font-semibold">Apibūdinimas: </span>
                  {closedModalBuilding.description}
                </div>
                <div>
                  <span className="text-amber-400/90 font-semibold">Vieta miestelyje: </span>
                  {closedModalBuilding.locationNote}
                </div>
              </div>
            </div>

            <div className="px-6 py-3.5 bg-stone-950/90 border-t border-amber-900/40 flex justify-end">
              <button
                onClick={() => setClosedModalBuilding(null)}
                className="px-8 py-2 rounded-lg bg-gradient-to-b from-amber-600 to-amber-800 hover:from-amber-500 hover:to-amber-700 text-amber-50 font-display font-bold text-sm tracking-widest border border-amber-400/60 shadow-lg transition-all"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
