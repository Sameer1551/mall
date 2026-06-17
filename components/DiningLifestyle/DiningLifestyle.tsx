import { motion } from 'framer-motion';
import { Utensils, Coffee, Sunset, Globe2 } from 'lucide-react';

const categories = [
  {
    icon: Utensils,
    title: 'Fine Dining',
    desc: 'Michelin-starred chefs and world-class culinary experiences.',
    img: '/images/real/fine dining.webp',
  },
  {
    icon: Coffee,
    title: 'Cafes & Lounges',
    desc: 'Artisanal coffee and curated lounge experiences.',
    img: 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&q=80&w=2000',
  },
  {
    icon: Sunset,
    title: 'Rooftop Experiences',
    desc: 'Skyline dining with breathtaking views of Burj Khalifa.',
    img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=2000',
  },
  {
    icon: Globe2,
    title: 'International Cuisine',
    desc: '200+ restaurants spanning every continent.',
    img: '/images/real/food.jpg',
  },
];

export default function DiningLifestyle() {
  return (
    <section id="dining" className="relative py-32 px-6 overflow-hidden">
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
            Dining & Lifestyle
          </p>
          <h2 className="font-bodoni text-4xl md:text-6xl lg:text-7xl text-light">
            A World of <span className="text-gold-gradient">Flavor</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.title}
              className="group relative h-80 md:h-96 rounded-lg overflow-hidden cursor-pointer border border-gold/10 hover:border-gold/40 hover:shadow-[0_0_30px_rgba(212,175,55,0.15)] transition-all duration-500"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              {/* Image — zooms subtly on hover, no blur */}
              <div
                className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700 ease-out"
                style={{ backgroundImage: `url('${cat.img}')` }}
              />
              {/* Static gradient overlay — stays clean, no glass blur */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/50 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 md:p-8">
                <cat.icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-gold mb-3 sm:mb-4" />
                <h3 className="font-bodoni text-2xl sm:text-3xl text-light mb-1 sm:mb-2">{cat.title}</h3>
                <p className="font-inter text-xs sm:text-sm text-light/60 max-w-md">{cat.desc}</p>
                <div className="w-8 h-[1px] bg-gold/50 mt-4 group-hover:w-24 transition-all duration-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
