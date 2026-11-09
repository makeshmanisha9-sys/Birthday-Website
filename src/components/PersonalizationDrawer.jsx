import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, RotateCcw, Sparkles, User, Calendar, FileText, Film } from 'lucide-react';
import { birthdayData as defaultData } from '../data/birthdayData';

export default function PersonalizationDrawer({ isOpen, onClose, currentData, onUpdateData }) {
  const [formData, setFormData] = useState({
    fullName: currentData.recipient.fullName || "Sanjusree",
    firstName: currentData.recipient.firstName || "Sanjusree",
    birthdayDate: currentData.recipient.birthdayDate || "A Day Dedicated to You",
    quote1: currentData.intro.quote1,
    quote2: currentData.intro.quote2,
    videoTitle: currentData.video?.title || "A Little Something I Made For You",
    videoSubtitle: currentData.video?.subtitle || "Every second holds a little piece of appreciation.",
    videoUrl: currentData.video?.url || "/videos/love.mp4",
    letterSalutation: currentData.letter.salutation,
    letterSignature: currentData.letter.signature,
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    onUpdateData((prev) => ({
      ...prev,
      recipient: {
        ...prev.recipient,
        fullName: formData.fullName,
        firstName: formData.firstName,
        birthdayDate: formData.birthdayDate,
      },
      intro: {
        ...prev.intro,
        quote1: formData.quote1,
        quote2: formData.quote2,
      },
      video: {
        ...prev.video,
        title: formData.videoTitle,
        subtitle: formData.videoSubtitle,
        url: formData.videoUrl,
      },
      letter: {
        ...prev.letter,
        salutation: formData.letterSalutation,
        signature: formData.letterSignature,
      },
      finale: {
        ...prev.finale,
        nameHighlight: formData.firstName.toUpperCase(),
      },
    }));

    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  const handleReset = () => {
    setFormData({
      fullName: defaultData.recipient.fullName,
      firstName: defaultData.recipient.firstName,
      birthdayDate: defaultData.recipient.birthdayDate,
      quote1: defaultData.intro.quote1,
      quote2: defaultData.intro.quote2,
      videoTitle: defaultData.video?.title,
      videoSubtitle: defaultData.video?.subtitle,
      videoUrl: defaultData.video?.url,
      letterSalutation: defaultData.letter.salutation,
      letterSignature: defaultData.letter.signature,
    });
    onUpdateData(defaultData);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="relative z-10 w-full max-w-md bg-luxury-darkest border-l border-champagne-500/25 h-full overflow-y-auto p-6 sm:p-8 flex flex-col justify-between shadow-2xl"
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-5 border-b border-champagne-500/20">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-champagne-400" />
                  <h3 className="font-cinzel text-lg text-gold-gradient font-bold">
                    Personalize Surprise
                  </h3>
                </div>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-full text-champagne-400 hover:text-champagne-100 hover:bg-champagne-500/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-xs text-champagne-300/60 font-sans mt-3 mb-6">
                Update details live to preview, or edit{' '}
                <code className="text-champagne-400 bg-black/40 px-1 py-0.5 rounded">
                  src/data/birthdayData.js
                </code>{' '}
                for permanent customization.
              </p>

              {/* Form */}
              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <label className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-champagne-300 font-cinzel mb-1.5">
                    <User className="w-3.5 h-3.5 text-champagne-400" />
                    <span>Best Friend's Full Name</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-xl bg-luxury-surface border border-champagne-500/25 text-champagne-100 text-sm focus:outline-none focus:border-champagne-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-champagne-300 font-cinzel mb-1.5">
                    <User className="w-3.5 h-3.5 text-champagne-400" />
                    <span>First Name / Nickname</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-xl bg-luxury-surface border border-champagne-500/25 text-champagne-100 text-sm focus:outline-none focus:border-champagne-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-champagne-300 font-cinzel mb-1.5">
                    <Calendar className="w-3.5 h-3.5 text-champagne-400" />
                    <span>Birthday Date</span>
                  </label>
                  <input
                    type="text"
                    name="birthdayDate"
                    value={formData.birthdayDate}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-xl bg-luxury-surface border border-champagne-500/25 text-champagne-100 text-sm focus:outline-none focus:border-champagne-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-champagne-300 font-cinzel mb-1.5">
                    <Film className="w-3.5 h-3.5 text-champagne-400" />
                    <span>Special Video Title</span>
                  </label>
                  <input
                    type="text"
                    name="videoTitle"
                    value={formData.videoTitle}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-xl bg-luxury-surface border border-champagne-500/25 text-champagne-100 text-sm focus:outline-none focus:border-champagne-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-champagne-300 font-cinzel mb-1.5">
                    <Film className="w-3.5 h-3.5 text-champagne-400" />
                    <span>Special Video Subtitle</span>
                  </label>
                  <input
                    type="text"
                    name="videoSubtitle"
                    value={formData.videoSubtitle}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-xl bg-luxury-surface border border-champagne-500/25 text-champagne-100 text-sm focus:outline-none focus:border-champagne-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-champagne-300 font-cinzel mb-1.5">
                    <FileText className="w-3.5 h-3.5 text-champagne-400" />
                    <span>Intro Line 1</span>
                  </label>
                  <input
                    type="text"
                    name="quote1"
                    value={formData.quote1}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-xl bg-luxury-surface border border-champagne-500/25 text-champagne-100 text-sm focus:outline-none focus:border-champagne-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-champagne-300 font-cinzel mb-1.5">
                    <FileText className="w-3.5 h-3.5 text-champagne-400" />
                    <span>Intro Line 2 (Celebration)</span>
                  </label>
                  <input
                    type="text"
                    name="quote2"
                    value={formData.quote2}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-xl bg-luxury-surface border border-champagne-500/25 text-champagne-100 text-sm focus:outline-none focus:border-champagne-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-champagne-300 font-cinzel mb-1.5">
                    <FileText className="w-3.5 h-3.5 text-champagne-400" />
                    <span>Letter Salutation</span>
                  </label>
                  <input
                    type="text"
                    name="letterSalutation"
                    value={formData.letterSalutation}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-xl bg-luxury-surface border border-champagne-500/25 text-champagne-100 text-sm focus:outline-none focus:border-champagne-400 transition-colors"
                  />
                </div>

                {/* Submit & Reset */}
                <div className="pt-3 flex items-center gap-3">
                  <button
                    type="submit"
                    className="flex-1 py-3 px-4 rounded-xl bg-champagne-500 hover:bg-champagne-400 text-luxury-darkest font-cinzel text-xs font-bold uppercase tracking-wider shadow-gold-glow flex items-center justify-center gap-2 transition-all"
                  >
                    {savedSuccess ? (
                      <>
                        <Check className="w-4 h-4 text-luxury-darkest" />
                        <span>Applied!</span>
                      </>
                    ) : (
                      <span>Apply Changes</span>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleReset}
                    className="p-3 rounded-xl bg-luxury-surface border border-champagne-500/20 text-champagne-400 hover:text-champagne-200 transition-colors"
                    title="Reset to Original Values"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>

            <div className="pt-4 border-t border-champagne-500/15 text-center">
              <span className="text-[11px] text-champagne-500/60 font-serif italic">
                All changes reflect instantly across every section.
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
