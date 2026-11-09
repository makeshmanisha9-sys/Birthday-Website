import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, MapPin, Calendar, X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { birthdayData as fallbackData } from '../data/birthdayData';
import { audioManager } from '../utils/audioManager';

export default function MemoryGallery({ data = fallbackData }) {
  const content = data || fallbackData;
  const memories = content.memories || fallbackData.memories;
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);

  const handleOpenPhoto = (index) => {
    audioManager.playShutterSound();
    setSelectedPhotoIndex(index);
  };

  const handleClose = () => {
    setSelectedPhotoIndex(null);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setSelectedPhotoIndex((prev) =>
      prev === 0 ? memories.length - 1 : prev - 1
    );
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setSelectedPhotoIndex((prev) =>
      prev === memories.length - 1 ? 0 : prev + 1
    );
  };

  const activePhoto =
    selectedPhotoIndex !== null ? memories[selectedPhotoIndex] : null;

  return (
    <section id="memories-section" className="relative min-h-screen py-24 px-6 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/3 -right-32 w-96 h-96 bg-burgundy-900/25 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-champagne-600/15 rounded-full blur-[130px] pointer-events-none" />

      {/* Section Header */}
      <div className="max-w-6xl mx-auto text-center mb-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-luxury-surface/80 border border-champagne-500/20 text-champagne-400 text-xs tracking-[0.25em] uppercase font-cinzel mb-3">
            <Camera className="w-3.5 h-3.5 text-champagne-400" />
            <span>The Memory Archives</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-5xl text-gold-gradient font-bold tracking-tight">
            Fragments of Timeless Moments
          </h2>
          <p className="mt-3 text-sm sm:text-base text-champagne-200/60 font-serif italic max-w-lg mx-auto">
            "We do not remember days; we remember moments captured in quiet brilliance."
          </p>
        </motion.div>
      </div>

      {/* Polaroid Gallery Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 relative z-10">
        {memories.map((mem, index) => (
          <motion.div
            key={mem.id || index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, delay: index * 0.12 }}
            className="flex justify-center"
          >
            {/* Polaroid Card */}
            <div
              onClick={() => handleOpenPhoto(index)}
              style={{
                transform: `rotate(${mem.rotation || 0}deg)`,
              }}
              className="group polaroid-frame w-full max-w-[320px] p-4 pb-6 rounded-sm cursor-pointer hover:rotate-0 hover:scale-105 hover:z-30 transition-all duration-500"
            >
              {/* Photo Image Container */}
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2px] bg-neutral-900 shadow-inner">
                <img
                  src={mem.image}
                  alt={mem.caption}
                  loading="lazy"
                  className="w-full h-full object-cover filter contrast-[1.05] brightness-95 group-hover:scale-108 transition-transform duration-700 ease-out"
                />
                
                {/* Vintage overlay sheen */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 opacity-60 group-hover:opacity-20 transition-opacity duration-300" />
                
                {/* Hover Inspect Icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/30 backdrop-blur-[2px]">
                  <div className="p-3 rounded-full bg-champagne-500 text-luxury-darkest shadow-lg">
                    <ZoomIn className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* Polaroid Footer / Handwritten Note Area */}
              <div className="pt-4 px-1 text-neutral-800">
                <p className="font-serif italic text-base sm:text-lg leading-snug line-clamp-2 text-neutral-900 group-hover:text-black font-medium">
                  "{mem.caption}"
                </p>
                <div className="mt-2.5 flex items-center justify-between text-[11px] uppercase tracking-wider text-neutral-500 font-sans border-t border-neutral-300/80 pt-2">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-burgundy-700" />
                    {mem.location}
                  </span>
                  <span>{mem.date}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Interactive Lightbox Zoom Modal */}
      <AnimatePresence>
        {activePhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-6"
          >
            {/* Modal Content Box */}
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full luxury-glass border border-champagne-500/30 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
            >
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-luxury-dark/80 border border-champagne-500/40 text-champagne-300 flex items-center justify-center hover:bg-champagne-500 hover:text-luxury-darkest transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Photo Area */}
              <div className="relative md:w-3/5 bg-black flex items-center justify-center min-h-[340px] md:min-h-[500px]">
                <img
                  src={activePhoto.image}
                  alt={activePhoto.caption}
                  className="w-full h-full object-cover max-h-[70vh]"
                />

                {/* Left/Right Arrows */}
                <button
                  onClick={handlePrev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 text-champagne-300 hover:bg-champagne-500 hover:text-black transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 text-champagne-300 hover:bg-champagne-500 hover:text-black transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Editorial Sidebar Details */}
              <div className="p-8 md:w-2/5 flex flex-col justify-between bg-luxury-surface/95">
                <div>
                  <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-champagne-400 font-cinzel mb-2">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{activePhoto.date}</span>
                  </div>

                  <h3 className="font-serif italic text-2xl text-champagne-100 font-light mb-4">
                    "{activePhoto.caption}"
                  </h3>

                  <div className="flex items-center gap-1.5 text-xs text-burgundy-400 font-sans mb-6">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{activePhoto.location}</span>
                  </div>

                  <div className="p-4 rounded-xl bg-luxury-card/70 border border-champagne-500/15">
                    <span className="text-[11px] uppercase tracking-wider text-champagne-400/80 font-cinzel block mb-1">
                      Curator's Note
                    </span>
                    <p className="text-sm text-champagne-200/80 font-sans leading-relaxed">
                      {activePhoto.note}
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-champagne-500/15 flex items-center justify-between text-xs text-champagne-400/60 font-sans">
                  <span>
                    Memory {selectedPhotoIndex + 1} of {memories.length}
                  </span>
                  <span className="font-cinzel text-champagne-300">
                    {content.recipient.firstName}'s Archive
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
