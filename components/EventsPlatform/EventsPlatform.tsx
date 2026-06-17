import { motion } from 'framer-motion';
import { Sparkles, Star, Mic2, Music, Rocket, Building2 } from 'lucide-react';

const events = [
  { icon: Sparkles, title: 'Fashion Shows', year: '2024', desc: 'Global runway events featuring top designers.' },
  { icon: Star, title: 'Brand Activations', year: '2024', desc: 'Immersive brand experiences that captivate millions.' },
  { icon: Mic2, title: 'Celebrity Events', year: '2024', desc: 'A-list appearances and exclusive gatherings.' },
  { icon: Music, title: 'Concerts', year: '2024', desc: 'Live performances in iconic settings.' },
  { icon: Rocket, title: 'Product Launches', year: '2024', desc: 'World premieres and exclusive reveals.' },
  { icon: Building2, title: 'Corporate Events', year: '2024', desc: 'Premium spaces for unforgettable corporate moments.' },
];

export default function EventsPlatform() {
  return (
    <section id="events" className="relative py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark-200/20 to-transparent" />

      {/* Animated background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gold/[0.03] blur-[150px]" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="font-inter text-xs tracking-[0.5em] text-gold uppercase mb-4">
            Events Platform
          </p>
          <h2 className="font-bodoni text-4xl md:text-6xl lg:text-8xl text-light leading-[0.9]">
            Where the World
            <br />
            <span className="text-gold-gradient">Takes the Stage</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Glowing timeline line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-gold/20 hidden lg:block">
            <motion.div
              className="w-full bg-gold/60"
              initial={{ height: '0%' }}
              whileInView={{ height: '100%' }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease: 'easeOut' }}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {events.map((event, i) => (
              <motion.div
                key={event.title}
                className={`group glass-card rounded-lg p-8 hover:border-gold/30 transition-all duration-500 hover:shadow-[0_0_30px_rgba(212,175,55,0.1)] w-full lg:max-w-[500px] ${
                  i % 2 === 1 ? 'lg:ml-auto lg:pl-16' : 'lg:mr-auto lg:pr-16'
                }`}
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center shrink-0 group-hover:bg-gold/20 transition-colors duration-300">
                    <event.icon className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <p className="font-grotesk text-xs text-gold/60 mb-1">{event.year}</p>
                    <h3 className="font-bodoni text-2xl text-light mb-2">{event.title}</h3>
                    <p className="font-inter text-sm text-light/50">{event.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
