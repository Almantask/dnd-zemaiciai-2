import React, { useEffect, useState } from 'react';
import { PlaceId } from './types';
import { TownView } from './components/TownView';
import { TavernView } from './components/TavernView';
import { ArchiveView } from './components/ArchiveView';
import { CurrencyHelpModal } from './components/CurrencyHelpModal';

export const App: React.FC = () => {
  const [currentPlace, setCurrentPlace] = useState<PlaceId>('town');
  const [currencyModalOpen, setCurrencyModalOpen] = useState(false);
  const [readerOpen, setReaderOpen] = useState(false);

  // Support browser Back button to exit an establishment back to the town
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      const place = (event.state?.place as PlaceId) || 'town';
      setCurrentPlace(place);
    };

    window.addEventListener('popstate', handlePopState);
    // Initialize root history state
    window.history.replaceState({ place: 'town' }, '', window.location.pathname);

    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateToPlace = (place: PlaceId) => {
    if (place === currentPlace) return;
    window.history.pushState({ place }, '', `#${place}`);
    setCurrentPlace(place);
  };

  const handleExitToTown = () => {
    if (currentPlace === 'town') return;
    window.history.pushState({ place: 'town' }, '', window.location.pathname);
    setCurrentPlace('town');
  };

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-stone-950">
      {/* Global "?" LDK XV c. Currency Help Button & Modal */}
      <CurrencyHelpModal onOpenChange={setCurrencyModalOpen} hidden={readerOpen} />

      {/* Scene Router */}
      {currentPlace === 'town' && <TownView onSelectPlace={navigateToPlace} />}
      {currentPlace === 'tavern' && (
        <TavernView
          onExit={handleExitToTown}
          isGlobalMenuOpen={currencyModalOpen}
        />
      )}
      {currentPlace === 'archive' && (
        <ArchiveView
          onExit={handleExitToTown}
          isGlobalMenuOpen={currencyModalOpen}
          onReaderOpenChange={setReaderOpen}
        />
      )}
    </main>
  );
};

export default App;
