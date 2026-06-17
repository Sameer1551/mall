import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Building, Music, Presentation, Rocket, Sparkles, Users, Ruler, MapPin } from 'lucide-react';

const venues = [
  {
    icon: Building,
    title: 'Corporate Events',
    capacity: 'Up to 2,000 guests',
    size: '5,000 - 20,000 sq ft',
    desc: 'State-of-the-art conference facilities with premium AV, high-speed connectivity, and dedicated event management teams. Ideal for AGMs, galas, and leadership summits.',
    img: 'https://upload.wikimedia.org/wikipedia/commons/1/1e/DubaiMallAquariumDSC_7260.JPG',
  },
  {
    icon: Music,
    title: 'Concert Spaces',
    capacity: 'Up to 5,000 guests',
    size: '10,000+ sq ft',
    desc: 'Iconic open-air and indoor stages with world-class acoustics and full production capabilities. From intimate performances to arena-scale shows.',
    img: 'https://upload.wikimedia.org/wikipedia/commons/6/67/Apple%2C_Dubai._Flagship_Retail_Store.jpg',
  },
  {
    icon: Presentation,
    title: 'Exhibitions',
    capacity: 'Up to 10,000 visitors/day',
    size: 'Up to 50,000 sq ft',
    desc: 'Flexible exhibition halls with custom configuration, loading docks, and dedicated branding zones. Full logistical support included.',
    img: 'https://upload.wikimedia.org/wikipedia/commons/1/15/Dubai_MALL_Waterfalls.jpg',
  },
  {
    icon: Rocket,
    title: 'Brand Launches',
    capacity: 'Custom layouts',
    size: '2,000 - 15,000 sq ft',
    desc: 'Theatrical spaces designed for maximum impact and media coverage. Immersive setups with cutting-edge technology and dramatic lighting.',
    img: 'https://upload.wikimedia.org/wikipedia/commons/c/c2/Dubai_Fountain_4.JPG',
  },
  {
    icon: Sparkles,
    title: 'Fashion Shows',
    capacity: 'Runway + 500 seats',
    size: '8,000+ sq ft',
    desc: 'Professional runway setups with full lighting rigs, broadcasting capability, and VIP front-row seating. Backstage areas and designer green rooms.',
    img: 'https://upload.wikimedia.org/wikipedia/commons/9/90/Burj_Khalifa_%28worlds_tallest_building%29_and_the_Dubai_skyline_%2825781049892%29.jpg',
  },
];

export default function EventSpaces() {
  return (
    <div className="min-h-screen bg-[#050505]">
      {/* Header */}
      <div className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('https://upload.wikimedia.org/wikipedia/commons/1/1c/A_l%27int%C3%A9rieur_du_Duba%C3%AF_Mall_%2B1200_shops%2C_le_plus_grand_centre_commercial_du_monde_%286830160966%29.jpg')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/80 to-[#050505]" />
        <div className="relative z-10 text-center px-6">
          <motion.p
            className="font-inter text-xs tracking-[0.5em] text-gold uppercase mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Event Spaces
          </motion.p>
          <motion.h1
            className="font-bodoni text-4xl md:text-6xl lg:text-7xl text-light"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Iconic <span className="text-gold-gradient">Venues</span>
          </motion.h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <Link to="/" className="inline-flex items-center gap-2 text-gold/60 hover:text-gold font-inter text-sm tracking-wider uppercase transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Presentation
        </Link>
      </div>

      {/* Venues */}
      <div className="max-w-6xl mx-auto px-6 pb-32 space-y-12">
        {venues.map((venue, i) => (
          <motion.div
            key={venue.title}
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
                  style={{ backgroundImage: `url('${venue.img}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#050505]/80 hidden lg:block" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent lg:hidden" />
              </div>
              <div className="p-6 md:p-10 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <venue.icon className="w-6 h-6 text-gold" />
                  <h3 className="font-bodoni text-2xl md:text-3xl text-light">{venue.title}</h3>
                </div>
                <p className="font-inter text-sm text-light/60 leading-relaxed mb-6">{venue.desc}</p>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <Users className="w-5 h-5 text-gold mx-auto mb-1" />
                    <p className="font-grotesk text-xs text-gold">{venue.capacity}</p>
                  </div>
                  <div className="text-center">
                    <Ruler className="w-5 h-5 text-gold mx-auto mb-1" />
                    <p className="font-inter text-xs text-light/50">{venue.size}</p>
                  </div>
                  <div className="text-center">
                    <MapPin className="w-5 h-5 text-gold mx-auto mb-1" />
                    <p className="font-inter text-xs text-light/50">Downtown Dubai</p>
                  </div>
                </div>
                <Link
                  to={`/book-venue?venue=${encodeURIComponent(venue.title)}`}
                  className="w-full sm:w-auto group flex items-center justify-center gap-2 px-5 sm:px-6 py-3 bg-gold text-dark text-xs sm:text-sm font-inter tracking-wider uppercase hover:bg-gold-light transition-all duration-300 rounded-sm"
                >
                  Book This Venue
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
