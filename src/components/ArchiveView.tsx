import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import {
  BookOpen,
  Map as MapIcon,
  Trophy,
  ChevronLeft,
  ChevronRight,
  Bookmark,
  X,
  Eye,
  MapPin,
  Package,
  User,
  Users,
  Sparkles,
  ArrowLeft,
} from 'lucide-react';
import {
  ARCHIVE_BOOK_SPREADS,
  ARCHIVE_ENTITIES,
  ARCHIVE_MAPS,
  ARCHIVE_TROPHIES,
  getEntityPreviewSentences,
  resolveArchiveEntity,
} from '../data/archiveData';
import { ArchiveEntity, ArchiveEntityCategory, BookSpread, TrophyItem } from '../types';
import { AmbientEffects } from './AmbientEffects';
import { ExitZone } from './ExitZone';
import { ShieldDialogFrame, ShieldOption } from './DialoguePrototypes';

export interface HoveredEntityState {
  entity: ArchiveEntity;
  anchorRect: {
    left: number;
    top: number;
    bottom: number;
    width: number;
  };
}

export const getCategoryIcon = (category: ArchiveEntityCategory) => {
  switch (category) {
    case 'vieta':
      return <MapPin className="w-3.5 h-3.5 text-[#246636] shrink-0" />;
    case 'daiktas':
      return <Package className="w-3.5 h-3.5 text-[#8c4a16] shrink-0" />;
    case 'asmuo':
      return <User className="w-3.5 h-3.5 text-[#6e2b1c] shrink-0" />;
    case 'zmones':
      return <Users className="w-3.5 h-3.5 text-[#543864] shrink-0" />;
    case 'zenklai':
    default:
      return <Sparkles className="w-3.5 h-3.5 text-[#7a5417] shrink-0" />;
  }
};

/* ============================================================================
 * HELPER: PARSE STORY PARAGRAPH WITH GREEN PATHFINDER STORYBOOK HIGHLIGHTS
 * Formats `{green:id|Text}` or `{green:Text}` into interactive reference links:
 * - Hover: pops up the first few sentences from that object's page
 * - Click: opens that object's page inside the chronicle book
 * ========================================================================== */
const renderFormattedParagraph = (
  text: string,
  onHoverEntity?: (state: HoveredEntityState | null) => void,
  onSelectEntity?: (entityId: string) => void
) => {
  const parts = text.split(/(\{green:[^}]+\})/g);
  return parts.map((part, i) => {
    if (part.startsWith('{green:') && part.endsWith('}')) {
      const inner = part.slice(7, -1);
      const { entity, label } = resolveArchiveEntity(inner);

      if (!entity) {
        return (
          <span
            key={i}
            className="font-bold text-[#246636] underline decoration-[#246636]/45 decoration-1 underline-offset-2"
          >
            {label}
          </span>
        );
      }

      return (
        <button
          key={i}
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onHoverEntity?.(null);
            onSelectEntity?.(entity.id);
          }}
          onMouseEnter={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            onHoverEntity?.({
              entity,
              anchorRect: {
                left: rect.left,
                top: rect.top,
                bottom: rect.bottom,
                width: rect.width,
              },
            });
          }}
          onMouseLeave={() => onHoverEntity?.(null)}
          onFocus={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            onHoverEntity?.({
              entity,
              anchorRect: {
                left: rect.left,
                top: rect.top,
                bottom: rect.bottom,
                width: rect.width,
              },
            });
          }}
          onBlur={() => onHoverEntity?.(null)}
          className="inline font-serif font-bold text-[#1f5e30] hover:text-[#13421f] underline decoration-[#246636]/55 hover:decoration-[#13421f] decoration-[1.5px] underline-offset-[3px] rounded-sm px-0.5 -mx-0.5 hover:bg-[#246636]/12 transition-colors cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#246636]"
        >
          {label}
        </button>
      );
    }
    return <React.Fragment key={i}>{part}</React.Fragment>;
  });
};

/* ============================================================================
 * SEPIA PEN-AND-INK ETCHING ILLUSTRATIONS FOR THE RIGHT BOOK PAGE
 * ========================================================================== */
