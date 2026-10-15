import React, { useMemo, useState } from 'react';
import {
  Beer,
  BedDouble,
  Sparkles,
  MessageSquare,
  ArrowLeft,
  X,
  Utensils,
  Shield,
  BookOpen,
  Eye,
} from 'lucide-react';
import { ShopItem, TavernHero, HeroTopic } from '../types';
import { TAVERN_ITEMS, TAVERN_KEEPER } from '../data/tavernData';
import { TAVERN_HEROES } from '../data/heroesData';
import { AmbientEffects } from './AmbientEffects';
import { ExitZone } from './ExitZone';

interface TavernViewProps {
  onExit: () => void;
}

type KeeperMenuState = 'root' | 'pirkti' | 'paslaugos' | 'patarimas';

export const TavernView: React.FC<TavernViewProps> = ({ onExit }) => {
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

      {/* Top Left Header & Interactive Hints Toggle */}
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
        className="absolute z-20 rounded-2xl cursor-pointer transition-all duration-300 hover:bg-amber-400/15 hover:ring-2 hover:ring-amber-300/80 hover:shadow-[0_0_30px_rgba(251,191,36,0.45)] group"
      >
        {showHotspotHints && (
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-amber-900/95 border border-amber-300 text-amber-50 font-display text-xs font-bold whitespace-nowrap shadow-[0_0_15px_rgba(251,191,36,0.5)] group-hover:scale-110 transition-transform flex items-center gap-1.5">
            <MessageSquare className="w-3.5 h-3.5 text-amber-300" />
            Smuklininkas
          </div>
        )}
      </div>

      {/* 2. COUNTER & SHELF DIRECT ITEMS HOTSPOTS */}
      {counterHotspotItems.map((item) => {
        const box = item.counterHotspot!;
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
            className="absolute z-20 rounded-xl cursor-pointer transition-all duration-200 hover:bg-amber-300/20 hover:ring-2 hover:ring-amber-300 hover:shadow-[0_0_20px_rgba(251,191,36,0.6)] flex items-center justify-center group"
          >
            {showHotspotHints && (
              <span className="w-3.5 h-3.5 rounded-full bg-amber-400 border-2 border-stone-950 shadow-[0_0_10px_rgba(251,191,36,0.95)] group-hover:scale-125 transition-transform" />
            )}
          </div>
        );
      })}

      {/* 3. HEROES SITTING AT THE TABLE */}
      {TAVERN_HEROES.map((hero) => (
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
          className="absolute z-20 rounded-2xl cursor-pointer transition-all duration-300 hover:bg-sky-400/15 hover:ring-2 hover:ring-sky-300/80 hover:shadow-[0_0_25px_rgba(56,189,248,0.45)] group"
        >
          {showHotspotHints && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-stone-950/90 border border-sky-400/80 text-sky-200 font-display text-[11px] font-bold whitespace-nowrap shadow-md group-hover:scale-110 transition-transform">
              {hero.name}
            </div>
          )}
        </div>
      ))}

      {/* Hover Tooltip Banner */}
      {hoveredLabel && (
        <div className="pointer-events-none fixed bottom-24 left-1/2 -translate-x-1/2 z-30 px-4 py-2 rounded-full bg-stone-950/90 border border-amber-500/70 text-amber-100 text-xs md:text-sm font-semibold shadow-xl">
          {hoveredLabel}
        </div>
      )}

      {/* SHOPKEEPER DIALOG MODAL (3 menus: Pirkti, Paslaugos, Random patarimas) */}
      {keeperDialogOpen && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4"
          onClick={() => {
            setKeeperDialogOpen(false);
            setSelectedItem(null);
          }}
        >
          <div
            className="w-full max-w-4xl rounded-2xl bg-gradient-to-b from-stone-900 via-stone-900 to-stone-950 border-2 border-amber-600/75 shadow-[0_0_60px_rgba(0,0,0,0.95)] overflow-hidden text-amber-50 flex flex-col max-h-[86vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-6 py-4 bg-gradient-to-r from-amber-950/90 via-stone-900 to-amber-950/90 border-b border-amber-700/50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-amber-500/20 border-2 border-amber-400/70 flex items-center justify-center text-amber-300 font-display font-bold text-lg">
                  B
                </div>
                <div>
                  <h2 className="font-display text-lg md:text-xl font-bold text-amber-200">
                    {TAVERN_KEEPER.name}
                  </h2>
                  <p className="text-xs text-amber-400/80">{TAVERN_KEEPER.role}</p>
                </div>
              </div>

              <button
                onClick={() => {
                  setKeeperDialogOpen(false);
                  setSelectedItem(null);
                }}
                className="p-1.5 rounded-lg text-amber-300/70 hover:text-amber-100 hover:bg-amber-900/40 transition-colors"
                aria-label="Uždaryti"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 3 Main Menu Tabs: Pirkti | Paslaugos | Random patarimas */}
            <div className="px-6 py-3 bg-stone-950/80 border-b border-amber-900/50 flex flex-wrap items-center gap-2.5">
              <button
                onClick={() => {
                  setKeeperMenu('pirkti');
                  setSelectedItem(null);
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-display text-xs md:text-sm font-bold tracking-wider uppercase border transition-all ${
                  keeperMenu === 'pirkti'
                    ? 'bg-amber-700 text-amber-50 border-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.4)]'
                    : 'bg-stone-900 text-amber-200/80 border-amber-800/50 hover:bg-stone-800 hover:text-amber-100'
                }`}
              >
                <Utensils className="w-4 h-4" />
                1. Pirkti (Maistas, gėrimai, atsargos)
              </button>

              <button
                onClick={() => {
                  setKeeperMenu('paslaugos');
                  setSelectedItem(null);
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-display text-xs md:text-sm font-bold tracking-wider uppercase border transition-all ${
                  keeperMenu === 'paslaugos'
                    ? 'bg-amber-700 text-amber-50 border-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.4)]'
                    : 'bg-stone-900 text-amber-200/80 border-amber-800/50 hover:bg-stone-800 hover:text-amber-100'
                }`}
              >
                <BedDouble className="w-4 h-4" />
                2. Paslaugos (Nakvynė ir pirtis)
              </button>

              <button
                onClick={pickRandomTip}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-display text-xs md:text-sm font-bold tracking-wider uppercase border transition-all ${
                  keeperMenu === 'patarimas'
                    ? 'bg-amber-700 text-amber-50 border-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.4)]'
                    : 'bg-stone-900 text-amber-200/80 border-amber-800/50 hover:bg-stone-800 hover:text-amber-100'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                3. Atsitiktinis patarimas
              </button>
            </div>

            {/* Modal Content Area */}
            <div className="p-6 overflow-y-auto flex-1 space-y-5">
              {/* ROOT MENU VIEW */}
              {keeperMenu === 'root' && !selectedItem && (
                <div className="space-y-6">
                  <div className="p-5 rounded-xl bg-amber-950/35 border border-amber-700/50 text-amber-100 text-base md:text-lg italic leading-relaxed">
                    „{TAVERN_KEEPER.greeting}“
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button
                      onClick={() => setKeeperMenu('pirkti')}
                      className="p-5 rounded-xl bg-stone-800/80 hover:bg-stone-800 border border-amber-700/50 hover:border-amber-400 text-left transition-all group"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-display font-bold text-lg text-amber-200 group-hover:text-amber-100">
                          Pirkti
                        </span>
                        <Utensils className="w-5 h-5 text-amber-400" />
                      </div>
                      <p className="text-sm text-stone-300">
                        Maistas dienai, vietinis dūminis alus, midus, kelionės duona, rūkyta mėsa ir žirgo pašaras.
                      </p>
                      <div className="mt-3 text-xs text-amber-400 font-semibold">
                        12 prekių sąrašas →
                      </div>
                    </button>

                    <button
                      onClick={() => setKeeperMenu('paslaugos')}
                      className="p-5 rounded-xl bg-stone-800/80 hover:bg-stone-800 border border-amber-700/50 hover:border-amber-400 text-left transition-all group"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-display font-bold text-lg text-amber-200 group-hover:text-amber-100">
                          Paslaugos
                        </span>
                        <BedDouble className="w-5 h-5 text-amber-400" />
                      </div>
                      <p className="text-sm text-stone-300">
                        Nakvynė nuo šiaudinio gulto tvartelyje iki rakinamos bajorų menės bei karšta pirtis.
                      </p>
                      <div className="mt-3 text-xs text-amber-400 font-semibold">
                        6 paslaugų sąrašas →
                      </div>
                    </button>

                    <button
                      onClick={pickRandomTip}
                      className="p-5 rounded-xl bg-stone-800/80 hover:bg-stone-800 border border-amber-700/50 hover:border-amber-400 text-left transition-all group"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-display font-bold text-lg text-amber-200 group-hover:text-amber-100">
                          Atsitiktinis patarimas
                        </span>
                        <Sparkles className="w-5 h-5 text-amber-400" />
                      </div>
                      <p className="text-sm text-stone-300">
                        Išgirskite smuklininko Butigeidžio patarimą apie vieną iš prekių ar paslaugų ir kada ją naudoti.
                      </p>
                      <div className="mt-3 text-xs text-amber-400 font-semibold">
                        Gauti patarimą →
                      </div>
                    </button>
                  </div>
                </div>
              )}

              {/* PIRKTI (BUYABLE ITEMS LIST) */}
              {keeperMenu === 'pirkti' && !selectedItem && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-display text-lg font-bold text-amber-200">
                        Smuklės prekės (Maistas, gėrimai ir kelionės atsargos)
                      </h3>
                      <p className="text-xs text-stone-400">
                        Paspauskite ant bet kurios prekės, kad pamatytumėte jos efektus, vizualų aprašymą ir smuklininko komentarą
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {buyableItems.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setSelectedItem(item)}
                        className="p-4 rounded-xl bg-stone-800/75 hover:bg-stone-800 border border-amber-800/50 hover:border-amber-400 text-left transition-all flex flex-col justify-between gap-2 group"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="font-display font-bold text-amber-200 group-hover:text-amber-100 text-base">
                              {item.name}
                            </div>
                            <div className="text-xs text-stone-400 italic">
                              5e: {item.dndTerm}
                            </div>
                          </div>
                          <span className="px-2.5 py-1 rounded-md bg-amber-950/90 border border-amber-500/60 text-amber-200 font-display text-xs font-bold whitespace-nowrap">
                            {item.price}
                          </span>
                        </div>
                        <p className="text-sm text-amber-100/85 line-clamp-2">
                          {item.description}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* PASLAUGOS (LODGING & BATH LIST) */}
              {keeperMenu === 'paslaugos' && !selectedItem && (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-display text-lg font-bold text-amber-200">
                      Nakvynė ir paslaugos smuklėje (Lodging & Bath)
                    </h3>
                    <p className="text-xs text-stone-400">
                      Paspauskite ant paslaugos, kad pamatytumėte jos efektus ir smuklininko komentarą
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {lodgingServices.map((service) => (
                      <button
                        key={service.id}
                        onClick={() => setSelectedItem(service)}
                        className="p-4 rounded-xl bg-stone-800/75 hover:bg-stone-800 border border-amber-800/50 hover:border-amber-400 text-left transition-all flex flex-col justify-between gap-2 group"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="font-display font-bold text-amber-200 group-hover:text-amber-100 text-base">
                              {service.name}
                            </div>
                            <div className="text-xs text-stone-400 italic">
                              5e: {service.dndTerm}
                            </div>
                          </div>
                          <span className="px-2.5 py-1 rounded-md bg-amber-950/90 border border-amber-500/60 text-amber-200 font-display text-xs font-bold whitespace-nowrap">
                            {service.price}
                          </span>
                        </div>
                        <p className="text-sm text-amber-100/85 line-clamp-2">
                          {service.description}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* RANDOM PATARIMAS VIEW */}
              {keeperMenu === 'patarimas' && randomTipItem && !selectedItem && (
                <div className="space-y-5">
                  <div className="p-5 rounded-xl bg-gradient-to-br from-amber-950/60 via-stone-900 to-stone-900 border-2 border-amber-500/60 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs uppercase tracking-widest text-amber-400 font-display font-bold">
                        Smuklininko patarimas apie:
                      </span>
                      <span className="px-3 py-1 rounded-full bg-amber-900/70 border border-amber-400/50 text-amber-200 text-xs font-bold">
                        {randomTipItem.price}
                      </span>
                    </div>

                    <h3 className="font-display text-xl font-bold text-amber-200">
                      {randomTipItem.name}{' '}
                      <span className="text-sm font-normal text-stone-400 italic">
                        ({randomTipItem.dndTerm})
                      </span>
                    </h3>

                    <blockquote className="p-4 rounded-lg bg-stone-950/80 border-l-4 border-amber-400 text-amber-100 italic text-base md:text-lg leading-relaxed">
                      {randomTipItem.shopkeeperComment}
                    </blockquote>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-sm">
                      <div className="p-3 rounded-lg bg-stone-800/70 border border-stone-700">
                        <div className="text-xs font-bold uppercase text-amber-400 mb-1">
                          Efektas ir nauda:
                        </div>
                        <p className="text-amber-100/90">{randomTipItem.statsAndEffects}</p>
                      </div>
                      <div className="p-3 rounded-lg bg-stone-800/70 border border-stone-700">
                        <div className="text-xs font-bold uppercase text-amber-400 mb-1">
                          Kada geriausia naudoti:
                        </div>
                        <p className="text-amber-100/90">{randomTipItem.whenToUse}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <button
                      onClick={() => setSelectedItem(randomTipItem)}
                      className="px-4 py-2 rounded-lg bg-stone-800 hover:bg-stone-700 border border-amber-600/50 text-amber-200 text-sm font-semibold transition-colors"
                    >
                      Peržiūrėti pilną aprašymą
                    </button>

                    <button
                      onClick={pickRandomTip}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-b from-amber-600 to-amber-800 hover:from-amber-500 hover:to-amber-700 text-amber-50 font-display text-sm font-bold border border-amber-400/60 shadow-lg transition-all"
                    >
                      <Sparkles className="w-4 h-4" />
                      Kitas atsitiktinis patarimas
                    </button>
                  </div>
                </div>
              )}

              {/* DETAILED ITEM / SERVICE VIEW */}
              {selectedItem && (
                <div className="space-y-5 animate-fadeIn">
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="inline-flex items-center gap-2 text-xs md:text-sm text-amber-300 hover:text-amber-100 font-semibold"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Grįžti į sąrašą
                  </button>

                  <div className="p-6 rounded-xl bg-stone-800/80 border-2 border-amber-600/60 space-y-4">
                    <div className="flex flex-wrap items-start justify-between gap-4 border-b border-amber-800/40 pb-4">
                      <div>
                        <span className="text-xs uppercase tracking-widest text-amber-400 font-display font-bold">
                          {selectedItem.category === 'lodging'
                            ? 'Nakvynė ir paslaugos'
                            : 'Smuklės prekė'}
                        </span>
                        <h3 className="font-display text-xl md:text-2xl font-bold text-amber-200 mt-0.5">
                          {selectedItem.name}
                        </h3>
                        <p className="text-sm text-stone-400 italic">
                          Oficialus D&D 5e terminas: <strong>{selectedItem.dndTerm}</strong>
                        </p>
                      </div>

                      <div className="px-4 py-2 rounded-xl bg-amber-950 border-2 border-amber-400/80 text-amber-200 font-display text-base md:text-lg font-bold shadow-md">
                        Kaina: {selectedItem.price}
                      </div>
                    </div>

                    {/* Cultural & General Description */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 rounded-lg bg-stone-900/90 border border-stone-700 space-y-1.5">
                        <h4 className="font-display text-xs uppercase tracking-wider text-amber-400 font-bold">
                          Aprašymas ir kultūrinis kontekstas
                        </h4>
                        <p className="text-amber-100/95 text-base leading-relaxed">
                          {selectedItem.description}
                        </p>
                      </div>

                      <div className="p-4 rounded-lg bg-stone-900/90 border border-stone-700 space-y-1.5">
                        <h4 className="font-display text-xs uppercase tracking-wider text-amber-400 font-bold">
                          Vizualus aprašymas
                        </h4>
                        <p className="text-amber-100/90 text-base leading-relaxed">
                          {selectedItem.visualDescription}
                        </p>
                      </div>
                    </div>

                    {/* Stats / Effects & When to use */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 rounded-lg bg-amber-950/35 border border-amber-700/50 space-y-1.5">
                        <h4 className="font-display text-xs uppercase tracking-wider text-amber-300 font-bold">
                          Statistika ir efektai žaidime
                        </h4>
                        <p className="text-amber-100 text-base leading-relaxed">
                          {selectedItem.statsAndEffects}
                        </p>
                      </div>

                      <div className="p-4 rounded-lg bg-amber-950/35 border border-amber-700/50 space-y-1.5">
                        <h4 className="font-display text-xs uppercase tracking-wider text-amber-300 font-bold">
                          Kada ir kaip geriausia naudoti
                        </h4>
                        <p className="text-amber-100 text-base leading-relaxed">
                          {selectedItem.whenToUse}
                        </p>
                      </div>
                    </div>

                    {/* Shopkeeper Comment */}
                    <div className="p-4 rounded-xl bg-stone-950/90 border-l-4 border-amber-400 space-y-1">
                      <div className="text-xs font-display font-bold uppercase tracking-wider text-amber-400">
                        Smuklininko Butigeidžio komentaras:
                      </div>
                      <p className="text-amber-100 italic text-base md:text-lg">
                        {selectedItem.shopkeeperComment}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* HEROES DIALOG MODAL (Ranger, Warrior, Mage, Cleric) */}
      {selectedHero && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4"
          onClick={() => setSelectedHero(null)}
        >
          <div
            className="w-full max-w-4xl rounded-2xl bg-gradient-to-b from-stone-900 via-stone-900 to-stone-950 border-2 border-sky-500/70 shadow-[0_0_60px_rgba(0,0,0,0.95)] overflow-hidden text-amber-50 flex flex-col max-h-[85vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Hero Header */}
            <div className="px-6 py-4 bg-gradient-to-r from-sky-950/80 via-stone-900 to-stone-900 border-b border-sky-700/50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-sky-500/20 border border-sky-400/60 text-sky-300">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-display text-lg md:text-xl font-bold text-amber-100">
                      {selectedHero.name}
                    </h2>
                    <span className="px-2.5 py-0.5 rounded-full bg-sky-950 border border-sky-500/60 text-sky-300 text-xs font-bold">
                      {selectedHero.dndClass}
                    </span>
                  </div>
                  <p className="text-xs text-sky-300/80">
                    {selectedHero.classTitle} • {selectedHero.specialty}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedHero(null)}
                className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
                aria-label="Uždaryti"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Hero Body */}
            <div className="p-6 overflow-y-auto flex-1 space-y-5">
              {/* Switch between the 4 heroes right from the dialog if desired */}
              <div className="flex flex-wrap items-center gap-2 pb-2 border-b border-stone-800">
                <span className="text-xs text-stone-400 mr-1">Kiti herojai prie stalo:</span>
                {TAVERN_HEROES.map((h) => (
                  <button
                    key={h.id}
                    onClick={() => handleHeroClick(h)}
                    className={`px-3 py-1 rounded-full text-xs font-display font-bold border transition-all ${
                      h.id === selectedHero.id
                        ? 'bg-sky-700 border-sky-300 text-white'
                        : 'bg-stone-900 border-stone-700 text-stone-300 hover:border-sky-500/60'
                    }`}
                  >
                    {h.name}
                  </button>
                ))}
              </div>

              {/* Greeting */}
              <div className="p-4 rounded-xl bg-stone-800/80 border border-sky-800/50 text-amber-100 italic text-base md:text-lg">
                {selectedHero.greeting}
              </div>

              {/* Topics Selector & Selected Topic Content */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <div className="text-xs font-display uppercase tracking-wider text-sky-300 font-bold mb-2">
                    Pasirinkite temą:
                  </div>
                  {selectedHero.topics.map((topic) => {
                    const active = selectedHeroTopic?.id === topic.id;
                    return (
                      <button
                        key={topic.id}
                        onClick={() => setSelectedHeroTopic(topic)}
                        className={`w-full p-3.5 rounded-xl text-left border transition-all ${
                          active
                            ? 'bg-sky-950/80 border-sky-400 text-amber-50 shadow-md'
                            : 'bg-stone-800/60 border-stone-700/80 text-stone-300 hover:bg-stone-800'
                        }`}
                      >
                        <div className="text-[11px] uppercase tracking-wider text-sky-400 font-bold">
                          {topic.category}
                        </div>
                        <div className="font-display font-bold text-sm mt-0.5">
                          {topic.title}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {selectedHeroTopic && (
                  <div className="md:col-span-2 p-5 rounded-xl bg-stone-800/75 border border-sky-700/40 space-y-4">
                    <div className="flex items-start justify-between gap-2 border-b border-stone-700 pb-3">
                      <div>
                        <span className="text-xs uppercase tracking-wider text-sky-400 font-bold">
                          {selectedHeroTopic.category}
                        </span>
                        <h3 className="font-display text-lg md:text-xl font-bold text-amber-200">
                          {selectedHeroTopic.title}
                        </h3>
                        <p className="text-sm text-stone-300 mt-1">
                          {selectedHeroTopic.summary}
                        </p>
                      </div>
                      <BookOpen className="w-5 h-5 text-sky-400 shrink-0" />
                    </div>

                    <ul className="space-y-2.5">
                      {selectedHeroTopic.tips.map((tip, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2.5 text-sm md:text-base text-amber-100/95 leading-relaxed"
                        >
                          <span className="w-5 h-5 rounded-full bg-sky-900/80 border border-sky-400/60 text-sky-200 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                            {i + 1}
                          </span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="p-3 rounded-lg bg-stone-950/70 border border-dashed border-stone-600 text-xs text-stone-400">
                      {selectedHeroTopic.placeholderNote}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom middle 3/7ths Exit Zone */}
      <ExitZone onExit={onExit} />
    </div>
  );
};
