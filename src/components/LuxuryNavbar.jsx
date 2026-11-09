import React, { useState, useEffect } from 'react';
import { Sparkles, SlidersHorizontal, Gift, Camera, Film, Feather, Crown } from 'lucide-react';
import { birthdayData as fallbackData } from '../data/birthdayData';

export default function LuxuryNavbar({ onOpenCustomizer, data = fallbackData }) {
  const content = data || fallbackData;
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
          ? 'py-3 bg-luxury-darkest/85 backdrop-blur-md border-b border-champagne-500/15 shadow-luxury'
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Monogram Brand */}
        <div
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-full border border-champagne-500/40 bg-luxury-surface/70 flex items-center justify-center group-hover:border-champagne-400 group-hover:scale-105 transition-all">
            <span className="font-cinzel text-xs font-bold text-champagne-300">
              {content.recipient.firstName[0]}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-cinzel text-xs uppercase tracking-[0.2em] text-champagne-200 font-semibold group-hover:text-champagne-400 transition-colors">
              {content.recipient.fullName}
            </span>
            <span className="text-[10px] text-champagne-400/60 font-sans tracking-widest uppercase">
              {content.recipient.birthdayDate}
            </span>
          </div>
        </div>

        {/* Section Jump Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-6 text-xs uppercase tracking-widest font-cinzel text-champagne-300/80">
          <button
            onClick={() => scrollTo('reveal-section')}
            className="hover:text-champagne-400 transition-colors flex items-center gap-1.5"
          >
            <Gift className="w-3.5 h-3.5" />
            <span>The Reveal</span>
          </button>
          <button
            onClick={() => scrollTo('memories-section')}
            className="hover:text-champagne-400 transition-colors flex items-center gap-1.5"
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Memories</span>
          </button>
          <button
            onClick={() => scrollTo('video-section')}
            className="hover:text-champagne-400 transition-colors flex items-center gap-1.5"
          >
            <Film className="w-3.5 h-3.5" />
            <span>Special Film</span>
          </button>
          <button
            onClick={() => scrollTo('letter-section')}
            className="hover:text-champagne-400 transition-colors flex items-center gap-1.5"
          >
            <Feather className="w-3.5 h-3.5" />
            <span>The Letter</span>
          </button>
          <button
            onClick={() => scrollTo('finale-section')}
            className="hover:text-champagne-400 transition-colors flex items-center gap-1.5"
          >
            <Crown className="w-3.5 h-3.5 text-champagne-400" />
            <span>Grand Finale</span>
          </button>
        </nav>

        {/* Customizer Drawer Trigger Button */}
        <div className="flex items-center gap-3 pr-28 sm:pr-44">
          <button
            onClick={onOpenCustomizer}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-luxury-surface/80 border border-champagne-500/25 hover:border-champagne-400 text-champagne-300 text-xs font-sans hover:bg-champagne-500/10 transition-all"
            title="Personalize Name, Date, Photos & Messages"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-champagne-400" />
            <span className="hidden sm:inline text-[11px] uppercase tracking-wider">
              Personalize
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
