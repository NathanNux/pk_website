import CTAButton from "@/components/common/Buttons/CTA";
import { useGlobalContext } from "@/context/globalContext";
import { useScroll, useTransform, motion, delay } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/router";
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

const SplitWords = ({ text, variant }) => {
    return text.split(' ').map((word, index, array) => {
        return (
            <motion.span
                key={index}
                variants={variant}
                initial="initial"
                animate='enter'
                custom={index}
            >
                {word}{index < array.length - 1 ? ' ' : ''}
            </motion.span>
        );
    });
}

const imageAnim = {
    initial: { 
        opacity: 0,
        height: "60vh",
        y: -100
    },
    enter: {
        opacity: 1,
        height: "70vh",
        y: 0,
        transition: {
            delay: 4.6,
            duration: 1,
        },
        ease: [0.6, 0.05, -0.01, 0.9]

    }
}

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
            delay: i * 0.01 + 4.6,
        },
        ease: [0.6, 0.05, -0.01, 0.9]
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
            delay: i * 0.05 + 4.6,
        },
        ease: [0.6, 0.05, -0.01, 0.9]
    }),
}
const buttonAnim = {
    initial: {
        opacity: 0,
        y: 50
    },
    enter: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            delay: 4.7,
        },
        ease: [0.6, 0.05, -0.01, 0.9]
    }
}

const imageAnim2 = {
    initial: { 
        opacity: 0,
        height: "60vh",
        y: -100
    },
    enter: {
        opacity: 1,
        height: "70vh",
        y: 0,
        transition: {
            delay: 0.75,
            duration: 1,
        },
        ease: [0.6, 0.05, -0.01, 0.9]

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
            delay: i * 0.01 + 0.75,
        },
        ease: [0.6, 0.05, -0.01, 0.9]
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
            delay: i * 0.05 + 0.75,
        },
        ease: [0.6, 0.05, -0.01, 0.9]
    }),
}
const buttonAnim2 = {
    initial: {
        opacity: 0,
        y: 50
    },
    enter: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            delay: 0.85,
        },
        ease: [0.6, 0.05, -0.01, 0.9]
    }
}

export default function MainIntro () {
    const containerRef = useRef(null);
    const { slideLoad } = useGlobalContext();
    const router = useRouter();

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const onClick = () => {
        router.push("/contact");
    }

    const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  return (
    <section className="main__intro" ref={containerRef}>
        <div className="main__intro__content">
            <div className="main__intro__header">
                <h1>
                    <SplitText text="Kovanda" variants={ slideLoad ? titleAnim : titleAnim2} />
                </h1>
                <h2>
                    <SplitText text="Pavel" variants={ slideLoad ? titleAnim : titleAnim2}/>
                </h2>
            </div>
            <div className="main__intro__description">
                <p>
                    <SplitWords text="Instalace měřidel." variant={ slideLoad ? wordAnim : wordAnim2}/>
                    {/*  */}
                </p>
                <motion.div
                    variants={slideLoad ? buttonAnim : buttonAnim2}
                    initial='initial'
                    animate='enter'
                >
                    <CTAButton ctaText="kotaktovat" onClick={onClick}/>
                </motion.div>
            </div>
        </div>
        <motion.div 
            className="main__intro__image"
            variants={slideLoad ? imageAnim : imageAnim2}
            initial='initial'
            animate='enter'
        >
            <motion.div className="main__intro__image__container" style={{ y }}>
                <Image 
                    src='/images/vertical.png'
                    alt="Pavel Kovanda intro image"
                    fill={true}
                    sizes="100vw"
                    quality={100}
                    priority={true}
                />
            </motion.div>
        </motion.div>
    </section>
  );
};