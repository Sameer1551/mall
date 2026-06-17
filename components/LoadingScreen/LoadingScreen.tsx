"use client";

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [show, setShow] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [bgIndex, setBgIndex] = useState(0);

  const bgImages = [
    '/images/real/Dubai mall expansion 1.jpeg',
    '/images/real/Dubai Mall expansion 2.jpeg'
  ];

  useEffect(() => {
    const bgInterval = setInterval(() => {
      setBgIndex(prev => (prev + 1) % bgImages.length);
    }, 5000);
    return () => clearInterval(bgInterval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsReady(true);
          return 100;
        }
        return prev + 2;
      });
    }, 30);
    return () => clearInterval(interval);
  }, []);

  const [hasEntered, setHasEntered] = useState(false);

  const handleEnter = () => {
    if (hasEntered) return;
    setHasEntered(true);
    setShowVideo(true);
    setTimeout(() => {
      setShow(false);
      setTimeout(onComplete, 600);
    }, 2500);
  };

  // Play video when shown
  useEffect(() => {
    if (showVideo && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [showVideo]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050505] overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          {/* Background Images with crossfade */}
          {bgImages.map((src, index) => (
            <div 
              key={src}
              className="absolute inset-0 z-0 bg-cover bg-center transition-opacity duration-1000"
              style={{ 
                backgroundImage: `url('${src}')`,
                opacity: index === bgIndex ? 0.55 : 0
              }}
            />
          ))}
          <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#050505]/70 via-[#050505]/30 to-[#050505]/80 backdrop-blur-[2px]" />

          {/* Video Intro Transition */}
          <AnimatePresence>
            {showVideo && (
              <motion.div
                className="absolute inset-0 z-10"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <video
                  ref={videoRef}
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                  onLoadedData={() => setVideoLoaded(true)}
                >
                  <source src="https://cdn.coverr.co/videos/coverr-aerial-view-of-dubai-6193/1080p.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/60 via-transparent to-[#050505]" />

                {/* Final reveal text */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <div className="text-center">
                    <p className="font-inter text-xs tracking-[0.5em] text-gold uppercase mb-4">
                      Welcome to
                    </p>
                    <h1 className="font-bodoni text-5xl md:text-7xl lg:text-[100px] text-light tracking-wider">
                      THE DUBAI MALL
                    </h1>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Loading UI */}
          <AnimatePresence>
            {!showVideo && (
              <motion.div
                className="relative z-20 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {/* Animated logo */}
                <motion.div
                  className="relative mb-12"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <div className="w-20 h-20 mx-auto relative">
                    <motion.div
                      className="absolute inset-0 border-2 border-gold/30 rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                    />
                    <motion.div
                      className="absolute inset-2 border border-gold/50 rounded-full"
                      animate={{ rotate: -360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-bodoni text-2xl text-gold">DM</span>
                    </div>
                  </div>
                </motion.div>

                <motion.p
                  className="font-inter text-xs tracking-[0.4em] text-gold uppercase mb-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.3 }}
                >
                  Loading Experience
                </motion.p>

                <motion.h1
                  className="font-bodoni text-4xl md:text-5xl lg:text-6xl text-light tracking-wider mb-8"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, delay: 0.5, ease: 'easeOut' }}
                >
                  THE DUBAI MALL
                </motion.h1>

                {/* Progress bar */}
                <div className="w-64 md:w-96 h-[1px] bg-dark-100 mx-auto overflow-hidden">
                  <motion.div
                    className="h-full bg-gold-gradient"
                    initial={{ width: '0%' }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.1, ease: 'linear' }}
                  />
                </div>

                {/* Progress percentage / Enter Button */}
                <div className="flex flex-col items-center justify-center gap-6 mt-6 min-h-[80px]">
                  {!isReady ? (
                    <div className="flex items-center gap-3">
                      <motion.p
                        className="font-grotesk text-2xl text-gold"
                        key={progress}
                        initial={{ opacity: 0.5, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.1 }}
                      >
                        {progress}%
                      </motion.p>
                      <span className="font-inter text-xs text-light/30">loaded</span>
                    </div>
                  ) : (
                    <motion.button
                      onClick={handleEnter}
                      disabled={hasEntered}
                      className="px-8 py-3 bg-gold text-dark font-inter text-sm tracking-widest uppercase hover:bg-gold-light transition-colors rounded-sm gold-glow disabled:opacity-55 disabled:cursor-not-allowed"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      Enter Experience
                    </motion.button>
                  )}
                </div>

                {/* Loading message */}
                <motion.p
                  className="font-inter text-xs text-light/40 mt-4"
                  animate={!isReady ? { opacity: [0.3, 0.7, 0.3] } : { opacity: 0.7 }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {!isReady ? "Preparing your immersive experience..." : "Experience is ready"}
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Cinematic grain overlay */}
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none z-30" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
