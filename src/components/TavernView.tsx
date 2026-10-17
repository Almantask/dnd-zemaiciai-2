import React, { useMemo, useState } from 'react';
import { Beer, Eye } from 'lucide-react';
import { ShopItem, TavernHero, HeroTopic } from '../types';
import { TAVERN_ITEMS, TAVERN_KEEPER } from '../data/tavernData';
import { TAVERN_HEROES } from '../data/heroesData';
import { AmbientEffects } from './AmbientEffects';
import { ExitZone } from './ExitZone';
import {
  HeroDialogueWindow,
  KeeperDialogueWindow,
  KeeperMenuState,
} from './DialoguePrototypes';

interface TavernViewProps {
  onExit: () => void;
  isGlobalMenuOpen?: boolean;
}

export const TavernView: React.FC<TavernViewProps> = ({
  onExit,
  isGlobalMenuOpen = false,
}) => {
  const [keeperDialogOpen, setKeeperDialogOpen] = useState(false);
  const [keeperMenu, setKeeperMenu] = useState<KeeperMenuState>('root');
  const [selectedItem, setSelectedItem] = useState<ShopItem | null>(null);
  const [randomTipItem, setRandomTipItem] = useState<ShopItem | null>(null);

  const [selectedHero, setSelectedHero] = useState<TavernHero | null>(null);
  const [selectedHeroTopic, setSelectedHeroTopic] = useState<HeroTopic | null>(null);

  const [showHotspotHints, setShowHotspotHints] = useState(true);
  const [hoveredLabel, setHoveredLabel] = useState<string | null>(null);

  const buyableItems = useMemo(
    () => TAVERN_ITEMS.filter((i) => i.category !== 'lodging'),
    []
  );

  const lodgingServices = useMemo(
    () => TAVERN_ITEMS.filter((i) => i.category === 'lodging'),
    []
  );

  const counterHotspotItems = useMemo(
    () => TAVERN_ITEMS.filter((i) => Boolean(i.counterHotspot)),
    []
  );

  const openKeeperDialog = () => {
    setSelectedHero(null);
    setSelectedItem(null);
    setKeeperMenu('root');
    setKeeperDialogOpen(true);
  };

  const pickRandomTip = () => {
    const pool = TAVERN_ITEMS;
    if (pool.length === 0) return;
    let next = pool[Math.floor(Math.random() * pool.length)];
    if (randomTipItem && pool.length > 1) {
      const filtered = pool.filter((item) => item.id !== randomTipItem.id);
      next = filtered[Math.floor(Math.random() * filtered.length)];
    }
    setRandomTipItem(next);
    setSelectedItem(null);
    setKeeperMenu('patarimas');
  };

  const handleDirectCounterItemClick = (item: ShopItem) => {
    setSelectedHero(null);
    setKeeperDialogOpen(true);
    setKeeperMenu(item.category === 'lodging' ? 'paslaugos' : 'pirkti');
    setSelectedItem(item);
  };

  const handleHeroClick = (hero: TavernHero) => {
    setKeeperDialogOpen(false);
    setSelectedItem(null);
    setSelectedHero(hero);
    setSelectedHeroTopic(hero.topics[0] ?? null);
  };

  return (
    <div className="relative w-screen h-screen bg-stone-950 overflow-hidden select-none">
      {/* Background Tavern Illustration */}
      <img
        src="/images/tavern.jpg"
        alt="Smuklės vidus"
        className="w-full h-full object-cover object-center"
        draggable={false}
      />

      {/* Warm atmospheric vignette */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at center, transparent 55%, rgba(12, 10, 9, 0.7) 100%)',
        }}
      />

      {/* Ambient animations (stove fire, chandelier flicker, steam) */}
      <AmbientEffects scene="tavern" />

      {/* Top Left Header & Hints Toggle */}
      <div className="absolute top-4 left-4 z-30 flex flex-wrap items-center gap-3">
        <div className="px-4 py-2.5 rounded-xl bg-stone-950/85 border border-amber-700/60 backdrop-blur-md shadow-lg">
          <div className="flex items-center gap-2.5">
            <Beer className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <h1 className="font-display text-base md:text-lg font-bold text-amber-200 leading-tight">
                Smuklė „Juodasis Lokys“
              </h1>
              <p className="text-xs text-amber-400/80">
                Kalbėkitės su smuklininku, spauskite ant maisto arba kalbinkite herojus prie stalo
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

      {/* 1. TAVERNKEEPER HOTSPOT */}
      <div
        onClick={openKeeperDialog}
        onMouseEnter={() => setHoveredLabel(`${TAVERN_KEEPER.name} — Pirkti / Paslaugos / Patarimas`)}
        onMouseLeave={() => setHoveredLabel(null)}
        style={{
          left: `${TAVERN_KEEPER.hotspot.x}%`,
          top: `${TAVERN_KEEPER.hotspot.y}%`,
          width: `${TAVERN_KEEPER.hotspot.width}%`,
          height: `${TAVERN_KEEPER.hotspot.height}%`,
        }}
        role="button"
        tabIndex={0}
        aria-label={TAVERN_KEEPER.name}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') openKeeperDialog();
        }}
        className="absolute z-20 rounded-2xl cursor-pointer transition-all duration-300 hover:bg-amber-400/15 hover:ring-2 hover:ring-amber-300/80 hover:shadow-[0_0_30px_rgba(251,191,36,0.45)] flex flex-col items-center justify-center gap-1.5 group"
      >
        {showHotspotHints && (
          <>
            <span className="w-3.5 h-3.5 rounded-full bg-amber-400 border-2 border-stone-950 shadow-[0_0_10px_rgba(251,191,36,0.95)] group-hover:scale-125 transition-transform shrink-0" />
            <span className="px-2.5 py-0.5 rounded-full bg-stone-950/90 border border-amber-400/80 text-amber-100 font-display text-[11px] md:text-xs font-bold whitespace-nowrap shadow-lg group-hover:scale-105 group-hover:bg-amber-900/95 group-hover:border-amber-300 transition-all">
              {TAVERN_KEEPER.name}
            </span>
          </>
        )}
      </div>

      {/* 2. COUNTER & SHELF DIRECT ITEMS HOTSPOTS */}
      {counterHotspotItems.map((item) => {
        const box = item.counterHotspot!;
        const labelAbove = item.id === 'drink-ale-pint' || item.id === 'travel-feed';
        return (
          <div
            key={item.id}
            onClick={() => handleDirectCounterItemClick(item)}
            onMouseEnter={() => setHoveredLabel(`${box.label}: ${item.name} (${item.price})`)}
            onMouseLeave={() => setHoveredLabel(null)}
            style={{
              left: `${box.x}%`,
              top: `${box.y}%`,
              width: `${box.width}%`,
              height: `${box.height}%`,
            }}
            role="button"
            tabIndex={0}
            aria-label={item.name}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') handleDirectCounterItemClick(item);
            }}
            className={`absolute z-20 rounded-xl cursor-pointer transition-all duration-200 hover:bg-amber-300/20 hover:ring-2 hover:ring-amber-300 hover:shadow-[0_0_20px_rgba(251,191,36,0.6)] flex ${
              labelAbove ? 'flex-col-reverse' : 'flex-col'
            } items-center justify-center gap-1 group`}
          >
            {showHotspotHints && (
              <>
                <span className="w-3.5 h-3.5 rounded-full bg-amber-400 border-2 border-stone-950 shadow-[0_0_10px_rgba(251,191,36,0.95)] group-hover:scale-125 transition-transform shrink-0" />
                <span className="px-2 py-0.5 rounded-full bg-stone-950/90 border border-amber-400/80 text-amber-100 font-display text-[11px] font-bold whitespace-nowrap shadow-lg group-hover:scale-105 group-hover:bg-amber-900/95 group-hover:border-amber-300 transition-all">
                  {box.label}
                </span>
              </>
            )}
          </div>
        );
      })}

      {/* 3. HEROES SITTING AT THE TABLE */}
      {TAVERN_HEROES.map((hero) => {
        const labelAbove = hero.id === 'mage';
        return (
          <div
            key={hero.id}
            onClick={() => handleHeroClick(hero)}
            onMouseEnter={() => setHoveredLabel(`${hero.name} — ${hero.specialty}`)}
            onMouseLeave={() => setHoveredLabel(null)}
            style={{
              left: `${hero.hotspot.x}%`,
              top: `${hero.hotspot.y}%`,
              width: `${hero.hotspot.width}%`,
              height: `${hero.hotspot.height}%`,
            }}
            role="button"
            tabIndex={0}
            aria-label={hero.name}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') handleHeroClick(hero);
            }}
            className={`absolute z-20 rounded-2xl cursor-pointer transition-all duration-300 hover:bg-sky-400/15 hover:ring-2 hover:ring-sky-300/80 hover:shadow-[0_0_25px_rgba(56,189,248,0.45)] flex ${
              labelAbove ? 'flex-col-reverse' : 'flex-col'
            } items-center justify-center gap-1.5 group`}
          >
            {showHotspotHints && (
              <>
                <span className="w-3.5 h-3.5 rounded-full bg-amber-400 border-2 border-stone-950 shadow-[0_0_10px_rgba(251,191,36,0.95)] group-hover:scale-125 group-hover:bg-sky-300 transition-all shrink-0" />
                <span className="px-2.5 py-0.5 rounded-full bg-stone-950/90 border border-amber-400/80 text-amber-100 font-display text-[11px] md:text-xs font-bold whitespace-nowrap shadow-lg group-hover:scale-105 group-hover:bg-sky-950/95 group-hover:border-sky-300 group-hover:text-sky-100 transition-all">
                  {hero.name}
                </span>
              </>
            )}
          </div>
        );
      })}

      {/* Hover Tooltip Banner */}
      {hoveredLabel && !keeperDialogOpen && !selectedHero && (
        <div className="pointer-events-none fixed bottom-24 left-1/2 -translate-x-1/2 z-30 px-4 py-2 rounded-full bg-stone-950/90 border border-amber-500/70 text-amber-100 text-xs md:text-sm font-semibold shadow-xl">
          {hoveredLabel}
        </div>
      )}

      {/* SHOPKEEPER DIALOGUE (Prototype I Shield Design) */}
      {keeperDialogOpen && (
        <KeeperDialogueWindow
          menu={keeperMenu}
          setMenu={setKeeperMenu}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          randomTipItem={randomTipItem}
          onPickRandomTip={pickRandomTip}
          buyableItems={buyableItems}
          lodgingServices={lodgingServices}
          onClose={() => {
            setKeeperDialogOpen(false);
            setSelectedItem(null);
          }}
        />
      )}

      {/* HEROES DIALOGUE (Prototype I Shield Design) */}
      {selectedHero && (
        <HeroDialogueWindow
          hero={selectedHero}
          onSelectHero={handleHeroClick}
          selectedTopic={selectedHeroTopic}
          onSelectTopic={setSelectedHeroTopic}
          onClose={() => setSelectedHero(null)}
        />
      )}

      {/* Bottom middle 3/7ths Exit Zone — only appears when all menus/dialogs are closed */}
      <ExitZone
        onExit={onExit}
        disabled={Boolean(isGlobalMenuOpen || keeperDialogOpen || selectedHero)}
      />
    </div>
  );
};
