import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Crown, Diamond, Trophy, ArrowRight } from 'lucide-react';

const tiers = [
  {
    icon: Crown,
    title: 'Gold Partner',
    audience: '50M+',
    price: 'Custom',
    features: ['Brand presence in 5 key zones', 'Digital screen placements', 'Social media co-creation', 'Quarterly analytics report'],
    accent: 'from-gold/20 to-gold/5',
  },
  {
    icon: Diamond,
    title: 'Platinum Partner',
    audience: '75M+',
    price: 'Custom',
    features: ['All Gold benefits', 'Exclusive event hosting rights', 'Premium location branding', 'Dedicated brand concierge', 'Custom activation spaces'],
    accent: 'from-gold/30 to-gold/10',
    featured: true,
  },
  {
    icon: Trophy,
    title: 'Title Partner',
    audience: '100M+',
    price: 'Custom',
    features: ['All Platinum benefits', 'Naming rights', 'Full mall integration', 'Global media coverage', 'Year-round visibility', 'First right of refusal on events'],
    accent: 'from-gold/40 to-gold/15',
  },
];

export default function SponsorshipSection() {
  return (
    <section id="sponsorship" className="relative py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark-300/20 to-transparent" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="font-inter text-xs tracking-[0.5em] text-gold uppercase mb-4">
            Sponsorship
          </p>
          <h2 className="font-bodoni text-4xl md:text-6xl lg:text-7xl text-light">
            Partner with <span className="text-gold-gradient">Greatness</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.title}
              className={`group relative glass-card rounded-lg p-8 hover:border-gold/40 transition-all duration-500 ${
                tier.featured ? 'border-gold/30 ring-1 ring-gold/20' : ''
              }`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              whileHover={{ y: -8, shadow: '0 20px 60px rgba(212,175,55,0.15)' }}
            >
              {tier.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-dark text-xs font-inter tracking-wider uppercase px-4 py-1 rounded-full">
                  Most Popular
                </div>
              )}

              <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${tier.accent} flex items-center justify-center mb-6`}>
                <tier.icon className="w-6 h-6 text-gold" />
              </div>

              <h3 className="font-bodoni text-2xl text-light mb-1">{tier.title}</h3>
              <p className="font-grotesk text-4xl text-gold font-light mb-1">{tier.audience}</p>
              <p className="font-inter text-xs text-light/40 mb-6">Audience Reach</p>

              <div className="w-full h-[1px] bg-gold/10 mb-6" />

              <ul className="space-y-3 mb-8">
                {tier.features.map(f => (
                  <li key={f} className="flex items-center gap-2 font-inter text-sm text-light/60">
                    <span className="w-1 h-1 rounded-full bg-gold shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                to={`/partnership?tier=${encodeURIComponent(tier.title)}`}
                className="w-full group/btn flex items-center justify-center gap-2 py-3 px-2 border border-gold/30 text-gold text-[10px] xl:text-xs font-inter tracking-wider uppercase hover:bg-gold hover:text-dark transition-all duration-300 rounded whitespace-nowrap"
              >
                Start Partnership Discussion
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover/btn:translate-x-1 transition-transform shrink-0" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
