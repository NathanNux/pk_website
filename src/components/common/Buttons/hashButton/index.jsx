import { use, useEffect, useRef, useState } from "react";
import { motion, useAnimationControls } from "framer-motion";

// Define character animations
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

// Pass variants to SplitText
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
        {char}
      </motion.span>
    );
  });
};

export default function HashtagButton({ text, onClick, isActive: externalIsActive }) {
  const [active, setActive] = useState(false); // For text animation
  const [isSelected, setIsSelected] = useState(false); // Track clicked/selected state
  const controls = useAnimationControls();
  const timeoutRef = useRef(null);
  const animStateRef = useRef("initial");
  
  // Clear any pending timeouts
  const clearPendingTimeouts = () => {
    if(timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };
 
  // Click handler - toggle selected state
  const handleClick = () => {
    const newSelectedState = !isSelected;
    setIsSelected(newSelectedState);
    
    // If becoming selected, animate to center
    if (newSelectedState) {
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
    // If becoming unselected, start exit animation
    else {
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
            transition: {
              transition: {
                duration: 0.5,
                ease: [0.6, 0.05, -0.01, 0.9]
              }
            }
          });
          animStateRef.current = "initial";
        }
      });
    }
    
    // Call external onClick if provided
    if (onClick) onClick(newSelectedState);
  };

  // Hover enter - only animate if not already selected
  const onHoverEnter = () => {
    // Skip animation if already selected
    if (isSelected) return;
    
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
  };

  // Hover leave - only animate if not selected
  const onHoverLeave = () => {
    // Skip animation if selected
    if (isSelected) return;
    
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
          transition: {
            transition: {
              duration: 0.5,
              ease: [0.6, 0.05, -0.01, 0.9]
            }
          }
        });
        animStateRef.current = "initial";
      }
    });  
  };

  // Handle external isActive prop changes
  useEffect(() => {
    if (externalIsActive !== undefined && externalIsActive !== isSelected) {
      setIsSelected(externalIsActive);
      
      if (externalIsActive) {
        setActive(true);
        animStateRef.current = "open";
        controls.start({
          left: "0%",
          transition: {
            duration: 0.5,
            ease: [0.6, 0.05, -0.01, 0.9]
          }
        });
      } else {
        setActive(false);
        animStateRef.current = "exit";
        controls.start({
          left: "100%",
          transition: {
            duration: 0.5,
            ease: [0.6, 0.05, -0.01, 0.9]
          }
        }).then(() => {
          controls.start({
            left: "-100%",
            transition: {
              duration: 0.5,
              ease: [0.6, 0.05, -0.01, 0.9]
            }
          });
          animStateRef.current = "initial";
        });
      }
    }
  }, [externalIsActive]);

  // Initialize animation on mount
  useEffect(() => {
    controls.set({
      left: "-100%"
    });

    return () => {
      clearPendingTimeouts();
    };
  }, []);

  return (
    <div
      className="hashtagButton"
      onMouseEnter={onHoverEnter} 
      onMouseLeave={onHoverLeave}
    >
      <div 
        className="hashtagButton__container"
        onClick={handleClick} 
      >
        <label className="hashtagButton__label">
          <SplitText text={text} active={active} variants={charAnim1} />
        </label>
        
        <label className="hashtagButton__label">
          <SplitText text={text} active={active} variants={charAnim2} />
        </label>
      </div>
      
      <motion.div
        className="hashtagButton__background"
        initial={{left: "-100%"}}
        animate={controls}
      />
    </div>
  );
}