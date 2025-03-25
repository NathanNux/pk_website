import { useGlobalContext } from "@/context/globalContext";
import { motion } from "framer-motion";

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

export default function PageNotFound() {
    const { slideLoad } = useGlobalContext();
    return (
        <section className="pageNotFound">
            <h1>
                <SplitText text="404" variants={ slideLoad ? wordAnim : wordAnim2 } />
            </h1>
            <h2>
                <SplitText text="Stránka nenalezena" variants={ slideLoad ? wordAnim : wordAnim2 } />
            </h2>
        </section>
    )
}