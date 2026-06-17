import { useEffect, useRef, useState, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Lenis from 'lenis';
import LoadingScreen from './components/LoadingScreen/LoadingScreen';
import Navigation from './components/Navigation/Navigation';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import FloatingDots from './components/FloatingDots/FloatingDots';

const Hero = lazy(() => import('./components/Hero/Hero'));
const VideoShowcase = lazy(() => import('./components/VideoShowcase/VideoShowcase'));
const ScrollVideoSection = lazy(() => import('./components/ScrollVideoSection/ScrollVideoSection'));
const VirtualTour = lazy(() => import('./components/VirtualTour/VirtualTour'));
const WhyDubaiMall = lazy(() => import('./components/WhyDubaiMall/WhyDubaiMall'));
const LuxurySection = lazy(() => import('./components/LuxurySection/LuxurySection'));
const DiningLifestyle = lazy(() => import('./components/DiningLifestyle/DiningLifestyle'));
const EntertainmentSection = lazy(() => import('./components/EntertainmentSection/EntertainmentSection'));
const EventsPlatform = lazy(() => import('./components/EventsPlatform/EventsPlatform'));
const SponsorshipSection = lazy(() => import('./components/SponsorshipSection/SponsorshipSection'));
const LeasingModule = lazy(() => import('./components/LeasingModule/LeasingModule'));
const VenueModule = lazy(() => import('./components/VenueModule/VenueModule'));
const Stats = lazy(() => import('./components/Stats/Stats'));
const Gallery = lazy(() => import('./components/Gallery/Gallery'));
const FinalCTA = lazy(() => import('./components/FinalCTA/FinalCTA'));

const RetailLeasing = lazy(() => import('./pages/RetailLeasing'));
const Sponsorship = lazy(() => import('./pages/Sponsorship'));
const EventSpaces = lazy(() => import('./pages/EventSpaces'));
const Enquiry = lazy(() => import('./pages/Enquiry'));
const BookVenue = lazy(() => import('./pages/BookVenue'));
const PartnershipDiscussion = lazy(() => import('./pages/PartnershipDiscussion'));

function MainDeck() {
  const [loaded, setLoaded] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (!loaded) return;
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [loaded]);

  return (
    <>
      <LoadingScreen onComplete={() => setLoaded(true)} />
      {loaded && (
        <>
          <Navigation />
          <main className="relative">
            <Suspense fallback={<div className="min-h-screen" />}>
              <Hero />
              <VideoShowcase />
              <ScrollVideoSection />
              <VirtualTour />
              <WhyDubaiMall />
              <LuxurySection />
              <DiningLifestyle />
              <EntertainmentSection />
              <EventsPlatform />
              <SponsorshipSection />
              <LeasingModule />
              <VenueModule />
              <Stats />
              <Gallery />
              <FinalCTA />
            </Suspense>
          </main>
        </>
      )}
    </>
  );
}

const PageFallback = () => <div className="min-h-screen" />;

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <FloatingDots />
      <Routes>
        <Route path="/" element={<MainDeck />} />
        <Route path="/retail-leasing" element={<Suspense fallback={<PageFallback />}><RetailLeasing /></Suspense>} />
        <Route path="/sponsorship" element={<Suspense fallback={<PageFallback />}><Sponsorship /></Suspense>} />
        <Route path="/event-spaces" element={<Suspense fallback={<PageFallback />}><EventSpaces /></Suspense>} />
        <Route path="/enquire" element={<Suspense fallback={<PageFallback />}><Enquiry /></Suspense>} />
        <Route path="/book-venue" element={<Suspense fallback={<PageFallback />}><BookVenue /></Suspense>} />
        <Route path="/partnership" element={<Suspense fallback={<PageFallback />}><PartnershipDiscussion /></Suspense>} />
      </Routes>
    </BrowserRouter>
  );
}
