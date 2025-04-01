import Image from "next/image";
import Link from "next/link";
import { forwardRef, useState } from "react";
import { motion } from "framer-motion";

const footerLinks = [
    {
        text: 'Trafika',
        href: '/trafika',
    },
    {
        text: 'Kontakt',
        href: '/contact',
    },
    {
        text: 'FotoGalerie',
        href: '/fotogalerie',
    }
]

const footerLinksSub = [
    {
        text: "cookies",
        href: "/cookies",
    },
    {
        text: 'o ochraně soukromí',
        href: '/gdpr',
    }
]

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
      y: -60,
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
        y: 60,
        transition: {
        duration: 0.3,
        delay: i * 0.02,
        },
        ease: [0.6, 0.05, -0.01, 0.9]
    })
};

const charAnim3 = {
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
  
const charAnim4 = {
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

// Arrow animation - triggers after text animation
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

const arrowAnim3 = {
    initial: { opacity: 1, x: 0, y: 0 }, // Add y: 0 for consistency
    enter: {
        opacity: 0,
        y: -20,
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

const arrowAnim4 = {
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
        y: 20,
        x: 0, 
        transition: {
            duration: 0.2,
            delay: 0.1
        },
        ease: [0.6, 0.05, -0.01, 0.9]
    }
};

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
const Footer = forwardRef((props, ref ) => {
    // WIP: Consider card like animation from down to up over the other component, or maybe even scale up from 0.9 to 1 while the card, to compliment the transtion animation

    const  [ active, setActive ] = useState({active: false, index: 0});
    const [activeSub, setActiveSub] = useState({active: false, index: 0});
    const  [ isHovered , setIsHovered ] = useState(false);
    const [ isHoveredSub, setIsHoveredSub ] = useState(false);
    return (
        <footer className="footer" ref={ref}>
            <div className="footer__logo">
                <div className="footer__logo__container">
                    <h2>Kovanda</h2>
                    <h3>Pavel</h3>
                </div>
                <div className="divider"/>
            </div>
            <div className="footer__contact">
                <h5>Spojte se se mnou</h5>
                <div className="divider"/>
                <Link 
                    className="footer__contact__link"
                    href="/contact"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <div className="footer__contact__container">
                        <div className="footer__contact__container__text">
                            <p>
                                <SplitText text="Kontakt" active={isHovered} variants={charAnim3}/>
                            </p>
                            <p>
                                <SplitText text="Kontakt" active={isHovered} variants={charAnim4}/>
                            </p>
                        </div>
                        <div className="footer__contact__arrow__container">
                            <motion.div
                                variants={arrowAnim3}
                                initial="initial"
                                animate={isHovered ? "enter" : "exit"}
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
                                variants={arrowAnim4}
                                initial="initial"
                                animate={isHovered ? "enter" : "exit"}
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
                    </div>
                </Link>
            </div>
            <div className="footer__links">
                <div className="footer__links__main">
                    <div className="footer__links__main__container">
                        {footerLinks.map((link, index) => {
                            const { text, href } = link;
                            const isCurrentItem = active.active && active.index === index;
                            return (
                                <div className="footer__links__main__item" key={index}>
                                    <Link 
                                        className="footer__links__main__item__link"
                                        key={index}
                                        href={href}
                                        onMouseEnter={() => setActive({ active: true, index })}
                                        onMouseLeave={() => setActive({ active: false, index })}
                                    >
                                        <div className="footer__links__main__item__link__container">
                                            <div className="footer__links__main__item__link__container__text">
                                                <h2>
                                                    <SplitText text={text} active={isCurrentItem} variants={charAnim1}/>
                                                </h2>
                                                <h2>
                                                    <SplitText text={text} active={isCurrentItem} variants={charAnim2}/>
                                                </h2>
                                            </div>
                                            <div className="footer__links__main__item__link__container__arrow">
                                                <motion.div
                                                    variants={arrowAnim1}
                                                    initial="initial"
                                                    animate={isCurrentItem ? "enter" : "exit"}
                                                    className="arrow__primary__arrow"
                                                >
                                                    <Image 
                                                        src='/icons/Arrow.svg'
                                                        alt="arrow"
                                                        width={40}
                                                        height={40}
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
                                                        width={40}
                                                        height={40}
                                                        sizes="5vw"
                                                        quality={100}
                                                        priority={true}
                                                    />
                                                </motion.div>
                                            </div>
                                        </div>
                                    </Link>
                                    <motion.div 
                                        className="divider"
                                        variants={dividerAnim}
                                        initial="initial"
                                        animate={isCurrentItem ? "enter" : "exit"}
                                    />
                                </div>
                                
                            )
                        }
                        )}
                    </div>
                </div>

                <div className="footer__links__sub">
                    <div className="footer__links__sub__container">
                        {footerLinksSub.map((link, index) => {
                            const { text, href } = link;
                            const isCurrentItem = activeSub.active && activeSub.index === index;
                            return (
                                <Link 
                                    key={index}
                                    href={href}
                                    className="footer__links__sub__container__link"
                                    onMouseEnter={() => setActiveSub({ active: true, index })}
                                    onMouseLeave={() => setActiveSub({ active: false, index })}
                                >
                                    <div className="footer__links__sub__container__link__container">
                                            <div className="footer__links__sub__container__link__container__text">
                                                <p>
                                                    <SplitText text={text} active={isCurrentItem} variants={charAnim3}/>
                                                </p>
                                                <p>
                                                    <SplitText text={text} active={isCurrentItem} variants={charAnim4}/>
                                                </p>
                                            </div>
                                            <div className="footer__links__sub__container__link__container__arrow">
                                                <motion.div
                                                    variants={arrowAnim3}
                                                    initial="initial"
                                                    animate={isCurrentItem ? "enter" : "exit"}
                                                    className="arrow__primary__arrow"
                                                >
                                                    <Image 
                                                        src='/icons/Arrow.svg'
                                                        alt="arrow"
                                                        width={40}
                                                        height={40}
                                                        sizes="5vw"
                                                        quality={100}
                                                        priority={true}
                                                    />
                                                </motion.div>
                                                <motion.div
                                                    variants={arrowAnim4}
                                                    initial="initial"
                                                    animate={isCurrentItem ? "enter" : "exit"}
                                                    className="arrow__primary__arrow"
                                                >
                                                    <Image 
                                                        src='/icons/Arrow.svg'
                                                        alt="arrow"
                                                        width={40}
                                                        height={40}
                                                        sizes="5vw"
                                                        quality={100}
                                                        priority={true}
                                                    />
                                                </motion.div>
                                            </div>
                                        </div>
                                </Link>
                            )
                        }
                        )}
                    </div>
                    <div className="subdivider"/>
                    <div className="footer__links__creator">
                        <Link 
                            href="https://www.matejforejt.com"
                            className="footer__links__creator__link"
                            onMouseEnter={() => setIsHoveredSub(true)}
                            onMouseLeave={() => setIsHoveredSub(false)}
                        >
                            <div className="footer__links__creator__link__container">
                                <div className="footer__links__creator__link__container__text">
                                    <p>
                                        <SplitText text='Design a vývoj: Matěj Forejt' active={isHoveredSub} variants={charAnim3}/>
                                    </p>
                                    <p>
                                        <SplitText text='Design a vývoj: Matěj Forejt' active={isHoveredSub} variants={charAnim4}/>
                                    </p>
                                </div>
                                <div className="footer__links__creator__link__container__arrow">
                                    <motion.div
                                        variants={arrowAnim3}
                                        initial="initial"
                                        animate={isHoveredSub ? "enter" : "exit"}
                                        className="arrow__primary__arrow"
                                    >
                                        <Image 
                                            src='/icons/Arrow.svg'
                                            alt="arrow"
                                            width={40}
                                            height={40}
                                            sizes="5vw"
                                            quality={100}
                                            priority={true}
                                        />
                                    </motion.div>
                                    <motion.div
                                        variants={arrowAnim4}
                                        initial="initial"
                                        animate={isHoveredSub ? "enter" : "exit"}
                                        className="arrow__primary__arrow"
                                    >
                                        <Image 
                                            src='/icons/Arrow.svg'
                                            alt="arrow"
                                            width={40}
                                            height={40}
                                            sizes="5vw"
                                            quality={100}
                                            priority={true}
                                        />
                                    </motion.div>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="subdivider"/>
                    <div className="footer__links__copyright">
                        <p>Pavel Kovanda © 2025 - Všechna práva vyhrazena</p>
                    </div>
                    <div className="subdivider"/>
                </div>
            </div>
        </footer>
    )
})

export default Footer;