import Image from "next/image";
import { useRef, useState, useEffect, createRef } from "react";
import { motion, useSpring, useMotionValue, useScroll, useTransform } from "framer-motion";
import BackgroundGradient from "../common/Backgroundwhite";
import { useGlobalContext } from "@/context/globalContext";
import { fotoGaleriePics } from "@/constants";

const SplitPairs = ({ text, variants }) => {
    const chars = text.split('');
    const pairs = [];
    
    const hasOddLength = chars.length % 2 === 1;
    const regularPairsEndIndex = hasOddLength ? chars.length - 3 : chars.length;
    
    for (let i = 0; i < regularPairsEndIndex; i += 2) {
        pairs.push(chars[i] + chars[i + 1]);
    }
    
    if (hasOddLength) {
        pairs.push(chars[chars.length - 3] + chars[chars.length - 2] + chars[chars.length - 1]);
    }

    return (
        <>
            {pairs.map((group, index) => {
                return (
                    <motion.span
                        key={index}
                        variants={variants}
                        initial="initial"
                        animate="enter"
                        custom={index}
                        className="span"
                    >
                        {group === ' ' ? '\u00A0' : group}
                    </motion.span>
                )
            })}
        </>
    )
}

// New component that splits by words, then characters
const SplitWordsAndChars = ({text, isTextHovered, itemIndex, isTouch, Mindex}) => {
    // Animation configuration
    const charAnimation = {
        initial: (i) => ({
            y: isTouch ? 0 : 50,
            opacity: isTouch ? 1 : 0,
            transition: {
                duration: 0.3,
                ease: [0.76, 0, 0.24, 1],
                delay: i * 0.025
            }
        }),
        hover: (i) => ({
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.3,
                ease: [0.76, 0, 0.24, 1],
                delay: i * 0.025
            }
        })
    };

    const currentIdentifier = `${Mindex} ${itemIndex}`;
    const isActive = isTouch || (isTextHovered.active && isTextHovered.index === currentIdentifier);
    
    // Split text into words
    const words = text.split(' ');
    
    return (
        <>
            {words.map((word, wordIndex) => (
                <span 
                    key={wordIndex} 
                    style={{ 
                        display: 'inline-block', // Keep words flowing in paragraph
                        marginRight: '0.25em', // Add space between words
                        overflow: 'hidden' // Hide overflow for animation
                    }}
                >
                    {/* Split each word into characters */}
                    {word.split('').map((char, charIndex) => {
                        // Calculate global character index for staggered animation
                        const globalCharIndex = words
                            .slice(0, wordIndex)
                            .reduce((acc, w) => acc + w.length, 0) + charIndex;
                            
                        return (
                            <motion.span 
                                key={charIndex} 
                                style={{ display: 'inline-block' }} // Keep chars flowing in word
                                variants={charAnimation}
                                initial="initial"
                                animate={isActive ? "hover" : "initial"}
                                custom={globalCharIndex}
                            >
                                {char}
                            </motion.span>
                        );
                    })}
                </span>
            ))}
        </>
    );
};


const productAnim = {
    initial: { opacity: 0, y: "100vh", scale: 0.8 },
    enter: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 1.5, delay: 3.8, ease: [0.76, 0, 0.24, 1] }
    }
}

const productAnim2 = {
    initial: { opacity: 0, y: "100vh", scale: 0.8 },
    enter: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 1, ease: [0.76, 0, 0.24, 1] }
    }
}

const titleAnim = {
    initial: (i) => ({ opacity: 0, x: i * -20, y: 0 }),
    enter: (i) => ({
        opacity: 1,
        x: 0,
        y: 0,
        transition: { duration: 0.5, delay: i * 0.02 + 4.9, ease: [0.76, 0, 0.24, 1] }
    }),
}

const titleAnim2 = {
    initial: (i) => ({ opacity: 0, x: i * -20, y: 0 }),
    enter: (i) => ({
        opacity: 1,
        x: 0,
        y: 0,
        transition: { duration: 0.5, delay: i * 0.02 + 0.75, ease: [0.76, 0, 0.24, 1] }
    }),
}

// Touch detection utility
const isTouchDevice = () => {
    if (typeof window === 'undefined') return false;
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};

