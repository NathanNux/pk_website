import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const listTrafika = [
    {
        text: "Co všechno nabízíme",
        href: "/trafika",
    },
    {
        text: "Sledujte nás a hlasujte na Facebooku",
        href: "https://www.facebook.com/profile.php?id=61557461697885",
    },
    {
        text: "Kde nás najdete",
        href: "https://www.google.com/maps/place/Smrkovick%C3%A1,+397+01+P%C3%ADsek+1/@49.3017542,14.1513649,17.34z/data=!4m6!3m5!1s0x470b4fefcb739951:0xc58b395d794f8ea4!8m2!3d49.301479!4d14.1518531!16s%2Fg%2F1tm11b00?hl=en&entry=ttu&g_ep=EgoyMDI1MDUxMS4wIKXMDSoASAFQAw%3D%3D",
    }
];

// Divider animation
// const dividerAnim = {
//     initial: {
//         width: "100%",
//     },
//     enter: {
//         width: "100%",
//         transition: {
//             duration: 0.3,
//             delay: 0.1, // Start after text animation
//         },
//         ease: [0.6, 0.05, -0.01, 0.9]
//     },
//     exit: {
//         width: "100%",
//         transition: {
//             duration: 0.2,
//         },
//         ease: [0.6, 0.05, -0.01, 0.9]
//     }
// }

// Primary word animation
const wordAnim1 = {
    initial: { opacity: 1, y: 0 },
    enter: (i) => ({
        opacity: 0,
        y: -30,
        transition: {
            duration: 0.2,
            delay: i * 0.06, // Staggered delay between words
        },
        ease: [0.6, 0.05, -0.01, 0.9]
    }),
    exit: (i) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.2,
            delay: i * 0.04,
        },
        ease: [0.6, 0.05, -0.01, 0.9]
    })
};

// Secondary word animation  
const wordAnim2 = {
    initial: { opacity: 0, y: 30 },
    enter: (i) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.2,
            delay: i * 0.06, // Match the primary animation timing
        },
        ease: [0.6, 0.05, -0.01, 0.9]
    }),
    exit: (i) => ({
        opacity: 0,
        y: 30,
        transition: {
            duration: 0.2,
            delay: i * 0.04,
        },
        ease: [0.6, 0.05, -0.01, 0.9]
    })
};

// Arrow animation - triggers after text animation
const arrowAnim1 = {
    initial: { opacity: 1, x: 0, y: 0 }, // Add y: 0 for consistency
    enter: {
        opacity: 0,
        y: -40,
        x: 0, // Explicitly set x to 0
        transition: {
            duration: 0.2,
            delay: 0.3, // Start after last word
        },
        ease: [0.6, 0.05, -0.01, 0.9]
    },
    exit: {
        opacity: 1,
        y: 0,
        x: 0, // Explicitly set x to 0
        transition: {
            duration: 0.2,
        },
        ease: [0.6, 0.05, -0.01, 0.9]
    }
};

const arrowAnim2 = {
    initial: { opacity: 0, x: 0, y: 0 }, // Remove the x: 20 offset here
    enter: {
        opacity: 1,
        y: 0,
        x: 0, // Explicitly set x to 0
        transition: {
            duration: 0.2,
            delay: 0.3, // Start after last word
        },
        ease: [0.6, 0.05, -0.01, 0.9]
    },
    exit: {
        opacity: 0,
        y: 40,
        x: 0, 
        transition: {
            duration: 0.2,
        },
        ease: [0.6, 0.05, -0.01, 0.9]
    }
};

// Word-by-word split component
const SplitWords = ({ text, active, variants }) => {
    const words = text.split(" ");
    
    return words.map((word, index) => (
        <motion.span 
            key={index}
            className="word"
            variants={variants}
            initial="initial"
            animate={active ? "enter" : "exit"} 
            custom={index} // Use word index for staggered animation
        >
            {word}{index < words.length - 1 ? "\u00A0" : ""}
        </motion.span>
    ));
};

function SplitText({text}) {
    return text.split('').map((char, index) => {
        return <span key={index}>{char}</span>
    });
}

export default function Trafika() {
    const [active, setActive] = useState({ active: false, index: 0 });
    

    const containerRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
    return (
        <section className="Trafika" ref={containerRef}>
            <div className="Trafika__bgimage">
                <div className="Trafika__bgimage__inner">
                    <motion.div className="Trafika__bgimage__container" style={{ y }}>
                        <Image 
                            src='/images/trafika.png'
                            alt="trafika"
                            fill={true}
                            sizes="100vw"
                            quality={100}
                            priority={true}
                        />
                    </motion.div>
                </div>
            </div>
            <div className="Trafika__text">
                <h2>
                    <SplitText text="trafika" />
                </h2>
                <p>
                    smrkovická
                </p>
            </div>

            <div className="Trafika__list">
                {listTrafika.map((item, index) => {
                    const { text, href } = item;
                    const isCurrentItem = active.active && active.index === index;
                    
                    return (
                        <div 
                            key={index} 
                            className="Trafika__list__item"
                            onMouseEnter={() => setActive({ active: true, index })}
                            onMouseLeave={() => setActive({ active: false, index })}
                        >
                            <Link
                                href={href}
                                className="Trafika__list__item__link"
                            >
                                <div className="Trafika__list__item__link__text">
                                    <h3 className="primary-text">
                                        <SplitWords 
                                            text={text} 
                                            active={isCurrentItem} 
                                            variants={wordAnim1}
                                        />
                                    </h3>
                                    <h3 className="secondary-text">
                                        <SplitWords 
                                            text={text} 
                                            active={isCurrentItem} 
                                            variants={wordAnim2}
                                        />
                                    </h3>
                                </div>
                                <div className="arrow__container">
                                    <motion.div
                                        variants={arrowAnim1}
                                        initial="initial"
                                        animate={isCurrentItem ? "enter" : "exit"}
                                        className="arrow__primary__arrow"
                                    >
                                        <Image 
                                            src='/icons/Arrow.svg'
                                            alt="arrow"
                                            width={30}
                                            height={30}
                                            sizes="5vw"
                                            quality={100}
                                            priority={true}
                                        />
                                    </motion.div>
                                    <motion.div
                                        variants={arrowAnim2}
                                        initial="initial"
                                        animate={isCurrentItem ? "enter" : "exit"}
                                        className="arrow__primary__arrow"
                                    >
                                        <Image 
                                            src='/icons/Arrow.svg'
                                            alt="arrow"
                                            width={30}
                                            height={30}
                                            sizes="5vw"
                                            quality={100}
                                            priority={true}
                                        />
                                    </motion.div>
                                </div>
                            </Link>
                            <motion.div 
                                className="divider"
                                // variants={dividerAnim}
                                // initial="initial"
                                // animate={isCurrentItem ? "enter" : "exit"}
                            />
                        </div>
                    )
                })}
            </div>
        </section>
    )
}