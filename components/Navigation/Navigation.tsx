import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const sections = [
  { id: 'hero', label: 'Home' },
  { id: 'video-showcase', label: 'Experience' },
  { id: 'why', label: 'Why' },
  { id: 'luxury', label: 'Luxury' },
  { id: 'dining', label: 'Dining' },
  { id: 'entertainment', label: 'Entertainment' },
  { id: 'events', label: 'Events' },
  { id: 'sponsorship', label: 'Sponsorship' },
  { id: 'leasing', label: 'Leasing' },
  { id: 'venue', label: 'Venues' },
  { id: 'stats', label: 'Stats' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'cta', label: 'Join' },
];

export default function Navigation() {
  const [active, setActive] = useState('hero');
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== '/') {
      setIsVisible(false);
      return;
    }
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname !== '/') return;

    const handleScroll = () => {
      setIsVisible(window.scrollY > 100);
      const sectionEls = sections.map(s => document.getElementById(s.id));
      const scrollPos = window.scrollY + window.innerHeight / 3;

      for (let i = sectionEls.length - 1; i >= 0; i--) {
        const el = sectionEls[i];
        if (el && el.offsetTop <= scrollPos) {
          setActive(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (location.pathname !== '/') return null;

  return (
    <motion.nav
      className="fixed left-4 md:left-8 top-1/2 -translate-y-1/2 z-50 hidden sm:flex flex-col items-center gap-2.5 md:gap-3"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -20 }}
      transition={{ duration: 0.5 }}
    >
      {sections.map(section => (
        <button
          key={section.id}
          onClick={() => scrollTo(section.id)}
          className="group relative flex items-center"
          aria-label={section.label}
        >
          <span className="absolute left-5 md:left-6 font-inter text-[9px] md:text-[10px] tracking-widest uppercase text-light/0 group-hover:text-light/80 transition-all duration-300 whitespace-nowrap">
            {section.label}
          </span>
          <span
            className={`block rounded-full transition-all duration-300 ${
              active === section.id
                ? 'w-2.5 h-2.5 md:w-3 md:h-3 bg-gold shadow-[0_0_12px_rgba(212,175,55,0.6)]'
                : 'w-1.5 h-1.5 md:w-2 md:h-2 bg-light/30 group-hover:bg-light/60'
            }`}
          />
        </button>
      ))}
    </motion.nav>
  );
}
