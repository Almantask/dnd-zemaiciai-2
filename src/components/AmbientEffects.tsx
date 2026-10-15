import React from 'react';
import { PlaceId } from '../types';

interface AmbientEffectsProps {
  scene: PlaceId;
}

/**
 * Subtle atmospheric animations for each scene:
 * - Town: chimney smoke (smithy + magic shop), forge & lantern glow, flying birds, stream shimmer
 * - Tavern: stove fire & chandelier candle flicker, mage orb glow, rising steam from food/ale
 * - Archive: sunbeams with floating dust motes, warm hanging lantern glow, trophy room doorway shimmer
 */
export const AmbientEffects: React.FC<AmbientEffectsProps> = ({ scene }) => {
  if (scene === 'town') {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden z-10">
        {/* Smithy chimney smoke (left-center roof) */}
        {[0, 1, 2, 3].map((i) => (
          <div
            key={`smithy-smoke-${i}`}
            className="absolute rounded-full bg-stone-300/35 blur-xl animate-smoke"
            style={{
              left: '31%',
              top: '18%',
              width: `${34 + i * 10}px`,
              height: `${34 + i * 10}px`,
              animationDelay: `${i * 1.3}s`,
            }}
          />
        ))}

        {/* Magic shop crooked chimney purple-tinted smoke */}
        {[0, 1, 2].map((i) => (
          <div
            key={`magic-smoke-${i}`}
            className="absolute rounded-full bg-purple-300/30 blur-xl animate-smoke"
            style={{
              left: '73%',
              top: '14%',
              width: `${28 + i * 8}px`,
              height: `${28 + i * 8}px`,
              animationDelay: `${i * 1.7 + 0.5}s`,
            }}
          />
        ))}

        {/* Smithy forge fire flicker */}
        <div
          className="absolute rounded-full bg-orange-500/45 blur-xl animate-flicker"
          style={{
            left: '32%',
            top: '40%',
            width: '70px',
            height: '55px',
          }}
        />

        {/* Magic shop purple lanterns glow */}
        <div
          className="absolute rounded-full bg-fuchsia-500/35 blur-xl animate-flicker"
          style={{
            left: '70%',
            top: '46%',
            width: '65px',
            height: '65px',
            animationDelay: '1.1s',
          }}
        />

        {/* Tavern warm windows glow */}
        <div
          className="absolute rounded-full bg-amber-400/30 blur-xl animate-flicker"
          style={{
            left: '24%',
            top: '76%',
            width: '90px',
            height: '60px',
            animationDelay: '0.6s',
          }}
        />

        {/* Archive cave warm lantern glow */}
        <div
          className="absolute rounded-full bg-amber-500/35 blur-xl animate-flicker"
          style={{
            left: '87%',
            top: '68%',
            width: '75px',
            height: '80px',
            animationDelay: '1.8s',
          }}
        />

        {/* Distant stream / horizon shimmer */}
        <div
          className="absolute rounded-full bg-amber-200/25 blur-md animate-water"
          style={{
            left: '37%',
            top: '11%',
            width: '90px',
            height: '24px',
          }}
        />

        {/* Flying birds across the sky */}
        <div
          className="absolute top-[7%] left-0 animate-bird"
          style={{ animationDelay: '0s' }}
        >
          <svg
            width="28"
            height="14"
            viewBox="0 0 28 14"
            className="text-stone-800/70 animate-wing"
          >
            <path
              d="M2 10 Q8 2 14 8 Q20 2 26 10"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <div
          className="absolute top-[10%] left-0 animate-bird"
          style={{ animationDelay: '4.5s', animationDuration: '26s' }}
        >
          <svg
            width="20"
            height="10"
            viewBox="0 0 28 14"
            className="text-stone-800/60 animate-wing"
          >
            <path
              d="M2 10 Q8 2 14 8 Q20 2 26 10"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
    );
  }

  if (scene === 'tavern') {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden z-10">
        {/* White stove fire glow */}
        <div
          className="absolute rounded-full bg-orange-500/40 blur-2xl animate-flicker"
          style={{
            left: '32%',
            top: '42%',
            width: '110px',
            height: '95px',
          }}
        />

        {/* Chandelier candles glow */}
        <div
          className="absolute rounded-full bg-amber-300/35 blur-2xl animate-flicker"
          style={{
            left: '68%',
            top: '20%',
            width: '140px',
            height: '90px',
            animationDelay: '0.8s',
          }}
        />

        {/* Fortune teller candle bottom right */}
        <div
          className="absolute rounded-full bg-amber-400/40 blur-xl animate-flicker"
          style={{
            left: '93%',
            top: '83%',
            width: '60px',
            height: '60px',
            animationDelay: '1.4s',
          }}
        />

        {/* Ranger/Mage glowing orb on table */}
        <div
          className="absolute rounded-full bg-cyan-400/35 blur-lg animate-flicker"
          style={{
            left: '61%',
            top: '49%',
            width: '40px',
            height: '40px',
            animationDelay: '0.4s',
          }}
        />

        {/* Steam rising from food & poured ale on counter */}
        {[0, 1, 2].map((i) => (
          <div
            key={`tavern-steam-${i}`}
            className="absolute rounded-full bg-amber-100/20 blur-lg animate-smoke"
            style={{
              left: `${25 + i * 4}%`,
              top: '62%',
              width: '32px',
              height: '32px',
              animationDelay: `${i * 1.6}s`,
            }}
          />
        ))}
      </div>
    );
  }

  if (scene === 'archive') {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden z-10">
        {/* Sunbeams streaming through window onto the chronicle book */}
        <div
          className="absolute bg-gradient-to-br from-amber-200/25 via-amber-100/10 to-transparent blur-xl animate-flicker"
          style={{
            left: '44%',
            top: '28%',
            width: '220px',
            height: '320px',
            transform: 'rotate(24deg)',
            animationDuration: '5s',
          }}
        />

        {/* Hanging lanterns on the left map table */}
        <div
          className="absolute rounded-full bg-amber-400/40 blur-xl animate-flicker"
          style={{
            left: '26%',
            top: '38%',
            width: '65px',
            height: '65px',
          }}
        />
        <div
          className="absolute rounded-full bg-amber-400/40 blur-xl animate-flicker"
          style={{
            left: '4%',
            top: '60%',
            width: '65px',
            height: '65px',
            animationDelay: '1.2s',
          }}
        />

        {/* Warm light in the trophy room doorway on the right */}
        <div
          className="absolute rounded-full bg-amber-300/25 blur-2xl animate-flicker"
          style={{
            left: '81%',
            top: '42%',
            width: '130px',
            height: '200px',
            animationDelay: '0.7s',
          }}
        />

        {/* Floating dust motes in the sunbeam */}
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={`dust-${i}`}
            className="absolute w-1.5 h-1.5 rounded-full bg-amber-200/80 shadow-[0_0_6px_rgba(253,230,138,0.9)] animate-dust"
            style={{
              left: `${46 + (i * 3) % 16}%`,
              top: `${36 + (i * 5) % 28}%`,
              animationDelay: `${i * 0.85}s`,
            }}
          />
        ))}
      </div>
    );
  }

  return null;
};
