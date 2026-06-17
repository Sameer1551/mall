import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

function GoldParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: { x: number; y: number; vx: number; vy: number; size: number; alpha: number }[] = [];
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -Math.random() * 0.5 - 0.1,
        size: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.5 + 0.1,
      });
    }

    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -10) { p.y = canvas.height + 10; p.x = Math.random() * canvas.width; }
        if (p.x < -10 || p.x > canvas.width + 10) p.x = Math.random() * canvas.width;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 175, 55, ${p.alpha})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0" />;
}

const ctaButtons = [
  { label: 'Retail Leasing', to: '/retail-leasing', primary: true },
  { label: 'Sponsorship Opportunities', to: '/sponsorship', primary: false },
  { label: 'Book Event Space', to: '/event-spaces', primary: false },
];

export default function FinalCTA() {
  return (
    <section id="cta" className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 overflow-hidden">
      <div className="absolute inset-0 bg-[#050505]/20" />
      <GoldParticles />

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <p className="font-inter text-[10px] sm:text-xs tracking-[0.3em] sm:tracking-[0.5em] text-gold uppercase mb-6 sm:mb-8">
            The Opportunity
          </p>
          <h2 className="font-bodoni text-3xl sm:text-4xl md:text-6xl lg:text-8xl text-light leading-[0.9] mb-4 sm:mb-6">
            BECOME PART OF THE
            <br />
            <span className="text-gold-gradient">WORLD&apos;S MOST VISITED</span>
            <br />
            DESTINATION
          </h2>
          <p className="font-inter text-sm sm:text-base text-light/50 max-w-xl mx-auto mb-8 sm:mb-12 px-2">
            Join 1,200+ brands, 200+ countries, and 100 million annual visitors. Your next chapter starts here.
          </p>
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center px-4 sm:px-0"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {ctaButtons.map(btn => (
            <Link
              key={btn.label}
              to={btn.to}
              className={`group flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 text-xs sm:text-sm font-inter tracking-wider uppercase transition-all duration-300 rounded-sm w-full sm:w-auto ${
                btn.primary
                  ? 'bg-gold text-dark hover:bg-gold-light gold-glow'
                  : 'glass-card text-light hover:border-gold/50 hover:shadow-[0_0_20px_rgba(212,175,55,0.2)]'
              }`}
            >
              {btn.label}
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          ))}
        </motion.div>

        <motion.div
          className="mt-16 sm:mt-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <p className="font-bodoni text-4xl sm:text-6xl md:text-8xl text-gold/10">THE DUBAI MALL</p>
        </motion.div>
      </div>
    </section>
  );
}
