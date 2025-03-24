import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { motion, useSpring, useMotionValue, useScroll, useTransform } from "framer-motion";
import BackgroundGradient from "../common/Backgroundwhite";
import { useGlobalContext } from "@/context/globalContext";


const fotoGaleriePics = [
    {
        id: 1,
        src: "/images/vertical.png",
        alt: "FotoGalerie 1",
        title: "FotoGalerie 1",
        desc: "FotoGalerie 1"
    },
    {
        id: 2,
        src: "/images/vertical.png",
        alt: "FotoGalerie 2",
        title: "FotoGalerie 2",
        desc: "FotoGalerie 2"
    },
    {
        id: 3,
        src: "/images/vertical.png",
        alt: "FotoGalerie 3",
        title: "FotoGalerie 3",
        desc: "FotoGalerie 3"
    },
    {
        id: 4,
        src: "/images/vertical.png",
        alt: "FotoGalerie 4",
        title: "FotoGalerie 4",
        desc: "FotoGalerie 4"
    },
    {
        id: 5,
        src: "/images/vertical.png",
        alt: "FotoGalerie 5",
        title: "FotoGalerie 5",
        desc: "FotoGalerie 5"
    },
    {
        id: 6,
        src: "/images/vertical.png",
        alt: "FotoGalerie 6",
        title: "FotoGalerie 6",
        desc: "FotoGalerie 6"
    },
    {
        id: 7,
        src: "/images/vertical.png",
        alt: "FotoGalerie 7",
        title: "FotoGalerie 7",
        desc: "FotoGalerie 7"
    },
    {
        id: 8,
        src: "/images/vertical.png",
        alt: "FotoGalerie 8",
        title: "FotoGalerie 8",
        desc: "FotoGalerie 8"
    },
    {
        id: 9,
        src: "/images/vertical.png",
        alt: "FotoGalerie 9",
        title: "FotoGalerie 9",
        desc: "FotoGalerie 9"
    },
    {
        id: 10,
        src: "/images/vertical.png",
        alt: "FotoGalerie 10",
        title: "FotoGalerie 10",
        desc: "FotoGalerie 10"
    }
]
const SplitText = ({text, isTextHovered, itemIndex}) => {
    
    const textAnimation = {
        initial: (i) => ({
            y: 50,
            transition: {
                duration: 0.3,
                ease: [0.76, 0, 0.24, 1],
                delay: i * 0.025
            }
        }),
        hover: (i) => ({
            y: 0,
            transition: {
                duration: 0.3,
                ease: [0.76, 0, 0.24, 1],
                delay: i * 0.025
            }
        })
    }

    const isActive = isTextHovered.active && isTextHovered.index === itemIndex;
    return (
        text.split('').map((char, index) => {
            return (
                <motion.span 
                    key={index} 
                    variants={textAnimation}
                    initial="initial"
                    animate={isActive ? "hover" : "initial"}
                    custom={index}
                >
                    {char === ' ' ? '\u00A0' : char}
                </motion.span>
            )
        })
    );
}

const SplitPairs = ({ text, variants }) => {
    const chars = text.split('');
    const pairs = [];

    // Check if we need special handling for last characters
    const hasOddLength = chars.length % 2 === 1;
    
    // Calculate how many characters to process in regular pairs
    const regularPairsEndIndex = hasOddLength ? chars.length - 3 : chars.length;
    
    // Process regular pairs (2 chars each)
    for (let i = 0; i < regularPairsEndIndex; i += 2) {
        pairs.push(chars[i] + chars[i + 1]);
    }
    
    // If odd length, add the last three characters as one group
    if (hasOddLength) {
        // Combine last 3 characters
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

const productAnim = {
    initial: {
        opacity: 0,
        y: "100vh",
        scale: 0.8,
    },
    enter: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 1.5,
            delay: 3.8,
            ease: [ 0.76, 0, 0.24, 1 ]
        }
    }
}

const productAnim2 = {
    initial: {
        opacity: 0,
        y: "100vh",
        scale: 0.8,
    },
    enter: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 1,
            ease: [ 0.76, 0, 0.24, 1 ]
        }
    }
}


const titleAnim2 = {
    initial: (i) => ({ 
        opacity: 0, 
        x: i * -20, 
        y: 0
    }),
    enter: (i) => ({
        opacity: 1,
        x: 0,
        y: 0,
        transition: {
            duration: 0.5,
            delay: i * 0.02 + 0.75,
        },
        ease: [0.76, 0, 0.24, 1]
    }),
}

