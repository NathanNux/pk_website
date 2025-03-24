import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const products = [
    {
        src: '/images/vertical.png',
        alt: 'horizontal',
        name: 'horizontal',
        description: 'smrkovická'
    },
    {
        src: '/images/vertical.png',
        alt: 'horizontal',
        name: 'horizontal',
        description: 'smrkovická'
    },
    {
        src: '/images/vertical.png',
        alt: 'horizontal',
        name: 'horizontal',
        description: 'smrkovická'
    },
    {
        src: '/images/vertical.png',
        alt: 'horizontal',
        name: 'horizontal',
        description: 'smrkovická'
    },
    {
        src: '/images/vertical.png',
        alt: 'horizontal',
        name: 'horizontal',
        description: 'smrkovická'
    },
    {
        src: '/images/vertical.png',
        alt: 'horizontal',
        name: 'horizontal',
        description: 'smrkovická'
    },
    {
        src: '/images/vertical.png',
        alt: 'horizontal',
        name: 'horizontal',
        description: 'smrkovická'
    },
    {
        src: '/images/vertical.png',
        alt: 'horizontal',
        name: 'horizontal',
        description: 'smrkovická'
    },
    {
        src: '/images/vertical.png',
        alt: 'horizontal',
        name: 'horizontal',
        description: 'smrkovická'
    },
    {
        src: '/images/vertical.png',
        alt: 'horizontal',
        name: 'horizontal',
        description: 'smrkovická'
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

const titleAnim = {
    initial: (i) => ({ 
        opacity: 0, 
        y: i * -20, 
        x: 0
    }),
    enter: (i) => ({
        opacity: 1,
        y: 0,
        x: 0,
        transition: {
            duration: 0.2,
            delay: i * 0.08,
        },
        ease: [0.6, 0.05, -0.01, 0.9]
    }),
}

const SplitWords = ({ text, variants }) => {
    const words = text.split(" ");
    return words.map((word, index) => {
        return (
        <motion.span 
            key={index}
            className="word"
            variants={variants}
            initial="initial"
            whileInView="enter"
            custom={index}
        >
            {word}{index < words.length - 1 ? "\u00A0" : ""}
        </motion.span>
        );
    })
}

export default function Products() {
    // State for hover and text effects
    const [isHovered, setIsHovered] = useState(false);
    const [isTextHovered, setIsTextHovered] = useState({ active: false, index: 0 });
    const [isDragging, setIsDragging] = useState(false);
    
    // Refs for measuring
    const containerRef = useRef(null);
    const carouselRef = useRef(null);
    
    // For measuring width
    const [containerWidth, setContainerWidth] = useState(0);
    const [carouselWidth, setCarouselWidth] = useState(0);
    
    // Calculate total margin for items
    const itemMarginRight = 20;
    const totalItemMargins = itemMarginRight * (products.length - 1);
    
    // Measure widths on mount and resize
    useEffect(() => {
        if (!containerRef.current || !carouselRef.current) return;
        
        const updateMeasurements = () => {
            setContainerWidth(containerRef.current.clientWidth);
            
            // Calculate total width of all slides
            const items = Array.from(carouselRef.current.children);
            const itemsWidth = items.reduce((total, item) => total + item.clientWidth, 0);
            setCarouselWidth(itemsWidth + totalItemMargins);
        };
        
        updateMeasurements();
        window.addEventListener("resize", updateMeasurements);
        
        return () => {
            window.removeEventListener("resize", updateMeasurements);
        };
    }, [totalItemMargins]);

    return (
        <section className="trafika__products">
            <div className="trafika__products__title">
                <h3>
                    <SplitWords text="naše ostatní zboží" variants={titleAnim}/>
                </h3>
            </div>

            <Cursor isHovered={isHovered} isDragging={isDragging} />

            <div 
                ref={containerRef}
                className="trafika__products__list"
            >
                <motion.div 
                    ref={carouselRef}
                    className="trafika__products__list__items"
                    drag="x"
                    dragConstraints={{
                        left: -(carouselWidth - containerWidth),
                        right: 0
                    }}
                    dragElastic={0.1}
                    dragTransition={{ 
                        bounceStiffness: 300, 
                        bounceDamping: 30,
                        power: 0.2
                    }}
                    onDragStart={() => setIsDragging(true)}
                    onDragEnd={() => setIsDragging(false)}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {products.map((product, index) => {
                        const { src, alt, name, description } = product;
                        return (
                            <div 
                                key={index} 
                                className="trafika__products__list__item"
                                onMouseEnter={() => setIsTextHovered({ active: true, index: index })}
                                onMouseLeave={() => setIsTextHovered({ active: false, index: index })}
                            >
                                <div className="trafika__products__list__item__container">
                                    <div className="trafika__products__list__item__image">
                                        <motion.div 
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
                                        <Image 
                                            src={src}
                                            alt={alt}
                                            fill={true}
                                            sizes="100vw"
                                            quality={100}
                                            priority={index < 4}
                                        />
                                    </div>
                                    <motion.div className="trafika__products__list__item__text">
                                        <motion.h5>
                                            <SplitText 
                                                text={name} 
                                                isTextHovered={isTextHovered}
                                                itemIndex={index}
                                            />
                                        </motion.h5>
                                        <motion.p>
                                            <SplitText 
                                                text={description} 
                                                isTextHovered={isTextHovered}
                                                itemIndex={index}
                                            />
                                        </motion.p>
                                    </motion.div>
                                </div>
                            </div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}

// Keep your SplitText and SplitWords components the same

// Update Cursor component to show "Táhnout"/"Táhnu" based on dragging state
const Cursor = ({isHovered, isDragging}) => {
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
            <p>{isDragging ? "Táhnu" : "Táhnout"}</p>
        </motion.div>
    );
};