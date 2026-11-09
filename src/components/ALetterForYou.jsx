import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Sparkles, Feather, Eye, CheckCircle2 } from 'lucide-react';
import { birthdayData as fallbackData } from '../data/birthdayData';
import { audioManager } from '../utils/audioManager';

export default function ALetterForYou({ data = fallbackData }) {
  const content = data || fallbackData;
  const [isOpen, setIsOpen] = useState(false);
  const [revealedParagraphs, setRevealedParagraphs] = useState(0);
  const [isFullyRevealed, setIsFullyRevealed] = useState(false);

  const handleOpenEnvelope = () => {
    audioManager.playPaperSound();
    setIsOpen(true);
  };

  // Progressive reveal of paragraphs
  useEffect(() => {
    if (!isOpen || isFullyRevealed) return;

    if (revealedParagraphs < content.letter.paragraphs.length) {
      const timer = setTimeout(() => {
        setRevealedParagraphs((prev) => prev + 1);
      }, 1600);
      return () => clearTimeout(timer);
    } else {
      setIsFullyRevealed(true);
    }
  }, [isOpen, revealedParagraphs, isFullyRevealed, content.letter.paragraphs.length]);

  const handleInstantReveal = () => {
    setRevealedParagraphs(content.letter.paragraphs.length);
    setIsFullyRevealed(true);
  };

  return (
    <section id="letter-section" className="relative min-h-screen py-24 px-6 flex flex-col items-center justify-center overflow-hidden">
      {/* Warm Ambient Lamp Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-champagne-600/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-10 right-10 w-96 h-96 bg-burgundy-900/30 rounded-full blur-[140px] pointer-events-none" />

      {/* Section Header */}
      <div className="max-w-3xl mx-auto text-center mb-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-luxury-surface/80 border border-champagne-500/20 text-champagne-400 text-xs tracking-[0.25em] uppercase font-cinzel mb-3">
            <Feather className="w-3.5 h-3.5 text-champagne-400" />
            <span>Private Correspondence</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-5xl text-gold-gradient font-bold tracking-tight">
            A Letter From the Heart
          </h2>
          <p className="mt-3 text-sm sm:text-base text-champagne-200/60 font-serif italic">
            "Words preserved in ink, holding sentiments too deep for ordinary days."
          </p>
        </motion.div>
      </div>

      {/* Main Interactive Letter Container */}
      <div className="max-w-3xl w-full relative z-10">
        <AnimatePresence mode="wait">
          {!isOpen ? (
            /* Envelope State with Wax Seal */
            <motion.div
              key="envelope"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{ duration: 0.6 }}
              className="flex justify-center"
            >
              <div
                onClick={handleOpenEnvelope}
                className="group relative w-full max-w-lg aspect-[16/10] rounded-2xl bg-gradient-to-br from-luxury-card via-luxury-surface to-burgundy-950 border border-champagne-500/30 shadow-luxury-glow cursor-pointer hover:border-champagne-400 hover:scale-[1.02] transition-all duration-500 p-8 flex flex-col items-center justify-center text-center overflow-hidden"
              >
                {/* Envelope Flap Lines */}
                <div className="absolute inset-0 border-t border-champagne-500/10 pointer-events-none" />
                <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-champagne-500/5 to-transparent pointer-events-none" />

                {/* Wax Seal */}
                <div className="relative mb-6">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-burgundy-700 via-burgundy-900 to-burgundy-950 border-2 border-champagne-500 flex items-center justify-center shadow-luxury group-hover:scale-110 group-hover:shadow-gold-glow transition-all duration-300">
                    <span className="font-cinzel text-2xl font-bold text-champagne-300">
                      {content.recipient.firstName[0]}
                    </span>
                  </div>
                  <div className="absolute -inset-2 rounded-full border border-champagne-500/20 animate-ping pointer-events-none" />
                </div>

                <h3 className="font-cinzel text-lg text-champagne-200 font-semibold tracking-wider mb-2">
                  To: {content.recipient.fullName}
                </h3>
                <p className="text-xs uppercase tracking-[0.25em] text-champagne-400 font-sans group-hover:text-champagne-300 transition-colors">
                  Break Wax Seal To Read
                </p>
              </div>
            </motion.div>
          ) : (
            /* Unfolded Parchment Letter */
            <motion.div
              key="letter"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="parchment-card rounded-2xl p-8 sm:p-14 relative overflow-hidden"
            >
              {/* Delicate Gold Watermark Crest */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-champagne-500/[0.03] pointer-events-none select-none font-cinzel text-8xl sm:text-9xl font-bold">
                {content.recipient.firstName[0]}
              </div>

              {/* Top Controls (Instant Reveal Toggle) */}
              <div className="flex items-center justify-between border-b border-champagne-500/15 pb-4 mb-8 text-xs text-champagne-400/70">
                <span className="font-cinzel tracking-widest uppercase">
                  {content.recipient.birthdayDate}
                </span>

                {!isFullyRevealed && (
                  <button
                    onClick={handleInstantReveal}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-champagne-500/10 hover:bg-champagne-500/20 text-champagne-300 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Read in Full</span>
                  </button>
                )}
              </div>

              {/* Salutation */}
              <h3 className="font-serif italic text-2xl sm:text-3xl text-gold-gradient font-medium mb-6">
                {content.letter.salutation}
              </h3>

              {/* Letter Paragraphs (Progressive Reveal) */}
              <div className="space-y-6 text-champagne-100/90 font-serif text-lg sm:text-xl leading-relaxed tracking-wide">
                {content.letter.paragraphs.map((p, idx) => {
                  const isVisible = idx <= revealedParagraphs;
                  return (
                    <motion.p
                      key={idx}
                      initial={{ opacity: 0, y: 15 }}
                      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0 }}
                      transition={{ duration: 0.9 }}
                      className={!isVisible ? 'hidden' : 'block'}
                    >
                      {p}
                    </motion.p>
                  );
                })}
              </div>

              {/* Typing Indicator while progressing */}
              {!isFullyRevealed && (
                <div className="mt-4 flex items-center gap-2 text-champagne-400/60 text-xs italic font-serif">
                  <span className="w-2 h-2 rounded-full bg-champagne-400 animate-ping" />
                  <span>Drafting the next sentence...</span>
                </div>
              )}

              {/* Signoff & Cursive Signature */}
              <AnimatePresence>
                {isFullyRevealed && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="mt-12 pt-8 border-t border-champagne-500/15"
                  >
                    <p className="font-serif italic text-base sm:text-lg text-champagne-300/80 mb-2">
                      {content.letter.closing}
                    </p>
                    <p className="font-script text-3xl sm:text-4xl text-gold-gradient tracking-wide">
                      {content.letter.signature}
                    </p>

                    {/* Post Script */}
                    {content.letter.postScript && (
                      <div className="mt-8 p-4 rounded-xl bg-burgundy-950/40 border-l-2 border-champagne-500/50">
                        <p className="font-serif italic text-sm text-champagne-200/90">
                          {content.letter.postScript}
                        </p>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
