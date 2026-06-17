import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Play, Pause, ChevronLeft, ChevronRight } from 'lucide-react';

const videoShowcases = [
  {
    id: 'intro',
    title: 'A Destination Like No Other',
    subtitle: 'Welcome to The Dubai Mall',
    description: 'Experience the world\'s largest and most visited retail destination, where over 100 million guests annually discover 5.9 million square feet of extraordinary experiences.',
    video: 'https://cdn.coverr.co/videos/coverr-aerial-view-of-dubai-6193/1080p.mp4',
    poster: 'https://upload.wikimedia.org/wikipedia/commons/6/67/Apple%2C_Dubai._Flagship_Retail_Store.jpg',
  },
  {
    id: 'fashion',
    title: 'Fashion Avenue',
    subtitle: 'Luxury Redefined',
    description: 'Home to the world\'s most prestigious fashion houses. From haute couture to contemporary luxury, discover over 200 premium brands in an unparalleled retail environment.',
    video: 'https://cdn.coverr.co/videos/coverr-woman-shopping-in-a-boutique-7727/1080p.mp4',
    poster: 'https://upload.wikimedia.org/wikipedia/commons/9/90/Burj_Khalifa_%28worlds_tallest_building%29_and_the_Dubai_skyline_%2825781049892%29.jpg',
  },
  {
    id: 'attractions',
    title: 'World-Class Attractions',
    subtitle: 'Entertainment Beyond Imagination',
    description: 'From the mesmerizing Dubai Aquarium & Underwater Zoo to the Olympic-sized Ice Rink, discover attractions that draw millions of visitors from around the globe.',
    video: 'https://cdn.coverr.co/videos/coverr-tropical-fish-reef-life-4078/1080p.mp4',
    poster: 'https://upload.wikimedia.org/wikipedia/commons/6/67/Apple%2C_Dubai._Flagship_Retail_Store.jpg',
  },
  {
    id: 'dining',
    title: 'Culinary Excellence',
    subtitle: 'A Global Gastronomic Journey',
    description: 'Over 200 dining destinations featuring celebrity chef restaurants, international cuisines, and exclusive waterfront terraces overlooking the Dubai Fountain.',
    video: 'https://cdn.coverr.co/videos/coverr-elegant-restaurant-interior-5263/1080p.mp4',
    poster: 'https://upload.wikimedia.org/wikipedia/commons/1/1e/DubaiMallAquariumDSC_7260.JPG',
  },
  {
    id: 'events',
    title: 'Global Events Platform',
    subtitle: 'Where the World Takes the Stage',
    description: 'From fashion runways to celebrity product launches, concerts to corporate galas, our versatile venues host over 1,000 events annually.',
    video: 'https://cdn.coverr.co/videos/coverr-fashion-show-on-the-runway-6390/1080p.mp4',
    poster: 'https://upload.wikimedia.org/wikipedia/commons/1/11/Dubai_Dino.jpg',
  },
];

function VideoPlayer({ video, poster, isActive }: { video: string; poster: string; isActive: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (videoRef.current && isActive) {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    } else if (videoRef.current && !isActive) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, [isActive]);

  const togglePlay = useCallback(() => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  }, [isPlaying]);

  return (
    <div className="relative w-full h-full">
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        onLoadedData={() => setIsLoaded(true)}
        className="absolute inset-0 w-full h-full object-cover"
        poster={poster}
      >
        <source src={video} type="video/mp4" />
      </video>

      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${poster}')` }}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        )}
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/20 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-l from-[#050505]/40 to-transparent" />

      {/* Video Controls */}
      <div className="absolute bottom-6 right-6 z-20 flex gap-2">
        <button
          onClick={togglePlay}
          className="w-10 h-10 rounded-full glass-card flex items-center justify-center hover:border-gold/40 transition-colors"
        >
          {isPlaying ? <Pause className="w-4 h-4 text-light" /> : <Play className="w-4 h-4 text-light ml-0.5" />}
        </button>
      </div>
    </div>
  );
}

export default function VideoShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { margin: '-100px' });
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying || !isInView) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % videoShowcases.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, isInView]);

  const goToPrev = useCallback(() => {
    setIsAutoPlaying(false);
    setActiveIndex((prev) => (prev - 1 + videoShowcases.length) % videoShowcases.length);
  }, []);

  const goToNext = useCallback(() => {
    setIsAutoPlaying(false);
    setActiveIndex((prev) => (prev + 1) % videoShowcases.length);
  }, []);

  const activeVideo = videoShowcases[activeIndex];

  return (
    <section
      ref={sectionRef}
      id="video-showcase"
      className="relative min-h-screen py-32 overflow-hidden"
    >
      {/* Background Video */}
      <div className="absolute inset-0">
        {videoShowcases.map((video, index) => (
          <AnimatePresence key={video.id}>
            {index === activeIndex && (
              <motion.div
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
              >
                <VideoPlayer
                  video={video.video}
                  poster={video.poster}
                  isActive={index === activeIndex && isInView}
                />
              </motion.div>
            )}
          </AnimatePresence>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 min-h-screen flex items-center">
        <div className="w-full lg:w-1/2">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6 }}
            >
              <motion.p
                className="font-inter text-xs tracking-[0.5em] text-gold uppercase mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                {activeVideo.subtitle}
              </motion.p>

              <motion.h2
                className="font-bodoni text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-light leading-[1.1] mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {activeVideo.title}
              </motion.h2>

              <motion.p
                className="font-inter text-base md:text-lg text-light/60 leading-relaxed max-w-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {activeVideo.description}
              </motion.p>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Dots */}
          <div className="flex items-center gap-4 mt-10">
            <button
              onClick={goToPrev}
              className="w-10 h-10 rounded-full glass-card flex items-center justify-center hover:border-gold/40 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-light" />
            </button>

            <div className="flex gap-2">
              {videoShowcases.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setIsAutoPlaying(false);
                    setActiveIndex(index);
                  }}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    index === activeIndex
                      ? 'w-12 bg-gold'
                      : 'w-6 bg-light/20 hover:bg-light/40'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={goToNext}
              className="w-10 h-10 rounded-full glass-card flex items-center justify-center hover:border-gold/40 transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-light" />
            </button>
          </div>

          {/* Progress indicator */}
          <div className="flex items-center gap-3 mt-8">
            <span className="font-grotesk text-sm text-gold">
              {String(activeIndex + 1).padStart(2, '0')}
            </span>
            <span className="font-inter text-xs text-light/30">/</span>
            <span className="font-inter text-sm text-light/50">
              {String(videoShowcases.length).padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
