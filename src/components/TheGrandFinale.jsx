import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Crown, RotateCcw, Wine, Compass, Heart, Share2, Check } from 'lucide-react';
import { birthdayData as fallbackData } from '../data/birthdayData';
import { audioManager } from '../utils/audioManager';

export default function TheGrandFinale({ onReplay, data = fallbackData }) {
  const content = data || fallbackData;
  const [toastCount, setToastCount] = useState(0);
  const [copied, setCopied] = useState(false);

  const handleRaiseToast = () => {
    audioManager.playToastSound();
    setToastCount((prev) => prev + 1);

    try {
      const count = 120;
      const defaults = {
        origin: { y: 0.7 },
        colors: ['#D4AF37', '#F3EACD', '#E5C158', '#7E1F45', '#FFFFFF'],
      };

      function fire(particleRatio, opts) {
        confetti({
          ...defaults,
          ...opts,
          particleCount: Math.floor(count * particleRatio),
        });
      }

      fire(0.25, { spread: 26, startVelocity: 55 });
      fire(0.2, { spread: 60 });
      fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
      fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
      fire(0.1, { spread: 120, startVelocity: 45 });
    } catch (e) {
      // ignore
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="finale-section" className="relative min-h-screen py-28 px-6 flex flex-col items-center justify-center text-center overflow-hidden">
      {/* Spectacular Festive Ambient Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-burgundy-900/35 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-champagne-500/15 rounded-full blur-[160px] pointer-events-none" />

      {/* Luxury Royal Emblem */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="relative z-10 mb-6"
      >
        <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-full bg-gradient-to-tr from-burgundy-950 via-luxury-surface to-burgundy-900 border-2 border-champagne-500/50 flex items-center justify-center shadow-gold-glow">
          <Crown className="w-10 h-10 text-champagne-400 stroke-[1.2]" />
        </div>
      </motion.div>

      {/* Large Grand Finale Heading */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.2 }}
        className="relative z-10 max-w-5xl space-y-4 mb-8"
      >
        <p className="font-cinzel text-xs sm:text-sm tracking-[0.35em] text-champagne-400 uppercase">
          A Grand Milestone • Forever Celebrated
        </p>

        <h1 className="font-cinzel text-4xl sm:text-7xl md:text-8xl font-black tracking-tight text-gold-gradient drop-shadow-2xl">
          {content.finale.headline}{' '}
          <span className="text-white drop-shadow-[0_0_35px_rgba(212,175,55,0.7)]">
            {content.finale.nameHighlight || content.recipient.firstName.toUpperCase()}
          </span>
        </h1>

        <p className="font-serif italic text-xl sm:text-3xl text-champagne-200/90 font-light max-w-2xl mx-auto pt-2">
          {content.finale.subheading}
        </p>
      </motion.div>

      {/* Bespoke Birthday Blessings / Wishes Cards */}
      <div className="relative z-10 max-w-4xl w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-10">
        {content.finale.wishes.map((wish, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 + idx * 0.1 }}
            className="p-5 rounded-2xl luxury-glass border border-champagne-500/20 text-center hover:border-champagne-400 transition-colors duration-300"
          >
            <div className="w-8 h-8 mx-auto mb-3 rounded-full bg-champagne-500/10 flex items-center justify-center text-champagne-300">
              <Sparkles className="w-4 h-4" />
            </div>
            <p className="font-serif italic text-base text-champagne-100 font-medium">
              {wish.text}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Interactive Champagne Toast & Share CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.8 }}
        className="relative z-10 flex flex-wrap items-center justify-center gap-4 mt-6"
      >
        {/* Toast Button */}
        <button
          onClick={handleRaiseToast}
          className="group inline-flex items-center gap-3 px-8 sm:px-10 py-4 rounded-full bg-gradient-to-r from-champagne-500 via-champagne-400 to-champagne-600 text-luxury-darkest font-cinzel text-xs sm:text-sm tracking-[0.2em] font-bold uppercase shadow-gold-glow hover:scale-105 active:scale-95 transition-all duration-300"
        >
          <Wine className="w-4 h-4 text-burgundy-950 group-hover:rotate-12 transition-transform" />
          <span>{content.finale.toastPrompt}</span>
          {toastCount > 0 && (
            <span className="ml-1 px-2 py-0.5 rounded-full bg-burgundy-900 text-champagne-200 text-xs">
              {toastCount}
            </span>
          )}
        </button>

        {/* Replay Experience Button */}
        <button
          onClick={onReplay}
          className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-luxury-surface/90 border border-champagne-500/30 text-champagne-200 font-cinzel text-xs sm:text-sm tracking-[0.2em] uppercase hover:bg-champagne-500/10 hover:border-champagne-400 hover:text-champagne-100 transition-all duration-300"
        >
          <RotateCcw className="w-4 h-4 text-champagne-400" />
          <span>{content.finale.replayButtonText}</span>
        </button>

        {/* Share Button */}
        <button
          onClick={handleCopyLink}
          className="inline-flex items-center gap-2 px-6 py-4 rounded-full bg-luxury-surface/80 border border-champagne-500/20 text-champagne-300 text-xs uppercase tracking-widest hover:border-champagne-400 transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-300">Link Copied</span>
            </>
          ) : (
            <>
              <Share2 className="w-4 h-4 text-champagne-400" />
              <span>Share Surprise</span>
            </>
          )}
        </button>
      </motion.div>

      {/* Luxury Footer Credits */}
      <div className="relative z-10 mt-24 pt-10 border-t border-champagne-500/15 max-w-2xl w-full text-center">
        <p className="font-serif italic text-base text-champagne-300/80">
          "Crafted with infinite affection, unshakeable loyalty, and quiet wonder."
        </p>
        <p className="text-[11px] uppercase tracking-[0.3em] text-champagne-500/60 font-sans mt-3">
          Dedicated to {content.recipient.fullName} • {content.recipient.birthYear}
        </p>
      </div>
    </section>
  );
}
