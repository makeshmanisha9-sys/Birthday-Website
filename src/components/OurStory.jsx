import React from 'react';
import { motion } from 'framer-motion';
import { Bookmark, Sparkles, Clock, Quote } from 'lucide-react';
import { birthdayData as fallbackData } from '../data/birthdayData';

export default function OurStory({ data = fallbackData }) {
  const content = data || fallbackData;
  const timeline = content.timeline || fallbackData.timeline;

  return (
    <section id="story-section" className="relative min-h-screen py-24 px-6 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/4 left-0 w-80 h-80 bg-burgundy-900/30 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-champagne-600/15 rounded-full blur-[150px] pointer-events-none" />

      {/* Section Header */}
      <div className="max-w-4xl mx-auto text-center mb-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-luxury-surface/80 border border-champagne-500/20 text-champagne-400 text-xs tracking-[0.25em] uppercase font-cinzel mb-3">
            <Bookmark className="w-3.5 h-3.5 text-champagne-400" />
            <span>Chronicles of Us</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-5xl text-gold-gradient font-bold tracking-tight">
            Our Story in Chapters
          </h2>
          <p className="mt-3 text-sm sm:text-base text-champagne-200/60 font-serif italic max-w-md mx-auto">
            "Rare friendships aren't stumbled upon by accident; they are built through shared laughter, unspoken loyalty, and time."
          </p>
        </motion.div>
      </div>

      {/* Timeline Container */}
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Central Vertical Spine (Desktop) */}
        <div className="hidden md:block absolute left-1/2 top-4 bottom-12 -translate-x-1/2 w-[2px] bg-gradient-to-b from-champagne-500/0 via-champagne-500/30 to-champagne-500/0" />

        <div className="space-y-16 md:space-y-24">
          {timeline.map((item, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={item.chapter || index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.9, delay: 0.1 }}
                className={`relative flex flex-col md:flex-row items-center ${
                  isEven ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Central Timeline Node (Desktop) */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-luxury-darkest border-2 border-champagne-500 items-center justify-center z-20 shadow-gold-glow">
                  <div className="w-3 h-3 rounded-full bg-champagne-400 animate-pulse" />
                </div>

                {/* Content Card Side */}
                <div className="w-full md:w-1/2 md:px-10">
                  <div className="luxury-glass p-8 sm:p-9 rounded-2xl border border-champagne-500/20 shadow-luxury hover:border-champagne-500/40 transition-all duration-400 group">
                    {/* Chapter & Year Badges */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs uppercase tracking-[0.25em] text-champagne-400 font-cinzel font-semibold">
                        {item.chapter}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-burgundy-950/80 border border-champagne-500/25 text-champagne-300 text-xs font-cinzel font-medium">
                        {item.year}
                      </span>
                    </div>

                    <h3 className="font-cinzel text-xl sm:text-2xl text-champagne-100 font-bold group-hover:text-champagne-300 transition-colors">
                      {item.title}
                    </h3>

                    <h4 className="font-serif italic text-sm sm:text-base text-champagne-300/80 mt-1 mb-4">
                      {item.subtitle}
                    </h4>

                    {/* Image embedded in card */}
                    <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden mb-5 border border-champagne-500/15">
                      <img
                        src={item.image}
                        alt={item.title}
                        loading="lazy"
                        className="w-full h-full object-cover filter brightness-90 contrast-105 group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    </div>

                    <p className="text-sm text-champagne-200/75 font-sans leading-relaxed mb-5">
                      {item.description}
                    </p>

                    {/* Highlight Quote */}
                    <div className="flex items-start gap-3 p-3.5 rounded-xl bg-burgundy-950/40 border-l-2 border-champagne-500/60">
                      <Quote className="w-4 h-4 text-champagne-400 shrink-0 mt-0.5" />
                      <p className="font-serif italic text-xs sm:text-sm text-champagne-200/90">
                        {item.highlight}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Empty opposite side for spacing on desktop */}
                <div className="hidden md:block md:w-1/2" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