const SepiaEtchingIllustration: React.FC<{
  spread: Pick<BookSpread, 'illustrationUrl' | 'illustrationTitle' | 'illustrationScene'>;
}> = ({ spread }) => {
  if (spread.illustrationUrl) {
    return (
      <img
        src={spread.illustrationUrl}
        alt={spread.illustrationTitle}
        className="w-full h-full object-cover sepia contrast-110 brightness-95 mix-blend-multiply"
        draggable={false}
      />
    );
  }

  const scene = spread.illustrationScene || 'cavern';

  if (scene === 'hillfort') {
    return (
      <svg viewBox="0 0 600 800" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
        <defs>
          <radialGradient id="etchBgHillfort" cx="50%" cy="42%" r="70%">
            <stop offset="0%" stopColor="#f1e6ce" />
            <stop offset="65%" stopColor="#dfcca7" />
            <stop offset="100%" stopColor="#c7ae82" />
          </radialGradient>
          <pattern id="hatchHillfort" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(32)">
            <line x1="0" y1="0" x2="0" y2="7" stroke="#593a1b" strokeWidth="0.55" opacity="0.25" />
          </pattern>
        </defs>
        <rect width="600" height="800" fill="url(#etchBgHillfort)" />
        <rect width="600" height="800" fill="url(#hatchHillfort)" />
        <g stroke="#472c12" fill="none" strokeLinecap="round" strokeLinejoin="round">
          {/* Clouds & birds */}
          <path d="M 90 120 Q 170 95 250 115 M 370 100 Q 440 80 510 105" strokeWidth="1.5" opacity="0.6" />
          <path d="M 190 155 Q 200 145 210 155 Q 220 145 230 155" strokeWidth="1.8" />
          <path d="M 245 140 Q 253 132 261 140 Q 269 132 277 140" strokeWidth="1.5" />
          {/* Steep Hillfort Mound */}
          <path d="M 30 560 C 120 350 200 290 300 290 C 400 290 480 350 570 560 Z" fill="#b39468" fillOpacity="0.48" strokeWidth="3" />
          {/* Wooden Palisade & Watchtower on Summit */}
          <rect x="200" y="255" width="200" height="38" fill="#8c6b42" fillOpacity="0.55" strokeWidth="2.4" />
          {Array.from({ length: 13 }).map((_, i) => (
            <line key={i} x1={208 + i * 15} y1="248" x2={208 + i * 15} y2="293" strokeWidth="2" />
          ))}
          <polygon points="275,255 300,185 325,255" fill="#785834" fillOpacity="0.6" strokeWidth="2.5" />
          <polygon points="265,205 300,165 335,205" fill="#5c3d1e" fillOpacity="0.65" strokeWidth="2.5" />
          {/* Winding River Bend at Base */}
          <path d="M 0 600 Q 220 535 390 615 T 600 660 L 600 800 L 0 800 Z" fill="#c9b289" fillOpacity="0.55" strokeWidth="2.5" />
          <path d="M 45 645 Q 200 595 350 650 M 120 710 Q 290 665 480 725" strokeWidth="1.6" strokeDasharray="8 5" />
        </g>
      </svg>
    );
  }

  if (scene === 'innkeeper' || scene === 'scouts') {
    return (
      <svg viewBox="0 0 600 800" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
        <defs>
          <radialGradient id="etchBgPeople" cx="50%" cy="42%" r="68%">
            <stop offset="0%" stopColor="#f2e7ce" />
            <stop offset="65%" stopColor="#dfcca7" />
            <stop offset="100%" stopColor="#c7ae82" />
          </radialGradient>
          <pattern id="hatchPeople" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(-28)">
            <line x1="0" y1="0" x2="0" y2="7" stroke="#593a1b" strokeWidth="0.55" opacity="0.25" />
          </pattern>
        </defs>
        <rect width="600" height="800" fill="url(#etchBgPeople)" />
        <rect width="600" height="800" fill="url(#hatchPeople)" />
        <g stroke="#472c12" fill="none" strokeLinecap="round" strokeLinejoin="round">
          {/* Decorative Portrait Arch */}
          <path d="M 85 740 L 85 240 C 85 100 515 100 515 240 L 515 740" strokeWidth="3" fill="#d9c39b" fillOpacity="0.32" />
          <path d="M 105 740 L 105 250 C 105 130 495 130 495 250 L 495 740" strokeWidth="1.5" strokeDasharray="6 4" />
          {scene === 'innkeeper' ? (
            <>
              {/* Broad-shouldered Bearded Innkeeper holding Foaming Tankard */}
              <circle cx="300" cy="275" r="56" fill="#dec79e" strokeWidth="3" />
              {/* Thick Beard & Mustache */}
              <path d="M 250 285 C 245 355 275 385 300 390 C 325 385 355 355 350 285" fill="#8c6c46" fillOpacity="0.65" strokeWidth="2.5" />
              {/* Coat & Apron */}
              <path d="M 145 720 C 155 470 210 385 300 385 C 390 385 445 470 455 720 Z" fill="#8f6d43" fillOpacity="0.55" strokeWidth="3" />
              <rect x="215" y="450" width="170" height="250" fill="#e6d6b8" fillOpacity="0.55" strokeWidth="2.2" />
              {/* Oak Barrel & Tankard */}
              <rect x="380" y="435" width="64" height="88" rx="6" fill="#a88454" strokeWidth="2.8" />
              <path d="M 444 452 C 466 452 466 502 444 502" strokeWidth="3" />
            </>
          ) : (
            <>
              {/* Two Cloaked Hillfort Scouts with Longbows */}
              <g transform="translate(135, 220)">
                <circle cx="75" cy="55" r="36" fill="#dec79e" strokeWidth="2.6" />
                <path d="M 28 65 C 40 5 110 5 122 65" fill="#634628" fillOpacity="0.6" strokeWidth="2.5" />
                <path d="M 10 480 L 32 105 L 120 105 L 145 480 Z" fill="#7d5c36" fillOpacity="0.58" strokeWidth="2.8" />
                <path d="M 135 20 Q 195 160 135 310" strokeWidth="3.2" />
                <line x1="135" y1="20" x2="135" y2="310" strokeWidth="1.4" />
              </g>
              <g transform="translate(310, 260)">
                <circle cx="65" cy="48" r="32" fill="#dec79e" strokeWidth="2.5" />
                <path d="M 12 440 L 28 92 L 105 92 L 125 440 Z" fill="#6e4e2c" fillOpacity="0.52" strokeWidth="2.5" />
              </g>
            </>
          )}
        </g>
      </svg>
    );
  }

  if (scene === 'horn' || scene === 'shield' || scene === 'moss' || scene === 'runes') {
    return (
      <svg viewBox="0 0 600 800" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
        <defs>
          <radialGradient id="etchBgRelic" cx="50%" cy="46%" r="65%">
            <stop offset="0%" stopColor="#f4e9d2" />
            <stop offset="65%" stopColor="#dfcca7" />
            <stop offset="100%" stopColor="#c4aa7d" />
          </radialGradient>
          <pattern id="hatchRelic" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
            <line x1="0" y1="0" x2="0" y2="6" stroke="#593a1b" strokeWidth="0.55" opacity="0.26" />
          </pattern>
        </defs>
        <rect width="600" height="800" fill="url(#etchBgRelic)" />
        <rect width="600" height="800" fill="url(#hatchRelic)" />
        <g stroke="#452a10" fill="none" strokeLinecap="round" strokeLinejoin="round">
          {/* Ornate Study Pedestal Circle */}
          <circle cx="300" cy="390" r="210" strokeWidth="2" strokeDasharray="6 4" fill="#d9c39b" fillOpacity="0.25" />
          <circle cx="300" cy="390" r="192" strokeWidth="1.2" />

          {scene === 'horn' && (
            <>
              {/* Brass-Mounted Aurochs Drinking Horn Goblet */}
              <path
                d="M 165 250 C 190 450 320 535 455 465 C 415 565 235 560 125 320 Z"
                fill="#7d5a34"
                fillOpacity="0.65"
                strokeWidth="3.5"
              />
              <ellipse cx="145" cy="285" rx="36" ry="20" transform="rotate(-28 145 285)" fill="#c9ab74" strokeWidth="3" />
              {/* Stand legs */}
              <line x1="255" y1="490" x2="225" y2="575" strokeWidth="4" />
              <line x1="345" y1="505" x2="375" y2="575" strokeWidth="4" />
              <line x1="190" y1="575" x2="410" y2="575" strokeWidth="3.5" />
            </>
          )}

          {scene === 'shield' && (
            <>
              {/* Cracked Iron Shield Boss (Umbonas) */}
              <circle cx="300" cy="390" r="145" fill="#9e8158" fillOpacity="0.5" strokeWidth="3.5" />
              <circle cx="300" cy="390" r="88" fill="#7a5e3a" fillOpacity="0.65" strokeWidth="3" />
              {/* Deep Axe Gash */}
              <polygon points="245,305 355,465 335,478 228,320" fill="#2b190a" strokeWidth="2" />
              {[0, 60, 120, 180, 240, 300].map((deg) => {
                const rad = (deg * Math.PI) / 180;
                return (
                  <circle
                    key={deg}
                    cx={300 + Math.cos(rad) * 118}
                    cy={390 + Math.sin(rad) * 118}
                    r="8"
                    fill="#452a10"
                  />
                );
              })}
            </>
          )}

          {scene === 'moss' && (
            <>
              {/* Wax-Sealed Glass Jar with Glowing Moss */}
              <rect x="235" y="220" width="130" height="36" rx="6" fill="#7a2c20" fillOpacity="0.65" strokeWidth="2.8" />
              <rect x="200" y="256" width="200" height="270" rx="28" fill="#dfd2b5" fillOpacity="0.45" strokeWidth="3" />
              <path d="M 220 490 Q 260 415 300 450 T 380 480 L 380 515 L 220 515 Z" fill="#4f7542" fillOpacity="0.55" strokeWidth="2.2" />
              <circle cx="265" cy="405" r="6" fill="#4f7542" />
              <circle cx="325" cy="385" r="8" fill="#4f7542" />
              <circle cx="295" cy="350" r="5" fill="#4f7542" />
            </>
          )}

          {scene === 'runes' && (
            <>
              {/* Baltic Rune Stone & Bent Coin */}
              <polygon points="185,545 215,235 385,235 415,545" fill="#a88b60" fillOpacity="0.5" strokeWidth="3" />
              <line x1="300" y1="280" x2="300" y2="490" strokeWidth="3.2" />
              <polyline points="250,335 300,290 350,335" strokeWidth="3" />
              <polyline points="255,415 300,370 345,415" strokeWidth="3" />
              <circle cx="300" cy="465" r="22" strokeWidth="2.5" />
            </>
          )}
        </g>
      </svg>
    );
  }

  if (scene === 'lake' || scene === 'archive') {
    return (
      <svg viewBox="0 0 600 800" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
        <defs>
          <radialGradient id="etchBgLake" cx="50%" cy="40%" r="70%">
            <stop offset="0%" stopColor="#f2e7ce" />
            <stop offset="65%" stopColor="#dfcca7" />
            <stop offset="100%" stopColor="#c4aa7d" />
          </radialGradient>
          <pattern id="hatchLake" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(20)">
            <line x1="0" y1="0" x2="0" y2="7" stroke="#593a1b" strokeWidth="0.5" opacity="0.24" />
          </pattern>
        </defs>
        <rect width="600" height="800" fill="url(#etchBgLake)" />
        <rect width="600" height="800" fill="url(#hatchLake)" />
        <g stroke="#452a10" fill="none" strokeLinecap="round" strokeLinejoin="round">
          {/* Limestone Cliffs & Mirrored Lake / Vault */}
          <path d="M 0 430 L 140 240 L 255 370 L 385 210 L 510 355 L 600 275 L 600 450 L 0 450 Z" fill="#9e7f54" fillOpacity="0.45" strokeWidth="2.5" />
          <rect x="0" y="450" width="600" height="350" fill="#c9b289" fillOpacity="0.45" />
          {/* Stepping stones across the water */}
          {[140, 215, 295, 375, 455].map((x, idx) => (
            <ellipse key={idx} cx={x} cy={520 + idx * 42} rx={28 + idx * 3} ry={10 + idx * 1.5} fill="#7d5e38" fillOpacity="0.6" strokeWidth="2" />
          ))}
          <path d="M 40 490 L 560 490 M 80 560 L 520 560 M 60 650 L 540 650" strokeWidth="1.2" strokeDasharray="10 6" />
        </g>
      </svg>
    );
  }


  if (scene === 'tavern') {
    return (
      <svg
        viewBox="0 0 600 800"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full"
      >
        <defs>
          <radialGradient id="etchBgTavern" cx="50%" cy="45%" r="65%">
            <stop offset="0%" stopColor="#efe4ca" />
            <stop offset="65%" stopColor="#dfcda8" />
            <stop offset="100%" stopColor="#cbb286" />
          </radialGradient>
          <pattern id="hatchTavern" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
            <line x1="0" y1="0" x2="0" y2="8" stroke="#5c3d1e" strokeWidth="0.55" opacity="0.28" />
          </pattern>
        </defs>
        <rect width="600" height="800" fill="url(#etchBgTavern)" />
        <rect width="600" height="800" fill="url(#hatchTavern)" />

        {/* Timber ceiling beams & stone hearth */}
        <g stroke="#4a2e14" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M 0 90 L 600 90 M 0 115 L 600 115" strokeWidth="2.5" />
          <path d="M 70 0 L 110 90 M 290 0 L 300 90 M 520 0 L 490 90" strokeWidth="4" />
          {/* Hanging wrought-iron chandelier with candles */}
          <line x1="300" y1="90" x2="300" y2="195" strokeWidth="2.5" />
          <ellipse cx="300" cy="205" rx="85" ry="18" strokeWidth="3" />
          {[-65, -30, 0, 30, 65].map((dx, i) => (
            <g key={i} transform={`translate(${300 + dx}, 185)`}>
              <rect x="-4" y="0" width="8" height="16" fill="#efe4ca" stroke="#4a2e14" strokeWidth="1.5" />
              <path d="M 0 -12 C 5 -5 4 0 0 0 C -4 0 -5 -5 0 -12 Z" fill="#c28b38" opacity="0.7" />
              <circle cx="0" cy="-8" r="18" stroke="#7a542e" strokeWidth="0.7" strokeDasharray="2 3" />
            </g>
          ))}

          {/* Arched stone hearth in background */}
          <path d="M 160 470 L 160 280 C 160 210 440 210 440 280 L 440 470" strokeWidth="3" fill="#d3bd97" fillOpacity="0.45" />
          <path d="M 190 470 L 190 300 C 190 245 410 245 410 300 L 410 470" strokeWidth="2" fill="#5c3d1e" fillOpacity="0.22" />
          {/* Hearth fire */}
          <path d="M 250 460 C 265 400 285 420 300 365 C 315 415 335 395 350 460 Z" fill="#b88337" fillOpacity="0.45" strokeWidth="1.8" />

          {/* Heavy oak table in foreground with map, tankards & sword */}
          <polygon points="50,560 550,560 590,680 10,680" fill="#c7ae83" stroke="#3d2510" strokeWidth="3" />
          <line x1="25" y1="680" x2="575" y2="680" strokeWidth="5" />
          {/* Unrolled parchment map on table */}
          <polygon points="190,580 410,575 435,655 170,660" fill="#f3e9d2" stroke="#4a2e14" strokeWidth="2" />
          <path d="M 210 615 Q 270 595 320 620 T 405 610" strokeWidth="1.5" strokeDasharray="4 3" />
          {/* Tankards */}
          <rect x="105" y="555" width="34" height="48" rx="4" fill="#b08d5b" strokeWidth="2.2" />
          <path d="M 139 565 C 152 565 152 592 139 592" strokeWidth="2.5" />
          <rect x="465" y="562" width="32" height="45" rx="4" fill="#b08d5b" strokeWidth="2.2" />

          {/* Silhouettes / ink figures of the party around the table */}
          {/* Left Cloaked Ranger */}
          <path d="M 40 780 C 45 640 80 510 135 495 C 175 490 200 560 205 780" fill="#8c6943" fillOpacity="0.55" strokeWidth="2.5" />
          <circle cx="135" cy="450" r="34" fill="#c9ae84" strokeWidth="2.5" />
          <path d="M 95 465 C 105 405 165 405 175 465" fill="#5c3d1e" fillOpacity="0.5" strokeWidth="2" />

          {/* Center Knight / Warrior */}
          <path d="M 225 560 C 230 475 260 445 300 445 C 340 445 370 475 375 560" fill="#9c7a52" fillOpacity="0.5" strokeWidth="2.5" />
          <circle cx="300" cy="402" r="30" fill="#dec8a2" strokeWidth="2.5" />
          <line x1="300" y1="445" x2="300" y2="560" strokeWidth="2" />

          {/* Right Mage with Staff */}
          <path d="M 410 780 C 420 580 445 490 485 485 C 530 485 560 610 570 780" fill="#785836" fillOpacity="0.55" strokeWidth="2.5" />
          <circle cx="480" cy="442" r="32" fill="#d4bc94" strokeWidth="2.5" />
          <line x1="405" y1="330" x2="445" y2="760" strokeWidth="3.5" />
          <circle cx="403" cy="322" r="12" fill="#e6c875" strokeWidth="2" />
        </g>
      </svg>
    );
  }

  if (scene === 'forest') {
    return (
      <svg
        viewBox="0 0 600 800"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full"
      >
        <defs>
          <radialGradient id="etchBgForest" cx="50%" cy="40%" r="70%">
            <stop offset="0%" stopColor="#f0e5cc" />
            <stop offset="65%" stopColor="#decba6" />
            <stop offset="100%" stopColor="#c7ae82" />
          </radialGradient>
          <pattern id="hatchForest" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(-30)">
            <line x1="0" y1="0" x2="0" y2="7" stroke="#593a1b" strokeWidth="0.55" opacity="0.26" />
          </pattern>
        </defs>
        <rect width="600" height="800" fill="url(#etchBgForest)" />
        <rect width="600" height="800" fill="url(#hatchForest)" />

        <g stroke="#472c12" fill="none" strokeLinecap="round" strokeLinejoin="round">
          {/* Ancient oak trunks & twisted branches */}
          <path d="M 35 0 C 55 220 65 440 20 790 L 125 790 C 105 460 115 240 140 0 Z" fill="#8f6d46" fillOpacity="0.45" strokeWidth="2.5" />
          <path d="M 475 0 C 495 250 485 460 460 790 L 580 790 C 545 450 550 230 570 0 Z" fill="#8f6d46" fillOpacity="0.45" strokeWidth="2.5" />
          {/* Canopy branches */}
          <path d="M 125 140 Q 250 190 360 120 M 485 170 Q 340 230 210 180 M 115 250 Q 260 280 390 240" strokeWidth="3" />

          {/* Distant Hillfort (Piliakalnis) & winding forest road */}
          <path d="M 190 420 Q 300 330 420 420" fill="#b89b70" fillOpacity="0.4" strokeWidth="2" />
          <path d="M 275 362 L 275 335 L 325 335 L 325 362" fill="#7d5c38" fillOpacity="0.45" strokeWidth="1.8" />
          <path d="M 295 420 C 240 500 350 580 260 790 M 335 420 C 310 500 420 585 390 790" strokeWidth="2" strokeDasharray="6 4" />

          {/* Pagan carved rune stone by the path */}
          <polygon points="150,580 175,475 215,485 225,590" fill="#a68960" fillOpacity="0.55" strokeWidth="2.5" />
          <path d="M 185 505 L 185 560 M 172 522 L 198 522 M 175 540 L 195 540" strokeWidth="2" />

          {/* Party figures advancing along the forest trail */}
          <g transform="translate(230, 490)">
            <circle cx="30" cy="25" r="16" fill="#d9c29c" strokeWidth="2.2" />
            <path d="M 8 155 L 15 45 L 48 45 L 55 155 Z" fill="#755534" fillOpacity="0.55" strokeWidth="2.2" />
            <ellipse cx="52" cy="92" rx="14" ry="32" fill="#b08e62" strokeWidth="2.2" />
            <line x1="8" y1="15" x2="2" y2="155" strokeWidth="2.5" />
          </g>
          <g transform="translate(320, 525)">
            <circle cx="28" cy="22" r="15" fill="#d9c29c" strokeWidth="2.2" />
            <path d="M 5 160 L 14 40 L 45 40 L 58 160 Z" fill="#634628" fillOpacity="0.6" strokeWidth="2.2" />
            <path d="M 48 50 Q 72 85 48 125" strokeWidth="2.5" />
            <line x1="48" y1="50" x2="48" y2="125" strokeWidth="1.2" />
          </g>
        </g>
      </svg>
    );
  }

  // Default / 'cavern' scene: Faithful homage to the Pathfinder Storybook cave crack illustration!
  return (
    <svg
      viewBox="0 0 600 800"
      preserveAspectRatio="xMidYMid slice"
      className="w-full h-full"
    >
      <defs>
        <radialGradient id="etchBgCavern" cx="48%" cy="45%" r="68%">
          <stop offset="0%" stopColor="#f2e7ce" />
          <stop offset="60%" stopColor="#dfcca7" />
          <stop offset="100%" stopColor="#c7ae82" />
        </radialGradient>
        <pattern id="etchLines" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(28)">
          <line x1="0" y1="0" x2="0" y2="6" stroke="#5e3e1e" strokeWidth="0.5" opacity="0.28" />
        </pattern>
        <pattern id="etchCross" width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(-35)">
          <line x1="0" y1="0" x2="0" y2="9" stroke="#4a2f14" strokeWidth="0.45" opacity="0.2" />
        </pattern>
      </defs>

      {/* Aged Sepia Base & Crosshatching */}
      <rect width="600" height="800" fill="url(#etchBgCavern)" />
      <rect width="600" height="800" fill="url(#etchLines)" />
      <rect width="600" height="800" fill="url(#etchCross)" />

      {/* Cavern Rock Formations & Overgrown Foliage */}
      <g stroke="#4a2e14" fill="none" strokeLinecap="round" strokeLinejoin="round">
        {/* Upper Cave Crags & Hanging Vines */}
        <path
          d="M 0 180 Q 90 120 155 60 L 210 0 L 0 0 Z"
          fill="#a6865b"
          fillOpacity="0.35"
          strokeWidth="2"
        />
        <path
          d="M 220 0 L 185 95 L 250 165 L 315 85 L 390 175 L 470 70 L 440 0 Z"
          fill="#9c7b50"
          fillOpacity="0.3"
          strokeWidth="2.2"
        />
        <path
          d="M 600 0 L 455 0 L 485 140 L 535 235 L 600 280 Z"
          fill="#8f6d43"
          fillOpacity="0.4"
          strokeWidth="2.2"
        />

        {/* THE MYSTERIOUS DARK CRACK IN THE CAVE WALL (Center-Right) */}
        <polygon
          points="365,175 425,215 405,335 428,440 375,495 340,460 355,340 338,245"
          fill="#261508"
          fillOpacity="0.88"
          stroke="#3b220c"
          strokeWidth="3"
        />
        {/* Swirling darkness & draft lines around the crack */}
        <path
          d="M 358 235 Q 390 270 368 320 T 395 425"
          stroke="#cbb286"
          strokeWidth="1.2"
          opacity="0.55"
        />
        <path
          d="M 310 210 C 345 160 415 165 445 215 C 470 250 450 310 425 335"
          fill="#7d5c36"
          fillOpacity="0.38"
          strokeWidth="2.2"
        />

        {/* Giant Mushrooms, Strange Flowers & Berry Bushes on Cave Walls */}
        <g fill="#b59669" fillOpacity="0.45" strokeWidth="1.8">
          <ellipse cx="465" cy="275" rx="34" ry="14" />
          <path d="M 455 288 L 452 330 M 475 288 L 478 330" />
          <ellipse cx="495" cy="310" rx="24" ry="10" />
          <circle cx="435" cy="235" r="5" fill="#4a2e14" />
          <circle cx="448" cy="228" r="4" fill="#4a2e14" />
          <circle cx="445" cy="244" r="4.5" fill="#4a2e14" />
        </g>

        {/* Left Companion: Tall Noble / Cleric looking at the crack (Back view) */}
        <g transform="translate(45, 225)">
          <circle cx="52" cy="40" r="22" fill="#cfb68c" strokeWidth="2.4" />
          <path
            d="M 15 90 L 90 85 L 105 320 L 5 320 Z"
            fill="#9e7d53"
            fillOpacity="0.55"
            strokeWidth="2.4"
          />
          {/* Shoulder pauldrons & cape folds */}
          <path d="M 10 92 Q 52 115 95 88" strokeWidth="2.5" />
          <line x1="38" y1="100" x2="28" y2="310" strokeWidth="1.8" />
          <line x1="65" y1="100" x2="78" y2="310" strokeWidth="1.8" />
        </g>

        {/* Center-Left Companion: Female Mage / Ranger holding long staff */}
        <g transform="translate(135, 255)">
          <circle cx="55" cy="42" r="21" fill="#dbc49c" strokeWidth="2.4" />
          {/* Flowing hair */}
          <path d="M 35 35 C 20 65 22 105 35 130" strokeWidth="2.2" />
          {/* Tunic & cloak */}
          <path
            d="M 32 72 L 78 72 L 98 310 L 18 310 Z"
            fill="#8c6b42"
            fillOpacity="0.55"
            strokeWidth="2.4"
          />
          {/* Long quarterstaff */}
          <line x1="125" y1="10" x2="45" y2="345" stroke="#3b220c" strokeWidth="4" />
        </g>

        {/* Center Background Companion: Cloaked figure right before the crack */}
        <g transform="translate(245, 220)">
          <path
            d="M 20 60 C 25 25 65 25 70 60 L 88 265 L 8 265 Z"
            fill="#7a5a36"
            fillOpacity="0.5"
            strokeWidth="2.2"
          />
          <line x1="35" y1="75" x2="30" y2="260" strokeWidth="1.5" />
          <line x1="55" y1="75" x2="62" y2="260" strokeWidth="1.5" />
        </g>

        {/* Small Halfling / Scout Companion on Center-Right */}
        <g transform="translate(362, 415)">
          <circle cx="28" cy="24" r="15" fill="#d4bc94" strokeWidth="2.2" />
          <path
            d="M 10 45 L 46 45 L 54 145 L 6 145 Z"
            fill="#82613b"
            fillOpacity="0.6"
            strokeWidth="2.2"
          />
        </g>

        {/* Right Foreground Hero: Armored Knight with Heater Shield & Cape (Back-left view) */}
        <g transform="translate(415, 365)">
          <circle cx="78" cy="36" r="23" fill="#cfb58c" strokeWidth="2.6" />
          {/* Steel Pauldrons */}
          <ellipse cx="45" cy="78" rx="22" ry="14" fill="#b89b72" strokeWidth="2.4" />
          <ellipse cx="112" cy="78" rx="22" ry="14" fill="#b89b72" strokeWidth="2.4" />
          {/* Flowing Long Cloak */}
          <path
            d="M 32 85 L 125 85 L 155 345 L 8 345 Z"
            fill="#87663e"
            fillOpacity="0.62"
            strokeWidth="2.6"
          />
          <line x1="65" y1="90" x2="45" y2="340" strokeWidth="2" />
          <line x1="92" y1="90" x2="112" y2="340" strokeWidth="2" />
          <line x1="78" y1="90" x2="78" y2="340" strokeWidth="2.2" />
          {/* Triangular Knight Shield strapped to left arm */}
          <polygon
            points="5,115 72,95 62,215 18,245 -8,180"
            fill="#c9ae82"
            stroke="#3b220c"
            strokeWidth="3"
          />
          <polygon
            points="12,124 63,108 55,205 21,228 1,176"
            fill="none"
            stroke="#5c3d1e"
            strokeWidth="1.6"
          />
          <line x1="33" y1="118" x2="26" y2="215" strokeWidth="2" />
          <line x1="8" y1="168" x2="58" y2="155" strokeWidth="2" />
        </g>

        {/* Bottom-Left Foreground Hero: Fur-Cloaked Barbarian / Warrior (Close-up shoulder & head) */}
        <g transform="translate(15, 515)">
          {/* Wild hair */}
          <path
            d="M 35 95 C 15 35 65 -10 125 10 C 175 25 195 85 170 145 Z"
            fill="#6e4e2c"
            fillOpacity="0.65"
            strokeWidth="2.6"
          />
          <path d="M 55 25 Q 95 55 65 115 M 95 15 Q 130 55 110 125 M 135 25 Q 160 70 145 130" strokeWidth="2" />
          {/* Studded Shoulder Armor & Fur */}
          <path
            d="M -10 285 C 5 165 85 125 225 145 L 265 285 Z"
            fill="#8c6b43"
            fillOpacity="0.7"
            strokeWidth="2.8"
          />
          <ellipse cx="165" cy="215" rx="58" ry="48" fill="#b39366" strokeWidth="2.6" />
          <ellipse cx="165" cy="215" rx="42" ry="34" strokeWidth="1.6" strokeDasharray="5 4" />
        </g>

        {/* Cave Floor Stones, Ferns & Grass Tufts */}
        <path d="M 255 615 Q 290 595 335 612 M 280 685 Q 335 668 385 690" strokeWidth="1.8" />
        <path d="M 340 580 L 325 550 M 340 580 L 345 545 M 340 580 L 362 555" strokeWidth="2" />
        <path d="M 245 645 L 228 615 M 245 645 L 248 610 M 245 645 L 265 620" strokeWidth="2" />
      </g>
    </svg>
  );
};

