import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const statItems = [
  { value: 100, suffix: 'M+', label: 'Visitors', decimal: false },
  { value: 1200, suffix: '+', label: 'Stores', decimal: false },
  { value: 200, suffix: '+', label: 'Countries', decimal: false },
  { value: 5.9, suffix: 'M', label: 'Square Feet', decimal: true },
  { value: 40, suffix: 'M+', label: 'Instagram Mentions', decimal: false },
];

function StatCounter({ item }: { item: typeof statItems[0] }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start: number | null = null;
    const duration = 2000;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = item.decimal
        ? parseFloat((eased * item.value).toFixed(1))
        : Math.floor(eased * item.value);
      setCount(current);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, item]);

  return (
    <div ref={ref} className="text-center">
      <p className="font-grotesk text-5xl md:text-6xl lg:text-7xl text-gold font-light">
        {item.decimal ? Number(count).toFixed(1) : count}{item.suffix}
      </p>
      <p className="font-inter text-xs tracking-widest uppercase text-light/40 mt-3">
        {item.label}
      </p>
    </div>
  );
}

export default function Stats() {
  return (
    <section id="stats" className="relative py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark-300/20 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-gold/[0.04] blur-[120px]" />

      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="font-inter text-xs tracking-[0.5em] text-gold uppercase mb-4">
            By the Numbers
          </p>
          <h2 className="font-bodoni text-4xl md:text-6xl lg:text-7xl text-light">
            The Scale of <span className="text-gold-gradient">Extraordinary</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {statItems.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <StatCounter item={item} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
