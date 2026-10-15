import React, { useMemo, useState } from 'react';
import {
  BookOpen,
  Map as MapIcon,
  Trophy,
  ChevronLeft,
  ChevronRight,
  Bookmark,
  X,
  Image as ImageIcon,
  MapPin,
  Sparkles,
  ArrowLeft,
  Eye,
} from 'lucide-react';
import {
  ARCHIVE_BOOK_SPREADS,
  ARCHIVE_MAPS,
  ARCHIVE_TROPHIES,
} from '../data/archiveData';
import { MapMarker, TrophyItem } from '../types';
import { AmbientEffects } from './AmbientEffects';
import { ExitZone } from './ExitZone';

interface ArchiveViewProps {
  onExit: () => void;
}

export const ArchiveView: React.FC<ArchiveViewProps> = ({ onExit }) => {
  // Default book page is the one marked with isBookmarked (previous session)
  const defaultBookIndex = useMemo(() => {
    const idx = ARCHIVE_BOOK_SPREADS.findIndex((s) => s.isBookmarked);
    return idx >= 0 ? idx : Math.max(0, ARCHIVE_BOOK_SPREADS.length - 1);
  }, []);

  const [bookModalOpen, setBookModalOpen] = useState(false);
  const [currentSpreadIndex, setCurrentSpreadIndex] = useState(defaultBookIndex);

  const [mapModalOpen, setMapModalOpen] = useState(false);
  const [currentMapIndex, setCurrentMapIndex] = useState(0);
  const [selectedMarker, setSelectedMarker] = useState<MapMarker | null>(
    ARCHIVE_MAPS[0]?.markers[0] ?? null
  );

  const [inTrophyRoom, setInTrophyRoom] = useState(false);
  const [selectedTrophy, setSelectedTrophy] = useState<TrophyItem | null>(
    ARCHIVE_TROPHIES[0] ?? null
  );

  const [showHotspotHints, setShowHotspotHints] = useState(true);
  const [hoveredLabel, setHoveredLabel] = useState<string | null>(null);

  const openBookOnBookmark = () => {
    setCurrentSpreadIndex(defaultBookIndex);
    setBookModalOpen(true);
  };

  const openMapsModal = () => {
    setCurrentMapIndex(0);
    setSelectedMarker(ARCHIVE_MAPS[0]?.markers[0] ?? null);
    setMapModalOpen(true);
  };

  const currentSpread = ARCHIVE_BOOK_SPREADS[currentSpreadIndex];
  const currentMap = ARCHIVE_MAPS[currentMapIndex];

  return (
    <div className="relative w-screen h-screen bg-stone-950 overflow-hidden select-none">
      {/* Background Archive Illustration */}
      <img
        src="/images/archive.jpg"
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
                Paspauskite ant didžiosios knygos, žemėlapių kampe arba durų į trofėjų kambarį
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
        style={{
          left: '46%',
          top: '56%',
          width: '19%',
          height: '17%',
        }}
        role="button"
        tabIndex={0}
        aria-label="Didžioji Metraščių Knyga"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') openBookOnBookmark();
        }}
        className="absolute z-20 rounded-2xl cursor-pointer transition-all duration-300 hover:bg-amber-400/20 hover:ring-2 hover:ring-amber-300 hover:shadow-[0_0_35px_rgba(251,191,36,0.55)] group"
      >
        {showHotspotHints && (
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-amber-900/95 border border-amber-300 text-amber-50 font-display text-xs font-bold whitespace-nowrap shadow-[0_0_15px_rgba(251,191,36,0.6)] group-hover:scale-110 transition-transform flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-amber-300" />
            Metraščių knyga
          </div>
        )}
      </div>

      {/* 2A. WALL MAP IN LEFT CORNER */}
      <div
        onClick={openMapsModal}
        onMouseEnter={() =>
          setHoveredLabel('Pasaulio žemėlapiai — Pažymėtos žinomos vietovės')
        }
        onMouseLeave={() => setHoveredLabel(null)}
        style={{
          left: '2%',
          top: '28%',
          width: '22%',
          height: '29%',
        }}
        role="button"
        tabIndex={0}
        aria-label="Sieninis žemėlapis"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') openMapsModal();
        }}
        className="absolute z-20 rounded-2xl cursor-pointer transition-all duration-300 hover:bg-amber-400/15 hover:ring-2 hover:ring-amber-300/80 hover:shadow-[0_0_30px_rgba(251,191,36,0.45)] group"
      >
        {showHotspotHints && (
          <div className="absolute top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-stone-950/90 border border-amber-400/80 text-amber-200 font-display text-xs font-bold whitespace-nowrap shadow-lg group-hover:scale-110 transition-transform flex items-center gap-1.5">
            <MapIcon className="w-3.5 h-3.5 text-amber-400" />
            Žemėlapiai
          </div>
        )}
      </div>

      {/* 2B. MAP SCROLL BARRELS IN BOTTOM-LEFT CORNER */}
      <div
        onClick={openMapsModal}
        onMouseEnter={() =>
          setHoveredLabel('Žemėlapių ritiniai — Peržiūrėti turimus žemėlapius')
        }
        onMouseLeave={() => setHoveredLabel(null)}
        style={{
          left: '1%',
          top: '59%',
          width: '29%',
          height: '36%',
        }}
        role="button"
        tabIndex={0}
        aria-label="Žemėlapių ritiniai"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') openMapsModal();
        }}
        className="absolute z-20 rounded-2xl cursor-pointer transition-all duration-300 hover:bg-amber-400/15 hover:ring-2 hover:ring-amber-300/80"
      />

      {/* 3. DOORWAY TO TROPHY ROOM (Right) */}
      <div
        onClick={() => setInTrophyRoom(true)}
        onMouseEnter={() =>
          setHoveredLabel('Kitas kambarys — Trofėjų ir sesijų prisiminimų muziejus')
        }
        onMouseLeave={() => setHoveredLabel(null)}
        style={{
          left: '79%',
          top: '27%',
          width: '15%',
          height: '46%',
        }}
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
      {hoveredLabel && (
        <div className="pointer-events-none fixed bottom-24 left-1/2 -translate-x-1/2 z-30 px-4 py-2 rounded-full bg-stone-950/90 border border-amber-500/70 text-amber-100 text-xs md:text-sm font-semibold shadow-xl">
          {hoveredLabel}
        </div>
      )}

      {/* ===================================================================== */}
      {/* MODAL 1: OPEN BOOK VISUALS (Chronicle Book with Bookmark on last session) */}
      {/* ===================================================================== */}
      {bookModalOpen && currentSpread && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/80 backdrop-blur-sm p-3 md:p-6"
          onClick={() => setBookModalOpen(false)}
        >
          <div
            className="relative w-full max-w-5xl flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Session Tabs & Close Bar */}
            <div className="w-full flex flex-wrap items-center justify-between gap-2 mb-3 px-2">
              <div className="flex flex-wrap items-center gap-2">
                {ARCHIVE_BOOK_SPREADS.map((spread, idx) => (
                  <button
                    key={spread.id}
                    onClick={() => setCurrentSpreadIndex(idx)}
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-display text-xs md:text-sm font-bold border transition-all ${
                      idx === currentSpreadIndex
                        ? 'bg-amber-700 border-amber-300 text-white shadow-lg'
                        : 'bg-stone-900/90 border-amber-800/60 text-amber-200/80 hover:bg-stone-800'
                    }`}
                  >
                    {spread.isBookmarked && (
                      <Bookmark className="w-3.5 h-3.5 text-red-400 fill-red-500" />
                    )}
                    {spread.tabLabel}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setBookModalOpen(false)}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 border border-amber-700/60 text-amber-200 text-xs font-display font-bold uppercase"
              >
                <X className="w-4 h-4" />
                Užversti knygą
              </button>
            </div>

            {/* Leather Book Cover & Two Open Parchment Pages */}
            <div className="relative w-full rounded-2xl p-3 md:p-5 bg-gradient-to-b from-[#451a03] via-[#291002] to-[#1c0a00] border-4 border-amber-700/80 shadow-[0_25px_70px_rgba(0,0,0,0.95)]">
              {/* Red Ribbon Bookmark at the top spine when viewing the bookmarked session */}
              {currentSpread.isBookmarked && (
                <div
                  title="Žymeklis: Paskutinė sesija"
                  className="absolute -top-3 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center"
                >
                  <div className="w-7 h-16 bg-gradient-to-b from-red-700 via-red-600 to-red-800 shadow-lg border-x border-red-400/40 flex items-start justify-center pt-1.5">
                    <Bookmark className="w-4 h-4 text-amber-200 fill-amber-200" />
                  </div>
                </div>
              )}

              {/* Open 2-Page Spread Grid */}
              <div className="relative grid grid-cols-1 md:grid-cols-2 rounded-xl overflow-hidden bg-[#f5ebd6] text-stone-900 shadow-inner min-h-[460px] md:min-h-[520px]">
                {/* Center Book Spine Shadow (Desktop) */}
                <div
                  className="hidden md:block pointer-events-none absolute inset-y-0 left-1/2 -translate-x-1/2 w-12 z-20"
                  style={{
                    background:
                      'linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(68,32,8,0.22) 38%, rgba(28,12,2,0.55) 50%, rgba(68,32,8,0.22) 62%, rgba(0,0,0,0) 100%)',
                  }}
                />

                {/* LEFT PAGE: SHORT STORY */}
                <div className="p-6 md:p-9 flex flex-col justify-between border-b md:border-b-0 md:border-r border-amber-900/20 bg-gradient-to-r from-[#efe1c6] via-[#f7eedc] to-[#ead9b8]">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b-2 border-amber-900/25 pb-2">
                      <span className="font-display text-xs uppercase tracking-widest text-amber-900/80 font-bold">
                        {currentSpread.dateLabel}
                      </span>
                      {currentSpread.isBookmarked && (
                        <span className="px-2.5 py-0.5 rounded-full bg-red-800 text-amber-50 text-[11px] font-display font-bold">
                          Paskutinė sesija
                        </span>
                      )}
                    </div>

                    <h2 className="font-display text-xl md:text-2xl font-bold text-[#3b1d06] leading-snug">
                      {currentSpread.title}
                    </h2>

                    <div className="space-y-3 text-[#2d1808] text-base md:text-lg leading-relaxed">
                      {currentSpread.storyParagraphs.map((paragraph, index) => (
                        <p
                          key={index}
                          className={
                            index === 0
                              ? 'first-letter:float-left first-letter:font-display first-letter:text-4xl first-letter:font-bold first-letter:mr-2.5 first-letter:text-amber-900 whitespace-pre-line'
                              : 'whitespace-pre-line'
                          }
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 flex items-center justify-between text-xs text-amber-900/70 font-display font-bold">
                    <span>Kairysis puslapis — Istorija</span>
                    <span>Psl. {currentSpreadIndex * 2 + 1}</span>
                  </div>
                </div>

                {/* RIGHT PAGE: ILLUSTRATION */}
                <div className="p-6 md:p-9 flex flex-col justify-between bg-gradient-to-l from-[#efe1c6] via-[#f7eedc] to-[#ead9b8]">
                  <div className="space-y-4 flex-1 flex flex-col">
                    <div className="flex items-center justify-between border-b-2 border-amber-900/25 pb-2">
                      <span className="font-display text-xs uppercase tracking-widest text-amber-900/80 font-bold">
                        Sesijos iliustracija
                      </span>
                      <span className="text-xs text-amber-900/70 font-semibold">
                        {currentSpread.tabLabel}
                      </span>
                    </div>

                    {/* Illustration Frame */}
                    <div className="flex-1 rounded-xl border-2 border-dashed border-amber-900/40 bg-[#e6d3b3]/70 p-6 flex flex-col items-center justify-center text-center space-y-3 shadow-inner min-h-[260px]">
                      <div className="w-16 h-16 rounded-full bg-amber-900/15 border border-amber-900/30 flex items-center justify-center text-amber-900">
                        <ImageIcon className="w-8 h-8" />
                      </div>
                      <h3 className="font-display text-lg font-bold text-[#3b1d06]">
                        {currentSpread.illustrationTitle}
                      </h3>
                      <p className="text-sm text-[#4a2c11] max-w-sm">
                        {currentSpread.illustrationCaption}
                      </p>
                      <span className="px-3 py-1 rounded-md bg-amber-900/15 border border-amber-900/25 text-xs text-amber-950 font-semibold">
                        {currentSpread.illustrationPlaceholderNote}
                      </span>
                    </div>
                  </div>

                  <div className="pt-6 flex items-center justify-between text-xs text-amber-900/70 font-display font-bold">
                    <span>Dešinysis puslapis — Iliustracija</span>
                    <span>Psl. {currentSpreadIndex * 2 + 2}</span>
                  </div>
                </div>
              </div>

              {/* Page Turning Controls */}
              <div className="mt-4 flex items-center justify-between px-2">
                <button
                  onClick={() =>
                    setCurrentSpreadIndex((prev) => Math.max(0, prev - 1))
                  }
                  disabled={currentSpreadIndex === 0}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-stone-900 hover:bg-stone-800 disabled:opacity-40 disabled:pointer-events-none border border-amber-600/60 text-amber-200 font-display text-xs md:text-sm font-bold transition-all"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Ankstesnis puslapis
                </button>

                <div className="text-xs md:text-sm text-amber-300/90 font-display">
                  Atversta: <strong>{currentSpread.tabLabel}</strong> ({currentSpreadIndex + 1} iš{' '}
                  {ARCHIVE_BOOK_SPREADS.length})
                </div>

                <button
                  onClick={() =>
                    setCurrentSpreadIndex((prev) =>
                      Math.min(ARCHIVE_BOOK_SPREADS.length - 1, prev + 1)
                    )
                  }
                  disabled={currentSpreadIndex === ARCHIVE_BOOK_SPREADS.length - 1}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-stone-900 hover:bg-stone-800 disabled:opacity-40 disabled:pointer-events-none border border-amber-600/60 text-amber-200 font-display text-xs md:text-sm font-bold transition-all"
                >
                  Kitas puslapis
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* MODAL 2: WORLD MAP WITH KNOWN LOCATIONS (Forward/Back pagination)     */}
      {/* ===================================================================== */}
      {mapModalOpen && currentMap && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setMapModalOpen(false)}
        >
          <div
            className="w-full max-w-5xl rounded-2xl bg-gradient-to-b from-stone-900 via-stone-900 to-stone-950 border-2 border-amber-600/75 shadow-[0_0_60px_rgba(0,0,0,0.95)] overflow-hidden text-amber-50 flex flex-col max-h-[88vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="px-6 py-4 bg-gradient-to-r from-amber-950/90 via-stone-900 to-amber-950/90 border-b border-amber-700/50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-amber-500/20 border border-amber-400/60 text-amber-300">
                  <MapIcon className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="font-display text-lg md:text-xl font-bold text-amber-200">
                    {currentMap.title}
                  </h2>
                  <p className="text-xs text-amber-400/80">
                    {currentMap.regionSubtitle} • {currentMap.acquiredNote}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setMapModalOpen(false)}
                className="p-1.5 rounded-lg text-amber-300/70 hover:text-amber-100 hover:bg-amber-900/40 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body: Interactive Parchment Map + Location Details */}
            <div className="p-6 overflow-y-auto flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Map Canvas (2 cols) */}
              <div className="lg:col-span-2 relative rounded-xl overflow-hidden border-2 border-amber-700/70 bg-[#dfcca8] min-h-[340px] md:min-h-[420px] shadow-inner">
                {/* Stylized antique cartography SVG background */}
                <svg
                  viewBox="0 0 800 500"
                  className="w-full h-full object-cover opacity-80"
                >
                  <rect width="800" height="500" fill="#dcc59a" />
                  {/* Grid lines */}
                  <g stroke="#8c6239" strokeWidth="0.6" strokeDasharray="4 4" opacity="0.45">
                    <line x1="0" y1="125" x2="800" y2="125" />
                    <line x1="0" y1="250" x2="800" y2="250" />
                    <line x1="0" y1="375" x2="800" y2="375" />
                    <line x1="200" y1="0" x2="200" y2="500" />
                    <line x1="400" y1="0" x2="400" y2="500" />
                    <line x1="600" y1="0" x2="600" y2="500" />
                  </g>
                  {/* Winding River */}
                  <path
                    d="M 80 480 Q 220 350 380 280 T 680 80"
                    fill="none"
                    stroke="#6b8e9b"
                    strokeWidth="12"
                    strokeLinecap="round"
                  />
                  {/* Roads connecting locations */}
                  <path
                    d="M 384 270 L 224 170 M 384 270 L 528 140 M 384 270 L 576 330"
                    fill="none"
                    stroke="#78350f"
                    strokeWidth="3"
                    strokeDasharray="8 6"
                  />
                  {/* Compass Rose */}
                  <g transform="translate(710, 410)">
                    <circle cx="0" cy="0" r="34" fill="#efe1c6" stroke="#78350f" strokeWidth="2" />
                    <polygon points="0,-28 6,0 0,-6 -6,0" fill="#78350f" />
                    <polygon points="0,28 6,0 0,6 -6,0" fill="#a16207" />
                    <text
                      x="0"
                      y="-32"
                      textAnchor="middle"
                      fontSize="12"
                      fontWeight="bold"
                      fill="#451a03"
                    >
                      Š
                    </text>
                  </g>
                </svg>

                {/* Map Location Pins */}
                {currentMap.markers.map((marker) => {
                  const isSelected = selectedMarker?.id === marker.id;
                  return (
                    <button
                      key={marker.id}
                      onClick={() => setSelectedMarker(marker)}
                      style={{
                        left: `${marker.x}%`,
                        top: `${marker.y}%`,
                      }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 group"
                    >
                      <div
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border-2 font-display text-xs font-bold transition-all shadow-lg ${
                          isSelected
                            ? 'bg-red-800 border-amber-200 text-amber-50 scale-110 shadow-[0_0_20px_rgba(185,28,28,0.8)]'
                            : 'bg-stone-900/90 border-amber-500 text-amber-100 hover:scale-105'
                        }`}
                      >
                        <MapPin className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                        <span>{marker.name}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Selected Location Info Panel */}
              <div className="flex flex-col justify-between p-5 rounded-xl bg-stone-800/80 border border-amber-700/50 space-y-4">
                {selectedMarker ? (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-950 border border-amber-500/60 text-amber-300 text-xs font-bold">
                        {selectedMarker.type}
                      </span>
                      <span className="text-xs text-stone-400 font-semibold">
                        {selectedMarker.status}
                      </span>
                    </div>

                    <h3 className="font-display text-xl font-bold text-amber-200">
                      {selectedMarker.name}
                    </h3>

                    <p className="text-sm md:text-base text-amber-100/90 leading-relaxed">
                      {selectedMarker.description}
                    </p>
                  </div>
                ) : (
                  <p className="text-sm text-stone-400">
                    Paspauskite ant vietovės žymeklio žemėlapyje.
                  </p>
                )}

                <div className="pt-4 border-t border-stone-700 space-y-2">
                  <div className="text-xs text-amber-400 font-display uppercase tracking-wider font-bold">
                    Pažymėtos vietovės ({currentMap.markers.length}):
                  </div>
                  <div className="space-y-1.5">
                    {currentMap.markers.map((m) => (
                      <button
                        key={m.id}
                        onClick={() => setSelectedMarker(m)}
                        className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                          selectedMarker?.id === m.id
                            ? 'bg-amber-900/70 text-amber-100 border border-amber-500/60'
                            : 'bg-stone-900/70 text-stone-300 hover:bg-stone-900'
                        }`}
                      >
                        • {m.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer: Forward / Back between maps (starts with 1) */}
            <div className="px-6 py-3.5 bg-stone-950/90 border-t border-amber-900/40 flex items-center justify-between">
              <button
                onClick={() => {
                  const nextIdx = Math.max(0, currentMapIndex - 1);
                  setCurrentMapIndex(nextIdx);
                  setSelectedMarker(ARCHIVE_MAPS[nextIdx]?.markers[0] ?? null);
                }}
                disabled={currentMapIndex === 0}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-stone-900 hover:bg-stone-800 disabled:opacity-40 disabled:pointer-events-none border border-amber-700/60 text-amber-200 font-display text-xs font-bold"
              >
                <ChevronLeft className="w-4 h-4" />
                Ankstesnis žemėlapis
              </button>

              <span className="font-display text-xs md:text-sm text-amber-300 font-bold">
                Žemėlapis {currentMapIndex + 1} iš {ARCHIVE_MAPS.length} (Atrakinama žaidimo eigoje)
              </span>

              <button
                onClick={() => {
                  const nextIdx = Math.min(ARCHIVE_MAPS.length - 1, currentMapIndex + 1);
                  setCurrentMapIndex(nextIdx);
                  setSelectedMarker(ARCHIVE_MAPS[nextIdx]?.markers[0] ?? null);
                }}
                disabled={currentMapIndex === ARCHIVE_MAPS.length - 1}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-stone-900 hover:bg-stone-800 disabled:opacity-40 disabled:pointer-events-none border border-amber-700/60 text-amber-200 font-display text-xs font-bold"
              >
                Kitas žemėlapis
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* MODAL / VIEW 3: TROPHY ROOM (Museum of Session Memories)              */}
      {/* ===================================================================== */}
      {inTrophyRoom && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/85 backdrop-blur-md p-4"
          onClick={() => setInTrophyRoom(false)}
        >
          <div
            className="w-full max-w-5xl rounded-2xl bg-gradient-to-b from-stone-900 via-stone-900 to-stone-950 border-2 border-amber-500/80 shadow-[0_0_70px_rgba(0,0,0,0.95)] overflow-hidden text-amber-50 flex flex-col max-h-[88vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="px-6 py-4 bg-gradient-to-r from-amber-950/90 via-stone-900 to-amber-950/90 border-b border-amber-700/50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-amber-500/20 border border-amber-400/60 text-amber-300">
                  <Trophy className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="font-display text-lg md:text-xl font-bold text-amber-200">
                    Trofėjų ir Prisiminimų Menė (Sesijų Muziejus)
                  </h2>
                  <p className="text-xs text-amber-400/80">
                    Praėjusių sesijų relikvijos, keisti radiniai ir nuotykių albumas
                  </p>
                </div>
              </div>

              <button
                onClick={() => setInTrophyRoom(false)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-stone-800 hover:bg-stone-700 border border-amber-600/50 text-amber-200 text-xs font-display font-bold uppercase transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Grįžti į pagrindinį Archyvą
              </button>
            </div>

            {/* Body: Museum Shelves + Selected Trophy Album Card */}
            <div className="p-6 overflow-y-auto flex-1 grid grid-cols-1 lg:grid-cols-5 gap-6">
              {/* Left 3 cols: Wooden Museum Shelves Grid */}
              <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {ARCHIVE_TROPHIES.map((trophy) => {
                  const active = selectedTrophy?.id === trophy.id;
                  return (
                    <button
                      key={trophy.id}
                      onClick={() => setSelectedTrophy(trophy)}
                      className={`p-5 rounded-xl text-left border-2 transition-all flex flex-col justify-between gap-3 ${
                        active
                          ? 'bg-gradient-to-br from-amber-950/80 to-stone-900 border-amber-400 shadow-[0_0_25px_rgba(251,191,36,0.3)]'
                          : 'bg-stone-800/70 border-amber-900/50 hover:border-amber-600/70 hover:bg-stone-800'
                      }`}
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between gap-2">
                          <span className="px-2.5 py-0.5 rounded-full bg-amber-900/60 border border-amber-500/40 text-amber-300 text-[11px] font-bold">
                            {trophy.sessionLabel}
                          </span>
                          <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                        </div>
                        <h3 className="font-display text-base md:text-lg font-bold text-amber-200">
                          {trophy.name}
                        </h3>
                        <p className="text-xs md:text-sm text-stone-300 leading-relaxed">
                          {trophy.shortNote}
                        </p>
                      </div>
                      <div className="text-[11px] text-amber-400/80 font-semibold border-t border-stone-700/80 pt-2">
                        Vieta: {trophy.shelfSlot}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Right 2 cols: Selected Trophy Memory Details */}
              <div className="lg:col-span-2 p-6 rounded-xl bg-stone-800/85 border-2 border-amber-600/60 flex flex-col justify-between space-y-4">
                {selectedTrophy ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-amber-800/40 pb-3">
                      <span className="text-xs font-display uppercase tracking-wider text-amber-400 font-bold">
                        {selectedTrophy.category}
                      </span>
                      <span className="px-3 py-0.5 rounded-full bg-amber-950 border border-amber-500/60 text-amber-200 text-xs font-bold">
                        {selectedTrophy.sessionLabel}
                      </span>
                    </div>

                    <h3 className="font-display text-xl md:text-2xl font-bold text-amber-200">
                      {selectedTrophy.name}
                    </h3>

                    <div className="p-4 rounded-lg bg-stone-900/90 border border-stone-700 space-y-1.5">
                      <div className="text-xs font-display uppercase tracking-wider text-amber-400 font-bold">
                        Sesijos prisiminimas / Istorija:
                      </div>
                      <p className="text-sm md:text-base text-amber-100/95 leading-relaxed">
                        {selectedTrophy.fullStoryPlaceholder}
                      </p>
                    </div>

                    <div className="p-4 rounded-lg bg-amber-950/35 border border-amber-700/50 space-y-1">
                      <div className="text-xs font-display uppercase tracking-wider text-amber-300 font-bold">
                        Keista savybė:
                      </div>
                      <p className="text-sm text-amber-100 italic">
                        „{selectedTrophy.quirkNote}“
                      </p>
                    </div>
                  </div>
                ) : null}

                <div className="p-3 rounded-lg bg-stone-950/75 border border-dashed border-stone-700 text-xs text-stone-400">
                  Naujus trofėjus ir sesijų kuriozus galite pridėti faile{' '}
                  <code className="text-amber-300">src/data/archiveData.ts</code>.
                </div>
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
