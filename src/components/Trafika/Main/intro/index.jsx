import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion"; 
import { useState } from "react";
const dividerAnim = {
    initial: {
        width: "100%",
    },
    enter: {
        width: "100%",
        transition: {
            duration: 0.3,
            delay: 0.1, // Start after text animation
        },
        ease: [0.6, 0.05, -0.01, 0.9]
    },
    exit: {
        width: "100%",
        transition: {
            duration: 0.2,
        },
        ease: [0.6, 0.05, -0.01, 0.9]
    }
}

const charAnim1 = {
    initial: { opacity: 1, y: 0 },
    enter: (i) => ({
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
        delay: i * 0.02,
      },
      ease: [0.6, 0.05, -0.01, 0.9]
    }),
    exit: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        delay: i * 0.02,
      },
      ease: [0.6, 0.05, -0.01, 0.9]
    })
};
  
const charAnim2 = {
    initial: { opacity: 0, y: 20 },
    enter: (i) => ({
        opacity: 1,
        y: 0,
        transition: {
        duration: 0.3,
        delay: i * 0.02,
        },
        ease: [0.6, 0.05, -0.01, 0.9]
    }),
    exit: (i) => ({
        opacity: 0,
        y: 20,
        transition: {
        duration: 0.3,
        delay: i * 0.02,
        },
        ease: [0.6, 0.05, -0.01, 0.9]
    })
};

const arrowAnim1 = {
    initial: { opacity: 1, x: 0, y: 0 }, // Add y: 0 for consistency
    enter: {
        opacity: 0,
        y: -30,
        x: 0, // Explicitly set x to 0
        transition: {
            duration: 0.2,
            delay: 0.25, // Start after last word
        },
        ease: [0.6, 0.05, -0.01, 0.9]
    },
    exit: {
        opacity: 1,
        y: 0,
        x: 0, // Explicitly set x to 0
        transition: {
            duration: 0.2,
            delay: 0.1
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
        y: 30,
        x: 0, 
        transition: {
            duration: 0.2,
            delay: 0.1
        },
        ease: [0.6, 0.05, -0.01, 0.9]
    }
};

const wordAnim = {
    initial: { 
        opacity: 0, 
        y: 20 
    },
    enter: (i) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.2,
            delay: i * 0.02,
        },
        ease: [0.6, 0.05, -0.01, 0.9]
    }),
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

const SplitText = ({ text, active, variants }) => {
    return text.split("").map((char, index) => {
        return (
        <motion.span 
            key={index}
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

export default function Intro() {

    const [active, setActive] = useState(false);
    const [ activeArrow, setActiveArrow ] = useState(false);;
    return (
        <section className="intro__main__trafika">
            <div className="intro__main__trafika__text">
                <div className="intro__main__trafika__text__title">
                    <h3>
                        <SplitWords text="podívejte se na naše facebookové stránky" variants={titleAnim} />
                    </h3>
                    <div className="divider"/>
                </div>
                <div className="intro__main__trafika__text__link">
                    <Link href="https://www.facebook.com/profile.php?id=61557461697885"
                        onMouseEnter={() => setActive(true)}
                        onMouseLeave={() => setActive(false)}
                    >
                        <Image 
                            src='/icons/facebook.svg'
                            alt="facebook"
                            width={250}
                            height={250}
                        />
                        <div className="intro__main__trafika__text__link__text">
                            <p>
                                <SplitText text="Link Tady" active={active} variants={charAnim1} />
                            </p>
                            <p>
                                <SplitText text="Link Tady" active={active} variants={charAnim2} />
                            </p>
                        </div>
                    </Link>
                </div>
            </div>
            <div className="intro__main__trafika__content">
                <div className="intro__main__trafika__content__text">
                    <p>
                        <SplitWords text="Zapojte se do naši ankety a hlasujte, jaký nový produkt naši trafice budete chtít jako další." variants={wordAnim} />
                    </p>
                </div>
                <Link href="https://www.facebook.com/profile.php?id=61557461697885"
                    onMouseEnter={() => setActiveArrow(true)}
                    onMouseLeave={() => setActiveArrow(false)}
                >
                    <div className="intro__main__trafika__content__link">
                        <p>
                            <SplitText text="Hlasujte Zde" active={activeArrow} variants={charAnim1} />
                        </p>
                        <p>
                            <SplitText text="Hlasujte Zde" active={activeArrow} variants={charAnim2} />
                        </p>
                    </div>
                    <div className="intro__main__trafika__content__arrow">
                        <motion.div 
                            className="intro__main__trafika__content__arrow__icon"
                            variants={arrowAnim1}
                            initial="initial"
                            animate={activeArrow ? "enter" : "exit"}
                        >
                            <Image 
                                src='/icons/arrow.svg'
                                alt="arrow"
                                width={20}
                                height={20}
                            />
                        </motion.div>
                        <motion.div 
                            className="intro__main__trafika__content__arrow__icon"
                            variants={arrowAnim2}
                            initial="initial"
                            animate={activeArrow ? "enter" : "exit"}
                        >
                            <Image 
                                src='/icons/arrow.svg'
                                alt="arrow"
                                width={20}
                                height={20}
                            />
                        </motion.div>
                    </div>
                </Link>

                {/* kontakt na trafiky (tel. cislo (725 141 929)) a Paju (tel.cislo) potom stylyzovat */}
                <div className="intro__main__trafika__content__contact">
                    <div className="intro__main__trafika__content__contact__text">
                        <p>
                            <SplitWords text="Kontakt na trafiku" variants={wordAnim} />
                        </p>
                        <p>
                            <SplitWords text="+420 725 141 929" variants={wordAnim} />
                        </p>
                    </div>  
                    <div className="intro__main__trafika__content__contact__text">
                        <p>
                            <SplitWords text="Kontakt na mě" variants={wordAnim} />
                        </p>
                        <p>
                            <SplitWords text="+420 602 175 680" variants={wordAnim} />
                        </p>
                    </div>  
                </div>
            </div>
        </section>
    )
}