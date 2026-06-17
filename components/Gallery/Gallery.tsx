import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const images = [
  { src: '/images/real/Dubai mall expansion 1.jpeg', title: 'The Dubai Mall' },
  { src: '/images/real/nightskyline.jpg', title: 'Night Skyline' },
  { src: '/images/real/fashionaenue.jpg', title: 'Fashion Avenue' },
  { src: '/images/real/luxury.jpeg', title: 'Luxury Experience' },
  { src: 'https://upload.wikimedia.org/wikipedia/commons/1/1e/DubaiMallAquariumDSC_7260.JPG', title: 'Aquarium' },
  { src: '/images/real/fine dining.webp', title: 'Fine Dining' },
  { src: '/images/real/flagship.jpg', title: 'Rooftop Experience' },
  { src: '/images/ai/ai_fashion_show_1781706475049.png', title: 'Fashion Shows' },
];

export default function Gallery() {
  return (
    <section id="gallery" className="relative py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark-200/20 to-transparent" />

      <div className="relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="font-inter text-xs tracking-[0.5em] text-gold uppercase mb-4">
            Gallery
          </p>
          <h2 className="font-bodoni text-4xl md:text-6xl lg:text-7xl text-light">
            Visual <span className="text-gold-gradient">Journey</span>
          </h2>
        </motion.div>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1.2}
          centeredSlides={true}
          loop={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true, bulletClass: 'swiper-pagination-bullet !bg-gold/30 !w-2 !h-2', bulletActiveClass: '!bg-gold !w-6 !rounded-full' }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="!pb-12"
        >
          {images.map((img, i) => (
            <SwiperSlide key={i}>
              <motion.div
                className="group relative h-60 sm:h-72 md:h-80 lg:h-96 rounded-lg overflow-hidden cursor-pointer"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                  style={{ backgroundImage: `url('${img.src}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/80 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="font-bodoni text-xl text-light">{img.title}</p>
                  <div className="w-6 h-[1px] bg-gold/50 mt-2 group-hover:w-12 transition-all duration-500" />
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
