import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ChevronDown } from 'lucide-react';
import { birthdayData as fallbackData } from '../data/birthdayData';
import { audioManager } from '../utils/audioManager';

export default function CinematicIntro({ onEnter, data = fallbackData }) {
  const content = data || fallbackData;

  const handleEnter = () => {
    // Start soundtrack on user gesture
    audioManager.startMusic(content.audio?.url);
    onEnter();
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center px-6 text-center overflow-hidden">
      {/* Cinematic Lighting Cones & Atmospheric Vignette */}
      <div className="absolute inset-0 bg-dark-radial pointer-events-none" />
      <div className="absolute top-1/4 -left-40 w-96 h-96 rounded-full bg-burgundy-900/40 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-40 w-96 h-96 rounded-full bg-champagne-600/20 blur-[130px] pointer-events-none" />

      {/* Luxury Film Crest / Emblem */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 mb-8"
      >
        <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full border border-champagne-500/30 flex items-center justify-center bg-luxury-surface/60 backdrop-blur-md shadow-luxury-glow">
          <Sparkles className="w-8 h-8 text-champagne-400 stroke-[1.2] animate-pulse" />
        </div>
        <div className="mt-3 text-[11px] uppercase tracking-[0.35em] text-champagne-400/80 font-cinzel">
          Private Invitation • A Tribute
        </div>
      </motion.div>

      {/* Dramatic Text Reveal Sequence */}
      <div className="relative z-10 max-w-4xl space-y-6">
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif italic text-2xl sm:text-3xl md:text-4xl text-champagne-200/80 font-light tracking-wide"
        >
          {content.intro.quote1}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.8, delay: 1.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-cinzel text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-gold-gradient font-bold drop-shadow-2xl"
        >
          {content.intro.quote2}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 3.0 }}
          className="text-sm sm:text-base text-champagne-300/60 font-sans max-w-xl mx-auto font-light tracking-wide"
        >
          {content.intro.subtitle}
        </motion.p>
      </div>

      {/* Luxury "ENTER THE SURPRISE" CTA Button */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 3.6 }}
        className="relative z-10 mt-12 sm:mt-16"
      >
        <button
          onClick={handleEnter}
          className="group relative inline-flex items-center gap-3 px-8 sm:px-12 py-4 rounded-full bg-gradient-to-r from-burgundy-900 via-luxury-card to-burgundy-950 border border-champagne-500/40 text-champagne-100 font-cinzel text-xs sm:text-sm tracking-[0.25em] font-semibold uppercase shadow-luxury-glow hover:shadow-gold-glow hover:border-champagne-400 hover:scale-105 active:scale-95 transition-all duration-500"
        >
          {/* Subtle button border glow shimmer */}
          <span className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-champagne-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          
          <Sparkles className="w-4 h-4 text-champagne-400 group-hover:rotate-12 transition-transform duration-300" />
          <span>{content.intro.enterButtonText}</span>
          <ChevronDown className="w-4 h-4 text-champagne-400 animate-bounce" />
        </button>
      </motion.div>

      {/* Bottom Hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 4.5, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-champagne-400/70 font-sans">
          Sound On For The Full Experience
        </span>
      </motion.div>
    </section>
  );
}
