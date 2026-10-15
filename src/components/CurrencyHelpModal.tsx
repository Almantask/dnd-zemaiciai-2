import React, { useState } from 'react';
import { Coins, X } from 'lucide-react';
import { CURRENCY_DATA, CURRENCY_INTRO, CURRENCY_TITLE } from '../data/currencyData';

export const CurrencyHelpModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Corner "?" button */}
      <button
        onClick={() => setIsOpen(true)}
        title="LDK XV a. pinigų paaiškinimas"
        aria-label="LDK XV a. pinigų paaiškinimas"
        className="fixed top-4 right-4 z-40 flex items-center justify-center w-11 h-11 rounded-full bg-gradient-to-b from-amber-800 via-amber-900 to-stone-900 border-2 border-amber-400/80 text-amber-200 font-display text-xl font-bold shadow-[0_0_20px_rgba(245,158,11,0.35)] hover:scale-105 hover:border-amber-300 hover:text-white transition-all duration-200"
      >
        ?
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-fadeIn"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative w-full max-w-2xl rounded-xl bg-gradient-to-b from-stone-900 via-stone-900 to-stone-950 border-2 border-amber-600/70 shadow-[0_0_50px_rgba(0,0,0,0.9)] overflow-hidden text-amber-50"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-amber-950/90 via-stone-900 to-amber-950/90 border-b border-amber-700/50">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-amber-500/15 border border-amber-500/40 text-amber-300">
                  <Coins className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="font-display text-lg md:text-xl font-bold text-amber-200 tracking-wide">
                    {CURRENCY_TITLE}
                  </h2>
                  <p className="text-xs text-amber-400/80">
                    Vytauto Didžiojo laikų monetos ir kainų santykis
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-amber-300/70 hover:text-amber-100 hover:bg-amber-900/40 transition-colors"
                aria-label="Uždaryti"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              <p className="text-amber-100/90 text-base leading-relaxed">
                {CURRENCY_INTRO}
              </p>

              <div className="space-y-3">
                {CURRENCY_DATA.map((coin) => (
                  <div
                    key={coin.id}
                    className="p-4 rounded-lg bg-stone-800/70 border border-amber-800/40 hover:border-amber-600/60 transition-colors"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                      <span className="font-display font-bold text-amber-200 text-base md:text-lg">
                        {coin.ltName}
                      </span>
                      <span
                        className={`px-3 py-0.5 rounded-full text-xs md:text-sm font-bold bg-gradient-to-r border ${coin.badgeColor}`}
                      >
                        = {coin.dndCode} ({coin.dndFull})
                      </span>
                    </div>
                    <p className="text-amber-100/90 text-sm md:text-base leading-relaxed">
                      {coin.description}
                    </p>
                    <div className="mt-2 text-xs text-amber-400/80 font-semibold">
                      Santykis: {coin.conversion}
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-3.5 rounded-lg bg-amber-950/40 border border-amber-700/40 text-xs md:text-sm text-amber-200/90 flex items-center justify-between">
                <span>
                  <strong>Trumpa atmintinė:</strong> 1 Kapa (PP) = 10 Auksinų (GP) = 100 Grašių (SP) = 1000 Denarų (CP)
                </span>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-3 bg-stone-950/80 border-t border-amber-900/40 flex justify-end">
              <button
                onClick={() => setIsOpen(false)}
                className="px-6 py-2 rounded-lg bg-gradient-to-b from-amber-600 to-amber-800 hover:from-amber-500 hover:to-amber-700 text-amber-50 font-display font-bold text-sm tracking-wider border border-amber-400/50 shadow-md transition-all"
              >
                Supratau
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
