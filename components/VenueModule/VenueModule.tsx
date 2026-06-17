import { useRef, MouseEvent } from 'react';
import { motion } from 'framer-motion';
import { Building, Music, Presentation, Rocket, Sparkles } from 'lucide-react';

const venues = [
  {
    icon: Building,
    title: 'Corporate Events',
    capacity: 'Up to 2,000 guests',
    desc: 'State-of-the-art conference facilities with premium AV.',
    img: '/images/real/corporate event.jpg',
  },
  {
    icon: Music,
    title: 'Concert Spaces',
    capacity: 'Up to 5,000 guests',
    desc: 'Iconic open-air and indoor stages with world-class acoustics.',
    img: '/images/real/concertspaces.jpg',
  },
  {
    icon: Presentation,
    title: 'Exhibitions',
    capacity: 'Up to 10,000 sq ft',
    desc: 'Flexible exhibition halls with custom configuration.',
    img: '/images/real/exhibition.jpg',
  },
  {
    icon: Rocket,
    title: 'Brand Launches',
    capacity: 'Custom layouts',
    desc: 'Theatrical spaces designed for maximum impact and media coverage.',
    img: '/images/real/popup.jpg',
  },
  {
    icon: Sparkles,
    title: 'Fashion Shows',
    capacity: 'Runway + 500 seats',
    desc: 'Professional runway setups with full lighting and broadcasting.',
    img: '/images/ai/ai_fashion_show_1781706475049.png',
  },
];

function VenueCard({ venue, index }: { venue: typeof venues[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    cardRef.current.style.transform = `perspective(800px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) scale(1.03)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg) scale(1)';
  };

  return (
    <motion.div
      className="perspective-800"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.12 }}
    >
      <div
        ref={cardRef}
        className="preserve-3d transition-transform duration-200 ease-out cursor-pointer group"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="relative h-80 md:h-96 rounded-lg overflow-hidden border border-gold/10 group-hover:border-gold/30 transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(212,175,55,0.15)]">
          <div
            className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
            style={{ backgroundImage: `url('${venue.img}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <venue.icon className="w-8 h-8 text-gold mb-3" />
            <h3 className="font-bodoni text-2xl md:text-3xl text-light mb-1">{venue.title}</h3>
            <p className="font-grotesk text-sm text-gold mb-2">{venue.capacity}</p>
            <p className="font-inter text-sm text-light/50">{venue.desc}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function VenueModule() {
  return (
    <section id="venue" className="relative py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark-200/20 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="font-inter text-xs tracking-[0.5em] text-gold uppercase mb-4">
            Venue Spaces
          </p>
          <h2 className="font-bodoni text-4xl md:text-6xl lg:text-7xl text-light">
            Iconic <span className="text-gold-gradient">Venues</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {venues.map((venue, i) => (
            <VenueCard key={venue.title} venue={venue} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