const titleAnim = {
    initial: (i) => ({ 
        opacity: 0, 
        x: i * -20, 
        y: 0
    }),
    enter: (i) => ({
        opacity: 1,
        x: 0,
        y: 0,
        transition: {
            duration: 0.5,
            delay: i * 0.02 + 4.9,
        },
        ease: [0.76, 0, 0.24, 1]
    }),
}


export default function FotoGalerie() {
    //WIP: Consider other motion desing for this section - there will be parallax anim, and entry same as preloader image main page intro 
    const [isTextHovered, setIsTextHovered] = useState({ active: false, index: 0 });
    const [ isHovered, setIsHovered ] = useState({ active: false, index: 0 });
    const itemRefs = useRef([]);
    const { slideLoad } = useGlobalContext();
    


    const mouseHover = (index) => {
        setIsTextHovered({ active: true, index: index });
        setIsHovered({ active: true, index: index });
    }
    const mouseLeave = (index) => {
        setIsHovered({ active: false, index: index });
        setIsTextHovered({ active: false, index: index });
    };

    // Create refs for all items
    useEffect(() => {
        itemRefs.current = Array(fotoGaleriePics.length)
            .fill()
            .map((_, i) => itemRefs.current[i] || createRef());
    }, []);

    // Create random parallax factors once on mount
    const [parallaxFactors] = useState(() => 
        fotoGaleriePics.map(() => 0.8 + Math.random() * 0.7)
    );


    return (
        <section className="fotoGalerie">
            <BackgroundGradient />
            <div className="fotoGalerie__header">
                <h1>
                    <SplitPairs text="Fotogalerie" variants={slideLoad ? titleAnim : titleAnim2 } />
                </h1>
            </div>
            <Cursor isHovered={isHovered.active} />
            <motion.div 
                className="fotoGalerie__images"
                initial="initial"
                animate="enter"
                variants={slideLoad ? productAnim : productAnim2} 
            >
                <div className="fotoGalerie__images__container">
                    {fotoGaleriePics.map((pic, index) => {
                        const { src, alt, title, desc } = pic;
                        // Create scroll progress for this specific item
                        const { scrollYProgress } = useScroll({
                            target: itemRefs.current[index],
                            offset: ["start end", "end start"]
                        });
                        
                        // Apply the random factor to this specific item
                        const factor = parallaxFactors[index];
                        const y = useTransform(
                            scrollYProgress, 
                            [0, 1], 
                            [70 * factor, -100 * factor]  // More pronounced effect
                        );
                        return (
                            <div 
                                key={index} 
                                className="fotoGalerie__images__container__item"
                                ref={el => itemRefs.current[index] = el}
                                onMouseEnter={() => mouseHover(index)}
                                onMouseLeave={() => mouseLeave(index)}
                            >
                                <div className="fotoGalerie__images__container__item__image__container">
                                    <motion.div 
                                        className="fotoGalerie__images__container__item__image"
                                        style={{ y }}    
                                    >
                                        <Image 
                                            src={src}
                                            alt={alt}
                                            fill={true}
                                            sizes="50vw"
                                            quality={100}
                                            priority={true}
                                        />
                                    </motion.div>
                                </div>
                                <div 
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        zIndex: 1,
                                        backgroundColor: isTextHovered.active && isTextHovered.index === index ? 'transparent' : 'rgba(0, 0, 0, 0.25)',
                                        transition: 'background-color 0.3s cubic-bezier(0.76, 0, 0.24, 1)'
                                    }}
                                />
                                <div className="fotoGalerie__images__container__item__text__container">
                                    <h2>
                                        <SplitText 
                                            text={title} 
                                            isTextHovered={isTextHovered}
                                            itemIndex={index}
                                        />
                                    </h2>
                                    <p>
                                        <SplitText 
                                            text={desc} 
                                            isTextHovered={isTextHovered}
                                            itemIndex={index}
                                        />
                                    </p>
                                </div>
                            </div>
                        );
                    })}   
                </div>
            </motion.div>
        </section>
    )
}


const Cursor = ({ isHovered }) => {
    const ref = useRef(null);
    const scaleAnimation = {
        initial: { scale: 0 },
        open: {
            scale: 1,
            transition: {
                duration: 0.4,
                ease: [0.76, 0, 0.24, 1]
            }
        },
        closed: {
            scale: 0,
            transition: {
                duration: 0.4,
                ease: [0.76, 0, 0.24, 1]
            }
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
            className="cursor"
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