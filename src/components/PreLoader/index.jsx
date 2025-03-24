import { animate, useMotionValue, useTransform, motion  } from "framer-motion"
import { useRouter } from "next/router"
import { useEffect, useRef } from "react"

const introText1 = [
    {
        id: 1,
        text: "Vodoměry",
    },
    {
        id: 2,
        text: "BMT",
    },
    {
        id: 3,
        text: "RTN",
    }
]
const introText2 = [
    {
        id: 1,
        text: "Trafika",
    },
    {
        id: 2,
        text: "FotoGalerie",
    },
    {
        id: 3,
        text: "Kovanda",
    }
]

const divider = {
    initial: {
        width: "0%",
        opacity: 1
    },
    enter: {
        width: "70%",
        y: 0,
        opacity: 1,
        transition: {
            duration: 1,
        },
        ease: [0.76, 0, 0.24, 1]

    },
    exit: {
        width: "0%",
        opacity: 0,
        transition: {
            duration: 1,
        },
        ease: [0.76, 0, 0.24, 1]
    }
}

const divider2 = {
    initial: {
        width: "0%",
        opacity: 1
    },
    enter: {
        width: "40%",
        y: 0,
        opacity: 1,
        transition: {
            duration: 1,
        },
        ease: [0.76, 0, 0.24, 1]

    },
    exit: {
        width: "0%",
        opacity: 0,
        transition: {
            duration: 1,
        },
        ease: [0.76, 0, 0.24, 1]

    }
}

const textAnimation = {
    initial: {
        opacity: 0,
        y: 50,
    },
    enter: (i) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            delay: i * 0.1 + 0.25,
        },
        ease: [0.6, 0.05, -0.01, 0.9]
    }),
    exit: (i) => ({
        opacity: 0,
        y: -50,
        transition: {
            duration: 0.5,
            delay: i * 0.1 + 0.25,
        },
        ease: [0.6, 0.05, -0.01, 0.9]
    })
}

const main = {
    initial: {
        opacity: 0.5,
        y: 50,
    },
    enter: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 1,
        },
        ease: [0.6, 0.05, -0.01, 0.9]
    },
    exit: {
        opacity: 0,
        y: -50,
        transition: {
            duration: 0.75,
            delay: 0.25
        },
        ease: [0.6, 0.05, -0.01, 0.9]
    }
}


export default function PreLoader() {

    const router = useRouter();
    const runtime = 4
    const number = 100;
    const staggers = 8;
    const count = useMotionValue(0);
    const counting = useTransform(count, Math.round);
    const coutingWithPercent = useTransform(counting, value => `${value}%`);

    const hasAnimated = useRef(false);

    // this will take the 8 staggers and randomize them and then add the number to the end for the final stagger effect for the number

    // Apply scroll lock immediately on component mount
    useEffect(() => {
        // Immediately disable scrolling
        const disableScroll = () => {
            if (window.lenis) window.lenis.stop();
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden'; // Also lock html element
            document.body.style.position = 'fixed'; // Prevent bouncing on iOS
            document.body.style.width = '100%';
            document.body.style.top = `-${window.scrollY}px`;
        };
        
        disableScroll();
        
        // Re-apply scroll lock every frame for the first few frames to ensure it works
        const interval = setInterval(disableScroll, 100);
        setTimeout(() => clearInterval(interval), 500);
        
        return () => {
            clearInterval(interval);
            enableScroll();
        };
    }, []);
    
    // Function to re-enable scrolling
    const enableScroll = () => {
        if (window.lenis) window.lenis.start();
        
        // Get the scroll position before removing the fixed position
        const scrollY = document.body.style.top;
        
        // Re-enable scrolling
        document.body.style.position = '';
        document.body.style.width = '';
        document.body.style.top = '';
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
        
        // Restore scroll position
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
    };
    
    useEffect(() => {
        if(hasAnimated.current) return;

        let controls
        let currentTime = 0;
        const randomDelays = Array.from(
            {
                length: staggers - 1
            },
            () => Math.floor(Math.random() * 100)
        ).sort((a, b) => a - b)
    
        const values = [ 0, ...randomDelays, 100 ]

        const maxTotalPauseTime = runtime * 0.5;

        const rawPauseDurations = Array.from(
            { length: values.length - 1 },
            () => 0.2 + Math.random() * 0.2
        )

        const totalRawPauseTime = rawPauseDurations.reduce((sum, duration) => sum + duration, 0);
        const scaleFactor = Math.min(1, maxTotalPauseTime / totalRawPauseTime);
        const pauseDurations = rawPauseDurations.map(duration => duration * scaleFactor);

        const totalPauseTime = rawPauseDurations.reduce((sum, duration) => sum + duration, 0);
        const remainingTime = runtime - totalPauseTime;
        const stepTime = remainingTime / (values.length);

        const times = []

        values.forEach((_, index) => {
            times.push(currentTime / runtime);
        
            if(index < values.length - 1) {
                currentTime += stepTime;
                currentTime += pauseDurations[index];
            }
        
        })

        controls = animate(count, values, {
            duration: runtime,
            ease: "linear",
            times: times,
            onComplete: () => {
                hasAnimated.current = true;
                
                // Re-enable scrolling when animation is complete with a delay
                setTimeout(() => {
                    enableScroll();
                }, 100);
            }
        })

        return () => {
            controls?.stop();
            enableScroll();
        }
    }, [ number, runtime, staggers, count ])
    return (
        <motion.section 
            className="preloader" 
            key={'preloader'}
            initial="initial"
            animate="enter"
            exit="exit"
            variants={main}
        >
            <motion.div 
                className="preloader__divider"
                initial="initial"
                animate="enter"
                exit="exit"
                variants={divider}
                style={{
                    backgroundColor: router.pathname === '/fotogalerie' ? '#05050a' : '#fff'
                }}
            />
            <div className="preloader__container">
                <div className="perloader__text1">
                    {introText1.map((text, index) => (
                        <motion.p key={index} initial='initial' animate='enter' exit='exit' custom={index} variants={textAnimation} className="preloader__text1__item" style={{color: router.pathname === '/fotogalerie' ? '#05050a' : '#fff'}}>{text.text}</motion.p>
                    ))} 
                </div>
                <div className="preloader__loader">       
                    <motion.h1 style={{color: router.pathname === '/fotogalerie' ? '#05050a' : '#fff'}}>{coutingWithPercent}</motion.h1>
                </div>
                <div className="perloader__text2">
                    {introText2.map((text, index) => (
                        <motion.p key={index} initial='initial' animate='enter' exit='exit' custom={index} variants={textAnimation} className="preloader__text1__item" style={{color: router.pathname === '/fotogalerie' ? '#05050a' : '#fff'}}>{text.text}</motion.p>
                    ))} 
                </div>
            </div>
            <motion.div 
                className="preloader__divider"
                initial="initial"
                animate="enter"
                exit="exit"
                variants={divider2}
                style={{
                    backgroundColor: router.pathname === '/fotogalerie' ? '#05050a' : '#fff'
                }}
            />
        </motion.section>
    )
}