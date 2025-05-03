import { motion } from 'framer-motion'; 


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
            delay: i * 0.01,
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
            delay: i * 0.05,
        },
        ease: [0.6, 0.05, -0.01, 0.9]
    }),
}

const SplitWords = ({ text, variant }) => {
    return text.split(' ').map((word, index, array) => {
        return (
            <motion.span
                key={index}
                variants={variant}
                initial="initial"
                whileInView='enter'
                custom={index}
            >
                {word}{index < array.length - 1 ? ' ' : ''}
            </motion.span>
        );
    });
}
const Intro = () => {
    
    return (
        <div className="WID__intro">
            <div className="WID__intro__text">
                <h2>
                    <SplitWords text='Instalujeme od roku' variant={titleAnim}/>
                </h2>
                <h2>
                    <SplitWords text= '2008' variant={titleAnim}/> 
                    {/* Zvětšit text na víc rem */}
                </h2>
            </div>
            {/* <div className="WID__intro__desc">
                <p className='WID__intro__desc__text'>
                    <SplitWords text='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco' variant={wordAnim}/>
                </p>
            </div> */}
        </div>
    )
}

export default Intro;
