import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  Film,
  Sparkles,
  RotateCcw,
} from 'lucide-react';
import { audioManager } from '../utils/audioManager';

export default function CinematicVideoShowcase({ data }) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  const videoConfig = data?.video || {
    title: "A Little Something I Made For You",
    subtitle: "Every second holds a little piece of appreciation.",
    url: "/videos/love.mp4",
    tagline: "PRIVATE SCREENING • CINEMATIC PREMIERE",
    caption: "A curated tapestry of our fondest memories, set in motion.",
  };

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [hasStartedOnce, setHasStartedOnce] = useState(false);

  const controlsTimeoutRef = useRef(null);

  // Sync video time updates
  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const total = videoRef.current.duration || 1;
    setCurrentTime(current);
    setProgress((current / total) * 100);
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const togglePlay = () => {
    if (!videoRef.current) return;

    if (videoRef.current.paused) {
      // Pause background ambient sound so video audio is clear
      audioManager.pauseForVideo();
      videoRef.current.play().then(() => {
        setIsPlaying(true);
        setHasStartedOnce(true);
      }).catch((err) => {
        console.warn("Video playback blocked", err);
      });
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
      audioManager.resumeAfterVideo(data?.audio?.url);
    }
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
    setProgress(100);
    audioManager.resumeAfterVideo(data?.audio?.url);
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    const nextMuted = !videoRef.current.muted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const handleSeek = (e) => {
    e.stopPropagation();
    if (!videoRef.current || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, clickX / rect.width));
    videoRef.current.currentTime = percentage * duration;
    setProgress(percentage * 100);
  };

  const toggleFullscreen = (e) => {
    e.stopPropagation();
    const container = containerRef.current;
    if (!container) return;

    if (!document.fullscreenElement) {
      if (container.requestFullscreen) {
        container.requestFullscreen();
      } else if (container.webkitRequestFullscreen) {
        container.webkitRequestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  // Hide controls after inactivity when playing
  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 2600);
    }
  };

  const formatTime = (seconds) => {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Pause video if component unmounts
  useEffect(() => {
    return () => {
      if (videoRef.current) {
        videoRef.current.pause();
      }
      audioManager.resumeAfterVideo(data?.audio?.url);
    };
  }, [data?.audio?.url]);

  return (
    <section
      id="video-section"
      className="relative min-h-screen py-24 px-6 flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Cinematic Theater Ambient Backglow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[550px] bg-champagne-600/10 rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-burgundy-900/30 rounded-full blur-[150px] pointer-events-none" />

      {/* Section Header */}
      <div className="max-w-4xl mx-auto text-center mb-12 sm:mb-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-luxury-surface/80 border border-champagne-500/20 text-champagne-400 text-xs tracking-[0.25em] uppercase font-cinzel mb-4">
            <Film className="w-3.5 h-3.5 text-champagne-400" />
            <span>{videoConfig.tagline || "A Special Gift"}</span>
          </div>

          {/* Title */}
          <h2 className="font-cinzel text-3xl sm:text-5xl md:text-6xl text-gold-gradient font-bold tracking-tight">
            {videoConfig.title}
          </h2>

          {/* Subtitle */}
          <p className="mt-3 text-base sm:text-xl text-champagne-200/80 font-serif italic max-w-xl mx-auto">
            "{videoConfig.subtitle}"
          </p>
        </motion.div>
      </div>

      {/* Cinematic Movie-Screen Showcase */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 35 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center"
      >
        {/* Cinema Projector Outer Halo */}
        <div className="relative w-full flex justify-center">
          <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => isPlaying && setShowControls(false)}
            onClick={togglePlay}
            className="group relative w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-black border border-champagne-500/30 shadow-luxury-glow transition-all duration-700 cursor-pointer max-h-[75vh] flex items-center justify-center"
          >
            {/* Elegant Corner Film Mount Accents */}
            <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-champagne-500/50 pointer-events-none z-20" />
            <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-champagne-500/50 pointer-events-none z-20" />
            <div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-champagne-500/50 pointer-events-none z-20" />
            <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-champagne-500/50 pointer-events-none z-20" />

            {/* Video Element (Maintains Native Aspect Ratio without distortion) */}
            <video
              ref={videoRef}
              src={videoConfig.url}
              playsInline
              preload="metadata"
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onEnded={handleVideoEnded}
              className="w-full h-auto max-h-[72vh] object-contain block mx-auto filter contrast-[1.03] select-none"
            />

            {/* Ambient Movie Screen Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 pointer-events-none opacity-60 group-hover:opacity-40 transition-opacity" />

            {/* Center Glowing Play/Pause Button (Appears when paused or hovered) */}
            <AnimatePresence>
              {(!isPlaying || showControls) && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
                >
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      togglePlay();
                    }}
                    className={`pointer-events-auto w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center transition-all duration-500 ${
                      isPlaying
                        ? 'bg-black/60 text-champagne-300 border border-champagne-500/40 hover:scale-110'
                        : 'bg-gradient-to-tr from-champagne-600 via-champagne-400 to-champagne-200 text-luxury-darkest shadow-gold-glow scale-105 hover:scale-115'
                    }`}
                  >
                    {isPlaying ? (
                      <Pause className="w-7 h-7 sm:w-9 sm:h-9" />
                    ) : (
                      <Play className="w-7 h-7 sm:w-9 sm:h-9 ml-1 fill-current" />
                    )}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Custom Cinema Control Bar (Fades smoothly on idle) */}
            <div
              onClick={(e) => e.stopPropagation()}
              className={`absolute bottom-0 left-0 right-0 z-30 px-5 sm:px-8 py-4 sm:py-5 bg-gradient-to-t from-black/95 via-black/80 to-transparent backdrop-blur-[6px] border-t border-champagne-500/15 transition-opacity duration-400 ${
                showControls || !isPlaying ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
            >
              {/* Timeline Progress Scrubber */}
              <div
                onClick={handleSeek}
                className="group/timeline relative w-full h-1.5 hover:h-2.5 bg-white/20 hover:bg-white/30 rounded-full cursor-pointer transition-all duration-200 mb-3"
              >
                <div
                  style={{ width: `${progress}%` }}
                  className="h-full bg-gradient-to-r from-champagne-500 via-champagne-400 to-champagne-300 rounded-full relative"
                >
                  {/* Scrubber Knob */}
                  <span className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-champagne-200 shadow-md opacity-0 group-hover/timeline:opacity-100 transition-opacity" />
                </div>
              </div>

              {/* Lower Control Bar Row */}
              <div className="flex items-center justify-between text-xs text-champagne-200 font-sans">
                {/* Left: Play/Pause, Mute, Time */}
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={togglePlay}
                    className="text-champagne-300 hover:text-white transition-colors"
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? (
                      <Pause className="w-4 h-4 sm:w-5 sm:h-5" />
                    ) : (
                      <Play className="w-4 h-4 sm:w-5 sm:h-5 ml-0.5 fill-current" />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={toggleMute}
                    className="text-champagne-300 hover:text-white transition-colors"
                    aria-label={isMuted ? 'Unmute' : 'Mute'}
                  >
                    {isMuted ? (
                      <VolumeX className="w-4 h-4 sm:w-5 sm:h-5 text-burgundy-400" />
                    ) : (
                      <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />
                    )}
                  </button>

                  <span className="text-[11px] sm:text-xs text-champagne-400/80 font-mono">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>

                {/* Right: Screen Badges & Fullscreen */}
                <div className="flex items-center gap-3">
                  <span className="hidden sm:inline text-[10px] uppercase tracking-widest text-champagne-400/60 font-cinzel">
                    High Fidelity Edit
                  </span>

                  <button
                    type="button"
                    onClick={toggleFullscreen}
                    className="text-champagne-300 hover:text-white transition-colors"
                    aria-label={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
                  >
                    {isFullscreen ? (
                      <Minimize2 className="w-4 h-4 sm:w-5 sm:h-5" />
                    ) : (
                      <Maximize2 className="w-4 h-4 sm:w-5 sm:h-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Video Footnote / Dedicated Caption */}
        <div className="mt-6 text-center max-w-lg">
          <p className="font-serif italic text-sm sm:text-base text-champagne-300/80">
            {videoConfig.caption}
          </p>
          <div className="mt-2 inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.25em] text-champagne-500/70 font-cinzel">
            <Sparkles className="w-3 h-3 text-champagne-400" />
            <span>Dedicated with Infinite Love</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
