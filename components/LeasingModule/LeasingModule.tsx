import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const tabs = [
  {
    id: 'luxury',
    label: 'Luxury',
    img: 'https://upload.wikimedia.org/wikipedia/commons/1/1e/DubaiMallAquariumDSC_7260.JPG',
    title: 'Luxury Retail Spaces',
    desc: 'Premium locations along Fashion Avenue with direct access to 100M+ annual visitors. Bespoke fit-out options with gold-standard finishing.',
    audience: '100M+ annual footfall',
    stats: 'Spaces from 2,000 sq ft',
  },
  {
    id: 'flagship',
    label: 'Flagship',
    img: 'https://upload.wikimedia.org/wikipedia/commons/1/11/Dubai_Dino.jpg',
    title: 'Flagship Store Locations',
    desc: 'Commanding double-height spaces at prime mall entrances. Make a statement that resonates globally.',
    audience: '50M+ annual visitors passing',
    stats: 'Spaces from 5,000 sq ft',
  },
  {
    id: 'fnb',
    label: 'Food & Beverage',
    img: 'https://upload.wikimedia.org/wikipedia/commons/c/c2/Dubai_Fountain_4.JPG',
    title: 'Dining & Café Spaces',
    desc: 'Curated F&B zones designed for culinary excellence. From quick-service to fine dining.',
    audience: '30M+ dining visitors',
    stats: 'Spaces from 500 sq ft',
  },
  {
    id: 'popup',
    label: 'Pop-Up',
    img: 'https://upload.wikimedia.org/wikipedia/commons/1/11/Dubai_Dino.jpg',
    title: 'Pop-Up & Temporary',
    desc: 'Flexible short-term spaces for seasonal activations, product launches, and brand experiences.',
    audience: 'High-traffic seasonal zones',
    stats: 'From 1-week terms',
  },
];

export default function LeasingModule() {
  const [active, setActive] = useState('luxury');
  const current = tabs.find(t => t.id === active)!;

  return (
    <section id="leasing" className="relative py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark-100/20 to-transparent" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="font-inter text-xs tracking-[0.5em] text-gold uppercase mb-4">
            Retail Leasing
          </p>
          <h2 className="font-bodoni text-4xl md:text-6xl lg:text-7xl text-light">
            Your Space <span className="text-gold-gradient">Awaits</span>
          </h2>
        </motion.div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 sm:gap-3 mb-10 justify-center">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={`px-4 sm:px-5 py-2 text-xs sm:text-sm font-inter tracking-wider uppercase transition-all duration-300 rounded w-full sm:w-auto ${
                active === tab.id
                  ? 'bg-gold text-dark'
                  : 'glass-card text-light/60 hover:text-light hover:border-gold/30'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            className="glass-card rounded-lg overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="relative h-64 lg:h-auto min-h-[400px]">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url('${current.img}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#050505]/80 hidden lg:block" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent lg:hidden" />
              </div>
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <h3 className="font-bodoni text-3xl md:text-4xl text-light mb-4">{current.title}</h3>
                <p className="font-inter text-sm text-light/60 leading-relaxed mb-6">{current.desc}</p>
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                    <span className="font-inter text-sm text-gold">{current.audience}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                    <span className="font-inter text-sm text-light/60">{current.stats}</span>
                  </div>
                </div>
                <Link
                  to={`/enquire?space=${encodeURIComponent(current.title)}`}
                  className="group flex items-center justify-center sm:justify-start gap-2 px-5 sm:px-6 py-3 bg-gold text-dark text-xs sm:text-sm font-inter tracking-wider uppercase hover:bg-gold-light transition-all duration-300 self-stretch sm:self-start rounded-sm"
                >
                  Enquire Now
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
