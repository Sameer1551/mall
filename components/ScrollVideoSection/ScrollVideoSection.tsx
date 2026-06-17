import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * ScrollVideoSection
 *
 * A tall sticky section (400 vh) where the muted video is "scrubbed" by the
 * user's scroll position — like Apple's product-page video storytelling.
 *
 * Layout:
 *   - Outer wrapper  → height: 400vh  (provides the scroll distance)
 *   - Inner wrapper  → position: sticky, height: 100vh  (stays on screen)
 *   - Video          → covers the sticky inner, always muted
 *   - Overlay text   → fades in then out as the user scrolls
 */
export default function ScrollVideoSection() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Track scroll progress through the tall outer wrapper
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ['start start', 'end end'],
  });

  // Overlay text opacity: visible in the first 20 % of scroll, gone by 35 %
  const textOpacity = useTransform(scrollYProgress, [0, 0.15, 0.35], [1, 1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.35], ['0%', '-12%']);

  // Bottom label opacity: appears mid-scroll, fades at the end
  const labelOpacity = useTransform(scrollYProgress, [0.5, 0.65, 0.9, 1], [0, 1, 1, 0]);

  // Smooth scroll-scrubbing with RAF + lerp
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let rafId: number;
    // targetTime is updated instantly on scroll; displayTime lerps toward it each frame
    let targetTime = 0;
    let displayTime = 0;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    // RAF loop: runs every frame, smoothly moves toward target
    const tick = () => {
      if (video.duration) {
        // 0.10 = smooth lag. Increase toward 0.2 for snappier, decrease for dreamier.
        displayTime = lerp(displayTime, targetTime, 0.10);

        const diff = Math.abs(displayTime - video.currentTime);
        if (diff > 0.015) {
          // fastSeek is more efficient on browsers that support it (e.g. Firefox)
          type SeekableVideo = HTMLVideoElement & { fastSeek: (t: number) => void };
          if ('fastSeek' in video) {
            (video as SeekableVideo).fastSeek(displayTime);
          } else {
            (video as HTMLVideoElement).currentTime = displayTime;
          }
        }
      }
      rafId = requestAnimationFrame(tick);
    };

    // Subscribe to scroll changes — just update the target, RAF handles the rest
    const unsubscribe = scrollYProgress.on('change', (progress) => {
      if (video.duration) {
        targetTime = Math.max(0, Math.min(progress * video.duration, video.duration - 0.05));
      }
    });

    rafId = requestAnimationFrame(tick);

    return () => {
      unsubscribe();
      cancelAnimationFrame(rafId);
    };
  }, [scrollYProgress]);

  return (
    /* Outer: tall enough to give meaningful scroll distance */
    <div ref={wrapperRef} style={{ height: '400vh' }} className="relative">

      {/* Inner: sticky, stays in the viewport the whole time */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* Muted video — scrubbed by scroll, NOT auto-playing */}
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          /* No autoPlay & no loop — we control currentTime manually */
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source
            src="/images/ai/PixVerse_V6_Image_Text_540P_create_a_video_or_.mp4"
            type="video/mp4"
          />
        </video>

        {/* Dark gradient overlays for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/60 via-transparent to-[#050505]/80 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/30 via-transparent to-[#050505]/30 pointer-events-none" />

        {/* Headline text — fades & rises as user scrolls */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-10 pointer-events-none"
          style={{ opacity: textOpacity, y: textY }}
        >
          <motion.p
            className="font-inter text-xs tracking-[0.5em] text-gold uppercase mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Experience The Dubai Mall
          </motion.p>

          <motion.h2
            className="font-bodoni text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-light leading-[0.95] mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.15 }}
          >
            Scroll to
            <br />
            <span className="text-gold-gradient">Discover</span>
          </motion.h2>

          <motion.p
            className="font-inter text-base md:text-lg text-light/60 max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Journey through the world's most iconic retail destination — one scroll at a time.
          </motion.p>

          {/* Animated scroll indicator */}
          <motion.div
            className="mt-12 flex flex-col items-center gap-2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          >
            <div className="w-[1px] h-12 bg-gradient-to-b from-gold/60 to-transparent" />
            <span className="font-inter text-[10px] tracking-[0.3em] text-gold/60 uppercase">
              Scroll
            </span>
          </motion.div>
        </motion.div>

        {/* Bottom label — appears mid-scroll */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center pointer-events-none z-10"
          style={{ opacity: labelOpacity }}
        >
          <p className="font-inter text-xs tracking-[0.4em] text-gold/70 uppercase">
            The Dubai Mall · Downtown Dubai, UAE
          </p>
        </motion.div>

        {/* Scroll progress bar along the left edge */}
        <div className="absolute left-6 top-1/4 bottom-1/4 w-[1px] bg-white/10 z-10">
          <motion.div
            className="w-full bg-gold origin-top"
            style={{ scaleY: scrollYProgress }}
          />
        </div>
      </div>
    </div>
  );
}
