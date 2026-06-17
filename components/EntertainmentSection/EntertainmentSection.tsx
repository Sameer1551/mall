import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Fish, Snowflake, Baby, Gamepad2, Play, Pause } from 'lucide-react';

const attractions = [
  {
    icon: Fish,
    title: 'Dubai Aquarium & Underwater Zoo',
    desc: 'One of the world\'s largest suspended aquariums with 33,000+ marine animals. Walk through the 48-meter tunnel for an immersive underwater experience.',
    img: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?auto=format&fit=crop&q=80&w=2000',
    video: 'https://cdn.coverr.co/videos/coverr-tropical-fish-reef-life-4078/1080p.mp4',
    stats: '33,000+ Marine Animals',
  },
  {
    icon: Snowflake,
    title: 'Dubai Ice Rink',
    desc: 'Olympic-size ice rink in the heart of the desert. Host to international skating events and a premier destination for family entertainment.',
    img: '/images/real/ice rink.jpg',
    video: 'https://cdn.coverr.co/videos/coverr-ice-skating-3440/1080p.mp4',
    stats: 'Olympic-Size Rink',
  },
  {
    icon: Baby,
    title: 'KidZania Dubai',
    desc: 'Interactive edutainment city for children. A 7,000 sqm mini-city where kids can explore over 40 real-world professions.',
    img: '/images/real/kidzania.jpg',
    stats: '40+ Professions',
  },
  {
    icon: Gamepad2,
    title: 'VR Park Dubai',
    desc: 'Immersive virtual and augmented reality experiences spanning 7,000 sqm. Revolutionary entertainment blending digital and physical worlds.',
    img: '/images/real/vrpark.jpg',
    stats: '7,000 sqm',
  },
];

function AttractionCard({ attr, index }: { attr: typeof attractions[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(cardRef, { margin: '-100px' });
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  const hasVideo = !!attr.video;

  useEffect(() => {
    if (videoRef.current && hasVideo) {
      if (isHovered && isInView) {
        videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  }, [isHovered, isInView, hasVideo]);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current || !hasVideo) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <motion.div
      ref={cardRef}
      className="group relative h-[280px] sm:h-[340px] md:h-[400px] rounded-lg overflow-hidden cursor-pointer"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      whileHover={{ scale: 1.02 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Video or Image Background */}
      {hasVideo ? (
        <>
          <video
            ref={videoRef}
            muted
            loop
            playsInline
            onLoadedData={() => setVideoLoaded(true)}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            poster={attr.img}
          >
            <source src={attr.video} type="video/mp4" />
          </video>
          {/* Fallback image */}
          {!videoLoaded && (
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
              style={{ backgroundImage: `url('${attr.img}')` }}
            />
          )}
        </>
      ) : (
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
          style={{ backgroundImage: `url('${attr.img}')` }}
        />
      )}

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/30 to-transparent" />
      <div className="absolute inset-0 border border-gold/0 group-hover:border-gold/30 rounded-lg transition-all duration-500" />

      {/* Video Play Indicator */}
      {hasVideo && (
        <motion.div
          className="absolute top-4 right-4 z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
            onClick={togglePlay}
            className="w-8 h-8 rounded-full glass-card flex items-center justify-center hover:border-gold/40 transition-colors"
          >
            {isPlaying ? (
              <Pause className="w-3.5 h-3.5 text-light" />
            ) : (
              <Play className="w-3.5 h-3.5 text-light ml-0.5" />
            )}
          </button>
        </motion.div>
      )}

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 md:p-8">
        <attr.icon className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 text-gold mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300" />
        <h3 className="font-bodoni text-2xl sm:text-3xl md:text-4xl text-light mb-1 sm:mb-2">{attr.title}</h3>
        <p className="font-inter text-xs sm:text-sm text-light/60 max-w-lg mb-3">{attr.desc}</p>
        <div className="flex items-center gap-2">
          <span className="font-grotesk text-xs text-gold/80">{attr.stats}</span>
          {hasVideo && (
            <span className="flex items-center gap-1 font-inter text-[10px] text-light/40 uppercase tracking-wider">
              <span className="w-1 h-1 rounded-full bg-gold animate-pulse" />
              Video Available
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function EntertainmentSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { margin: '-200px' });

  return (
    <section ref={sectionRef} id="entertainment" className="relative py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark-300/20 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="font-inter text-xs tracking-[0.5em] text-gold uppercase mb-4">
            Entertainment
          </p>
          <h2 className="font-bodoni text-4xl md:text-6xl lg:text-7xl text-light">
            Beyond <span className="text-gold-gradient">Shopping</span>
          </h2>
          <p className="font-inter text-sm md:text-base text-light/50 mt-4 max-w-lg mx-auto">
            World-class attractions that transform every visit into an unforgettable experience
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {attractions.map((attr, i) => (
            <AttractionCard key={attr.title} attr={attr} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
