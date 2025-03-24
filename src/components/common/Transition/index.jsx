import { useGlobalContext } from '@/context/globalContext';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
// Perspective animation with top corner radius
// Helper function to determine if route should have border radius
const shouldApplyBorderRadius = (path) => {
    // Skip border radius for home and contact pages
    return path !== "/" && path !== "/contact";
};

// Function to create perspective animation based on current path
const createPerspectiveVariant = (path) => {
    const useRadius = shouldApplyBorderRadius(path);
    
    return {
        initial: {
            scale: 0.9,
            y: '75vh',
            opacity: 1,
            borderTopLeftRadius: useRadius ? 100 : 0,  
            borderTopRightRadius: useRadius ? 100 : 0, 
            borderBottomLeftRadius: 0, 
            borderBottomRightRadius: 0, 
            overflow: 'hidden'
        },
        enter: {
            scale: 1,
            y: 0,
            opacity: 1,
            borderTopLeftRadius: 0,  
            borderTopRightRadius: 0, 
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            overflow: 'visible',
            transition: {
                duration: 1.2,
                ease: [0.76, 0, 0.24, 1],
                borderTopLeftRadius: { 
                    duration: useRadius ? 0.8 : 0, 
                    delay: useRadius ? 0.4 : 0, 
                    ease: [0.76, 0, 0.24, 1] 
                },
                borderTopRightRadius: { 
                    duration: useRadius ? 0.8 : 0, 
                    delay: useRadius ? 0.4 : 0, 
                    ease: [0.76, 0, 0.24, 1] 
                },
                overflow: { delay: 2.5 }
            }
        },
        exit: {
            scale: 0.9,
            y: "75vh",
            opacity: 0.5,
            borderTopLeftRadius: useRadius ? 100 : 0,  
            borderTopRightRadius: useRadius ? 100 : 0, 
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            overflow: 'hidden',
            transition: {
                delay: 0.2,
                duration: 1.2,
                ease: [0.76, 0, 0.24, 1],
                borderTopLeftRadius: { 
                    duration: useRadius ? 0.6 : 0, 
                    ease: [0.76, 0, 0.24, 1] 
                },
                borderTopRightRadius: { 
                    duration: useRadius ? 0.6 : 0, 
                    ease: [0.76, 0, 0.24, 1] 
                },
            }
        }
    };
};

// No animation variants for first load
const noAnimation = {
    initial: {
        scale: 1,
        y: 0,
        opacity: 1
    },
    enter: {
        scale: 1,
        y: 0,
        opacity: 1,
        transition: {
            duration: 0
        }
    },
    exit: {
        scale: 1,
        y: 0,
        opacity: 1,
        transition: {
            duration: 0
        }
    }
}

// Slide animation - simplified
const slide = {
    initial: {
        top: "50vh",
        opacity: 1, // Start transparent during first load
    },
    enter: {
        top: "100vh", 
        opacity: 1, // Visible during transitions
        transition: {
            duration: 1.2,
            ease: [0.76, 0, 0.24, 1]
        }
    },
    exit: {
        top: "50vh",
        opacity: 1, // Visible during transitions
        transition: {
            duration: 1.2,
            ease: [0.76, 0, 0.24, 1]
        }
    }
}

const opacity = {
    initial: {
        opacity: 0
    },
    enter: {
        opacity: 1,
        transition: {
            duration: 0.5
        }
    },
    exit: {
        opacity: 1
    }
}

const routes = {
    "/": "Domovní Stránka",
    "/trafika": "Trafika",
    "/contact": "Kontakt",
    "/fotogalerie": "FotoGalerie",
}

export default function Transition({children}) {
    const router = useRouter();
    const [isRouteChanging, setIsRouteChanging] = useState(false);
    const { firstLoad, setFirstLoad } = useGlobalContext();
    const [slideEnabled, setSlideEnabled] = useState(false);
    
    const perspectiveVariant = createPerspectiveVariant(router.pathname);


    // Determine which animation to use based on firstLoad
    const contentVariants = firstLoad ? noAnimation : perspectiveVariant;
    const fadeVariants = firstLoad ? noAnimation : opacity;
    
    useEffect(() => {
        // Store the scroll position in a ref that won't trigger re-renders
        let currentScrollY = 0;
        
        const handleRouteChangeStart = () => {
            // Only handle route animations if not first load
            if (!firstLoad) {
                // Store current scroll position right when navigation starts
                currentScrollY = window.scrollY;
                setIsRouteChanging(true);
                
                // Enable slide animations for all non-first navigations
                setSlideEnabled(true);
                
                // Stop scrolling during exit animation
                if (window.lenis) window.lenis.stop();
            }
        };
        
        const handleRouteChangeComplete = () => {
            // Reset scroll position BEFORE enter animation starts
            window.scrollTo(0, 0);
            if (window.lenis) window.lenis.scrollTo(0, { immediate: true });
            
            // Wait for next frame to ensure DOM updates
            requestAnimationFrame(() => {
                setIsRouteChanging(false);
                
                // Re-enable scrolling after a slight delay
                setTimeout(() => {
                    if (window.lenis) window.lenis.start();
                    
                    // If this was the first navigation after preloader,
                    // we can mark first load as false for future navigations
                    if (firstLoad) {
                        setFirstLoad(false);
                    }
                }, 100);
            });
        };
        
        router.events.on('routeChangeStart', handleRouteChangeStart);
        router.events.on('routeChangeComplete', handleRouteChangeComplete);
        
        return () => {
            router.events.off('routeChangeStart', handleRouteChangeStart);
            router.events.off('routeChangeComplete', handleRouteChangeComplete);
        };
    }, [router, firstLoad, setFirstLoad]);
    
    return (
        <>
            <motion.main 
                className="transition"
                initial='initial'
                animate='enter'
                exit='exit'
                variants={contentVariants}
                onAnimationStart={() => {
                    if (!isRouteChanging && !firstLoad) {
                        if (window.lenis) window.lenis.stop();
                    }
                }}
                onAnimationComplete={() => {
                    if (window.lenis) window.lenis.start();
                }}
            >
                <motion.div 
                    initial='initial'
                    animate='enter'
                    exit='exit'
                    variants={fadeVariants}
                >
                    {children}
                </motion.div>
            </motion.main>

            {/* Always render the slide but control with CSS */}
            <motion.div 
                className='slide'
                initial='initial'
                animate='enter'
                exit='exit'
                variants={slide}
                style={{ 
                    visibility: slideEnabled || !firstLoad ? 'visible' : 'hidden',
                    pointerEvents: slideEnabled ? 'auto' : 'none',
                    display: firstLoad ? 'none' : 'flex'
                }}
            >
                <div className='background'/>
                <p>{routes[router.pathname] || "Stránka"}</p>
            </motion.div>
        </>
    );
}