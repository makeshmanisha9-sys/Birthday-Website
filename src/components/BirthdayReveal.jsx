import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, ArrowDown, Heart, Award } from 'lucide-react';
import GiftBox3D from './GiftBox3D';
import { birthdayData as fallbackData } from '../data/birthdayData';

export default function BirthdayReveal({ onScrollToMemories, data = fallbackData }) {
  const content = data || fallbackData;
  const [isOpened, setIsOpened] = useState(false);

  const handleBoxOpen = () => {
    setIsOpened(true);

    try {
      confetti({
        particleCount: 80,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#E5C158', '#F3EACD', '#7E1F45', '#FFFBF0'],
        ticks: 200,
        gravity: 0.8,
        scalar: 1.1,
      });

      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 60,
          origin: { x: 0.2, y: 0.65 },
          colors: ['#D4AF37', '#F3EACD', '#5F1734'],
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 60,
          origin: { x: 0.8, y: 0.65 },
          colors: ['#D4AF37', '#F3EACD', '#5F1734'],
        });
      }, 350);
    } catch (e) {
      // gracefully handle confetti
    }
  };

  return (
    <section id="reveal-section" className="relative min-h-screen w-full py-20 px-6 flex flex-col items-center justify-center">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-burgundy-900/20 rounded-full blur-[140px] pointer-events-none" />

      {/* Header Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-6 z-10"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-luxury-surface/80 border border-champagne-500/20 text-champagne-400 text-xs tracking-[0.25em] uppercase font-cinzel mb-3">
          <Award className="w-3.5 h-3.5 text-champagne-400" />
          <span>{content.giftBox.tagline}</span>
        </div>
        <h2 className="font-cinzel text-3xl sm:text-5xl text-gold-gradient font-bold tracking-tight">
          The Bespoke Unveiling
        </h2>
        <p className="mt-2 text-sm sm:text-base text-champagne-200/60 font-sans max-w-md mx-auto">
          {content.giftBox.hint}
        </p>
      </motion.div>

      {/* 3D Interactive Box */}
      <div className="relative z-10 my-4">
        <GiftBox3D isOpened={isOpened} onOpen={handleBoxOpen} />
      </div>

      {/* Revealed Message Card */}
      <AnimatePresence>
        {isOpened && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-20 mt-8 max-w-2xl w-full"
          >
            <div className="p-8 sm:p-10 rounded-2xl luxury-glass border border-champagne-500/30 shadow-luxury text-center relative overflow-hidden">
              {/* Corner Ornaments */}
              <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-champagne-500/40" />
              <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-champagne-500/40" />
              <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-champagne-500/40" />
              <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-champagne-500/40" />

              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-burgundy-900/50 border border-champagne-500/30 text-champagne-300 mb-4">
                <Heart className="w-5 h-5 fill-champagne-400/30 text-champagne-400" />
              </div>

              <h3 className="font-cinzel text-2xl sm:text-3xl text-gold-gradient font-bold mb-4">
                {content.giftBox.openedTitle}
              </h3>

              <blockquote className="font-serif italic text-lg sm:text-xl text-champagne-200/90 leading-relaxed mb-4">
                {content.giftBox.quote}
              </blockquote>

              <p className="text-sm text-champagne-300/70 font-sans leading-relaxed max-w-lg mx-auto">
                {content.giftBox.description}
              </p>

              <div className="mt-8 pt-6 border-t border-champagne-500/15 flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={onScrollToMemories}
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-champagne-500 text-luxury-darkest font-cinzel text-xs tracking-[0.2em] uppercase font-bold hover:bg-champagne-400 hover:shadow-gold-glow transition-all duration-300"
                >
                  <span>{content.giftBox.scrollPrompt}</span>
                  <ArrowDown className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