// Cursor component
const Cursor = ({ isHovered }) => {
    const ref = useRef(null);
    const scaleAnimation = {
        initial: { scale: 0 },
        open: {
            scale: 1,
            transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] }
        },
        closed: {
            scale: 0,
            transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] }
        }
    };

    const mouse = {
        x: useMotionValue(0),
        y: useMotionValue(0)
    };

    const smoothMouseOptions = {
        damping: 20,
        stiffness: 200,
        mass: 0.5
    };

    const smoothMouse = {
        x: useSpring(mouse.x, smoothMouseOptions),
        y: useSpring(mouse.y, smoothMouseOptions)
    };

    const manageMouse = (e) => {
        const elementRef = ref.current;
        if(!elementRef) return;

        const { clientX, clientY } = e;
        const { width, height } = elementRef.getBoundingClientRect();

        mouse.x.set(clientX - width / 2);
        mouse.y.set(clientY - height / 2);
    };

    useEffect(() => {
        window.addEventListener('mousemove', manageMouse);
        return () => {
            window.removeEventListener('mousemove', manageMouse);
        };
    }, []);

    return (
        <motion.div 
            ref={ref}
            className="fotoGalerie__cursor"
            variants={scaleAnimation}
            initial="initial"
            animate={isHovered ? "open" : "closed"}
            style={{
                translateX: smoothMouse.x,
                translateY: smoothMouse.y
            }}
        >
            <p>Fotka</p>
        </motion.div>
    );
};

// Column component
const GalleryColumn = ({ images, y, onMouseEnter, onMouseLeave, isTextHovered, isTouch, Mindex }) => {
    return (
        <motion.div className="fotoGalerie__column" style={{ y }}>
            {images.map((pic, index) => {
                const { src, alt, title, desc } = pic;
                const globalIndex = images.indexOf(pic);
                
                return (
                    <div 
                        key={index} 
                        className="fotoGalerie__column__item"
                        onMouseEnter={() => onMouseEnter(`${Mindex} ${globalIndex}`)}
                        onMouseLeave={() => onMouseLeave(`${Mindex} ${globalIndex}`)}
                    >
                        <div className="fotoGalerie__column__item__image-container">
                            <div className="fotoGalerie__column__item__image">
                                <Image 
                                    src={src}
                                    alt={alt}
                                    fill={true}
                                    sizes="(min-width: 500px) 35vw, 40vh"
                                    quality={90}
                                    priority={index < 2}
                                />
                            </div>
                        </div>
                        <div 
                            style={{
                                width: '100%',
                                height: '100%',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                zIndex: 1,
                                backgroundColor: (isTouch || (isTextHovered.active && isTextHovered.index === globalIndex)) 
                                    ? 'transparent' 
                                    : 'rgba(0, 0, 0, 0.25)',
                                transition: 'background-color 0.3s cubic-bezier(0.76, 0, 0.24, 1)'
                            }}
                        />
                        <div className="fotoGalerie__column__item__text-container">
                            <h2>
                                <SplitWordsAndChars 
                                    text={title} 
                                    isTextHovered={isTouch ? { active: true, index: globalIndex } : isTextHovered}
                                    itemIndex={globalIndex}
                                    isTouch={isTouch}
                                    Mindex={Mindex}
                                />
                            </h2>
                            <p>
                                <SplitWordsAndChars 
                                    text={desc} 
                                    isTextHovered={isTouch ? { active: true, index: globalIndex } : isTextHovered}
                                    itemIndex={globalIndex}
                                    isTouch={isTouch}
                                    Mindex={Mindex}
                                />
                            </p>
                        </div>
                    </div>
                );
            })}
        </motion.div>
    );
};

