import { detectBGcolor } from "@/lib/detectBGcolor";
import { useAnimationControls, useInView, motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useGlobalContext } from "@/context/globalContext";

const charAnim1 = {
    initial: { opacity: 1, y: 0 },
    enter: (i) => ({
      opacity: 0,
      y: -40,
      transition: {
        duration: 0.3,
        delay: i * 0.02,
      },
      ease: [0.6, 0.05, -0.01, 0.9]
    }),
    exit: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        delay: i * 0.02,
      },
      ease: [0.6, 0.05, -0.01, 0.9]
    })
};
  
const charAnim2 = {
    initial: { opacity: 0, y: 20 },
    enter: (i) => ({
        opacity: 1,
        y: 0,
        transition: {
        duration: 0.3,
        delay: i * 0.02,
        },
        ease: [0.6, 0.05, -0.01, 0.9]
    }),
    exit: (i) => ({
        opacity: 0,
        y: 40,
        transition: {
        duration: 0.3,
        delay: i * 0.02,
        },
        ease: [0.6, 0.05, -0.01, 0.9]
    })
};

const SplitText = ({ text, active, variants }) => {
    return text.split("").map((char, index) => {
      return (
        <motion.span 
          key={index}
          variants={variants}
          initial="initial"
          animate={active ? "enter" : "exit"} 
          custom={index}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      );
    });
};

export default function Logo({footerRef}) {

    // need to add the same mechanism as in nav component
    const validPaths = ['/', '/trafika', '/fotogalerie', '/contact', '/cookies', '/terms'];

    const router = useRouter();
    const controls = useAnimationControls();
    const [active, setActive] = useState(false);
    
    // Get slideLoad from global context
    const { slideLoad } = useGlobalContext();
    
    // Track if initial animation has played
    const initialAnimPlayed = useRef(false);
    
    // Check if the footer is in view
    const isFooterInView = useInView(footerRef, {
        margin: "0px 0px 0px 0px", 
        amount: 0.25,
        once: false 
    });
    
    // Function to apply color detection
    const applyColorDetection = () => {
        const cleanup = detectBGcolor('.logo');
        return cleanup;
    };

    // FIRST EFFECT: Handle Initial Animation on First Load
    useEffect(() => {
        // Only run this effect when slideLoad is true and initial animation hasn't played
        if (slideLoad && !initialAnimPlayed.current) {
            // Start with logo hidden
            controls.set("hidden");
            
            // Check if current path is valid or a 404 page
            const is404Page = !validPaths.includes(router.pathname);
            
            // Set delay - 0 for 404 pages, normal delay for valid pages
            const animationDelay = is404Page ? 0 : 5100;
            
            // After delay (or immediately for 404), animate in the logo
            const timer = setTimeout(() => {
                controls.start("visible").then(() => {
                    // Reapply color detection after animation completes
                    setTimeout(applyColorDetection, 350);
                });
                initialAnimPlayed.current = true;
            }, animationDelay);
            
            return () => clearTimeout(timer);
        }
    }, [slideLoad, controls, router.pathname]);

    // Initial color detection
    useEffect(() => {
        const cleanup = applyColorDetection();
        return () => {
            if (typeof cleanup === 'function') cleanup();
        };
    }, []);
    
    // Route change color detection with delay
    useEffect(() => {
        // Wait for page transition to complete before detecting colors
        const timeout = setTimeout(() => {
            const cleanup = applyColorDetection();
            
            return () => {
                if (typeof cleanup === 'function') cleanup();
            };
        }, 2750); // Same timeout as in the Nav component
        
        return () => clearTimeout(timeout);
    }, [router.pathname]);

    // Footer visibility effect - only apply after initial animation
    useEffect(() => {
        // Only respond to footer if initial animation has finished or not first load
        if (!slideLoad || initialAnimPlayed.current) {
            if (isFooterInView) {
                controls.start('hidden');
            } else {
                controls.start('visible').then(() => {
                    // Reapply color detection after animation completes
                    setTimeout(applyColorDetection, 350);
                });
            }
        }
    }, [isFooterInView, controls, slideLoad]);

    const logoAnim = {
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
            },
            ease: [0.6, 0.05, -0.01, 0.9]
        },
        hidden: {
            opacity: 0,
            y: -20,
            transition: {
                duration: 0.5,
            },
            ease: [0.6, 0.05, -0.01, 0.9]
        }
    };

    return (
        <motion.div 
            className="logo"
            variants={logoAnim}
            initial={slideLoad ? "hidden" : "visible"} // Start hidden on initial page load
            animate={controls}
            onMouseEnter={() => setActive(true)}
            onMouseLeave={() => setActive(false)}
        >
            <Link 
                href="/"
                onClick={(e) => {
                    // Prevent navigation to current page
                    if (router.pathname === '/') {
                        e.preventDefault();
                        e.stopPropagation();
                        return false;
                    }
                }}    
            >
                <h3 style={{
                    color: router.pathname === '/' && '#ff1d28',
                }}>
                    <SplitText text="Kovanda" active={active} variants={charAnim1} />
                </h3>
                <h3>
                    <SplitText text="Kovanda" active={active} variants={charAnim2} />
                </h3>
            </Link>
        </motion.div>
    );
}