import { useEffect, useRef, useState } from "react";
import { motion, useAnimationControls } from "framer-motion";

// Define character animations
const charAnim1 = {
  initial: { opacity: 1, y: 0 },
  enter: (i) => ({
    opacity: 0,
    y: -40,
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
    y: 40,
    transition: {
      duration: 0.3,
      delay: i * 0.02,
    },
    ease: [0.6, 0.05, -0.01, 0.9]
  })
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

export default function CTAButton({ ctaText, onClick, isActive }) {
  const [active, setActive] = useState(false);
  const [ bgActive, setBgActive ] = useState(false);
  const [animationPhase, setAnimationPhase] = useState("initial"); // "initial", "enter", "exit", "reset"

  const controls = useAnimationControls();
  const timeoutRef = useRef(null);
  const animStateRef = useRef("initial");
  //I want anim to go on initial left, on hover to center and on leave to right, so this how it ill be created

  const clickEvent = () => {
    onClick();
    setBgActive(prev => !prev);
  }

  const clearPendingTimeouts = () => {
    if(timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }
 

  const onHoverEnter = () => {
    clearPendingTimeouts();
    setActive(true);
    animStateRef.current = "open";

    controls.start({
      left: "0%",
      transition: {
        duration: 0.5,
        ease: [0.6, 0.05, -0.01, 0.9]
      }
    });
  }

  const onHoverLeave = () => {
    setActive(false);
    
    animStateRef.current = "exit";

    controls.start({
      left: "100%",
      transition: {
        duration: 0.5,
        ease: [0.6, 0.05, -0.01, 0.9]
      }
    }).then(() => {
      if(animStateRef.current === "exit") {
        controls.start({
          left: "-100%",
          // this is adding the delay to the animation that is creating the fallback effect within the anim
          transition: {
            duration: 0
          }
        });
        animStateRef.current = "initial";
      }
    });  
  }

  useEffect(() => {
    controls.set({
      left: "-100%"
    })

    return () => {
      clearPendingTimeouts();
    }
  }, []);

  return (
    <div
      className="cta__button" 
      onClick={clickEvent} 
      onMouseEnter={onHoverEnter} 
      onMouseLeave={onHoverLeave}
    >
      <div className="cta__button__container">
        <label>
          <SplitText text={ctaText} active={active} variants={charAnim1} />
        </label>
        
        <label>
          <SplitText text={ctaText} active={active} variants={charAnim2} />
        </label>
      </div>
      
      <motion.div
        className="cta__button__background"
        initial={{left: "-100%"}}
        animate={controls}
      />
    </div>
  );
}