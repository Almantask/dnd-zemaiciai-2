import React, { useState } from 'react';
import { ShopItem, TavernHero, HeroTopic } from '../types';
import { TAVERN_KEEPER } from '../data/tavernData';
import { TAVERN_HEROES } from '../data/heroesData';

export type KeeperMenuState = 'root' | 'pirkti' | 'paslaugos' | 'patarimas';

/* ============================================================================
 * REUSABLE PROTOTYPE I ("KAUSTYTAS SKYDAS" / CHAMFERED SHIELD) FRAME
 * ========================================================================== */
interface ShieldDialogFrameProps {
  titlePlaque: string;
  subtitlePlaque?: string;
  onClose: () => void;
  position?: 'bottom' | 'center';
  maxWidthClass?: string;
  children: React.ReactNode;
}

export const ShieldDialogFrame: React.FC<ShieldDialogFrameProps> = ({
  titlePlaque,
  subtitlePlaque,
  onClose,
  position = 'bottom',
  maxWidthClass = 'max-w-4xl',
  children,
}) => {
  const frameCut =
    'polygon(34px 0, calc(100% - 34px) 0, 100% 34px, 100% calc(100% - 34px), calc(100% - 34px) 100%, 34px 100%, 0 calc(100% - 34px), 0 34px)';
  const innerCut =
    'polygon(30px 0, calc(100% - 30px) 0, 100% 30px, 100% calc(100% - 30px), calc(100% - 30px) 100%, 30px 100%, 0 calc(100% - 30px), 0 30px)';

  return (
    <div
      className={`fixed inset-0 z-40 flex ${
        position === 'bottom' ? 'items-end pb-8' : 'items-center'
      } justify-center p-4`}
      onClick={onClose}
    >
      <div
        className={`relative w-full ${maxWidthClass} animate-fadeIn`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Overlapping top-left nameplate, sitting on the border */}
        <div className="absolute -top-[18px] left-10 z-30 px-5 py-1 bg-[#e8894a] border-[3px] border-[#1a120c]">
          <span className="font-display font-extrabold text-base sm:text-lg text-[#1a120c] tracking-wide">
            {titlePlaque}
          </span>
          {subtitlePlaque && (
            <span className="hidden sm:inline ml-2 font-serif text-xs font-bold text-[#3b1d06]">
              • {subtitlePlaque}
            </span>
          )}
        </div>

        {/* Metal border only. The fill is black at 80% with a blur, so the scene stays visible underneath. */}
        <div
          className="relative p-[5px] bg-[#c8c2b8]"
          style={{ clipPath: frameCut }}
        >
          <div
            className="relative bg-black/80 backdrop-blur-md px-7 sm:px-10 pt-8 pb-6 text-[#f4efe4] max-h-[78vh] overflow-y-auto"
            style={{ clipPath: innerCut }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ============================================================================
 * REUSABLE CHEVRON OPTION BUTTON ("❯ Option")
 * ========================================================================== */
interface ShieldOptionProps {
  label: string;
  rightBadge?: string;
  active?: boolean;
  onMouseEnter?: () => void;
  onClick: () => void;
  size?: 'lg' | 'md' | 'sm';
  muted?: boolean;
}

export const ShieldOption: React.FC<ShieldOptionProps> = ({
  label,
  rightBadge,
  active = false,
  onMouseEnter,
  onClick,
  size = 'lg',
  muted = false,
}) => {
  const textSizeClass =
    size === 'lg'
      ? 'text-xl md:text-2xl'
      : size === 'md'
      ? 'text-base md:text-lg'
      : 'text-sm md:text-base';

  return (
    <button
      type="button"
      onMouseEnter={onMouseEnter}
      onClick={onClick}
      className="w-full text-left flex items-center justify-between gap-3 py-1.5 group transition-all"
    >
      <div className="flex items-center gap-3 min-w-0">
        <span
          className={`font-display font-bold text-lg md:text-xl transition-all duration-150 shrink-0 ${
            active
              ? 'opacity-100 translate-x-0 text-[#fef08a] drop-shadow-[0_0_8px_rgba(254,240,138,0.9)]'
              : 'opacity-0 -translate-x-2 text-stone-500 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-[#fef08a]'
          }`}
        >
          ❯
        </span>
        <span
          className={`font-serif ${textSizeClass} tracking-wide truncate transition-all duration-150 ${
            active
              ? 'text-[#fef08a] italic font-bold drop-shadow-[0_0_10px_rgba(254,240,138,0.45)]'
              : muted
              ? 'text-stone-400 hover:text-[#fef08a] italic'
              : 'text-[#b8afa1] font-semibold group-hover:text-[#fef08a] group-hover:italic'
          }`}
        >
          {label}
        </span>
      </div>

      {rightBadge && (
        <span
          className={`ml-3 text-xs md:text-sm font-display font-bold shrink-0 transition-colors ${
            active
              ? 'text-[#fef08a]'
              : 'text-amber-500/80 group-hover:text-[#fef08a]'
          }`}
        >
          {rightBadge}
        </span>
      )}
    </button>
  );
};

/* ============================================================================
 * TAVERNKEEPER DIALOGUE WINDOW (PROTOTYPE I)
 * ========================================================================== */
interface KeeperDialogueProps {
  menu: KeeperMenuState;
  setMenu: (m: KeeperMenuState) => void;
  selectedItem: ShopItem | null;
  setSelectedItem: (item: ShopItem | null) => void;
  randomTipItem: ShopItem | null;
  onPickRandomTip: () => void;
  buyableItems: ShopItem[];
  lodgingServices: ShopItem[];
  onClose: () => void;
}

export const KeeperDialogueWindow: React.FC<KeeperDialogueProps> = ({
  menu,
  setMenu,
  selectedItem,
  setSelectedItem,
  randomTipItem,
  onPickRandomTip,
  buyableItems,
  lodgingServices,
  onClose,
}) => {
  const [hoveredOption, setHoveredOption] = useState<string | null>('pirkti');

  return (
    <ShieldDialogFrame
      titlePlaque="Butigeidis"
      subtitlePlaque={TAVERN_KEEPER.role}
      onClose={onClose}
      position="bottom"
    >
      {/* ROOT 3-OPTION MENU */}
      {menu === 'root' && !selectedItem && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Left: Clean Chevron Menu Options */}
          <div className="md:col-span-6 space-y-2 pl-1 md:pl-4">
            <ShieldOption
              label="Pirkti (Maistas, gėrimai, atsargos)"
              active={hoveredOption === 'pirkti'}
              onMouseEnter={() => setHoveredOption('pirkti')}
              onClick={() => setMenu('pirkti')}
            />
            <ShieldOption
              label="Paslaugos (Nakvynė ir pirtis)"
              active={hoveredOption === 'paslaugos'}
              onMouseEnter={() => setHoveredOption('paslaugos')}
              onClick={() => setMenu('paslaugos')}
            />
            <ShieldOption
              label="Atsitiktinis patarimas"
              active={hoveredOption === 'patarimas'}
              onMouseEnter={() => setHoveredOption('patarimas')}
              onClick={onPickRandomTip}
            />
            <ShieldOption
              label="Nieko nereikia (Uždaryti)"
              active={hoveredOption === 'iseiti'}
              onMouseEnter={() => setHoveredOption('iseiti')}
              onClick={onClose}
              muted
            />
          </div>

          {/* Right: Spoken Greeting Quote */}
          <div className="md:col-span-6 border-t md:border-t-0 md:border-l border-amber-700/30 pt-4 md:pt-0 md:pl-6">
            <p className="text-amber-100/90 italic text-lg leading-relaxed">
              „{TAVERN_KEEPER.greeting}“
            </p>
          </div>
        </div>
      )}

      {/* SUBMENU: PIRKTI OR PASLAUGOS LIST */}
      {(menu === 'pirkti' || menu === 'paslaugos') && !selectedItem && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-700/80 pb-2">
            <div className="flex items-center gap-4">
              <span className="font-display text-sm uppercase tracking-widest text-amber-400 font-bold">
                {menu === 'pirkti'
                  ? 'Smuklės prekės (Pirkti)'
                  : 'Nakvynė ir pirtis (Paslaugos)'}
              </span>
              <button
                onClick={() =>
                  setMenu(menu === 'pirkti' ? 'paslaugos' : 'pirkti')
                }
                className="text-xs font-display uppercase tracking-wider text-stone-400 hover:text-[#fef08a] transition-colors"
              >
                [Perjungti į: {menu === 'pirkti' ? 'Paslaugos' : 'Pirkti'}]
              </button>
            </div>
            <button
              onClick={() => setMenu('root')}
              className="text-sm text-[#fef08a] hover:underline font-serif italic"
            >
              ‹ Atgal į pagrindinį meniu
            </button>
          </div>

          <div className="grid grid-cols-1 gap-y-1">
            {(menu === 'pirkti' ? buyableItems : lodgingServices).map((item) => (
              <ShieldOption
                key={item.id}
                size="md"
                label={item.name}
                rightBadge={item.price}
                active={hoveredOption === item.id}
                onMouseEnter={() => setHoveredOption(item.id)}
                onClick={() => setSelectedItem(item)}
              />
            ))}
          </div>
        </div>
      )}

      {/* SUBMENU: RANDOM PATARIMAS */}
      {menu === 'patarimas' && randomTipItem && !selectedItem && (
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-stone-700/80 pb-2">
            <span className="font-display text-sm uppercase tracking-widest text-amber-400 font-bold">
              Atsitiktinis patarimas • {randomTipItem.name} ({randomTipItem.price})
            </span>
            <button
              onClick={() => setMenu('root')}
              className="text-sm text-[#fef08a] hover:underline font-serif italic"
            >
              ‹ Atgal į pagrindinį meniu
            </button>
          </div>

          <p className="text-xl text-[#fef08a] italic leading-relaxed">
            {randomTipItem.shopkeeperComment}
          </p>
          <p className="text-sm md:text-base text-stone-300">
            <strong className="text-amber-300">Kada naudoti:</strong>{' '}
            {randomTipItem.whenToUse}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-stone-800">
            <ShieldOption
              size="md"
              label="Kitas atsitiktinis patarimas"
              active={hoveredOption === 'next-tip'}
              onMouseEnter={() => setHoveredOption('next-tip')}
              onClick={onPickRandomTip}
            />
            <ShieldOption
              size="md"
              label="Žiūrėti šio daikto statistiką"
              active={hoveredOption === 'view-tip-item'}
              onMouseEnter={() => setHoveredOption('view-tip-item')}
              onClick={() => setSelectedItem(randomTipItem)}
            />
            <ShieldOption
              size="md"
              label="Atgal į meniu"
              active={hoveredOption === 'back-root'}
              onMouseEnter={() => setHoveredOption('back-root')}
              onClick={() => setMenu('root')}
              muted
            />
          </div>
        </div>
      )}

      {/* SELECTED ITEM DETAILS */}
      {selectedItem && (
        <div className="space-y-3.5">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-700 pb-2">
            <div>
              <h3 className="font-display text-xl font-bold text-[#fef08a]">
                {selectedItem.name}{' '}
                <span className="text-sm font-normal text-stone-400 italic">
                  ({selectedItem.dndTerm})
                </span>
              </h3>
            </div>
            <div className="flex items-center gap-4">
              <span className="px-3 py-0.5 rounded bg-amber-950 border border-amber-400 text-[#fef08a] font-display text-sm font-bold">
                Kaina: {selectedItem.price}
              </span>
              <button
                onClick={() => setSelectedItem(null)}
                className="text-sm text-[#fef08a] hover:underline font-serif italic"
              >
                ‹ Grįžti į sąrašą
              </button>
            </div>
          </div>

          <p className="text-amber-200 italic text-base md:text-lg">
            {selectedItem.shopkeeperComment}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div className="p-3 rounded bg-black/40 border border-stone-700/80">
              <div className="text-xs font-display uppercase text-amber-400 font-bold mb-1">
                Aprašymas ir kultūrinis kontekstas
              </div>
              <p className="text-stone-200 leading-relaxed">{selectedItem.description}</p>
            </div>
            <div className="p-3 rounded bg-black/40 border border-stone-700/80">
              <div className="text-xs font-display uppercase text-amber-400 font-bold mb-1">
                Vizualus aprašymas
              </div>
              <p className="text-stone-200 leading-relaxed">
                {selectedItem.visualDescription}
              </p>
            </div>
            <div className="p-3 rounded bg-black/40 border border-stone-700/80">
              <div className="text-xs font-display uppercase text-amber-400 font-bold mb-1">
                Statistika ir efektas
              </div>
              <p className="text-stone-200 leading-relaxed">
                {selectedItem.statsAndEffects}
              </p>
            </div>
            <div className="p-3 rounded bg-black/40 border border-stone-700/80">
              <div className="text-xs font-display uppercase text-amber-400 font-bold mb-1">
                Kada ir kaip geriausia naudoti
              </div>
              <p className="text-stone-200 leading-relaxed">{selectedItem.whenToUse}</p>
            </div>
          </div>
        </div>
      )}
    </ShieldDialogFrame>
  );
};

