import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Building2, MapPin, Users, Ruler } from 'lucide-react';

const spaces = [
  {
    title: 'Fashion Avenue',
    size: '2,000 - 10,000 sq ft',
    audience: '100M+ annual visitors',
    desc: 'Premium luxury retail along the iconic Fashion Avenue. Adjacent to Louis Vuitton, Gucci, Dior, and Chanel. Full bespoke fit-out with gold-standard finishing and dedicated mall entrance.',
    img: 'https://upload.wikimedia.org/wikipedia/commons/1/1c/A_l%27int%C3%A9rieur_du_Duba%C3%AF_Mall_%2B1200_shops%2C_le_plus_grand_centre_commercial_du_monde_%286830160966%29.jpg',
  },
  {
    title: 'Grand Atrium',
    size: '5,000 - 20,000 sq ft',
    audience: '50M+ annual visitors passing',
    desc: 'Commanding double-height flagship spaces at prime mall entrances. Unmatched visibility with 360-degree exposure to high-traffic zones.',
    img: 'https://upload.wikimedia.org/wikipedia/commons/1/1e/DubaiMallAquariumDSC_7260.JPG',
  },
  {
    title: 'Dining Terrace',
    size: '500 - 3,000 sq ft',
    audience: '30M+ dining visitors',
    desc: 'Curated F&B zones with outdoor terrace options overlooking the Dubai Fountain. From quick-service to fine dining.',
    img: 'https://upload.wikimedia.org/wikipedia/commons/1/1e/DubaiMallAquariumDSC_7260.JPG',
  },
  {
    title: 'Pop-Up Quarter',
    size: '200 - 1,500 sq ft',
    audience: 'High-traffic seasonal zones',
    desc: 'Flexible short-term spaces for seasonal activations, product launches, and brand experiences. Available from 1-week terms.',
    img: 'https://upload.wikimedia.org/wikipedia/commons/1/1e/DubaiMallAquariumDSC_7260.JPG',
  },
];

export default function RetailLeasing() {
  return (
    <div className="min-h-screen bg-[#050505]">
      {/* Header */}
      <div className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('https://upload.wikimedia.org/wikipedia/commons/1/11/Dubai_Dino.jpg')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/80 to-[#050505]" />
        <div className="relative z-10 text-center px-6">
          <motion.p
            className="font-inter text-xs tracking-[0.5em] text-gold uppercase mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Retail Leasing
          </motion.p>
          <motion.h1
            className="font-bodoni text-4xl md:text-6xl lg:text-7xl text-light"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Your Space <span className="text-gold-gradient">Awaits</span>
          </motion.h1>
        </div>
      </div>

      {/* Back button */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <Link to="/" className="inline-flex items-center gap-2 text-gold/60 hover:text-gold font-inter text-sm tracking-wider uppercase transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Presentation
        </Link>
      </div>

      {/* Spaces */}
      <div className="max-w-6xl mx-auto px-6 pb-32 space-y-12">
        {spaces.map((space, i) => (
          <motion.div
            key={space.title}
            className="glass-card rounded-lg overflow-hidden"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="relative h-64 lg:h-auto min-h-[300px]">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url('${space.img}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#050505]/80 hidden lg:block" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent lg:hidden" />
              </div>
              <div className="p-6 md:p-10 flex flex-col justify-center">
                <h3 className="font-bodoni text-2xl md:text-3xl text-light mb-4">{space.title}</h3>
                <p className="font-inter text-sm text-light/60 leading-relaxed mb-6">{space.desc}</p>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <Ruler className="w-5 h-5 text-gold mx-auto mb-1" />
                    <p className="font-grotesk text-xs text-gold">{space.size}</p>
                  </div>
                  <div className="text-center">
                    <Users className="w-5 h-5 text-gold mx-auto mb-1" />
                    <p className="font-inter text-xs text-light/50">{space.audience}</p>
                  </div>
                  <div className="text-center">
                    <MapPin className="w-5 h-5 text-gold mx-auto mb-1" />
                    <p className="font-inter text-xs text-light/50">Downtown Dubai</p>
                  </div>
                </div>
                <Link
                  to={`/enquire?space=${encodeURIComponent(space.title)}`}
                  className="w-full sm:w-auto group flex items-center justify-center gap-2 px-5 sm:px-6 py-3 bg-gold text-dark text-xs sm:text-sm font-inter tracking-wider uppercase hover:bg-gold-light transition-all duration-300 rounded-sm"
                >
                  Enquire About This Space
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
