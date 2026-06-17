import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Crown, Diamond, Trophy, Check } from 'lucide-react';

const tiers = [
  {
    icon: Crown,
    title: 'Gold Partner',
    audience: '50M+',
    investment: 'Enquire',
    features: [
      'Brand presence in 5 key zones',
      'Digital screen placements',
      'Social media co-creation',
      'Quarterly analytics report',
      'Dedicated account manager',
    ],
    accent: 'from-gold/20 to-gold/5',
  },
  {
    icon: Diamond,
    title: 'Platinum Partner',
    audience: '75M+',
    investment: 'Enquire',
    features: [
      'All Gold benefits',
      'Exclusive event hosting rights',
      'Premium location branding',
      'Dedicated brand concierge',
      'Custom activation spaces',
      'Priority seasonal placements',
      'Influencer collaboration program',
    ],
    accent: 'from-gold/30 to-gold/10',
    featured: true,
  },
  {
    icon: Trophy,
    title: 'Title Partner',
    audience: '100M+',
    investment: 'Enquire',
    features: [
      'All Platinum benefits',
      'Naming rights on key events',
      'Full mall integration campaign',
      'Global media coverage package',
      'Year-round 360 visibility',
      'First right of refusal on events',
      'Executive board advisory seat',
      'Custom branded zone design',
    ],
    accent: 'from-gold/40 to-gold/15',
  },
];

export default function Sponsorship() {
  return (
    <div className="min-h-screen bg-[#050505]">
      {/* Header */}
      <div className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('https://upload.wikimedia.org/wikipedia/commons/4/42/081106_Dubai_Mall_-_souk.jpg')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/80 to-[#050505]" />
        <div className="relative z-10 text-center px-6">
          <motion.p
            className="font-inter text-xs tracking-[0.5em] text-gold uppercase mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Sponsorship
          </motion.p>
          <motion.h1
            className="font-bodoni text-4xl md:text-6xl lg:text-7xl text-light"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Partner with <span className="text-gold-gradient">Greatness</span>
          </motion.h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <Link to="/" className="inline-flex items-center gap-2 text-gold/60 hover:text-gold font-inter text-sm tracking-wider uppercase transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Presentation
        </Link>
      </div>

      {/* Tiers */}
      <div className="max-w-6xl mx-auto px-6 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.title}
              className={`relative glass-card rounded-lg p-8 hover:border-gold/40 transition-all duration-500 ${
                tier.featured ? 'border-gold/30 ring-1 ring-gold/20' : ''
              }`}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
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
                  <li key={f} className="flex items-start gap-2 font-inter text-sm text-light/60">
                    <Check className="w-4 h-4 text-gold shrink-0 mt-0.5" />
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

        {/* Process */}
        <motion.div
          className="mt-20 glass-card rounded-lg p-8 md:p-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="font-bodoni text-3xl text-light mb-4">The Partnership Process</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
            {['Initial Consultation', 'Proposal & Customization', 'Agreement & Onboarding', 'Launch & Activation'].map((step, si) => (
              <div key={step}>
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-3">
                  <span className="font-grotesk text-gold text-sm">{si + 1}</span>
                </div>
                <p className="font-inter text-sm text-light/60">{step}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
