import HashtagButton from "@/components/common/Buttons/hashButton";
import CTAButton from "@/components/common/Buttons/CTA";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useGlobalContext } from "@/context/globalContext";
import { toast } from "sonner";

const contactInfo = [
    {
        title: 'Provozovatel',
        text: 'Pavel Kovanda',
    },
    {
        title: 'naše adresa',
        text: 'Jablonského 402/18, 397 01 Písek ',
    },
    {
        title: 'telefonní číslo',
        phone: '+420 602 175 680',
    },
    {
        title: 'můj email',
        email: 'kovanda28@seznam.cz'
    }
]

const dividerAnim = {
    initial: {
        width: "0%",
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
        width: "0%",
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

const imageAnim = {
    initial: {
        opacity: 0,
        scale: 0.8,
        y: "100vh",
    },
    enter: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            duration: 1.5,
            delay: 4,
            ease: [0.76, 0, 0.24, 1]
        }
    }
}

const imageAnim2 = {
    initial: {
        opacity: 1,
        scale: 1,
        y: 0,
    },
    enter: {
        opacity: 1,
        scale: 1,
        y: 0,
    }
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

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        email: '',
        phone: '',
        message: ''
    });
    const [ selectedHashtags, setSelectedHashtags ] = useState([]);
    const [isHovered, setIsHovered] = useState(false);
    const { slideLoad } = useGlobalContext();
    const router = useRouter();

    const handleHashtagClick = (hashtag, isSelected) => {
        if(isSelected) {
            setSelectedHashtags(prev => [...prev, hashtag]);
        } else {
            setSelectedHashtags(prev => prev.filter(item => item !== hashtag));
        }
    }

    const handleSubmit = async (e) => {
        if (e) e.preventDefault(); 
        
        if (!formData.name || !formData.email || !formData.message) {
            toast.error("Vyplňte prosím povinná pole: jméno, email a zprávu");
            return;
        }
        
        // Zobrazíme notifikaci o probíhajícím odesílání
        const loadingToast = toast.loading("Odesílání zprávy...");

        try {

            const requestData = {
                ...formData,
                hashtags: selectedHashtags
            }
            const response = await fetch('/api/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            });
            
            const data = await response.json();
            
            if (data.success) {
                toast.success("Email byl úspěšně odeslán!", {
                    id: loadingToast,
                    description: "Děkujeme za váš dotaz. Brzy se vám ozveme."
                });                
                
                setFormData({
                    name: '',
                    surname: '',
                    email: '',
                    phone: '',
                    message: ''
                });
                setSelectedHashtags([]);
            } else {
                toast.error(`Chyba: ${data.message}`, {
                    id: loadingToast
                });            }
        } catch (error) {
            console.error('Chyba při odesílání:', error);
            toast.error("Nastala chyba při odesílání emailu.", {
                id: loadingToast,
                description: "Zkuste to prosím později nebo nás kontaktujte telefonicky."
            });
        }
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    return (
        <motion.section
            className="contact"
            initial="initial"
            animate="enter"
            variants={router.pathname === "/contact" && slideLoad ? imageAnim: imageAnim2}
        >
            <div className="contact__form__container">
                <div className="contact__form">
                    <form>
                        <div className="contact__form__header">
                            <div className="contact__form__header__intro">
                                <h3>Kontaktní forma</h3>
                                <h4>
                                    Pokud si nejste jisti nebo máte jakýkoliv dotaz, 
                                    kontaktujte nás přímo, abychom Vám 
                                    mohli co nejrychleji pomoci.
                                </h4>
                                <p>
                                    Nebo použijte e-mail
                                </p>
                            </div>
                            <div className="contact__form__header__contact">
                               <h4>chcete se spojit ihned?</h4>  
                               <Link href="tel:+420 602 175 680">
                                    +420 602 175 680
                               </Link>
                               <p>
                                    Volejte mi || 9-17 || Po - Pa
                               </p>
                            </div>
                        </div>
                        <div className="contact__form__input__fullname">
                            <div className="contact__form__input__fullname__name">
                                <label htmlFor="name">Jméno</label>
                                <input type="text" id="name" name="name" placeholder="Vaše křestné jméno" onChange={handleInputChange} value={formData.name}/>
                            </div>
                            <div className="contact__form__input__fullname__surname">
                                <label htmlFor="surname">Příjmení</label>
                                <input type="text" id="surname" name="surname" placeholder="Vaše příjmení" onChange={handleInputChange} value={formData.surname}/>
                            </div>
                        </div>
                        <div className="contact__form__input__inputs">
                            <div className="contact__form__input__inputs__email">
                                <label htmlFor="email">E-mail</label>
                                <input type="email" id="email" name="email" placeholder="Váš e-mail" onChange={handleInputChange} value={formData.email}/>
                            </div>
                            <div className="contact__form__input__inputs__phone">
                                <label htmlFor="phone">Tel. číslo</label>
                                <input type="tel" id="phone" name="phone" placeholder="Váše tel. číslo" onChange={handleInputChange} value={formData.phone}/>
                            </div>
                        </div>
                        <div className="contact__form__input__message">
                            <label htmlFor="message">Vaše zpráva</label>
                            <textarea id="message" name="message" placeholder="Zde napište svou zprávu" onChange={handleInputChange} value={formData.message}/>
                            <div className="contact__form__input__message__hashtag">
                                <HashtagButton 
                                    text="#instalace" 
                                    onClick={() => handleHashtagClick("#instalace", !selectedHashtags.includes("#instalace"))}
                                    isActive={selectedHashtags.includes("#instalace")}
                                />
                                <HashtagButton 
                                    text="#trafika" 
                                    onClick={() => handleHashtagClick("#trafika", !selectedHashtags.includes("#trafika"))}
                                    isActive={selectedHashtags.includes("#trafika")}
                                />
                                <HashtagButton 
                                    text="#dotaz" 
                                    onClick={() => handleHashtagClick("#dotaz", !selectedHashtags.includes("#dotaz"))}
                                    isActive={selectedHashtags.includes("#dotaz")}
                                />
                            </div>
                        </div>
                        <div className="contact__form__input__send">
                            <div className="contact__form__input__send__gdpr">
                                <p>
                                    S kliknutím na tlačítko  “poslat” souhlasíte se zpracováním
                                    vašich osobních informací a GDPR 
                                </p>
                                <Link href="/gdpr"
                                    className="contact__form__input__send__gdpr__link"
                                    onMouseEnter={() => setIsHovered(true)}
                                    onMouseLeave={() => setIsHovered(false)}
                                >
                                    <div className="contact__form__input__send__gdpr__link__container">
                                        <p className="primary-text">
                                            <SplitText text="více informací" active={isHovered} variants={charAnim1}/>
                                        </p>
                                        <p className="secondary-text">
                                            <SplitText text="více informací" active={isHovered} variants={charAnim2}/>
                                        </p>
                                    </div>
                                    <motion.div 
                                        className="divider"
                                        variants={dividerAnim}
                                        initial="initial"
                                        animate={isHovered ? "enter" : "exit"}
                                    />
                                </Link>
                            </div>
                            <div className="contact__form__send__button">
                                <CTAButton ctaText="Poslat" onClick={handleSubmit}/>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <div className="contact__info">
                <div className="divider"/>
                {contactInfo.map((item, index) => {
                    const { title, text, phone, email } = item;
                    return (
                        <div className="contact__info__item" key={index}>
                            <h3>{title}</h3>
                            {text && <p>{text}</p>}
                            {phone && <Link href={`tel:${phone.replace(/\s+/g, '')}`}>{phone}</Link>}
                            {email && <Link href={`mailto:${email}`}>{email}</Link>}
                        </div>
                    );
                })}
            </div>
        </motion.section>
    )
}