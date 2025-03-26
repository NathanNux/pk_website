import { detectNavSpanColor } from "@/lib/detectBGcolor";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useAnimationControls, useInView } from "framer-motion";
import { useRouter } from "next/router";
import { useGlobalContext } from "@/context/globalContext";

const navLinks = [
    {
        title: 'Trafika',
        href: '/trafika',
    },
    {
        title: 'FotoGalerie',
        href: '/fotogalerie',
    },
    {
        title: 'Kontakt',
        href: '/contact',
    }
];

const charAnim1 = {
    initial: { opacity: 1, y: 0, x: 0 },
    enter: (i) => ({
      opacity: 0,
      x: -40,
      y: 0,
      transition: {
        duration: 0.3,
        delay: i * 0.02,
      },
      ease: [0.6, 0.05, -0.01, 0.9]
    }),
    exit: (i) => ({
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.3,
        delay: i * 0.02,
      },
      ease: [0.6, 0.05, -0.01, 0.9]
    })
};
  
const charAnim2 = {
    initial: { opacity: 0, y: 0, x: 40 },
    enter: (i) => ({
        opacity: 1,
        x: 0,
        y: 0,
        transition: {
        duration: 0.3,
        delay: i * 0.02,
        },
        ease: [0.6, 0.05, -0.01, 0.9]
    }),
    exit: (i) => ({
        opacity: 0,
        x: 40,
        y: 0,
        transition: {
        duration: 0.3,
        delay: i * 0.02,
        },
        ease: [0.6, 0.05, -0.01, 0.9]
    })
};

// Simple SplitText with span class
const SplitText = ({ text, active, variants, isActiveRoute }) => {
    return text.split("").map((char, index) => {
      return (
        <motion.span 
            key={index}
            className={`span ${isActiveRoute ? 'active-route-span' : ''}`}
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
 
export default function Nav({footerRef}) {
    // need here valid paths to disable preloader anim for 404 page
    const validPaths = ['/', '/trafika', '/fotogalerie', '/contact', '/cookies', '/terms'];
    const router = useRouter();
    const navItemRefs = useRef([]);
    const [isHovered, setIsHovered] = useState({active: false, index: null});
    const controls = useAnimationControls();
 
    const { slideLoad } = useGlobalContext();
    const initialAnimPlayed = useRef(false);
    
    const isFooterInView = useInView(footerRef, {
        margin: "0px 0px 0px 0px", 
        amount: 0.25,
        once: false 
    });
    
    // Function to apply color detection to all nav spans
    const applyColorDetection = () => {
        const cleanupFunctions = [];
        
        navItemRefs.current.forEach(navItem => {
            if (navItem) {
                const spans = navItem.querySelectorAll('h4:first-child .span');
                spans.forEach(span => {
                    const cleanup = detectNavSpanColor(span);
                    if (cleanup) cleanupFunctions.push(cleanup);
                });
            }
        });
        
        return cleanupFunctions;
    };
    
    // FIRST EFFECT: Initial Animation on First Load
    useEffect(() => {
        // Only run this effect when slideLoad is true and initial animation hasn't played
        if (slideLoad && !initialAnimPlayed.current) {
            // Start with navbar hidden
            controls.set("hidden");
            
            // Check if current path is valid or a 404 page
            const is404Page = !validPaths.includes(router.pathname);
            
            // Set delay - 0 for 404 pages, normal delay for valid pages
            const animationDelay = is404Page ? 0 : 5100;
            
            // Apply appropriate delay based on page type
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
    
    // SECOND EFFECT: Footer Visibility Control
    useEffect(() => {
        // Only respond to footer if initial animation has finished or not first load
        if (!slideLoad || initialAnimPlayed.current) {
            if (isFooterInView) {
                controls.start("hidden");
            } else {
                controls.start("visible").then(() => {
                    // Apply color detection after animation completes
                    setTimeout(applyColorDetection, 350);
                });
            }
        }
    }, [isFooterInView, slideLoad, controls]);
    
    // THIRD EFFECT: Run detection on route change
    useEffect(() => {
        // Wait for page transition to complete
        const timeout = setTimeout(() => {
            const cleanups = applyColorDetection();
            
            return () => {
                cleanups.forEach(cleanup => {
                    if (typeof cleanup === 'function') cleanup();
                });
            };
        }, 2750); // Wait for page transition to complete
        
        return () => clearTimeout(timeout);
    }, [router.pathname]); // Re-run when route changes
    
    // FOURTH EFFECT: Initial color detection
    useEffect(() => {
        // Initial color detection when component mounts
        const cleanupFunctions = applyColorDetection();
        
        return () => {
            cleanupFunctions.forEach(cleanup => {
                if (typeof cleanup === 'function') cleanup();
            });
        };
    }, []);
    
    // Nav item animation
    const navAnim = {
        visible: (i) => ({
            opacity: 1,
            x: 0, 
            transition: {
                duration: 0.3,
                delay: i * 0.03,
                ease: [0.6, 0.05, -0.01, 0.9]
            }
        }),
        hidden: (i) => ({
            opacity: 0,
            x: 20,
            transition: {
                duration: 0.3,
                delay: i * 0.03,
                ease: [0.6, 0.05, -0.01, 0.9]
            }
        }),
    };
    
    const containerAnim = {
        visible: {
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.05
            }
        },
        hidden: {
            transition: {
                staggerChildren: 0.05,
                staggerDirection: -1
            }
        }
    };
    
    return (
        <motion.nav 
            className="nav"
            variants={containerAnim}
            initial={slideLoad ? "hidden" : "visible"} // Start hidden on initial page load
            animate={controls}
        >
            {navLinks.map((link, index) => {
                const { title, href } = link;
                const isCurrentItemHovered = isHovered.active && isHovered.index === index;
                const isActiveRoute = router.pathname === href;
                
                return (
                    <motion.div 
                        className="nav__item" 
                        key={index}
                        ref={el => navItemRefs.current[index] = el}
                        variants={navAnim}
                        custom={index}
                    >
                        <Link 
                            href={href}
                            onMouseEnter={() => setIsHovered({active: true, index})}
                            onMouseLeave={() => setIsHovered({active: false, index})}
                            onClick={(e) => {
                                // Prevent navigation to current page
                                if (router.pathname === href) {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    return false;
                                }
                            }}
                        >
                            <h4 
                                style={{
                                    // Fix: Use proper ternary instead of logical AND
                                    color: router.pathname === href ? '#ff1d28 !important' : undefined,
                                }}
                            >
                                <SplitText 
                                    text={title} 
                                    active={isCurrentItemHovered} 
                                    variants={charAnim1} 
                                    href={href}
                                    router={router}
                                    isActiveRoute={isActiveRoute}
                                />
                            </h4>
                            
                            <h4>
                                <SplitText 
                                    text={title} 
                                    active={isCurrentItemHovered} 
                                    variants={charAnim2} 
                                    href={href}
                                    router={router}
                                    isActiveRoute={isActiveRoute}
                                />
                            </h4>
                        </Link>
                    </motion.div>
                );
            })}
        </motion.nav>
    );
}