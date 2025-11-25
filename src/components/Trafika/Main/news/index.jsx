import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const NewProduct = [
    {
        title: "New Product",
        description: "New product description",
        image: "/images/Trafika.jpg",
    }
]


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

const imageAnim = {
    initial: { 
        opacity: 1,
        height: "30vh",
        y: -100
    },
    enter: {
        opacity: 1,
        height: "50vh",
        y: 0,
        transition: {
            duration: 1,
            ease: [0.6, 0.05, -0.01, 0.9]
        }
    }
}
export default function newProduct() {

    const containerRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
    return (
        <section className="trafika__manin__newProduct" ref={containerRef}>
            {NewProduct.map((product, index) => {
                const { title, description, image } = product;
                return (
                    <div key={index} className="trafika__main__newProduct__item">
                        <div className="trafika__main__newProduct__text">
                            <div className="trafika__main__newProduct__text__title">
                                <h2>
                                    <SplitWords text='novinka v naši trafice' variants={titleAnim}/>
                                </h2>
                            </div>
                            <div className="trafika__main__newProduct__text__description">
                                <div className="trafika__main__newProduct__text__description__item">
                                    <h5>
                                        00
                                    </h5>
                                    <p>
                                        {title}
                                    </p>
                                </div>
                                <div className="trafika__main__newProduct__text__description__item">
                                    <h5>
                                        01
                                    </h5>
                                    <p>
                                        {description}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="trafika__main__newProduct__image">
                            <motion.div 
                                className="trafika__main__newProduct__image__container"
                                variants={imageAnim}
                                initial='initial'
                                whileInView='enter'
                            >
                               <motion.div className="trafika__main__newProduct__image__item" style={{ y }}>
                                    <Image 
                                        src={image}
                                        alt="New Product"
                                        fill={true}
                                        sizes="100vw"
                                        quality={100}
                                        priority={true}
                                    />
                               </motion.div>
                            </motion.div>
                        </div>
                    </div>
                )
            })}
        </section>
    )
}