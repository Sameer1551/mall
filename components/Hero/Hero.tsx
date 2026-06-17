import { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, Pause, Volume2, VolumeX } from 'lucide-react';

// ─── MODULE-LEVEL AUDIO SINGLETON ────────────────────────────────────────────
// Lives completely outside React's lifecycle. No matter how many times React
// mounts/unmounts Hero (including StrictMode double-mount), there is always
// exactly ONE audio instance playing. This is the only reliable way to prevent
// double-audio in React apps.
let _audio: HTMLAudioElement | null = null;

function getAudio(): HTMLAudioElement {
  if (!_audio) {
    _audio = new Audio('/video/fxMQLB.mp4');
    _audio.loop = true;
    _audio.volume = 1;
  }
  return _audio;
}
// ─────────────────────────────────────────────────────────────────────────────

const stats = [
  { value: '100M+', label: 'Annual Visitors' },
  { value: '1200+', label: 'Stores' },
  { value: '5.9M', label: 'Sq Ft' },
];

const heroButtons = [
  { label: 'Explore Opportunities', to: '/#why', primary: true },
  { label: 'Retail Leasing', to: '/retail-leasing', primary: false },
  { label: 'Event Spaces', to: '/event-spaces', primary: false },
];

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const [isLoaded, setIsLoaded] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    setIsLoaded(true);

    const audio = getAudio();

    // Start the singleton audio. If it is already playing (StrictMode remount),
    // this is a no-op because the browser ignores .play() on already-playing audio.
    audio.muted = false;
    audio.play().catch(() => {
      // Blocked by browser – this shouldn't happen since Enter Experience was clicked
    });

    // Start the video (visual only, always muted)
    const videoEl = videoRef.current;
    if (videoEl) {
      videoEl.muted = true;
      videoEl.play().catch(() => {});
    }

    // Cleanup: pause audio when component unmounts for good.
    // In StrictMode, this fires on the first "fake" unmount.
    // We re-call play() above on remount, which resumes correctly.
    return () => {
      if (videoEl) videoEl.pause();
    };
  }, []);

  // Keep audio paused/playing in sync with isPlaying state
  useEffect(() => {
    const audio = getAudio();
    if (isPlaying) {
      audio.play().catch(() => {});
      videoRef.current?.play().catch(() => {});
    } else {
      audio.pause();
      videoRef.current?.pause();
    }
  }, [isPlaying]);

  // Keep audio muted in sync with isMuted state
  useEffect(() => {
    getAudio().muted = isMuted;
  }, [isMuted]);

  const handleVideoLoad = useCallback(() => {
    setVideoLoaded(true);
  }, []);

  const togglePlay = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlaying(prev => !prev);
  }, []);

  const toggleMute = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMuted(prev => !prev);
  }, []);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Video Background — always muted, visuals only. Audio is from singleton above. */}
      <motion.div className="absolute inset-0 z-0" style={{ y }}>
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          autoPlay
          onLoadedData={handleVideoLoad}
          className="absolute inset-0 w-full h-full object-cover scale-105"
        >
          <source src="/video/fxMQLB.mp4" type="video/mp4" />
        </video>

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/70 via-[#050505]/40 to-[#050505]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/30 via-transparent to-[#050505]/30" />
      </motion.div>

      {/* Video Controls - Fixed to screen */}
      <AnimatePresence>
        {videoLoaded && (
          <motion.div
            className="fixed bottom-6 right-6 z-50 flex flex-col gap-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
          >
            <button
              onClick={togglePlay}
              className="w-10 h-10 rounded-full glass-card flex items-center justify-center hover:border-gold/40 transition-colors"
              aria-label={isPlaying ? 'Pause video' : 'Play video'}
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 text-light" />
              ) : (
                <Play className="w-4 h-4 text-light ml-0.5" />
              )}
            </button>
            <button
              onClick={toggleMute}
              className="w-10 h-10 rounded-full glass-card flex items-center justify-center hover:border-gold/40 transition-colors"
              aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4 text-light" />
              ) : (
                <Volume2 className="w-4 h-4 text-light" />
              )}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center h-full px-4 sm:px-6 text-center"
        style={{ opacity }}
      >
        <motion.p
          className="font-inter text-[10px] sm:text-xs md:text-sm tracking-[0.3em] sm:tracking-[0.5em] text-gold uppercase mb-4 sm:mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
        >
          Downtown Dubai, UAE
        </motion.p>

        <motion.h1
          className="font-bodoni text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-[140px] text-light leading-[0.9] mb-4 sm:mb-6 tracking-wide"
          initial={{ opacity: 0, y: 40 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, delay: 0.4 }}
        >
          THE WORLD&apos;S MOST
          <br />
          <span className="text-gold-gradient">VISITED DESTINATION</span>
        </motion.h1>

        <motion.p
          className="font-inter text-sm sm:text-base md:text-lg text-light/70 max-w-xl mb-6 sm:mb-10 px-2"
          initial={{ opacity: 0, y: 20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.7 }}
        >
          Where luxury, entertainment and opportunity converge.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center mb-10 sm:mb-16 w-full sm:w-auto px-4 sm:px-0"
          initial={{ opacity: 0, y: 20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.9 }}
        >
          {heroButtons.map((btn) => (
            <Link
              key={btn.label}
              to={btn.to}
              className={`group flex items-center justify-center gap-2 px-5 sm:px-6 py-3 text-xs sm:text-sm font-inter tracking-wider uppercase transition-all duration-300 rounded-sm w-full sm:w-auto ${
                btn.primary
                  ? 'bg-gold text-dark hover:bg-gold-light gold-glow'
                  : 'glass-card text-light hover:border-gold/50 hover:shadow-[0_0_20px_rgba(212,175,55,0.2)]'
              }`}
            >
              {btn.label}
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          ))}
        </motion.div>

        <motion.div
          className="flex gap-6 sm:gap-12 md:gap-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 1.1 }}
        >
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <p className="font-grotesk text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-gold font-light">
                {stat.value}
              </p>
              <p className="font-inter text-[10px] sm:text-xs tracking-widest uppercase text-light/50 mt-1 sm:mt-2">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-transparent to-gold/50" />
      </motion.div>
    </section>
  );
}
