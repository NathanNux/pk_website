import { useGlobalContext } from "@/context/globalContext";
import { useScroll, useTransform, motion, delay } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";


// Simple SplitText with span class
const SplitText = ({ text, variants }) => {
    return text.split("").map((char, index) => {
      return (
        <motion.span 
          key={index}
          className="span"
          variants={variants}
          initial="initial"
          animate="enter"
          custom={index}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      );
    });
};


const wordAnim = {
    initial: { 
        opacity: 0, 
        y: -30 
    },
    enter: (i) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.3,
            delay: i * 0.03 + 5,
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


const imageAnim = {
    initial: {
        opacity: 0,
        scale: 0.8,
        y: "100vh",
    },
    enter: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            duration: 1.5,
            delay: 3.6,
            ease: [0.76, 0, 0.24, 1]
        }
    }
}

const wordAnim2 = {
    initial: { 
        opacity: 0, 
        y: -30 
    },
    enter: (i) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.3,
            delay: i * 0.03 + 0.75,
        },
        ease: [0.76, 0, 0.24, 1]
    }),
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

const imageAnim2 = {
    initial: {
        opacity: 1,
        scale: 1,
        y: 0,
    },
    enter: {
        opacity: 1,
        scale: 1,
        y: 0,
    }
}



export default function IntroTrafika() {
    const containerRef = useRef(null);
    const { slideLoad } = useGlobalContext();

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

    return (
        <section className="intro__trafika" ref={containerRef}>  
            <div className="intro__trafika__content">
                <h2>
                    <SplitText text="smrkovická" variants={slideLoad ? titleAnim : titleAnim2}/>
                </h2>
                <h1>
                    <SplitText text="trafika" variants={slideLoad ? wordAnim : wordAnim2}/>
                </h1>
            </div>
            <motion.div 
                className="intro__trafika__background"
                variants={ slideLoad ? imageAnim: imageAnim2 }
                initial="initial"
                animate="enter"
            >
                <motion.div
                    className="intro__trafika__background__container"
                    style={{ y }}
                >
                    <Image 
                        src='/images/trafika.png'
                        alt="trafika"
                        fill={true}
                        sizes="100vw"
                        quality={100}
                        priority={true}
                    />    
                </motion.div> 
            </motion.div>
        </section>
    )
}