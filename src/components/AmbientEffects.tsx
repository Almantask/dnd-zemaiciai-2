import React, { useLayoutEffect, useRef, useState } from 'react';
import { PlaceId } from '../types';

interface AmbientEffectsProps {
  scene: PlaceId;
}

/** Source illustrations are 1024×571 and drawn with object-cover. */
const IMAGE_ASPECT = 1024 / 571;

type CoverBox = { left: number; top: number; width: number; height: number };

const EMPTY_BOX: CoverBox = { left: 0, top: 0, width: 0, height: 0 };

/**
 * Map a point on the source illustration (percentages) into the on-screen
 * object-cover rectangle so glows stay on the painted feature at any window size.
 */
export function useCoverBox() {
  const ref = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState<CoverBox>(EMPTY_BOX);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => {
      const cw = el.clientWidth;
      const ch = el.clientHeight;
      if (!cw || !ch) return;

      if (cw / ch > IMAGE_ASPECT) {
        const height = cw / IMAGE_ASPECT;
        setBox({ left: 0, top: (ch - height) / 2, width: cw, height });
      } else {
        const width = ch * IMAGE_ASPECT;
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

function point(box: CoverBox, x: number, y: number) {
  return {
    left: box.left + (x / 100) * box.width,
    top: box.top + (y / 100) * box.height,
  };
}

/** Circular glow. `diameter` is a percentage of the illustration width. */
const Spot: React.FC<{
  box: CoverBox;
  x: number;
  y: number;
  diameter: number;
  className: string;
  delay?: string;
  duration?: string;
}> = ({ box, x, y, diameter, className, delay, duration }) => {
  const size = (diameter / 100) * box.width;
  const origin = point(box, x, y);
  return (
    <div
      className="absolute"
      style={{
        left: origin.left,
        top: origin.top,
        width: size,
        height: size,
        transform: 'translate(-50%, -50%)',
      }}
    >
      <div
        className={`absolute inset-0 ${className}`}
        style={{ animationDelay: delay, animationDuration: duration }}
      />
    </div>
  );
};

/** Oval or beam. `w` / `h` are percentages of the illustration width and height. */
const Patch: React.FC<{
  box: CoverBox;
  x: number;
  y: number;
  w: number;
  h: number;
  className: string;
  delay?: string;
  duration?: string;
  rotate?: number;
}> = ({ box, x, y, w, h, className, delay, duration, rotate = 0 }) => {
  const origin = point(box, x, y);
  return (
    <div
      className="absolute"
      style={{
        left: origin.left,
        top: origin.top,
        width: (w / 100) * box.width,
        height: (h / 100) * box.height,
        transform: `translate(-50%, -50%) rotate(${rotate}deg)`,
      }}
    >
      <div
        className={`absolute inset-0 ${className}`}
        style={{ animationDelay: delay, animationDuration: duration }}
      />
    </div>
  );
};

const Puffs: React.FC<{
  box: CoverBox;
  x: number;
  y: number;
  count: number;
  className: string;
  rise: number;
  drift: number;
  stagger?: number;
  duration?: string;
  blurClass?: string;
  animationClass?: string;
}> = ({
  box,
  x,
  y,
  count,
  className,
  rise,
  drift,
  stagger = 1.35,
  duration = '5.5s',
  blurClass = 'blur-xl',
  animationClass = 'animate-smoke',
}) => {
  const origin = point(box, x, y);
  return (
    <>
      {Array.from({ length: count }, (_, i) => {
        const diameter = 2.4 + i * 0.7;
        const size = (diameter / 100) * box.width;
        return (
          <div
            key={i}
            className="absolute"
            style={{
              left: origin.left,
              top: origin.top,
              width: size,
              height: size,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div
              className={`absolute inset-0 rounded-full ${animationClass} ${blurClass} ${className}`}
              style={
                {
                  animationDelay: `${i * stagger}s`,
                  animationDuration: duration,
                  '--smoke-rise': `${-rise * box.height}px`,
                  '--smoke-drift': `${(drift + i * 0.004) * box.width}px`,
                } as React.CSSProperties
              }
            />
          </div>
        );
      })}
    </>
  );
};

/**
 * Atmospheric animation locked to painted features in each illustration.
 * Coordinates are percentages of the source image, not the browser window.
 */
export const AmbientEffects: React.FC<AmbientEffectsProps> = ({ scene }) => {
  const { ref, box } = useCoverBox();
  const ready = box.width > 0;

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0 overflow-hidden z-10">
      {ready && scene === 'town' && <TownAtmosphere box={box} />}
      {ready && scene === 'tavern' && <TavernAtmosphere box={box} />}
      {ready && scene === 'archive' && <ArchiveAtmosphere box={box} />}
    </div>
  );
};

const TownAtmosphere: React.FC<{ box: CoverBox }> = ({ box }) => (
  <>
    {/* Smoke leaves the smithy chimney mouth, just left of the roof ridge */}
    <Puffs
      box={box}
      x={29.3}
      y={23.2}
      count={4}
      rise={0.15}
      drift={0.018}
      className="bg-stone-300/40"
    />

    {/* Smoke rises from the sacred fire in the stone circle */}
    <Puffs
      box={box}
      x={74.2}
      y={16.2}
      count={3}
      rise={0.1}
      drift={0.008}
      stagger={1.7}
      className="bg-stone-200/40"
    />
    <Spot
      box={box}
      x={74.3}
      y={19.5}
      diameter={2.2}
      className="rounded-full bg-orange-400/75 blur-md animate-flicker"
    />

    {/* Forge mouth */}
    <Patch
      box={box}
      x={35.3}
      y={46.6}
      w={5.4}
      h={8.2}
      className="rounded-full bg-orange-500/50 blur-xl animate-flicker"
    />

    {/* Hanging lanterns under the magic-shop eaves */}
    <Spot
      box={box}
      x={69}
      y={55.2}
      diameter={2.2}
      className="rounded-full bg-sky-300/40 blur-md animate-flicker"
      delay="0.4s"
    />
    <Spot
      box={box}
      x={72.2}
      y={54.5}
      diameter={2.3}
      className="rounded-full bg-fuchsia-400/50 blur-md animate-flicker"
      delay="1.1s"
    />
    <Spot
      box={box}
      x={74.6}
      y={54.2}
      diameter={2.6}
      className="rounded-full bg-fuchsia-500/55 blur-md animate-flicker"
      delay="1.8s"
    />

    {/* Tavern window panes, not the wall between them */}
    <Patch
      box={box}
      x={21.5}
      y={72.2}
      w={3}
      h={4.2}
      className="rounded-md bg-amber-300/45 blur-md animate-flicker"
      delay="0.3s"
    />
    <Patch
      box={box}
      x={18.8}
      y={84.6}
      w={3.4}
      h={5.6}
      className="rounded-md bg-amber-400/40 blur-md animate-flicker"
      delay="0.9s"
    />
    <Patch
      box={box}
      x={28.6}
      y={85.6}
      w={4.6}
      h={5.8}
      className="rounded-md bg-amber-400/40 blur-md animate-flicker"
      delay="1.5s"
    />

    {/* Lantern just inside the archive cave mouth, plus the warm interior */}
    <Spot
      box={box}
      x={91}
      y={72.4}
      diameter={2.6}
      className="rounded-full bg-amber-300/70 blur-md animate-flicker"
      delay="0.5s"
    />
    <Patch
      box={box}
      x={91.4}
      y={78.5}
      w={4.2}
      h={13}
      className="rounded-b-full bg-amber-500/25 blur-xl animate-flicker"
      delay="1.4s"
      duration="4.2s"
    />

    {/* Sun glint on the distant valley water */}
    <Patch
      box={box}
      x={41.8}
      y={16.8}
      w={6.5}
      h={2.6}
      className="rounded-full bg-amber-100/35 blur-sm animate-water"
    />

    {/* Expressive solo birds & flocks soaring over the valley */}
    <BirdSkyLayer />
  </>
);

interface FlockMemberConfig {
  dx: number;
  dy: number;
  scale: number;
  flapDuration: string;
  flapDelay: string;
  driftDelay: string;
}

const PRIMARY_FLOCK_MEMBERS: FlockMemberConfig[] = [
  // Lead bird at the tip of the wedge
  { dx: 0, dy: 0, scale: 1.05, flapDuration: '0.62s', flapDelay: '0s', driftDelay: '0s' },
  // Upper wing of the formation
  { dx: -26, dy: -14, scale: 0.96, flapDuration: '0.58s', flapDelay: '-0.18s', driftDelay: '-0.5s' },
  { dx: -54, dy: -26, scale: 0.9, flapDuration: '0.66s', flapDelay: '-0.35s', driftDelay: '-1.1s' },
  { dx: -82, dy: -36, scale: 0.84, flapDuration: '0.6s', flapDelay: '-0.08s', driftDelay: '-1.8s' },
  { dx: -112, dy: -43, scale: 0.78, flapDuration: '0.64s', flapDelay: '-0.42s', driftDelay: '-2.4s' },
  // Lower wing of the formation
  { dx: -24, dy: 15, scale: 0.94, flapDuration: '0.64s', flapDelay: '-0.27s', driftDelay: '-0.8s' },
  { dx: -50, dy: 28, scale: 0.88, flapDuration: '0.59s', flapDelay: '-0.48s', driftDelay: '-1.5s' },
  { dx: -78, dy: 39, scale: 0.82, flapDuration: '0.68s', flapDelay: '-0.14s', driftDelay: '-2.2s' },
  // Inner straggler inside the wedge
  { dx: -62, dy: 3, scale: 0.86, flapDuration: '0.61s', flapDelay: '-0.31s', driftDelay: '-1.3s' },
];

const SECONDARY_FLOCK_MEMBERS: FlockMemberConfig[] = [
  { dx: 0, dy: 0, scale: 0.88, flapDuration: '0.64s', flapDelay: '-0.1s', driftDelay: '0s' },
  { dx: -22, dy: -12, scale: 0.82, flapDuration: '0.59s', flapDelay: '-0.3s', driftDelay: '-0.7s' },
  { dx: -46, dy: -22, scale: 0.76, flapDuration: '0.67s', flapDelay: '-0.45s', driftDelay: '-1.4s' },
  { dx: -20, dy: 13, scale: 0.8, flapDuration: '0.62s', flapDelay: '-0.22s', driftDelay: '-0.9s' },
  { dx: -44, dy: 24, scale: 0.74, flapDuration: '0.65s', flapDelay: '-0.52s', driftDelay: '-1.9s' },
  { dx: -68, dy: 8, scale: 0.72, flapDuration: '0.6s', flapDelay: '-0.15s', driftDelay: '-2.5s' },
];

/**
 * Expressive bird silhouette with solid head, beak, chest, fanned tail, and
 * dual 3D-layered wings that morph smoothly through upstroke, glide, and downstroke
 * without ever collapsing to zero height (no flickering).
 */
const SoaringBird: React.FC<{
  width?: number;
  height?: number;
  flapDuration?: string;
  flapDelay?: string;
  detailed?: boolean;
}> = ({
  width = 56,
  height = 38,
  flapDuration = '0.68s',
  flapDelay = '0s',
  detailed = false,
}) => {
  // Far wing (slightly ahead & darker umber for 3D perspective)
  const farWingFrames = [
    'M 29 20.5 C 28 11, 26 4, 21 1.5 C 30 5, 36 11, 42 20 Z',
    'M 29 20.5 C 29 14, 28 9, 24 6.5 C 32 9, 37 14, 42 20 Z',
    'M 29 21.5 C 29 28, 27 33, 23 36.5 C 31 32, 37 26, 42 21 Z',
    'M 29 20.5 C 30 15, 29 11, 25 8.5 C 33 11, 37 15, 42 20 Z',
    'M 29 20.5 C 28 11, 26 4, 21 1.5 C 30 5, 36 11, 42 20 Z',
  ].join(';');

  // Near wing (sweeping primary wing with full blade thickness at every phase)
  const nearWingFrames = [
    'M 24 21.5 C 21 12, 17 5, 11 2 C 22 4.5, 31 11, 40 20.5 Z',
    'M 24 21.5 C 23 15, 20 11, 14 8.5 C 24 10.5, 32 14.5, 40 20.5 Z',
    'M 24 22.5 C 22 30, 19 36, 13 40 C 23 36, 32 29, 40 22 Z',
    'M 24 21.5 C 25 16, 23 13, 18 11 C 26 12.5, 33 16, 40 20.5 Z',
    'M 24 21.5 C 21 12, 17 5, 11 2 C 22 4.5, 31 11, 40 20.5 Z',
  ].join(';');

  return (
    <div
      className="animate-bird-bob"
      style={{
        animationDuration: flapDuration,
        animationDelay: flapDelay,
      }}
    >
      <svg
        width={width}
        height={height}
        viewBox="0 0 64 42"
        className="overflow-visible drop-shadow-[0_1px_4px_rgba(254,243,199,0.65)]"
      >
        {/* Far wing */}
        <path
          d="M 29 20.5 C 28 11, 26 4, 21 1.5 C 30 5, 36 11, 42 20 Z"
          fill="#292524"
          stroke="#fde68a"
          strokeOpacity="0.35"
          strokeWidth="0.7"
          strokeLinejoin="round"
        >
          <animate
            attributeName="d"
            values={farWingFrames}
            keyTimes="0; 0.28; 0.58; 0.82; 1"
            dur={flapDuration}
            begin={flapDelay}
            repeatCount="indefinite"
          />
        </path>

        {/* Solid body, fanned tail feathers, chest, head, and curved beak */}
        <path
          d="M 7 18.8 L 19 20.8 C 26 18.4, 36 18, 44 19.6 C 47.2 18.6, 50.5 19.2, 52.5 20.8 L 57.5 22 L 52.5 23 C 49.5 24.2, 46 24.2, 42.5 24.6 C 34 27, 25 25.8, 19 23.8 L 6 27.2 L 10.5 23.2 L 5.5 22.2 L 10.5 21 Z"
          fill="#141210"
          stroke="#fef3c7"
          strokeOpacity="0.45"
          strokeWidth="0.8"
          strokeLinejoin="round"
        />

        {/* Near wing */}
        <path
          d="M 24 21.5 C 21 12, 17 5, 11 2 C 22 4.5, 31 11, 40 20.5 Z"
          fill="#1c1917"
          stroke="#fef3c7"
          strokeOpacity="0.5"
          strokeWidth="0.85"
          strokeLinejoin="round"
        >
          <animate
            attributeName="d"
            values={nearWingFrames}
            keyTimes="0; 0.28; 0.58; 0.82; 1"
            dur={flapDuration}
            begin={flapDelay}
            repeatCount="indefinite"
          />
        </path>

        {/* Warm sunlight rim & eye detail on featured solo birds */}
        {detailed && (
          <>
            <path
              d="M 20 20.4 C 28 18.6, 37 18.4, 44.5 19.8"
              fill="none"
              stroke="#fde68a"
              strokeOpacity="0.65"
              strokeWidth="1.1"
              strokeLinecap="round"
            />
            <circle cx="49.5" cy="21.1" r="1" fill="#fde68a" fillOpacity="0.85" />
          </>
        )}
      </svg>
    </div>
  );
};

const BirdFlock: React.FC<{
  top: string;
  duration: string;
  delay: string;
  members: FlockMemberConfig[];
}> = ({ top, duration, delay, members }) => (
  <div
    className="absolute left-0 animate-flock"
    style={{
      top,
      animationDuration: duration,
      animationDelay: delay,
    }}
  >
    <div className="relative">
      {members.map((m, idx) => (
        <div
          key={idx}
          className="absolute"
          style={{
            left: `${m.dx}px`,
            top: `${m.dy}px`,
            transform: `scale(${m.scale})`,
          }}
        >
          <div
            className="animate-flock-drift"
            style={{ animationDelay: m.driftDelay }}
          >
            <SoaringBird
              width={36}
              height={25}
              flapDuration={m.flapDuration}
              flapDelay={m.flapDelay}
            />
          </div>
        </div>
      ))}
    </div>
  </div>
);

const BirdSkyLayer: React.FC = () => (
  <>
    {/* Featured expressive hawk/raven soaring prominently across the valley */}
    <div
      className="absolute top-[12.5%] left-0 animate-bird"
      style={{ animationDelay: '-5.5s', animationDuration: '20s' }}
    >
      <SoaringBird width={58} height={40} flapDuration="0.66s" detailed />
    </div>

    {/* Second expressive solo bird gliding from right to left higher in the sky */}
    <div
      className="absolute top-[8.5%] left-0 animate-bird-reverse"
      style={{ animationDelay: '-12s', animationDuration: '24s' }}
    >
      <SoaringBird width={46} height={32} flapDuration="0.74s" flapDelay="-0.25s" detailed />
    </div>

    {/* Primary flock of 9 birds in V-formation flying across the golden sunset sky */}
    <BirdFlock
      top="9.5%"
      duration="26s"
      delay="-7.5s"
      members={PRIMARY_FLOCK_MEMBERS}
    />

    {/* Secondary high flock of 6 birds staggered later in the cycle */}
    <BirdFlock
      top="6.5%"
      duration="29s"
      delay="-21s"
      members={SECONDARY_FLOCK_MEMBERS}
    />
  </>
);

const TavernAtmosphere: React.FC<{ box: CoverBox }> = ({ box }) => {
  const candleFlames: Array<[number, number, string]> = [
    [70.2, 24.9, '0s'],
    [72.9, 26.4, '0.6s'],
    [74.5, 23.5, '1.2s'],
    [76.4, 25.7, '0.3s'],
    [79, 24, '0.9s'],
  ];

  const staffMotes = [
    { x: 79.7, y: 38.6, dx: '-8px', dy: '-18px', delay: '0s', duration: '3.1s' },
    { x: 80.5, y: 38.0, dx: '9px', dy: '-20px', delay: '0.6s', duration: '3.4s' },
    { x: 80.1, y: 36.8, dx: '-4px', dy: '-22px', delay: '1.2s', duration: '2.9s' },
    { x: 79.8, y: 37.5, dx: '6px', dy: '-16px', delay: '1.8s', duration: '3.6s' },
    { x: 80.4, y: 39.0, dx: '5px', dy: '-19px', delay: '2.4s', duration: '3.2s' },
  ];

  return (
    <>
      {/* Fire inside the stove arch */}
      <Patch
        box={box}
        x={36.2}
        y={46.7}
        w={5.2}
        h={7.4}
        className="rounded-full bg-orange-500/55 blur-lg animate-flicker"
      />

      {/* Soft pool under the chandelier, then a wick on each candle */}
      <Patch
        box={box}
        x={74.6}
        y={25}
        w={10.5}
        h={5.5}
        className="rounded-full bg-amber-200/20 blur-xl animate-flicker"
        delay="0.8s"
        duration="4s"
      />
      {candleFlames.map(([x, y, delay]) => (
        <Spot
          key={`${x}-${y}`}
          box={box}
          x={x}
          y={y}
          diameter={1.7}
          className="rounded-full bg-amber-200/80 blur-sm animate-flicker"
          delay={delay}
          duration="2.4s"
        />
      ))}

      {/* Lantern hanging under the chandelier */}
      <Spot
        box={box}
        x={73.5}
        y={35.8}
        diameter={2.4}
        className="rounded-full bg-amber-400/45 blur-md animate-flicker"
        delay="1.3s"
      />

      {/* Candle on the heroes' table */}
      <Spot
        box={box}
        x={75.7}
        y={53.4}
        diameter={1.8}
        className="rounded-full bg-amber-300/70 blur-sm animate-flicker"
        delay="0.5s"
        duration="2.2s"
      />

      {/* Fortune-teller candle flame */}
      <Spot
        box={box}
        x={97.5}
        y={87.4}
        diameter={2.2}
        className="rounded-full bg-amber-200/80 blur-md animate-flicker"
        delay="1.4s"
        duration="2.1s"
      />

      {/* Glowing crystal and arcane particles on the wizard's staff */}
      <Spot
        box={box}
        x={80.1}
        y={38.2}
        diameter={2.8}
        className="rounded-full bg-cyan-300/60 blur-md animate-flicker"
        delay="0.4s"
        duration="3.4s"
      />
      <Spot
        box={box}
        x={80.1}
        y={38.2}
        diameter={1.4}
        className="rounded-full bg-sky-100/80 blur-sm animate-flicker"
        delay="1.1s"
        duration="2.2s"
      />
      {staffMotes.map((mote) => {
        const origin = point(box, mote.x, mote.y);
        return (
          <div
            key={mote.delay}
            className="absolute"
            style={{
              left: origin.left,
              top: origin.top,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div
              className="w-1.5 h-1.5 rounded-full bg-cyan-100/95 shadow-[0_0_8px_rgba(103,232,249,0.95)] animate-staff-mote"
              style={
                {
                  animationDelay: mote.delay,
                  animationDuration: mote.duration,
                  '--mote-dx': mote.dx,
                  '--mote-dy': mote.dy,
                } as React.CSSProperties
              }
            />
          </div>
        );
      })}

      {/* Steam off the roast */}
      <Puffs
        box={box}
        x={27.4}
        y={72.2}
        count={2}
        rise={0.038}
        drift={0.004}
        stagger={1.7}
        blurClass="blur-sm"
        animationClass="animate-steam"
        className="bg-stone-100/80"
      />
    </>
  );
};

const ArchiveAtmosphere: React.FC<{ box: CoverBox }> = ({ box }) => {
  const windowX = 48.4;
  const windowY = 38;
  const floorX = 60.2;
  const floorY = 82.4;
  const dx = ((floorX - windowX) / 100) * box.width;
  const dy = ((floorY - windowY) / 100) * box.height;
  const beamLength = Math.hypot(dx, dy);
  const beamAngle = -Math.atan2(dx, dy) * (180 / Math.PI);
  const beamCenter = point(box, (windowX + floorX) / 2, (windowY + floorY) / 2);

  const dust = [0.12, 0.26, 0.4, 0.52, 0.64, 0.76, 0.9].map((t, i) => ({
    x: windowX + (floorX - windowX) * t + (i % 2 === 0 ? 1.1 : -0.8),
    y: windowY + (floorY - windowY) * t,
    delay: `${i * 0.85}s`,
  }));

  return (
    <>
      {/* Shaft from the window down onto the sunlit floor by the book */}
      <div
        className="absolute"
        style={{
          left: beamCenter.left,
          top: beamCenter.top,
          width: 0.075 * box.width,
          height: beamLength,
          transform: `translate(-50%, -50%) rotate(${beamAngle}deg)`,
        }}
      >
        <div
          className="absolute inset-0 bg-gradient-to-b from-amber-100/35 via-amber-200/15 to-transparent blur-lg animate-flicker"
          style={{ animationDuration: '5.5s' }}
        />
      </div>

      {/* Hanging lantern beside the map */}
      <Spot
        box={box}
        x={21.5}
        y={37.5}
        diameter={3.2}
        className="rounded-full bg-amber-300/55 blur-md animate-flicker"
      />

      {/* Lantern on the map desk */}
      <Spot
        box={box}
        x={8}
        y={58}
        diameter={3.4}
        className="rounded-full bg-amber-400/55 blur-md animate-flicker"
        delay="1.2s"
      />

      {/* Warm trophy-room interior seen through the doorway */}
      <Patch
        box={box}
        x={87}
        y={48}
        w={8.5}
        h={26}
        className="rounded-sm bg-amber-300/20 blur-2xl animate-flicker"
        delay="0.7s"
        duration="4.6s"
      />

      {dust.map((mote) => {
        const origin = point(box, mote.x, mote.y);
        return (
          <div
            key={mote.delay}
            className="absolute"
            style={{
              left: origin.left,
              top: origin.top,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div
              className="w-1.5 h-1.5 rounded-full bg-amber-100/90 shadow-[0_0_6px_rgba(253,230,138,0.9)] animate-dust"
              style={{ animationDelay: mote.delay }}
            />
          </div>
        );
      })}
    </>
  );
};
