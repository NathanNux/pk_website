import { useScroll, useTransform, motion } from 'framer-motion';
import { useRef } from 'react';

export default function Text() {
    const sectionRef = useRef(null);
    
    const text = "CO PRO VÁS MÁME";
    const words = text.split(' ');
    
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"]
    });
    
    return (
        <section 
            className="trafika__main__textSection"
            ref={sectionRef}
        >
            <div className="trafika__main__textSection__text">
                {words.map((word, index) => {
                    const wordCount = words.length;
                    const wordStart = index / wordCount;
                    const wordEnd = (index + 0.8) / wordCount;
                    
                    // Create upward rising effect
                    const rotateX = useTransform(
                        scrollYProgress,
                        [wordStart, wordEnd],
                        [-60, 0] // Start tilted backward (-60deg) and rotate to normal
                    );
                    
                    // Move from below into position
                    const y = useTransform(
                        scrollYProgress,
                        [wordStart, wordEnd],
                        [100, 0] // Start 100px below and rise up
                    );
                    
                    // Create z-axis movement for more 3D effect
                    const z = useTransform(
                        scrollYProgress,
                        [wordStart, wordEnd],
                        [-150, 0] // Start further back and move forward
                    );
                    
                    // Fade in as the word rises
                    const opacity = useTransform(
                        scrollYProgress,
                        [wordStart, wordStart + 0.1, wordEnd - 0.1, wordEnd + 0.1],
                        [0, 1, 1, 1]
                    );
                    
                    return (
                        <motion.h3
                            key={index}
                            style={{
                                opacity,
                                transform: `translateY(${y}px) translateZ(${z}px) rotateX(${rotateX}deg)`,
                                transformOrigin: "center bottom",
                            }}
                        >
                            {word}
                        </motion.h3>
                    );
                })}
            </div>
        </section>
    );
}