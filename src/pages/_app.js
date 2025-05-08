import BackgroundGradient from "@/components/common/Backgorund";
import Footer from "@/components/common/Footer";
import Logo from "@/components/common/Navbar/head";
import Nav from "@/components/common/Navbar/nav";
import Transition from "@/components/common/Transition";
import CookiesBar from "@/components/modems/Cookies";
import { CookiesProvider } from "@/context/CookiesProvider";
import { LoadProvider } from "@/context/globalContext";
import "@/styles/globals.scss";
import "@/styles/styles.scss"; 
import { AnimatePresence } from "framer-motion";
import Lenis from "lenis";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/react"


export default function App({ Component, pageProps }) {
  const router = useRouter();
  const footerRef = useRef(null);
  useEffect(() => {
    window.lenis = new Lenis({
      duration: 0.8,           
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      lerp: 1.5,               
      smoothWheel: true,       
      wheelMultiplier: 0.8,      
      touchMultiplier: 1
    });

    function raf(time){
      window.lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return() => {
      window.lenis.destroy();
    }
  }, []);

  // Disable Next.js default scroll restoration
  useEffect(() => {
    if (history.scrollRestoration) {
      history.scrollRestoration = 'manual';
    }
    
    // Force scroll to top when router is ready but before hydration
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <CookiesProvider>
        <LoadProvider>
          <Logo footerRef={footerRef} />
          <Nav footerRef={footerRef} />
          <BackgroundGradient />
          <CookiesBar />
          <AnimatePresence mode="wait" onExitComplete={() => {
            // Additional safety check - ensure scroll is at top after exit animation completes
              window.scrollTo(0, 0);
              if (window.lenis) window.lenis.scrollTo(0, { immediate: true });
            }}
          >
              <Transition key={router.pathname}>
                <Analytics />
                <Component {...pageProps} />
                <Footer ref={footerRef} />
              </Transition>
            </AnimatePresence>
          </LoadProvider>
      </CookiesProvider>
      <Toaster position="top-center" richColors closeButton={false} toastOptions={{ duration: 3000 }} />
    </>
  );
}