interface ArchiveViewProps {
  onExit: () => void;
  isGlobalMenuOpen?: boolean;
  /** True while the chronicle book or wall map covers the scene. */
  onReaderOpenChange?: (open: boolean) => void;
}

/** Archive illustration is 2752×1536 and drawn with object-cover. */
const ARCHIVE_IMAGE_ASPECT = 2752 / 1536;

type CoverBox = { left: number; top: number; width: number; height: number };

/**
 * Hotspots are stored as percentages of the painting, then mapped onto the
 * on-screen object-cover rectangle so they stay on the drawn object.
 */
function useSceneCover() {
  const ref = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState<CoverBox>({ left: 0, top: 0, width: 0, height: 0 });

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => {
      const cw = el.clientWidth;
      const ch = el.clientHeight;
      if (!cw || !ch) return;

      if (cw / ch > ARCHIVE_IMAGE_ASPECT) {
        const height = cw / ARCHIVE_IMAGE_ASPECT;
        setBox({ left: 0, top: (ch - height) / 2, width: cw, height });
      } else {
        const width = ch * ARCHIVE_IMAGE_ASPECT;
        setBox({ left: (cw - width) / 2, top: 0, width, height: ch });
      }
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, box };
}

function placeHotspot(box: CoverBox, x: number, y: number, w: number, h: number) {
  return {
    left: box.left + (x / 100) * box.width,
    top: box.top + (y / 100) * box.height,
    width: (w / 100) * box.width,
    height: (h / 100) * box.height,
  };
}

