import CTAButton from "@/components/common/Buttons/CTA";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRouter } from "next/router";

const listWID = [
    {
        number: '01',
        title: 'Montujeme vodoměry',
        src: '/images/horizontal.png',
        alt: 'Vodoměr',
    },
    {
        number: '02',
        title: 'Montujeme BMT - Bytový měřič tepla',
        src: '/images/horizontal.png',
        alt: 'BMT jednotka',
    },
    {
        number: '03',
        title: 'Montujeme RTN - Rozdělovač topných nákladů',
        src: '/images/horizontal.png',
        alt: 'RTN jednotka',
    },
    {
        number: '04',
        title: 'Umíme i rychlou a dokonalou montáž, během 30 minut přijdeme, instalujeme a vy můžete fungovat',
        src: '/images/horizontal.png',
        alt: 'Montáž',
    },
    {
        number: '05',
        title: 'Umíme i rychlou a dokonalou montáž, během 30 minut přijdeme, instalujeme a vy můžete fungovat',
        src: '/images/horizontal.png',
        alt: 'Montáž',
    },
    {
        number: '06',
        title: 'Umíme i rychlou a dokonalou montáž, během 30 minut přijdeme, instalujeme a vy můžete fungovat',
        src: '/images/horizontal.png',
        alt: 'Montáž',
    },
    {
        number: '07',
        title: 'Umíme i rychlou a dokonalou montáž, během 30 minut přijdeme, instalujeme a vy můžete fungovat',
        src: '/images/horizontal.png',
        alt: 'Montáž',
    },
    {
        number: '08',
        title: 'Umíme i rychlou a dokonalou montáž, během 30 minut přijdeme, instalujeme a vy můžete fungovat',
        src: '/images/horizontal.png',
        alt: 'Montáž',
    },
    {
        number: '09',
        title: 'Umíme i rychlou a dokonalou montáž, během 30 minut přijdeme, instalujeme a vy můžete fungovat',
        src: '/images/horizontal.png',
        alt: 'Montáž',
    },
    {
        number: '10',
        title: 'Umíme i rychlou a dokonalou montáž, během 30 minut přijdeme, instalujeme a vy můžete fungovat',
        src: '/images/horizontal.png',
        alt: 'Montáž',
    },
];
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
            duration: 0.1,
            delay: i * 0.1,
        },
        ease: [0.6, 0.05, -0.01, 0.9]
    }),
}