/* ============================================================================
 * TAVERN HEROES DIALOGUE WINDOW (PROTOTYPE I)
 * ========================================================================== */
interface HeroDialogueProps {
  hero: TavernHero;
  onSelectHero: (h: TavernHero) => void;
  selectedTopic: HeroTopic | null;
  onSelectTopic: (t: HeroTopic | null) => void;
  onClose: () => void;
}

export const HeroDialogueWindow: React.FC<HeroDialogueProps> = ({
  hero,
  onSelectHero,
  selectedTopic,
  onSelectTopic,
  onClose,
}) => {
  const [hoveredTopicId, setHoveredTopicId] = useState<string | null>(
    hero.topics[0]?.id ?? null
  );

  return (
    <ShieldDialogFrame
      titlePlaque={hero.name}
      subtitlePlaque={hero.classTitle}
      onClose={onClose}
      position="bottom"
    >
      {/* Top Bar: Switch between heroes sitting at the table */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b border-stone-700/80">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-display uppercase tracking-wider text-stone-400">
            Herojai prie stalo:
          </span>
          {TAVERN_HEROES.map((h) => (
            <button
              key={h.id}
              onClick={() => onSelectHero(h)}
              className={`px-3 py-1 rounded font-display text-xs font-bold transition-all ${
                h.id === hero.id
                  ? 'bg-amber-500/25 border border-[#fef08a] text-[#fef08a]'
                  : 'bg-black/35 border border-stone-700 text-stone-300 hover:border-amber-400/60 hover:text-amber-100'
              }`}
            >
              {h.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left: Clean Chevron Topic Choices */}
        <div className="md:col-span-5 space-y-1.5 border-b md:border-b-0 md:border-r border-stone-700/70 pb-4 md:pb-0 md:pr-4">
          <div className="text-xs font-display uppercase tracking-widest text-amber-400 font-bold mb-2">
            Pasirinkite temą:
          </div>
          {hero.topics.map((topic) => {
            const active =
              selectedTopic?.id === topic.id || hoveredTopicId === topic.id;
            return (
              <ShieldOption
                key={topic.id}
                size="md"
                label={topic.title}
                active={active}
                onMouseEnter={() => setHoveredTopicId(topic.id)}
                onClick={() => onSelectTopic(topic)}
              />
            );
          })}

          <div className="pt-2">
            <ShieldOption
              size="md"
              label="Atsisveikinti (Uždaryti)"
              active={hoveredTopicId === 'close'}
              onMouseEnter={() => setHoveredTopicId('close')}
              onClick={onClose}
              muted
            />
          </div>
        </div>

        {/* Right: Selected Topic Advice */}
        <div className="md:col-span-7 space-y-3">
          <p className="text-amber-200/90 italic text-base leading-relaxed">
            {hero.greeting}
          </p>
          {selectedTopic && (
            <div className="space-y-2.5 pt-2 border-t border-stone-700/80">
              <div className="flex items-center justify-between">
                <h4 className="font-display text-base md:text-lg font-bold text-[#fef08a]">
                  {selectedTopic.title}
                </h4>
                <span className="text-xs font-display uppercase tracking-wider text-amber-400 font-bold">
                  {selectedTopic.category}
                </span>
              </div>
              <p className="text-xs md:text-sm text-stone-300 italic">
                {selectedTopic.summary}
              </p>
              <ul className="space-y-2 text-sm md:text-base text-stone-100 leading-relaxed">
                {selectedTopic.tips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#fef08a] font-bold">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
              <div className="text-xs text-stone-400 italic pt-1">
                {selectedTopic.placeholderNote}
              </div>
            </div>
          )}
        </div>
      </div>
    </ShieldDialogFrame>
  );
};