export const ArchiveView: React.FC<ArchiveViewProps> = ({
  onExit,
  isGlobalMenuOpen = false,
  onReaderOpenChange,
}) => {
  // Default book page is the one marked with isBookmarked (previous session)
  const defaultBookIndex = useMemo(() => {
    const idx = ARCHIVE_BOOK_SPREADS.findIndex((s) => s.isBookmarked);
    return idx >= 0 ? idx : Math.max(0, ARCHIVE_BOOK_SPREADS.length - 1);
  }, []);

  const [bookModalOpen, setBookModalOpen] = useState(false);
  const [currentSpreadIndex, setCurrentSpreadIndex] = useState(defaultBookIndex);
  const [showIllustrationInfo, setShowIllustrationInfo] = useState(false);

  // Navigation stack of opened object pages inside the Chronicle Book
  const [entityHistory, setEntityHistory] = useState<string[]>([]);
  const [hoveredEntity, setHoveredEntity] = useState<HoveredEntityState | null>(null);

  const activeEntityId =
    entityHistory.length > 0 ? entityHistory[entityHistory.length - 1] : null;
  const activeEntity = activeEntityId ? ARCHIVE_ENTITIES[activeEntityId] ?? null : null;

  const openEntityPage = (entityId: string) => {
    if (!ARCHIVE_ENTITIES[entityId]) return;
    setHoveredEntity(null);
    setShowIllustrationInfo(false);
    setEntityHistory((prev) => {
      if (prev[prev.length - 1] === entityId) return prev;
      return [...prev, entityId];
    });
  };

  const goBackFromEntity = () => {
    setHoveredEntity(null);
    setShowIllustrationInfo(false);
    setEntityHistory((prev) => prev.slice(0, -1));
  };

  const returnToSessionSpread = (spreadIdx?: number) => {
    setHoveredEntity(null);
    setShowIllustrationInfo(false);
    setEntityHistory([]);
    if (typeof spreadIdx === 'number') {
      setCurrentSpreadIndex(spreadIdx);
    }
  };

  const [mapModalOpen, setMapModalOpen] = useState(false);

  const [inTrophyRoom, setInTrophyRoom] = useState(false);
  const [selectedTrophy, setSelectedTrophy] = useState<TrophyItem | null>(
    ARCHIVE_TROPHIES[0] ?? null
  );

  const [showHotspotHints, setShowHotspotHints] = useState(true);
  const [hoveredLabel, setHoveredLabel] = useState<string | null>(null);
  const { ref: sceneRef, box: sceneBox } = useSceneCover();

  const openBookOnBookmark = () => {
    setCurrentSpreadIndex(defaultBookIndex);
    setEntityHistory([]);
    setHoveredEntity(null);
    setBookModalOpen(true);
  };

  useEffect(() => {
    if (!bookModalOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (entityHistory.length > 0) {
          returnToSessionSpread();
        } else {
          setBookModalOpen(false);
        }
      } else if (e.key === 'Backspace' && entityHistory.length > 0) {
        goBackFromEntity();
      } else if (e.key === 'ArrowLeft' && entityHistory.length === 0) {
        setCurrentSpreadIndex((prev) => Math.max(0, prev - 1));
      } else if (e.key === 'ArrowRight' && entityHistory.length === 0) {
        setCurrentSpreadIndex((prev) =>
          Math.min(ARCHIVE_BOOK_SPREADS.length - 1, prev + 1)
        );
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [bookModalOpen, entityHistory.length]);

  const openMapsModal = () => {
    setMapModalOpen(true);
  };

  useEffect(() => {
    if (!mapModalOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMapModalOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mapModalOpen]);

  useLayoutEffect(() => {
    onReaderOpenChange?.(bookModalOpen || mapModalOpen);
    return () => onReaderOpenChange?.(false);
  }, [bookModalOpen, mapModalOpen, onReaderOpenChange]);

  const currentSpread = ARCHIVE_BOOK_SPREADS[currentSpreadIndex];
  const currentMap = ARCHIVE_MAPS[0];

  return (
    <div
      ref={sceneRef}
      className="relative w-screen h-screen bg-stone-950 overflow-hidden select-none"
    >
      {/* Background Archive Illustration */}
      <img
        src={`${import.meta.env.BASE_URL}images/archive.jpg`}
        alt="Archyvo vidus"
        className="w-full h-full object-cover object-center"
        draggable={false}
      />

      {/* Vignette */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at center, transparent 58%, rgba(12, 10, 9, 0.72) 100%)',
        }}
      />

      {/* Ambient animations (sunbeams, dust motes, lanterns) */}
      <AmbientEffects scene="archive" />

      {/* Top Left Header & Hints Toggle */}
      <div className="absolute top-4 left-4 z-30 flex flex-wrap items-center gap-3">
        <div className="px-4 py-2.5 rounded-xl bg-stone-950/85 border border-amber-700/60 backdrop-blur-md shadow-lg">
          <div className="flex items-center gap-2.5">
            <BookOpen className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <h1 className="font-display text-base md:text-lg font-bold text-amber-200 leading-tight">
                Senolių Archyvas ir Metraščiai
              </h1>
              <p className="text-xs text-amber-400/80">
                Paspauskite ant didžiosios knygos, sieninio žemėlapio arba durų į trofėjų kambarį
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => setShowHotspotHints((prev) => !prev)}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-stone-900/85 hover:bg-stone-800 border border-amber-700/50 text-amber-200 text-xs font-display tracking-wider uppercase transition-all shadow-md"
        >
          <Eye className="w-3.5 h-3.5 text-amber-400" />
          {showHotspotHints ? 'Slėpti žymeklius' : 'Rodyti žymeklius'}
        </button>
      </div>

      {/* 1. LARGE CHRONICLE BOOK ON TABLE (Middle) */}
      <div
        onClick={openBookOnBookmark}
        onMouseEnter={() =>
          setHoveredLabel('Didžioji Metraščių Knyga — Prologas ir praėjusių sesijų istorijos')
        }
        onMouseLeave={() => setHoveredLabel(null)}
        style={placeHotspot(sceneBox, 48, 60.5, 15, 11)}
        role="button"
        tabIndex={0}
        aria-label="Didžioji Metraščių Knyga"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') openBookOnBookmark();
        }}
        className="absolute z-20 rounded-2xl cursor-pointer transition-all duration-300 hover:bg-amber-400/20 hover:ring-2 hover:ring-amber-300 hover:shadow-[0_0_35px_rgba(251,191,36,0.55)] group"
      >
        {showHotspotHints && (
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-amber-900/95 border border-amber-300 text-amber-50 font-display text-xs font-bold whitespace-nowrap shadow-[0_0_15px_rgba(251,191,36,0.6)] group-hover:scale-110 transition-transform flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-amber-300" />
            Metraščių knyga
          </div>
        )}
      </div>

      {/* 2A. WALL MAP IN LEFT CORNER */}
      <div
        onClick={openMapsModal}
        onMouseEnter={() =>
          setHoveredLabel('LDK žemėlapis — Lietuvos Didžioji Kunigaikštystė, XV a.')
        }
        onMouseLeave={() => setHoveredLabel(null)}
        style={placeHotspot(sceneBox, 2, 28.5, 23, 31.5)}
        role="button"
        tabIndex={0}
        aria-label="Sieninis žemėlapis"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') openMapsModal();
        }}
        className="absolute z-20 rounded-2xl cursor-pointer transition-all duration-300 hover:bg-amber-400/15 hover:ring-2 hover:ring-amber-300/80 hover:shadow-[0_0_30px_rgba(251,191,36,0.45)] group"
      >
        {showHotspotHints && (
          <div className="absolute top-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-stone-950/90 border border-amber-400/80 text-amber-200 font-display text-xs font-bold whitespace-nowrap shadow-lg group-hover:scale-110 transition-transform flex items-center gap-1.5">
            <MapIcon className="w-3.5 h-3.5 text-amber-400" />
            LDK žemėlapis
          </div>
        )}
      </div>

      {/* 3. DOORWAY TO TROPHY ROOM (Right) */}
      <div
        onClick={() => setInTrophyRoom(true)}
        onMouseEnter={() =>
          setHoveredLabel('Kitas kambarys — Trofėjų ir sesijų prisiminimų muziejus')
        }
        onMouseLeave={() => setHoveredLabel(null)}
        style={placeHotspot(sceneBox, 78.5, 26.5, 17.5, 43)}
        role="button"
        tabIndex={0}
        aria-label="Trofėjų kambarys"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') setInTrophyRoom(true);
        }}
        className="absolute z-20 rounded-2xl cursor-pointer transition-all duration-300 hover:bg-amber-300/20 hover:ring-2 hover:ring-amber-300 hover:shadow-[0_0_35px_rgba(251,191,36,0.55)] group"
      >
        {showHotspotHints && (
          <div className="absolute top-6 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-amber-950/95 border border-amber-400 text-amber-100 font-display text-xs font-bold whitespace-nowrap shadow-lg group-hover:scale-110 transition-transform flex items-center gap-1.5">
            <Trophy className="w-3.5 h-3.5 text-amber-300" />
            Trofėjų menė →
          </div>
        )}
      </div>

      {/* Hover Tooltip */}
      {hoveredLabel && !bookModalOpen && !mapModalOpen && !inTrophyRoom && (
        <div className="pointer-events-none fixed bottom-24 left-1/2 -translate-x-1/2 z-30 px-4 py-2 rounded-full bg-stone-950/90 border border-amber-500/70 text-amber-100 text-xs md:text-sm font-semibold shadow-xl">
          {hoveredLabel}
        </div>
      )}

      {/* ===================================================================== */}
      {/* MODAL 1: FULL-SCREEN PATHFINDER STORYBOOK CHRONICLE TOME               */}
      {/* ===================================================================== */}
      {bookModalOpen && currentSpread && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#050404]/95 backdrop-blur-md px-2 sm:px-5 py-2 sm:py-3.5 select-none overflow-hidden"
          onClick={() => setBookModalOpen(false)}
        >
          {/* Subtle atmospheric nebula/arcane background glow at the screen edges (like reference image) */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(circle at 96% 28%, rgba(45, 138, 110, 0.18) 0%, transparent 28%), radial-gradient(circle at 94% 68%, rgba(168, 38, 115, 0.22) 0%, transparent 30%), radial-gradient(circle at 6% 22%, rgba(98, 48, 150, 0.14) 0%, transparent 26%)',
            }}
          />

          {/* Outer non-clipping full-screen wrapper that reserves exact margin for clasps, top tabs & bottom ribbons */}
          <div
            className="relative w-full h-full max-w-[1780px] max-h-[95vh] px-6 sm:px-10 md:px-12 pt-7 sm:pt-8 pb-4 sm:pb-5 flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* =============================================================== */}
            {/* PROTRUDING LEFT METAL CLASP (Hinged loop on left cover edge)    */}
            {/* =============================================================== */}
            <button
              type="button"
              onClick={() => {
                if (activeEntity) {
                  goBackFromEntity();
                } else if (currentSpreadIndex > 0) {
                  setCurrentSpreadIndex((prev) => Math.max(0, prev - 1));
                }
              }}
              disabled={!activeEntity && currentSpreadIndex === 0}
              title={
                activeEntity
                  ? 'Grįžti atgal (Backspace)'
                  : currentSpreadIndex > 0
                  ? 'Ankstesnis metraščio lapas (←)'
                  : 'Pirmasis metraščio lapas'
              }
              className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 z-30 items-center group disabled:opacity-75 cursor-pointer disabled:cursor-default focus:outline-none"
            >
              <svg
                width="64"
                height="96"
                viewBox="0 0 64 96"
                className="drop-shadow-[0_8px_14px_rgba(0,0,0,0.95)] transition-transform group-hover:not(:disabled):-translate-x-0.5"
              >
                <defs>
                  <linearGradient id="claspMetalL" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#57524a" />
                    <stop offset="45%" stopColor="#38342d" />
                    <stop offset="100%" stopColor="#1e1b17" />
                  </linearGradient>
                  <linearGradient id="claspBrassL" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6e5d3b" />
                    <stop offset="50%" stopColor="#4a3e27" />
                    <stop offset="100%" stopColor="#292114" />
                  </linearGradient>
                </defs>
                {/* Outer triangular loop pull */}
                <path
                  d="M 38 22 L 8 33 C 2 36 2 60 8 63 L 38 74 Z"
                  fill="url(#claspMetalL)"
                  stroke="#696256"
                  strokeWidth="1.5"
                />
                {/* Inner cutout */}
                <path
                  d="M 30 33 L 13 40 C 10 42 10 54 13 56 L 30 63 Z"
                  fill="#0b0908"
                  stroke="#453f37"
                  strokeWidth="1.2"
                />
                {/* Center decorative cross-bar */}
                <rect
                  x="10"
                  y="45"
                  width="22"
                  height="6"
                  rx="2"
                  fill="url(#claspBrassL)"
                  stroke="#7d6b47"
                  strokeWidth="0.8"
                />
                {/* Hinge cylinder & mounting bracket */}
                <rect
                  x="35"
                  y="14"
                  width="11"
                  height="68"
                  rx="4"
                  fill="url(#claspBrassL)"
                  stroke="#82704a"
                  strokeWidth="1.2"
                />
                <path
                  d="M 44 6 L 64 2 L 64 94 L 44 90 Z"
                  fill="url(#claspBrassL)"
                  stroke="#6e5d3b"
                  strokeWidth="1.4"
                />
                {/* Rivets */}
                <circle cx="54" cy="18" r="3" fill="#8f7b53" stroke="#241d11" strokeWidth="1" />
                <circle cx="54" cy="48" r="3.5" fill="#8f7b53" stroke="#241d11" strokeWidth="1" />
                <circle cx="54" cy="78" r="3" fill="#8f7b53" stroke="#241d11" strokeWidth="1" />
              </svg>
            </button>

            {/* =============================================================== */}
            {/* PROTRUDING RIGHT METAL CLASP (Latch on right cover edge)        */}
            {/* =============================================================== */}
            <button
              type="button"
              onClick={() => {
                if (!activeEntity && currentSpreadIndex < ARCHIVE_BOOK_SPREADS.length - 1) {
                  setCurrentSpreadIndex((prev) =>
                    Math.min(ARCHIVE_BOOK_SPREADS.length - 1, prev + 1)
                  );
                }
              }}
              disabled={Boolean(activeEntity) || currentSpreadIndex === ARCHIVE_BOOK_SPREADS.length - 1}
              title={
                currentSpreadIndex < ARCHIVE_BOOK_SPREADS.length - 1
                  ? 'Kitas metraščio lapas (→)'
                  : 'Paskutinis metraščio lapas'
              }
              className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 z-30 items-center group disabled:opacity-75 cursor-pointer disabled:cursor-default focus:outline-none"
            >
              <svg
                width="64"
                height="96"
                viewBox="0 0 64 96"
                className="drop-shadow-[0_8px_14px_rgba(0,0,0,0.95)] transition-transform group-hover:not(:disabled):translate-x-0.5"
              >
                <defs>
                  <linearGradient id="claspMetalR" x1="1" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#57524a" />
                    <stop offset="45%" stopColor="#38342d" />
                    <stop offset="100%" stopColor="#1e1b17" />
                  </linearGradient>
                  <linearGradient id="claspBrassR" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6e5d3b" />
                    <stop offset="50%" stopColor="#4a3e27" />
                    <stop offset="100%" stopColor="#292114" />
                  </linearGradient>
                </defs>
                {/* Mounting plate on right cover */}
                <path
                  d="M 0 2 L 20 6 L 20 90 L 0 94 Z"
                  fill="url(#claspBrassR)"
                  stroke="#6e5d3b"
                  strokeWidth="1.4"
                />
                {/* Hinge cylinder */}
                <rect
                  x="18"
                  y="14"
                  width="11"
                  height="68"
                  rx="4"
                  fill="url(#claspBrassR)"
                  stroke="#82704a"
                  strokeWidth="1.2"
                />
                {/* Extending latch tongue */}
                <path
                  d="M 29 28 L 58 34 C 62 36 62 60 58 62 L 29 68 Z"
                  fill="url(#claspMetalR)"
                  stroke="#696256"
                  strokeWidth="1.5"
                />
                <rect
                  x="32"
                  y="42"
                  width="24"
                  height="12"
                  rx="2"
                  fill="#29241e"
                  stroke="#575046"
                  strokeWidth="1"
                />
                {/* Rivets */}
                <circle cx="10" cy="18" r="3" fill="#8f7b53" stroke="#241d11" strokeWidth="1" />
                <circle cx="10" cy="48" r="3.5" fill="#8f7b53" stroke="#241d11" strokeWidth="1" />
                <circle cx="10" cy="78" r="3" fill="#8f7b53" stroke="#241d11" strokeWidth="1" />
              </svg>
            </button>

            {/* =============================================================== */}
            {/* HEAVY LEATHER & BRASS TOME COVER                                */}
            {/* =============================================================== */}
            <div
              className="relative w-full h-full rounded-[14px] p-3 sm:p-4 md:p-[18px] flex flex-col shadow-[0_30px_90px_rgba(0,0,0,0.98),0_0_40px_rgba(0,0,0,0.9)]"
              style={{
                background:
                  'linear-gradient(180deg, #2b2419 0%, #1d1810 45%, #16120c 100%)',
                border: '3px solid #4d402c',
                boxShadow:
                  'inset 0 2px 4px rgba(255,235,190,0.16), inset 0 -4px 10px rgba(0,0,0,0.85), 0 30px 80px rgba(0,0,0,0.95)',
              }}
            >
              {/* Recessed Tooled Leather Inner Border Groove */}
              <div
                className="pointer-events-none absolute inset-[7px] rounded-[10px] border-2 border-[#120e09]"
                style={{
                  boxShadow:
                    'inset 0 0 0 1px rgba(120,98,64,0.28), 0 0 0 1px rgba(120,98,64,0.22)',
                }}
              />

              {/* Top & Bottom Central Spine Hardware Caps */}
              <div className="pointer-events-none absolute -top-2 left-1/2 -translate-x-1/2 z-30 w-20 sm:w-28 h-5 rounded-t-md bg-gradient-to-b from-[#453a27] via-[#2b2317] to-[#1a150e] border-2 border-[#635338] shadow-lg flex items-center justify-around px-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8c7751]" />
                <span className="w-8 h-1 rounded bg-[#120e09]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#8c7751]" />
              </div>
              <div className="pointer-events-none absolute -bottom-2 left-1/2 -translate-x-1/2 z-20 w-20 sm:w-28 h-5 rounded-b-md bg-gradient-to-t from-[#453a27] via-[#2b2317] to-[#1a150e] border-2 border-[#635338] shadow-lg flex items-center justify-around px-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8c7751]" />
                <span className="w-8 h-1 rounded bg-[#120e09]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#8c7751]" />
              </div>

              {/* FOUR ORNATE BRASS CORNER BOSSES (Matching Reference Tome) */}
              {[
                'top-0 left-0 rotate-0',
                'top-0 right-0 rotate-90',
                'bottom-0 right-0 rotate-180',
                'bottom-0 left-0 -rotate-90',
              ].map((posClass, idx) => (
                <svg
                  key={idx}
                  viewBox="0 0 90 90"
                  className={`pointer-events-none absolute ${posClass} w-14 h-14 sm:w-20 sm:h-20 z-30 drop-shadow-[0_3px_6px_rgba(0,0,0,0.85)]`}
                >
                  <defs>
                    <linearGradient id={`cornerBrass${idx}`} x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#7a6845" />
                      <stop offset="45%" stopColor="#52442c" />
                      <stop offset="100%" stopColor="#2e2517" />
                    </linearGradient>
                  </defs>
                  {/* L-shaped corner plate with triangular diagonal brace */}
                  <path
                    d="M 2 2 L 86 2 L 72 18 L 46 18 L 18 46 L 18 72 L 2 86 Z"
                    fill={`url(#cornerBrass${idx})`}
                    stroke="#8f7a52"
                    strokeWidth="1.5"
                  />
                  {/* Inner recessed filigree triangle */}
                  <polygon
                    points="8,8 52,8 8,52"
                    fill="#261f14"
                    stroke="#756341"
                    strokeWidth="1.2"
                  />
                  {/* Raised circular corner medallion */}
                  <circle
                    cx="22"
                    cy="22"
                    r="11"
                    fill={`url(#cornerBrass${idx})`}
                    stroke="#9c865c"
                    strokeWidth="1.3"
                  />
                  <circle cx="22" cy="22" r="5" fill="#8f7a52" stroke="#241c10" strokeWidth="1" />
                  {/* Corner rivets */}
                  <circle cx="62" cy="10" r="2.8" fill="#9c865c" stroke="#1f180e" strokeWidth="0.9" />
                  <circle cx="10" cy="62" r="2.8" fill="#9c865c" stroke="#1f180e" strokeWidth="0.9" />
                  <circle cx="38" cy="10" r="2.2" fill="#8c764e" />
                  <circle cx="10" cy="38" r="2.2" fill="#8c764e" />
                </svg>
              ))}

              {/* ============================================================= */}
              {/* 3D STACKED PARCHMENT PAGE BLOCK (Inside the Leather Cover)    */}
              {/* ============================================================= */}
              <div
                className="relative flex-1 w-full h-full rounded-[6px] p-[6px] sm:p-[10px] md:p-[14px] flex"
                style={{
                  background:
                    'linear-gradient(90deg, #6e5534 0%, #c9b289 1.2%, #9e8258 2.4%, #e6d8bc 4%, #dfd0b2 96%, #9e8258 97.6%, #c9b289 98.8%, #6e5534 100%)',
                  boxShadow:
                    '0 10px 28px rgba(0,0,0,0.9), inset 0 0 12px rgba(43,26,10,0.65)',
                }}
              >
                {/* Left Stacked Page Striations (3D Page Thickness Effect) */}
                <div
                  className="hidden sm:block pointer-events-none absolute inset-y-2 left-1 w-3 md:w-4 rounded-l z-10"
                  style={{
                    backgroundImage:
                      'repeating-linear-gradient(90deg, #594327 0px, #dfd0b4 1.5px, #8c6e46 3px)',
                    boxShadow: 'inset 0 0 6px rgba(0,0,0,0.6)',
                  }}
                />
                {/* Right Stacked Page Striations (3D Page Thickness Effect) */}
                <div
                  className="hidden sm:block pointer-events-none absolute inset-y-2 right-1 w-3 md:w-4 rounded-r z-10"
                  style={{
                    backgroundImage:
                      'repeating-linear-gradient(90deg, #8c6e46 0px, #dfd0b4 1.5px, #594327 3px)',
                    boxShadow: 'inset 0 0 6px rgba(0,0,0,0.6)',
                  }}
                />
                {/* Bottom Fanned Page Layers Effect (Left & Right Bottom Edges) */}
                <div
                  className="pointer-events-none absolute bottom-0.5 inset-x-3 h-2.5 z-10"
                  style={{
                    backgroundImage:
                      'repeating-linear-gradient(180deg, #6e5432 0px, #dfd0b4 1.2px, #47351e 2.6px)',
                  }}
                />

                {/* =========================================================== */}
                {/* TOP EDGE PARCHMENT INDEX TABS & ROYAL BLUE RIBBON           */}
                {/* (Horizontal labels sticking out upwards from top of book)   */}
                {/* =========================================================== */}
                <div className="absolute -top-7 sm:-top-8 left-16 sm:left-24 z-30 flex items-end gap-1.5 sm:gap-2">
                  {ARCHIVE_BOOK_SPREADS.map((spread, idx) => {
                    const isActive = !activeEntity && idx === currentSpreadIndex;
                    return (
                      <button
                        key={spread.id}
                        type="button"
                        onClick={() => returnToSessionSpread(idx)}
                        title={`Atversti: ${spread.title}`}
                        className={`group relative flex items-end transition-all duration-200 focus:outline-none ${
                          isActive
                            ? '-translate-y-1 sm:-translate-y-1.5 z-10'
                            : 'hover:-translate-y-0.5 opacity-85 hover:opacity-100'
                        }`}
                      >
                        {/* Parchment tab sticking out of the top page edge */}
                        <div
                          className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-t-[5px] border border-b-0 shadow-[0_-3px_8px_rgba(0,0,0,0.6)] flex items-center justify-center gap-1.5 ${
                            isActive
                              ? 'bg-gradient-to-b from-[#f2e6cb] via-[#e5d5b7] to-[#d4be96] border-[#785c38] text-[#2b1a0c] font-bold shadow-[0_-4px_12px_rgba(0,0,0,0.75)]'
                              : 'bg-gradient-to-b from-[#c5b597] via-[#b3a282] to-[#9e8d6e] border-[#5c462a] text-[#3d2914]'
                          }`}
                        >
                          <span className="font-display text-[11px] sm:text-xs font-bold tracking-wider uppercase whitespace-nowrap">
                            {spread.tabLabel}
                          </span>
                          {spread.isBookmarked && (
                            <span
                              title="Paskutinė sesija"
                              className="w-2 h-2 rounded-full bg-[#8c2318] ring-1 ring-amber-300/80 shrink-0"
                            />
                          )}
                        </div>
                      </button>
                    );
                  })}

                  {/* Active Object Page Tab when viewing a referenced object */}
                  {activeEntity && (
                    <div className="-translate-y-1 sm:-translate-y-1.5 z-10 flex items-end">
                      <div className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-t-[5px] border border-b-0 bg-gradient-to-b from-[#e8f0e4] via-[#d7e5cf] to-[#bfd4b5] border-[#246636] text-[#173d21] font-bold shadow-[0_-4px_12px_rgba(0,0,0,0.75)] flex items-center gap-1.5">
                        {getCategoryIcon(activeEntity.category)}
                        <span className="font-display text-[11px] sm:text-xs font-bold tracking-wider uppercase whitespace-nowrap max-w-[160px] sm:max-w-[240px] truncate">
                          {activeEntity.title}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Iconic Royal-Blue Woven Ribbon Bookmark at the Top */}
                  <div
                    title="Metraščio žymė"
                    className="w-5 sm:w-6 h-8 sm:h-9 rounded-t-[3px] bg-gradient-to-b from-[#1b2545] via-[#243566] to-[#172242] border border-b-0 border-[#7d6b42] shadow-[0_-3px_8px_rgba(0,0,0,0.7)] flex items-center justify-center shrink-0"
                  >
                    <div className="w-[1px] h-full bg-[#a88f59]/50" />
                  </div>
                </div>

                {/* =========================================================== */}
                {/* RIGHT EDGE BURGUNDY RIBBON TAB (Closes Book / Quick Action) */}
                {/* (Matches the purple-burgundy ribbon on right of image!)     */}
                {/* =========================================================== */}
                <button
                  type="button"
                  onClick={() => setBookModalOpen(false)}
                  title="Užversti knygą (Esc)"
                  className="absolute -right-2 sm:-right-3.5 top-[20%] z-30 group focus:outline-none"
                >
                  <div className="w-5 sm:w-6 h-16 sm:h-20 rounded-r-[4px] bg-gradient-to-b from-[#6e2246] via-[#541935] to-[#3b1024] border border-l-0 border-[#876b48] shadow-[0_6px_14px_rgba(0,0,0,0.85)] flex flex-col items-center justify-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    <X className="w-3.5 h-3.5 text-[#ebd5b3] opacity-90 group-hover:scale-110 transition-transform" />
                    <span
                      className="font-display text-[9px] text-[#ebd5b3]/90 tracking-widest uppercase font-bold"
                      style={{ writingMode: 'vertical-rl' }}
                    >
                      Užversti
                    </span>
                  </div>
                </button>

                {/* =========================================================== */}
                {/* BOTTOM HANGING RIBBONS (From Reference)                     */}
                {/* =========================================================== */}
                {/* Faded Red Swallowtail Ribbon Bookmark hanging near bottom spine */}
                <div
                  className="pointer-events-none absolute -bottom-4 left-[53%] z-30 w-6 sm:w-7 h-9 sm:h-11 bg-gradient-to-b from-[#5e1f18] via-[#7c2b22] to-[#632019] shadow-[0_6px_12px_rgba(0,0,0,0.85)] rotate-[3deg]"
                  style={{
                    clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 50% 78%, 0% 100%)',
                  }}
                />

                {/* Wide Dark Bronze-Olive Ribbon with Brass Diamond Emblem */}
                <div className="pointer-events-none absolute -bottom-5 left-[60%] z-30 w-9 sm:w-11 h-12 sm:h-14 bg-gradient-to-b from-[#241f15] via-[#362f20] to-[#211c13] border-x-2 border-[#635438] shadow-[0_8px_16px_rgba(0,0,0,0.95)] rotate-[2deg] flex items-end justify-center pb-2">
                  <div className="w-4 h-4 rotate-45 border border-[#8c7853] bg-[#453b27] flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#9e8860]" />
                  </div>
                </div>

                {/* =========================================================== */}
                {/* OPEN TWO-PAGE PARCHMENT SPREAD                              */}
                {/* =========================================================== */}
                <div
                  onScrollCapture={() => setHoveredEntity(null)}
                  className="relative w-full h-full grid grid-cols-1 md:grid-cols-2 rounded-[3px] overflow-hidden bg-[#e6dac2] text-[#281b10] shadow-inner"
                >
                  {/* Deep Realistic Center Spine Crease & Binding Shadow */}
                  <div
                    className="hidden md:block pointer-events-none absolute inset-y-0 left-1/2 -translate-x-1/2 w-16 lg:w-20 z-20"
                    style={{
                      background:
                        'linear-gradient(90deg, rgba(60,38,16,0) 0%, rgba(58,36,14,0.16) 28%, rgba(36,20,6,0.48) 47%, rgba(15,7,2,0.82) 50%, rgba(36,20,6,0.45) 53%, rgba(58,36,14,0.15) 72%, rgba(60,38,16,0) 100%)',
                    }}
                  />

                  {/* ========================================================= */}
                  {/* LEFT PAGE: SESSION STORY OR REFERENCED OBJECT PAGE        */}
                  {/* ========================================================= */}
                  <div
                    className="relative h-full flex flex-col justify-between px-6 sm:px-10 md:px-11 lg:px-14 py-5 sm:py-7 md:py-8 overflow-y-auto"
                    style={{
                      background:
                        'radial-gradient(circle at 52% 46%, #ece2cd 0%, #e2d3b5 62%, #cfb991 100%)',
                      boxShadow:
                        'inset 18px 0 32px -12px rgba(74, 48, 20, 0.42), inset 0 16px 28px -12px rgba(74, 48, 20, 0.35), inset 0 -22px 32px -12px rgba(74, 48, 20, 0.45)',
                    }}
                  >
                    {/* Faint Hand-Drawn Compass Rose / Astrolabe Marginalia Sketch (Like Reference Left Margin!) */}
                    <svg
                      viewBox="0 0 120 120"
                      className="pointer-events-none absolute left-2 top-[29%] w-20 h-20 sm:w-24 sm:h-24 text-[#5c4328] opacity-[0.13]"
                      fill="none"
                      stroke="currentColor"
                    >
                      <circle cx="60" cy="60" r="46" strokeWidth="1" strokeDasharray="3 3" />
                      <circle cx="60" cy="60" r="32" strokeWidth="0.8" />
                      <line x1="60" y1="4" x2="60" y2="116" strokeWidth="1" />
                      <line x1="4" y1="60" x2="116" y2="60" strokeWidth="1" />
                      <line x1="20" y1="20" x2="100" y2="100" strokeWidth="0.7" />
                      <line x1="100" y1="20" x2="20" y2="100" strokeWidth="0.7" />
                      <polygon points="60,14 66,54 60,48 54,54" fill="currentColor" />
                    </svg>

                    {activeEntity ? (
                      /* ======================================================= */
                      /* REFERENCED OBJECT DEDICATED PAGE VIEW                   */
                      /* ======================================================= */
                      <>
                        <div className="relative z-10 flex-1 flex flex-col justify-between">
                          <div className="space-y-3.5 sm:space-y-4">
                            {/* Top Navigation & Object Category Rubric */}
                            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#8c6f48]/45 pb-2">
                              <div className="flex items-center gap-2">
                                <button
                                  type="button"
                                  onClick={goBackFromEntity}
                                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#5c3d1e]/15 hover:bg-[#5c3d1e]/25 border border-[#785c38]/60 text-[#3b220c] font-display text-xs font-bold uppercase tracking-wider transition-colors"
                                >
                                  <ArrowLeft className="w-3.5 h-3.5" />
                                  {entityHistory.length > 1
                                    ? 'Atgal'
                                    : `Į pasakojimą (${currentSpread.tabLabel})`}
                                </button>
                                {entityHistory.length > 1 && (
                                  <button
                                    type="button"
                                    onClick={() => returnToSessionSpread()}
                                    className="px-2 py-1 rounded text-[11px] font-display font-bold uppercase tracking-wider text-[#6e3b1e] hover:underline"
                                  >
                                    {currentSpread.tabLabel}
                                  </button>
                                )}
                              </div>

                              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-sm bg-[#246636]/12 border border-[#246636]/35 text-[#1f5e30] text-[11px] font-display font-bold uppercase tracking-wider">
                                {getCategoryIcon(activeEntity.category)}
                                {activeEntity.categoryLabel}
                              </span>
                            </div>

                            {/* Object Title & Subtitle */}
                            <div className="pt-0.5">
                              <h2 className="font-display text-xl sm:text-2xl lg:text-[26px] font-bold text-[#2b180a] leading-tight">
                                {activeEntity.title}
                              </h2>
                              <p className="font-serif italic text-xs sm:text-sm text-[#6b4f31] mt-0.5">
                                {activeEntity.subtitle}
                              </p>
                            </div>

                            {/* Object Page Narrative Paragraphs (with nested interactive references!) */}
                            <div className="space-y-3 sm:space-y-3.5 text-[#26190e] font-serif text-[15px] sm:text-[16.5px] lg:text-[18px] leading-[1.6] sm:leading-[1.66]">
                              {activeEntity.paragraphs.map((paragraph, index) => (
                                <p
                                  key={index}
                                  className="indent-6 sm:indent-8 text-justify"
                                >
                                  {renderFormattedParagraph(
                                    paragraph,
                                    setHoveredEntity,
                                    openEntityPage
                                  )}
                                </p>
                              ))}
                            </div>

                            {/* Key Facts / Marginalia Box */}
                            {activeEntity.keyFacts && activeEntity.keyFacts.length > 0 && (
                              <div className="mt-3 p-3 sm:p-3.5 rounded bg-[#dfd0b2]/75 border border-[#8c6f48]/50 shadow-inner">
                                <div className="font-display text-[10px] sm:text-[11px] uppercase tracking-[0.14em] text-[#6e3b1e] font-bold mb-1.5">
                                  Metraščio žinios ir pastabos
                                </div>
                                <dl className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs sm:text-[13px]">
                                  {activeEntity.keyFacts.map((fact, idx) => (
                                    <div key={idx} className="border-l-2 border-[#8c6f48]/45 pl-2">
                                      <dt className="font-display text-[10px] uppercase tracking-wider text-[#6b5033] font-bold">
                                        {fact.label}
                                      </dt>
                                      <dd className="font-serif text-[#281b10] font-semibold mt-0.5">
                                        {fact.value}
                                      </dd>
                                    </div>
                                  ))}
                                </dl>
                              </div>
                            )}

                            {/* Related Referenced Entities */}
                            {activeEntity.relatedIds && activeEntity.relatedIds.length > 0 && (
                              <div className="pt-1">
                                <div className="font-display text-[10px] sm:text-[11px] uppercase tracking-[0.14em] text-[#6b5033] font-bold mb-1.5">
                                  Susiję objektai metraštyje:
                                </div>
                                <div className="flex flex-wrap gap-1.5">
                                  {activeEntity.relatedIds.map((relId) => {
                                    const rel = ARCHIVE_ENTITIES[relId];
                                    if (!rel) return null;
                                    return (
                                      <button
                                        key={rel.id}
                                        type="button"
                                        onClick={() => openEntityPage(rel.id)}
                                        onMouseEnter={(e) => {
                                          const rect = e.currentTarget.getBoundingClientRect();
                                          setHoveredEntity({
                                            entity: rel,
                                            anchorRect: {
                                              left: rect.left,
                                              top: rect.top,
                                              bottom: rect.bottom,
                                              width: rect.width,
                                            },
                                          });
                                        }}
                                        onMouseLeave={() => setHoveredEntity(null)}
                                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#e8dcc4] hover:bg-[#d8c7a6] border border-[#8c6f48]/60 text-[#1f5e30] font-serif text-xs sm:text-[13px] font-bold transition-colors cursor-pointer"
                                      >
                                        {getCategoryIcon(rel.category)}
                                        <span className="underline decoration-[#246636]/45 underline-offset-2">
                                          {rel.title}
                                        </span>
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Ornamental Flourish */}
                          <div className="flex items-center justify-center my-3 sm:my-4 select-none opacity-75">
                            <div className="h-[1.5px] flex-1 max-w-[140px] bg-gradient-to-r from-transparent via-[#8f2d1e] to-[#7a2013]" />
                            <div className="mx-2.5 flex items-center gap-1 text-[#7a2013]">
                              <span className="w-1.5 h-1.5 rotate-45 bg-[#7a2013]" />
                              <span className="text-xs leading-none">❖</span>
                              <span className="w-1.5 h-1.5 rotate-45 bg-[#7a2013]" />
                            </div>
                            <div className="h-[1.5px] flex-1 max-w-[140px] bg-gradient-to-l from-transparent via-[#8f2d1e] to-[#7a2013]" />
                          </div>
                        </div>

                        {/* Object Page Footer */}
                        <div className="relative z-10 pt-2.5 border-t border-[#8c6f48]/30 flex items-center justify-between text-xs text-[#63482b] font-display">
                          <button
                            type="button"
                            onClick={goBackFromEntity}
                            className="flex items-center gap-1 font-bold hover:text-[#2b1a0c] transition-colors"
                          >
                            <ChevronLeft className="w-3.5 h-3.5" />
                            Grįžti atgal
                          </button>

                          <span className="tracking-wider uppercase text-[11px]">
                            Metraščio žinynas • {activeEntity.romanPlate || 'Ž·I'}
                          </span>

                          <button
                            type="button"
                            onClick={() => returnToSessionSpread()}
                            className="flex items-center gap-1 font-bold hover:text-[#2b1a0c] transition-colors"
                          >
                            Į {currentSpread.tabLabel}
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </>
                    ) : (
                      /* ======================================================= */
                      /* SESSION CHRONICLE STORY VIEW                            */
                      /* ======================================================= */
                      <>
                        {/* Top Story Section */}
                        <div className="relative z-10 flex-1 flex flex-col justify-between">
                          <div className="space-y-3.5 sm:space-y-4">
                            {/* Subtle Chapter / Session Rubric Header */}
                            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#8c6f48]/40 pb-1.5">
                              <div className="flex items-center gap-2">
                                <span className="font-display text-[11px] sm:text-xs uppercase tracking-[0.16em] text-[#6e3b1e] font-bold">
                                  {currentSpread.title}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                {currentSpread.isBookmarked && (
                                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-sm bg-[#7c2318]/15 border border-[#7c2318]/40 text-[#731c12] text-[10px] font-display font-bold uppercase tracking-wider">
                                    <Bookmark className="w-2.5 h-2.5 fill-[#731c12]" />
                                    Paskutinė sesija
                                  </span>
                                )}
                                <span className="font-serif italic text-xs text-[#6b5033]">
                                  {currentSpread.dateLabel}
                                </span>
                              </div>
                            </div>

                            {/* Narrative Paragraphs (Indented like classic Pathfinder Storybook) */}
                            <div className="space-y-3 sm:space-y-4 text-[#26190e] font-serif text-[15px] sm:text-[17px] lg:text-[18.5px] xl:text-[19.5px] leading-[1.6] sm:leading-[1.68] tracking-[0.005em]">
                              {currentSpread.storyParagraphs.map((paragraph, index) => (
                                <p
                                  key={index}
                                  className="indent-6 sm:indent-8 text-justify"
                                >
                                  {renderFormattedParagraph(
                                    paragraph,
                                    setHoveredEntity,
                                    openEntityPage
                                  )}
                                </p>
                              ))}
                            </div>
                          </div>

                          {/* Iconic Pathfinder Red Ornamental Horizontal Rule with Diamond Flourish at end of chronicle */}
                          <div className="flex items-center justify-center my-4 sm:my-6 select-none opacity-75">
                            <div className="h-[1.5px] flex-1 max-w-[140px] bg-gradient-to-r from-transparent via-[#8f2d1e] to-[#7a2013]" />
                            <div className="mx-2.5 flex items-center gap-1 text-[#7a2013]">
                              <span className="w-1.5 h-1.5 rotate-45 bg-[#7a2013]" />
                              <span className="text-xs leading-none">❖</span>
                              <span className="w-1.5 h-1.5 rotate-45 bg-[#7a2013]" />
                            </div>
                            <div className="h-[1.5px] flex-1 max-w-[140px] bg-gradient-to-l from-transparent via-[#8f2d1e] to-[#7a2013]" />
                          </div>
                        </div>

                        {/* Subtle Bottom Page Turn Footer */}
                        <div className="relative z-10 pt-2.5 border-t border-[#8c6f48]/30 flex items-center justify-between text-xs text-[#63482b] font-display">
                          <button
                            type="button"
                            onClick={() => {
                              setCurrentSpreadIndex((prev) => Math.max(0, prev - 1));
                            }}
                            disabled={currentSpreadIndex === 0}
                            className="flex items-center gap-1 font-bold hover:text-[#2b1a0c] disabled:opacity-35 disabled:pointer-events-none transition-colors"
                          >
                            <ChevronLeft className="w-3.5 h-3.5" />
                            Ankstesnis lapas
                          </button>

                          <span className="tracking-wider">
                            Psl. {currentSpreadIndex * 2 + 1} • ({currentSpreadIndex + 1} /{' '}
                            {ARCHIVE_BOOK_SPREADS.length})
                          </span>

                          <button
                            type="button"
                            onClick={() => {
                              setCurrentSpreadIndex((prev) =>
                                Math.min(ARCHIVE_BOOK_SPREADS.length - 1, prev + 1)
                              );
                            }}
                            disabled={
                              currentSpreadIndex === ARCHIVE_BOOK_SPREADS.length - 1
                            }
                            className="flex items-center gap-1 font-bold hover:text-[#2b1a0c] disabled:opacity-35 disabled:pointer-events-none transition-colors"
                          >
                            Kitas lapas
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </>
                    )}
                  </div>

                  {/* ========================================================= */}
                  {/* RIGHT PAGE: FULL-BLEED FRAMED SEPIA ETCHING ILLUSTRATION  */}
                  {/* ========================================================= */}
                  <div
                    className="relative h-full flex flex-col justify-between p-5 sm:p-8 md:p-9 lg:p-11 overflow-hidden"
                    style={{
                      background:
                        'radial-gradient(circle at 48% 48%, #ece2cd 0%, #e0d1b2 64%, #cbb489 100%)',
                      boxShadow:
                        'inset -18px 0 32px -12px rgba(74, 48, 20, 0.42), inset 0 16px 28px -12px rgba(74, 48, 20, 0.35), inset 0 -22px 32px -12px rgba(74, 48, 20, 0.45)',
                    }}
                  >
                    {/* Outer Double-Ruled Sepia Illustration Frame */}
                    <div className="relative w-full h-full border-[2px] border-[#876b46] p-[5px] sm:p-[7px] shadow-[inset_0_0_18px_rgba(74,48,20,0.28)] flex flex-col">
                      {/* Decorative Corner Cross-Ticks (Like Reference Frame Corners) */}
                      <span className="pointer-events-none absolute -top-1.5 -left-1.5 w-3.5 h-3.5 border-t-2 border-l-2 border-[#6e5332]" />
                      <span className="pointer-events-none absolute -top-1.5 -right-1.5 w-3.5 h-3.5 border-t-2 border-r-2 border-[#6e5332]" />
                      <span className="pointer-events-none absolute -bottom-1.5 -left-1.5 w-3.5 h-3.5 border-b-2 border-l-2 border-[#6e5332]" />
                      <span className="pointer-events-none absolute -bottom-1.5 -right-1.5 w-3.5 h-3.5 border-b-2 border-r-2 border-[#6e5332]" />

                      {/* Inner Sepia Etching Canvas */}
                      <div
                        onClick={() => setShowIllustrationInfo((prev) => !prev)}
                        title="Paspauskite iliustracijos pastabai peržiūrėti"
                        className="relative w-full h-full border border-[#9c815b] overflow-hidden cursor-pointer group"
                      >
                        <SepiaEtchingIllustration
                          spread={
                            activeEntity
                              ? {
                                  illustrationUrl: activeEntity.illustrationUrl,
                                  illustrationTitle: activeEntity.illustrationTitle,
                                  illustrationScene: activeEntity.illustrationScene,
                                }
                              : currentSpread
                          }
                        />

                        {/* Aged Sepia Vignette over the Etching */}
                        <div
                          className="pointer-events-none absolute inset-0"
                          style={{
                            boxShadow:
                              'inset 0 0 36px rgba(92, 62, 30, 0.45), inset 0 0 8px rgba(74, 46, 20, 0.4)',
                          }}
                        />

                        {/* Subtle Caption Overlay (Shown on hover or click) */}
                        <div
                          className={`absolute inset-x-3 bottom-3 z-20 p-3 rounded bg-[#efe4cc]/95 border border-[#7d603a] text-[#2b1c0e] shadow-md transition-opacity duration-200 ${
                            showIllustrationInfo
                              ? 'opacity-100'
                              : 'opacity-0 group-hover:opacity-95'
                          }`}
                        >
                          <div className="font-display text-xs sm:text-sm font-bold text-[#3b220c]">
                            {activeEntity
                              ? activeEntity.illustrationTitle
                              : currentSpread.illustrationTitle}
                          </div>
                          <p className="text-xs text-[#4a2e14] mt-0.5">
                            {activeEntity
                              ? activeEntity.illustrationCaption
                              : currentSpread.illustrationCaption}
                          </p>
                          {!activeEntity && (
                            <p className="text-[11px] text-[#6e4e2c] italic mt-1">
                              {currentSpread.illustrationPlaceholderNote}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* ===================================================== */}
                      {/* ICONIC BOTTOM-RIGHT ROMAN NUMERAL PLATE STAMP ("XC")  */}
                      {/* (Exact match to bottom-right of illustration frame!)  */}
                      {/* ===================================================== */}
                      <div className="pointer-events-none absolute -bottom-2.5 -right-2.5 z-30 p-1.5">
                        {/* Golden-brown aged patina smudge around the plate */}
                        <div
                          className="absolute -inset-2 rounded-full opacity-75 blur-[3px]"
                          style={{
                            background:
                              'radial-gradient(circle, rgba(166,126,62,0.75) 0%, transparent 72%)',
                          }}
                        />
                        <div className="relative px-2 py-0.5 bg-[#e6d6b5] border-2 border-[#7a5d36] shadow-[0_2px_6px_rgba(43,26,10,0.45)]">
                          <span className="font-display text-[11px] sm:text-xs font-bold tracking-tight text-[#4a3219]">
                            {activeEntity
                              ? activeEntity.romanPlate || 'Ž·I'
                              : currentSpread.romanPlate || `P·${currentSpreadIndex + 1}`}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* =============================================================== */}
            {/* HOVER POPOVER: FIRST FEW SENTENCES FROM OBJECT'S PAGE           */}
            {/* =============================================================== */}
            {hoveredEntity && (
              <div
                className="pointer-events-none fixed z-[60] w-[320px] sm:w-[380px] rounded-md bg-gradient-to-b from-[#f5ebd6] via-[#eadbc0] to-[#dcc6a0] border-2 border-[#6e5230] p-3.5 text-[#26190e] shadow-[0_14px_34px_rgba(0,0,0,0.85),0_0_0_1px_rgba(255,240,200,0.4)_inset]"
                style={{
                  left: Math.min(
                    Math.max(16, hoveredEntity.anchorRect.left + hoveredEntity.anchorRect.width / 2 - 180),
                    typeof window !== 'undefined' ? window.innerWidth - 396 : 800
                  ),
                  top:
                    hoveredEntity.anchorRect.top > 220
                      ? hoveredEntity.anchorRect.top - 10
                      : hoveredEntity.anchorRect.bottom + 10,
                  transform:
                    hoveredEntity.anchorRect.top > 220
                      ? 'translateY(-100%)'
                      : 'translateY(0)',
                }}
              >
                <div className="flex items-center justify-between gap-2 border-b border-[#8c6f48]/45 pb-1.5 mb-2">
                  <div className="flex items-center gap-1.5 min-w-0">
                    {getCategoryIcon(hoveredEntity.entity.category)}
                    <span className="font-display text-sm font-bold text-[#2b180a] truncate">
                      {hoveredEntity.entity.title}
                    </span>
                  </div>
                  <span className="font-display text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#5c3d1e]/15 text-[#5c3d1e] font-bold shrink-0">
                    {hoveredEntity.entity.categoryLabel.split('•')[0].trim()}
                  </span>
                </div>

                <p className="font-serif text-xs sm:text-[13.5px] leading-relaxed text-[#2e1f12] line-clamp-4">
                  {getEntityPreviewSentences(hoveredEntity.entity, 2)}
                </p>

                <div className="mt-2 pt-1.5 border-t border-[#8c6f48]/30 flex items-center justify-between text-[11px] font-display font-bold text-[#1f5e30]">
                  <span>Paspauskite — atsidarys objekto puslapis</span>
                  <span>→</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* MODAL 2: LDK XV a. WALL MAP AT FULL SIZE                              */}
      {/* ===================================================================== */}
      {mapModalOpen && currentMap && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#050404]/95 p-3 sm:p-5"
          onClick={() => setMapModalOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={currentMap.title}
        >
          <div className="pointer-events-none absolute top-4 left-4 z-10 max-w-[70%] px-4 py-2.5 rounded-xl bg-stone-950/85 border border-amber-700/60 backdrop-blur-md shadow-lg">
            <h2 className="font-display text-base md:text-lg font-bold text-amber-200 leading-tight">
              {currentMap.title}
            </h2>
            <p className="text-xs text-amber-400/80">{currentMap.regionSubtitle}</p>
          </div>

          <button
            type="button"
            onClick={() => setMapModalOpen(false)}
            aria-label="Uždaryti žemėlapį"
            className="absolute top-4 right-4 z-10 flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-stone-900/90 hover:bg-stone-800 border border-amber-700/50 text-amber-200 text-xs font-display tracking-wider uppercase shadow-md"
          >
            <X className="w-3.5 h-3.5" />
            Uždaryti
          </button>

          <img
            src={currentMap.imageUrl}
            alt={currentMap.title}
            className="max-w-full max-h-full w-auto h-auto object-contain shadow-[0_0_40px_rgba(0,0,0,0.65)]"
            draggable={false}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* ===================================================================== */}
      {/* MODAL 3: TROPHY ROOM IN PROTOTYPE I SHIELD DESIGN                     */}
      {/* ===================================================================== */}
      {inTrophyRoom && (
        <ShieldDialogFrame
          titlePlaque="Trofėjų ir Prisiminimų Menė"
          subtitlePlaque="Sesijų Muziejus"
          onClose={() => setInTrophyRoom(false)}
          position="center"
          maxWidthClass="max-w-4xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Left: Trophy Chevron Options */}
            <div className="md:col-span-5 space-y-1.5 border-b md:border-b-0 md:border-r border-stone-700/80 pb-4 md:pb-0 md:pr-4">
              <div className="text-xs font-display uppercase tracking-widest text-amber-400 font-bold mb-2">
                Eksponatai lentynoje:
              </div>
              {ARCHIVE_TROPHIES.map((trophy) => (
                <ShieldOption
                  key={trophy.id}
                  size="md"
                  label={trophy.name}
                  rightBadge={trophy.sessionLabel}
                  active={selectedTrophy?.id === trophy.id}
                  onClick={() => setSelectedTrophy(trophy)}
                />
              ))}

              <div className="pt-3 border-t border-stone-800">
                <ShieldOption
                  size="md"
                  label="Grįžti į pagrindinį Archyvą"
                  onClick={() => setInTrophyRoom(false)}
                  muted
                />
              </div>
            </div>

            {/* Right: Selected Trophy Story & Quirk */}
            <div className="md:col-span-7 space-y-3.5">
              {selectedTrophy && (
                <>
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-700 pb-2">
                    <div>
                      <h3 className="font-display text-xl font-bold text-[#fef08a]">
                        {selectedTrophy.name}
                      </h3>
                      <p className="text-xs text-stone-400">
                        Vieta: {selectedTrophy.shelfSlot} • {selectedTrophy.category}
                      </p>
                    </div>
                    <span className="px-3 py-0.5 rounded bg-amber-950 border border-amber-400 text-[#fef08a] font-display text-xs font-bold">
                      {selectedTrophy.sessionLabel}
                    </span>
                  </div>

                  <p className="text-amber-200 italic text-base">
                    {selectedTrophy.shortNote}
                  </p>

                  <div className="p-3.5 rounded bg-black/40 border border-stone-700/80 space-y-1">
                    <div className="text-xs font-display uppercase text-amber-400 font-bold">
                      Sesijos prisiminimas / Istorija:
                    </div>
                    <p className="text-sm md:text-base text-stone-200 leading-relaxed">
                      {selectedTrophy.fullStoryPlaceholder}
                    </p>
                  </div>

                  <div className="p-3 rounded bg-black/40 border border-stone-700/80 space-y-1">
                    <div className="text-xs font-display uppercase text-amber-400 font-bold">
                      Keista savybė:
                    </div>
                    <p className="text-sm text-[#fef08a] italic">
                      „{selectedTrophy.quirkNote}“
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </ShieldDialogFrame>
      )}

      {/* Bottom middle 3/7ths Exit Zone — only appears when all menus/dialogs are closed */}
      <ExitZone
        onExit={onExit}
        disabled={Boolean(
          isGlobalMenuOpen || bookModalOpen || mapModalOpen || inTrophyRoom
        )}
      />
    </div>
  );
};
