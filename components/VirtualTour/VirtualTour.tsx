import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ReactPhotoSphereViewer } from 'react-photo-sphere-viewer';

const tours = [
  {
    id: 'mall-inside',
    title: 'Inside The Mall',
    src: '/mall-inside.jpg'
  },
  {
    id: 'aquarium',
    title: 'Dubai Aquarium',
    src: '/aquarium.jpg'
  }
];

export default function VirtualTour() {
  const [activeTour, setActiveTour] = useState(tours[0]);
  const viewerRef = useRef<any>(null);

  return (
    <section className="py-24 bg-dark relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.p
            className="font-inter text-xs tracking-[0.5em] text-gold uppercase mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Immersive Experience
          </motion.p>
          <motion.h2
            className="font-bodoni text-4xl sm:text-5xl md:text-6xl text-light leading-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            360° Virtual Tours
          </motion.h2>
          <motion.p
            className="font-inter text-light/60 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Step inside and explore our iconic spaces from anywhere in the world. 
            Experience the grandeur of The Dubai Mall in stunning 360-degree vision.
          </motion.p>
        </div>

        {/* Tour Selection */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {tours.map((tour) => (
            <button
              key={tour.id}
              onClick={() => setActiveTour(tour)}
              className={`px-6 py-3 rounded-sm font-inter text-sm tracking-widest uppercase transition-all duration-300 ${
                activeTour.id === tour.id
                  ? 'bg-gold text-dark font-medium shadow-[0_0_20px_rgba(212,175,55,0.3)]'
                  : 'bg-light/5 text-light hover:bg-light/10 border border-light/10'
              }`}
            >
              {tour.title}
            </button>
          ))}
        </div>

        {/* Tour Container */}
        <motion.div
          key={activeTour.id}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative w-full h-[600px] md:h-[700px] rounded-lg overflow-hidden border border-gold/20 glass-card group"
        >
          <ReactPhotoSphereViewer
            ref={viewerRef}
            src={activeTour.src}
            height="100%"
            width="100%"
            littlePlanet={false}
            hideNavbarButton={true}
          />
        </motion.div>
      </div>
    </section>
  );
}
