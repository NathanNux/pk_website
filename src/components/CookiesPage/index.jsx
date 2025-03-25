import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from 'framer-motion';
import { CookiesSections } from "@/constants/cookiesTerms";
import CookiesModem from "@/components/modems/CookiesModem";
import HashtagButton from "../common/Buttons/hashButton";
import { useGlobalContext } from "@/context/globalContext";

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



export default function CookiesContent() {
    const [activeSection, setActiveSection] = useState(null);
    const sectionRefs = useRef([]);
    const [ isOpen, setIsOpen ] = useState(false)
    const { slideLoad } = useGlobalContext();

    const handleLinkClick = (id) => {
        const section = document.getElementById(id);
        section.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + window.innerHeight / 2;

            for (let i = 0; i < sectionRefs.current.length; i++) {
                const section = sectionRefs.current[i];
                if (section) {
                    const rect = section.getBoundingClientRect();
                    const sectionTop = rect.top + window.scrollY;
                    const sectionBottom = sectionTop + rect.height;

                    if (sectionTop <= scrollPosition && sectionBottom > scrollPosition) {
                        setActiveSection(CookiesSections[i].id);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section className="CookiesContent">
            <div className="cover">
                <div className="cover__header">
                    <h1>
                        <SplitText text="CO JSOU COOKIES" variants={ slideLoad ? wordAnim : wordAnim2} />
                    </h1>
                    <h1>
                        <SplitText text="A JAK JE POUŽÍVÁME" variants={ slideLoad ? wordAnim : wordAnim2} />
                    </h1>
                </div>
                <div className="cover__desc">
                    <p>
                        <SplitWords text="Zde si můžete nastavit, ke kterým budeme mít přístup." variant={slideLoad ? wordAnim : wordAnim2} />
                    </p>
                </div>
            </div>

            <div className="info__content">
                <nav className="info__page__navbar">
                    <div className="info__page__stickyBar">
                        <h3>Obsah</h3>
                        <ul className="info__page__ul">
                            {CookiesSections.map((section, i) => (
                                <li className="info__page__li" key={i}>
                                    <motion.div
                                        className="info__page__dot"
                                        animate={{ backgroundColor: activeSection === section.id ? '#00F0FF' : '#22272d' }}
                                        transition={{ duration: 0.3 }}
                                    />
                                    <motion.a
                                        href={`#${section.id}`}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleLinkClick(section.id);
                                        }}
                                        animate={{ opacity: activeSection === section.id ? 0.6 : 1 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        {section.title}
                                    </motion.a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </nav>

                <section className="info__block__main">
                    {CookiesSections.map((section, i) => (
                        <div key={i} className="info__block__section" ref={el => sectionRefs.current[i] = el}>
                            <h2 id={section.id}>{section.title}</h2>
                            <p>{section.content}</p>
                        </div>
                    ))}
                </section>
            </div>
            <div className="Cookies__Button">
                <p>Chcete si přenastavit vaše cookies?</p>
                <div onClick={() => setIsOpen(!isOpen)}>
                    <HashtagButton text='Nastavit'/>
                </div>
            </div>
            <AnimatePresence>
                {isOpen && (
                    <CookiesModem open={setIsOpen} />
                )}
            </AnimatePresence>
        </section>
    );
}