// Main component 
export default function FotoGalerie() {
    const [isTextHovered, setIsTextHovered] = useState({ active: false, index: 0 });
    const [isHovered, setIsHovered] = useState({ active: false, index: 0 });
    const [isTouch, setIsTouch] = useState(false);
    const [isMobileWidth, setIsMobileWidth] = useState(false); // Add mobile width detection state
    const [dimension, setDimension] = useState({ width: 0, height: 0 });
    const { slideLoad } = useGlobalContext();
    const sliderRef = useRef(null);
    
    // Detect touch devices and mobile screen width
    useEffect(() => {
        setIsTouch(isTouchDevice());
        
        // Check if width is 500px or below
        const checkMobileWidth = () => {
            setIsMobileWidth(window.innerWidth <= 500);
        };
        
        // Run on mount
        checkMobileWidth();
        
        // Add listener for resize
        window.addEventListener("resize", checkMobileWidth);
        
        return () => {
            window.removeEventListener("resize", checkMobileWidth);
        };
    }, []);

    // Rest of event handlers remain the same...
    const mouseHover = (index) => {
        if (isTouch) return;
        setIsTextHovered({ active: true, index: index });
        setIsHovered({ active: true, index: index });
    };
    
    const mouseLeave = (index) => {
        if (isTouch) return;
        setIsHovered({ active: false, index: index });
        setIsTextHovered({ active: false, index: index });
    };

    // Setup Lenis scroll and handle resizing
    useEffect(() => {
        // Import Lenis dynamically to avoid SSR issues
        import('lenis').then(({ default: Lenis }) => {
            const lenis = new Lenis();
            
            const raf = (time) => {
                lenis.raf(time);
                requestAnimationFrame(raf);
            };
            
            requestAnimationFrame(raf);
            
            const resize = () => {
                setDimension({
                    width: window.innerWidth,
                    height: window.innerHeight
                });
            };
            
            window.addEventListener("resize", resize);
            resize();
            
            return () => {
                window.removeEventListener("resize", resize);
                lenis.destroy();
            };
        });
    }, []);

    // Setup scroll animations with special handling for mobile width
    const { scrollYProgress } = useScroll({
        target: sliderRef,
        offset: ['start end', 'end start']
    });

    // Create different y-transforms for each column, but use 0 for mobile width
    const { height } = dimension;
    
    // For mobile width devices, use 0 instead of the translateY animation
    const y1 = useTransform(
        scrollYProgress, 
        [0, 1], 
        isMobileWidth ? [0, 0] : [0, height * 0.5]
    );
    
    const y2 = useTransform(
        scrollYProgress, 
        [0, 1], 
        isMobileWidth ? [0, 0] : [0, height * -0.5]
    );
    
    const y3 = useTransform(
        scrollYProgress, 
        [0, 1], 
        isMobileWidth ? [0, 0] : [0, height * 0.3]
    );

    // Rest of the component remains the same...
    const totalPics = fotoGaleriePics.length;
    const picsPerColumn = Math.ceil(totalPics / 3);
    
    const column1Pics = fotoGaleriePics.slice(0, picsPerColumn);
    const column2Pics = fotoGaleriePics.slice(picsPerColumn, picsPerColumn * 2);
    const column3Pics = fotoGaleriePics.slice(picsPerColumn * 2);

    const modifiedProductAnim = isTouch ? {
        initial: { opacity: 1, y: 0, scale: 1 },
        enter: { opacity: 1, y: 0, scale: 1 }
    } : (slideLoad ? productAnim : productAnim2);

    const modifiedTitleAnim = isTouch ? {
        initial: { opacity: 1, x: 0, y: 0 },
        enter: { opacity: 1, x: 0, y: 0 }
    } : (slideLoad ? titleAnim : titleAnim2);

    return (
        <section className="fotoGalerie">
            <BackgroundGradient />
            
            <div className="fotoGalerie__header">
                <h1>
                    <SplitPairs text="Fotogalerie" variants={modifiedTitleAnim} />
                </h1>
            </div>
            
            {!isTouch && <Cursor isHovered={isHovered.active} />}
            
            <motion.div 
                className="fotoGalerie__gallery"
                initial="initial"
                animate="enter"
                variants={modifiedProductAnim}
                ref={sliderRef}
            >
                <div className="fotoGalerie__gallery__container">
                    <GalleryColumn 
                        images={column1Pics} 
                        y={y1} 
                        onMouseEnter={mouseHover} 
                        onMouseLeave={mouseLeave} 
                        isTextHovered={isTouch ? { active: true, index: "touched" } : isTextHovered}
                        isTouch={isTouch} 
                        Mindex="x"
                    />
                    <GalleryColumn 
                        images={column2Pics} 
                        y={y2} 
                        onMouseEnter={mouseHover} 
                        onMouseLeave={mouseLeave} 
                        isTextHovered={isTouch ? { active: true, index: "touched" } : isTextHovered}
                        isTouch={isTouch} 
                        Mindex="y"
                    />
                    <GalleryColumn 
                        images={column3Pics} 
                        y={y3} 
                        onMouseEnter={mouseHover} 
                        onMouseLeave={mouseLeave} 
                        isTextHovered={isTouch ? { active: true, index: "touched" } : isTextHovered}
                        isTouch={isTouch}
                        Mindex="z"
                    />
                </div>
            </motion.div>
        </section>
    );
}