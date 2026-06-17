import { useRef, MouseEvent, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Play, Pause } from 'lucide-react';

const brands = [
  { name: 'Louis Vuitton', img: '/images/real/louis vuitton.jpg', video: 'https://cdn.coverr.co/videos/coverr-luxury-store-display-4036/1080p.mp4' },
  { name: 'Gucci', img: 'https://images.unsplash.com/photo-1555529771-835f59fc5efe?auto=format&fit=crop&q=80&w=2000' },
  { name: 'Dior', img: '/images/real/dior.jpg', video: 'https://cdn.coverr.co/videos/coverr-woman-shopping-in-a-boutique-7727/1080p.mp4' },
  { name: 'Chanel', img: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&q=80&w=2000' },
  { name: 'Prada', img: 'https://images.unsplash.com/photo-1560243563-062bfc001d68?auto=format&fit=crop&q=80&w=2000' },
  { name: 'Hermès', img: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&q=80&w=2000' },
  { name: 'Rolex', img: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&q=80&w=2000' },
  { name: 'Cartier', img: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=2000' },
];

function TiltCard({ brand, index }: { brand: typeof brands[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  const hasVideo = !!brand.video;

  useEffect(() => {
    if (videoRef.current && hasVideo) {
      if (isHovered) {
        videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
        setIsPlaying(false);
      }
    }
  }, [isHovered, hasVideo]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    cardRef.current.style.transform = `perspective(1000px) rotateY(${x * 15}deg) rotateX(${-y * 15}deg) scale(1.05)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)';
    setIsHovered(false);
  };

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
      className="perspective-1000"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <div
        ref={cardRef}
        className="preserve-3d transition-transform duration-200 ease-out cursor-pointer group"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
      >
        <div className="relative h-72 md:h-80 rounded-lg overflow-hidden border border-gold/20 hover:border-gold/50 hover:shadow-[0_0_30px_rgba(212,175,55,0.2)] transition-shadow duration-500">
          {/* Video or Image */}
          {hasVideo ? (
            <>
              <video
                ref={videoRef}
                muted
                loop
                playsInline
                onLoadedData={() => setVideoLoaded(true)}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                poster={brand.img}
              >
                <source src={brand.video} type="video/mp4" />
              </video>
              {!videoLoaded && (
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url('${brand.img}')` }}
                />
              )}
            </>
          ) : (
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
              style={{ backgroundImage: `url('${brand.img}')` }}
            />
          )}

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent" />

          {/* Video Play Button */}
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

          {/* Brand Name */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <p className="font-bodoni text-2xl text-gold">{brand.name}</p>
            <div className="w-8 h-[1px] bg-gold/50 mt-2 group-hover:w-16 transition-all duration-500" />
            {hasVideo && (
              <span className="flex items-center gap-1.5 mt-2 font-inter text-[10px] text-light/40 uppercase tracking-wider">
                <span className="w-1 h-1 rounded-full bg-gold animate-pulse" />
                Video
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function LuxurySection() {
  const ref = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const isInView = useInView(sectionRef, { margin: '-200px' });

  return (
    <section ref={sectionRef} id="luxury" className="relative py-32 px-6 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage: `url('https://upload.wikimedia.org/wikipedia/commons/1/11/Dubai_Dino.jpg')`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/20 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          style={{ y }}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="font-inter text-xs tracking-[0.5em] text-gold uppercase mb-4">
            Fashion Avenue
          </p>
          <h2 className="font-bodoni text-4xl md:text-6xl lg:text-7xl text-light">
            Where <span className="text-gold-gradient">Luxury</span> Lives
          </h2>
          <p className="font-inter text-base text-light/50 mt-4 max-w-lg mx-auto">
            Home to the world&apos;s most prestigious brands, curated for the discerning.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {brands.map((brand, i) => (
            <TiltCard key={brand.name} brand={brand} index={i} />
          ))}
        </div>

        {/* Fashion Avenue Stats */}
        <motion.div
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {[
            { value: '200+', label: 'Luxury Brands' },
            { value: '70,000', label: 'Sq Ft Fashion Avenue' },
            { value: '1.2M', label: 'Monthly Visitors' },
            { value: 'AED 8B+', label: 'Annual Sales' },
          ].map((stat, i) => (
            <div key={stat.label} className="text-center p-6 glass-card rounded-lg">
              <p className="font-grotesk text-3xl md:text-4xl text-gold font-light mb-2">{stat.value}</p>
              <p className="font-inter text-xs text-light/50 uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
