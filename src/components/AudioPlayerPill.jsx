import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause, Music } from 'lucide-react';
import { audioManager } from '../utils/audioManager';
import { birthdayData } from '../data/birthdayData';

export default function AudioPlayerPill() {
  const [audioState, setAudioState] = useState({
    isPlaying: audioManager.isPlaying,
    isMuted: audioManager.isMuted,
  });

  useEffect(() => {
    const unsubscribe = audioManager.subscribe((state) => {
      setAudioState({ ...state });
    });
    return unsubscribe;
  }, []);

  const handleTogglePlay = () => {
    audioManager.togglePlay(birthdayData.audio.url);
  };

  const handleToggleMute = (e) => {
    e.stopPropagation();
    audioManager.toggleMute();
  };

  return (
    <div className="fixed top-6 right-6 z-50 flex items-center gap-2">
      <div
        onClick={handleTogglePlay}
        className="group flex items-center gap-3 px-4 py-2 rounded-full bg-luxury-surface/85 backdrop-blur-xl border border-champagne-500/25 shadow-luxury-glow cursor-pointer hover:border-champagne-500/60 transition-all duration-300"
      >
        {/* Equalizer Wave / Icon */}
        <div className="flex items-center gap-0.5 h-4 w-4 justify-center">
          {audioState.isPlaying && !audioState.isMuted ? (
            <>
              <span className="w-1 bg-champagne-400 rounded-full animate-[pulse_0.8s_ease-in-out_infinite] h-4" />
              <span className="w-1 bg-champagne-300 rounded-full animate-[pulse_1.2s_ease-in-out_infinite_0.2s] h-2.5" />
              <span className="w-1 bg-champagne-400 rounded-full animate-[pulse_0.9s_ease-in-out_infinite_0.4s] h-3.5" />
            </>
          ) : (
            <Music className="w-3.5 h-3.5 text-champagne-400/70 group-hover:text-champagne-300" />
          )}
        </div>

        {/* Track Info (Hidden on small mobile, visible on sm+) */}
        <div className="hidden sm:flex flex-col text-left">
          <span className="text-[10px] uppercase tracking-widest text-champagne-400/80 font-medium font-sans">
            Soundtrack
          </span>
          <span className="text-xs text-champagne-100/90 font-serif truncate max-w-[140px]">
            {birthdayData.audio.title}
          </span>
        </div>

        {/* Play/Pause Button */}
        <button
          type="button"
          aria-label={audioState.isPlaying ? "Pause music" : "Play music"}
          className="w-7 h-7 rounded-full bg-champagne-500/10 flex items-center justify-center text-champagne-300 hover:bg-champagne-500/25 transition-colors"
        >
          {audioState.isPlaying ? (
            <Pause className="w-3.5 h-3.5" />
          ) : (
            <Play className="w-3.5 h-3.5 ml-0.5" />
          )}
        </button>

        {/* Mute Button */}
        {audioState.isPlaying && (
          <button
            type="button"
            onClick={handleToggleMute}
            aria-label={audioState.isMuted ? "Unmute" : "Mute"}
            className="text-champagne-400/70 hover:text-champagne-200 transition-colors"
          >
            {audioState.isMuted ? (
              <VolumeX className="w-4 h-4 text-burgundy-400" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </button>
        )}
      </div>
    </div>
  );
}