const imageAnim = {
    initial: { 
        opacity: 1,
        height: "45vh",
        y: -100
    },
    enter: {
        opacity: 1,
        height: "50vh",
        y: 0,
        transition: {
            duration: 1,
            ease: [0.6, 0.05, -0.01, 0.9]
        }
    }
}
const SplitWords = ({ text, variant }) => {
    return text.split(' ').map((word, index, array) => {
        return (
            <motion.span
                key={index}
                variants={variant}
                initial="initial"
                whileInView='enter'
                custom={index}
            >
                {word}{index < array.length - 1 ? ' ' : ''}
            </motion.span>
        );
    });
}
const Main = ({modal, setModal}) => {
    // Separate the visible items (0-3) and the loop items (4+)
    const visibleItems = listWID.slice(0, 4);
    const loopStartIndex = 4; // Index where auto-loop starts
    
    const router = useRouter();
    
    // State for auto-looping animation
    const [isAutoLooping, setIsAutoLooping] = useState(true); // Start with auto-loop enabled
    const loopTimerRef = useRef(null);
    const initialRenderRef = useRef(true);
    
    // Set initial index to loopStartIndex when component mounts
    useEffect(() => {
        if (initialRenderRef.current) {
            initialRenderRef.current = false;
            
            // Initialize with loopStartIndex if we're not already at a valid index
            if (!modal.active || modal.index < loopStartIndex) {
                setModal({ active: true, index: loopStartIndex });
            }
        }
    }, []);
    
    // Handle auto-loop animation
    useEffect(() => {
        // Function to advance to the next loop item
        const advanceLoop = () => {
            setModal(prev => {
                // Calculate next index - loop from last item back to loopStartIndex
                const nextIndex = prev.index >= listWID.length - 1 ? loopStartIndex : prev.index + 1;
                return { active: true, index: nextIndex };
            });
        };
        
        // Start or stop the auto-loop timer
        if (isAutoLooping) {
            // Clear any existing timer
            if (loopTimerRef.current) {
                clearInterval(loopTimerRef.current);
            }
            
            // Set new timer for 3 seconds
            loopTimerRef.current = setInterval(advanceLoop, 3000);
        } else if (loopTimerRef.current) {
            // Stop the timer if not auto-looping
            clearInterval(loopTimerRef.current);
        }
        
        // Clean up on unmount
        return () => {
            if (loopTimerRef.current) {
                clearInterval(loopTimerRef.current);
            }
        };
    }, [isAutoLooping, setModal]);
    
    // Function to start auto-looping
    const startAutoLoop = () => {
        // Make sure we're on an index ≥ 4 before starting the loop
        if (modal.index < loopStartIndex) {
            setModal({ active: true, index: loopStartIndex });
        }
        setIsAutoLooping(true);
    };
    
    // Function to handle mouse leave event
    const handleMouseLeave = () => {
        // Start auto-loop
        startAutoLoop();
    };

    // Create refs for all list items
    const itemRefs = useRef([]);
    
    // Setup refs once on component mount
    useEffect(() => {
        itemRefs.current = Array(listWID.length)
            .fill()
            .map((_, i) => itemRefs.current[i] || React.createRef());
    }, []);

    const onClick = () => {
        router.push("/contact");
    }

    return (
        <div className="WID__main">
            <div className="WID__main__intro" >
                <div className="WID__main__intro__text">
                    <h2>
                        <SplitWords text='co pro vás mohu udělat' variant={titleAnim}/>
                    </h2>
                </div>
                <motion.div 
                    className="WID__main__intro__image__wrapper" 
                    initial="initial"
                    whileInView="enter"
                    variants={imageAnim}
                >
                    <div 
                        style={{ top: modal.index * -100 + "%"}} 
                        className="WID__main__intro__image"
                    >
                        {listWID.map((item, index) => {
                            const { src, alt } = item;


                            // Create scroll progress for each image
                            const { scrollYProgress } = useScroll({
                                target: itemRefs.current[index],
                                offset: ["start end", "end start"]
                            });
                            
                            // Apply consistent parallax effect (no random factor)
                            const y = useTransform(
                                scrollYProgress, 
                                [0, 1], 
                                [100, -100]  // Consistent movement values
                            );

                            return (
                                <div 
                                    className="WID__main__intro__img" 
                                    key={index}
                                    style={{backgroundImage: `url(${src})`}}
                                >
                                   <motion.div 
                                        className="WID__main__intro__img__container" 
                                        ref={el => itemRefs.current[index] = el}
                                        style={{ y }}
                                    >
                                        <Image
                                            src={src}
                                            alt={alt}
                                            fill={true}
                                            sizes="100vw"
                                            quality={100}
                                            priority={index < 5} // Only prioritize loading first 5 images
                                        />
                                   </motion.div>
                                </div>
                            );
                        })}
                    </div>
                </motion.div>
            </div>
            <div className="WID__main__content">
                <div 
                    className="WID__main__content__list"
                    onMouseLeave={handleMouseLeave}
                >
                    {/* Only display the first 4 items in the list */}
                    {visibleItems.map((item, index) => {
                        const { number, title } = item;
                        return (
                            <div 
                                className="WID__main__content__list__item" 
                                key={index}
                                onMouseEnter={() => {
                                    setIsAutoLooping(false);
                                    setModal({ active: true, index: index });
                                }}
                            >
                                <h3>{number}</h3>
                                <p>{title}</p>
                            </div>
                        );
                    })}
                </div>
                <div className="WID__main__content__cta">
                    <CTAButton ctaText="spojte se se mnou" onClick={onClick}/>
                </div>
            </div>
        </div>
    );
};

export default Main;