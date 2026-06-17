import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Globe, MapPin, Maximize, Footprints } from 'lucide-react';

const cards = [
  {
    icon: Globe,
    title: 'Global Reach',
    stat: '200+',
    desc: 'Visitors from 200+ countries.',
  },
  {
    icon: MapPin,
    title: 'Prime Location',
    stat: '1st',
    desc: 'Downtown Dubai. Burj Khalifa district.',
  },
  {
    icon: Maximize,
    title: 'Scale',
    stat: '5.9M',
    desc: '5.9 million square feet.',
  },
  {
    icon: Footprints,
    title: 'Foot Traffic',
    stat: '100M',
    desc: '100 million annual visitors.',
  },
];

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target]);

  return (
    <span ref={ref} className="font-grotesk text-5xl md:text-6xl text-gold font-light">
      {count}{suffix}
    </span>
  );
}

export default function WhyDubaiMall() {
  return (
    <section id="why" className="relative min-h-screen py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark-300/20 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="font-inter text-xs tracking-[0.5em] text-gold uppercase mb-4">
            Why This Property
          </p>
          <h2 className="font-bodoni text-4xl md:text-6xl lg:text-7xl text-light">
            Why <span className="text-gold-gradient">The Dubai Mall</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              className="glass-card p-8 rounded-lg group hover:border-gold/30 transition-all duration-500 hover:shadow-[0_0_30px_rgba(212,175,55,0.1)]"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <card.icon className="w-8 h-8 text-gold mb-6 group-hover:scale-110 transition-transform duration-300" />
              <p className="font-inter text-xs tracking-widest uppercase text-light/50 mb-3">
                {card.title}
              </p>
              <p className="font-bodoni text-3xl text-gold mb-2">
                {card.stat}
              </p>
              <p className="font-inter text-sm text-light/60 leading-relaxed">
                {card.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Animated Map */}
        <motion.div
          className="mt-20 relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <div className="glass-card rounded-lg p-8 md:p-12 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <svg viewBox="0 0 1000 500" className="w-full h-full">
                <ellipse cx="500" cy="250" rx="480" ry="230" fill="none" stroke="rgba(212,175,55,0.3)" strokeWidth="0.5" />
                <ellipse cx="500" cy="250" rx="350" ry="170" fill="none" stroke="rgba(212,175,55,0.2)" strokeWidth="0.5" />
                <ellipse cx="500" cy="250" rx="220" ry="110" fill="none" stroke="rgba(212,175,55,0.15)" strokeWidth="0.5" />
                {/* Dubai location dot */}
                <circle cx="580" cy="200" r="4" fill="#D4AF37">
                  <animate attributeName="r" values="4;8;4" dur="2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite" />
                </circle>
                {/* Radiating rings */}
                <circle cx="580" cy="200" r="20" fill="none" stroke="rgba(212,175,55,0.3)" strokeWidth="0.5">
                  <animate attributeName="r" values="20;60;20" dur="3s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.3;0;0.3" dur="3s" repeatCount="indefinite" />
                </circle>
                <circle cx="580" cy="200" r="40" fill="none" stroke="rgba(212,175,55,0.2)" strokeWidth="0.5">
                  <animate attributeName="r" values="40;100;40" dur="4s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.2;0;0.2" dur="4s" repeatCount="indefinite" />
                </circle>
                {/* Connection lines from major regions */}
                <line x1="200" y1="150" x2="580" y2="200" stroke="rgba(212,175,55,0.1)" strokeWidth="0.5" strokeDasharray="4,4" />
                <line x1="300" y1="350" x2="580" y2="200" stroke="rgba(212,175,55,0.1)" strokeWidth="0.5" strokeDasharray="4,4" />
                <line x1="750" y1="180" x2="580" y2="200" stroke="rgba(212,175,55,0.1)" strokeWidth="0.5" strokeDasharray="4,4" />
                <line x1="800" y1="350" x2="580" y2="200" stroke="rgba(212,175,55,0.1)" strokeWidth="0.5" strokeDasharray="4,4" />
                <line x1="400" y1="100" x2="580" y2="200" stroke="rgba(212,175,55,0.1)" strokeWidth="0.5" strokeDasharray="4,4" />
              </svg>
            </div>
            <div className="relative z-10 text-center">
              <p className="font-inter text-xs tracking-widest uppercase text-gold/60 mb-2">
                Global Hub
              </p>
              <p className="font-bodoni text-3xl md:text-4xl text-light">
                At the Crossroads of the <span className="text-gold-gradient">World</span>
              </p>
              <p className="font-inter text-sm text-light/50 mt-4 max-w-md mx-auto">
                Strategically positioned between Europe, Asia, and Africa — welcoming visitors from every continent.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
