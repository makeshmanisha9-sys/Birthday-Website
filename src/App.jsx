import React, { useState } from 'react';
import AmbientCanvas from './components/AmbientCanvas';
import AudioPlayerPill from './components/AudioPlayerPill';
import LuxuryNavbar from './components/LuxuryNavbar';
import CinematicIntro from './components/CinematicIntro';
import BirthdayReveal from './components/BirthdayReveal';
import MemoryGallery from './components/MemoryGallery';
import CinematicVideoShowcase from './components/CinematicVideoShowcase';
import ALetterForYou from './components/ALetterForYou';
import TheGrandFinale from './components/TheGrandFinale';
import PersonalizationDrawer from './components/PersonalizationDrawer';
import { birthdayData as initialData } from './data/birthdayData';

export default function App() {
  const [data, setData] = useState(initialData);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);

  const handleScrollToReveal = () => {
    const el = document.getElementById('reveal-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToMemories = () => {
    const el = document.getElementById('memories-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleReplay = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-luxury-darkest text-champagne-100 overflow-x-hidden film-grain">
      {/* Dynamic Ambient Background Canvas */}
      <AmbientCanvas />

      {/* Floating Audio Soundtrack Player */}
      <AudioPlayerPill />

      {/* Fixed Luxury Navigation Bar */}
      <LuxuryNavbar
        data={data}
        onOpenCustomizer={() => setIsCustomizerOpen(true)}
      />

      {/* Main Experience Flow */}
      <main className="relative z-10 flex flex-col w-full">
        {/* 1. CINEMATIC INTRO */}
        <CinematicIntro
          data={data}
          onEnter={handleScrollToReveal}
        />

        {/* 2. THE BIRTHDAY REVEAL */}
        <BirthdayReveal
          data={data}
          onScrollToMemories={handleScrollToMemories}
        />

        {/* 3. THE MEMORY GALLERY */}
        <MemoryGallery data={data} />

        {/* 4. MY SPECIAL VIDEO EDIT – CINEMATIC SHOWCASE */}
        <CinematicVideoShowcase data={data} />

        {/* 5. A LETTER FOR YOU */}
        <ALetterForYou data={data} />

        {/* 6. THE GRAND FINALE */}
        <TheGrandFinale
          data={data}
          onReplay={handleReplay}
        />
      </main>

      {/* Interactive Live Customizer Drawer */}
      <PersonalizationDrawer
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        currentData={data}
        onUpdateData={setData}
      />
    </div>
  );
}
