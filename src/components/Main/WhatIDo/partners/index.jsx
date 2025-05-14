import { useScroll, useTransform, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const partners = [
    {
        name: 'IRTN.cz',
        number: '01',
        logo: '/logos/irtn.png',
        url: 'https://irtn.cz/',
        src1: '/images/IRTNV.png',
        src2: '/images/IRTNH.png',
    },
    {
        name: 'David Petrák',
        number: '02',
        logo: '',
        url: 'https://www.firmy.cz/detail/13188967-voda-a-topeni-david-petrak-pisek-budejovicke-predmesti.html',
        src1: '/images/dp_v.jpeg',
        src2: '/images/dp_h.jpeg',
    }
]

const Partners = () => {

    const [ modal, setModal ] = useState({ active: false, index: 0 });

    // Create refs for all image items - separate arrays for left and right images
    const leftImageRefs = useRef([]);
    const rightImageRefs = useRef([]);
    
    // Setup refs once on component mount
    useEffect(() => {
        leftImageRefs.current = Array(partners.length)
            .fill()
            .map((_, i) => leftImageRefs.current[i] || React.createRef());
            
        rightImageRefs.current = Array(partners.length)
            .fill()
            .map((_, i) => rightImageRefs.current[i] || React.createRef());
    }, []);
    
    return (
        <div className="WID__partners">
            <div className="WID__partners__images">
                <div className="WID__partners__images__item">
                    <div className="WID__partners__images__item__container">
                        <div className="WID__partners__images__item__wrapper__image"
                            style={{ left: modal.index * -100 + "%"}}
                        >
                            {partners.map((partner, index) => {
                                const { src1, name } = partner;

                                // Create scroll progress for this specific left image
                                const { scrollYProgress } = useScroll({
                                    target: leftImageRefs.current[index],
                                    offset: ["start end", "end start"]
                                });
                                
                                // Apply consistent parallax effect
                                const y = useTransform(
                                    scrollYProgress, 
                                    [0, 1], 
                                    [100, -100]
                                );

                                return (
                                    <div className="WID__partners__images__item__container__image" key={index}>
                                        <motion.div
                                            className="WID__partners__images__item__container__image__container"
                                            ref={el => leftImageRefs.current[index] = el}
                                            style={{ y }}
                                        >
                                            <Image 
                                                src={src1}
                                                alt={name}
                                                fill={true}
                                                sizes="100vw"
                                                quality={100}
                                                priority={true}
                                            /> 
                                        </motion.div> 
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="WID__partners__images__item__container">
                        <div className="WID__partners__images__item__wrapper__image"
                            style={{ top: modal.index * -100 + "%"}}
                        >
                            {partners.map((partner, index) => {
                                const { src2, name } = partner;

                                 // Create scroll progress for this specific right image
                                 const { scrollYProgress } = useScroll({
                                    target: rightImageRefs.current[index],
                                    offset: ["start end", "end start"]
                                });
                                
                                // Apply consistent parallax effect
                                const y = useTransform(
                                    scrollYProgress, 
                                    [0, 1], 
                                    [100, -100]
                                );
                                

                                return (
                                    <div className="WID__partners__images__item__container__image" key={index}>
                                        <motion.div 
                                            className="WID__partners__images__item__container__image__container"
                                            ref={el => rightImageRefs.current[index] = el}
                                            style={{ y }}
                                        >
                                            <Image 
                                            src={src2}
                                            alt={name}
                                            fill={true}
                                            sizes="100vw"
                                            quality={100}
                                            priority={true}
                                        />  
                                        </motion.div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <div className="WID__partners__list">
                <h2>spolupracuji s:</h2>
                <div className="divider"/>
                <div className="WID__partners__list__items">
                    {partners.map((partner, index) => {
                        const { name, number, logo, url } = partner;
                        return (
                            <div className="WID__partners__list__item" key={index}>
                                <div className="WID__partners__list__item__header"
                                    onMouseEnter={() => {
                                        setModal({ active: true, index: index });
                                    }}
                                    onMouseLeave={() => {
                                        setModal({ active: false, index: index });
                                    }}
                                >
                                { logo && 
                                    <Link
                                        href={url}
                                        className="WID__partners__list__item__logo"
                                    >
                                        <Image 
                                            src={logo} 
                                            alt="logo" 
                                            width={100}
                                            height={30}
                                            sizes="25vw"
                                            quality={100}
                                            priority={true}
                                        />
                                    </Link> 
                                }
                                   <p>{name}</p>
                                   <h3>{number}</h3>
                                </div>
                                { url && 
                                    <Link 
                                        href={url}
                                        className="WID__partners__list__item__link"
                                    >
                                        Link Zde
                                    </Link>
                                }
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}

export default Partners;