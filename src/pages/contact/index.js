import Head from "next/head";
import Contact from "@/components/Main/Contact";
import PreLoader from "@/components/PreLoader";
import { AnimatePresence } from "framer-motion";
import { useGlobalContext } from "@/context/globalContext";



export default function ContactPage() {

  const { firstLoad } = useGlobalContext();
  return (
    <>
      <Head>
        <title>Kontakt | Pavel Kovanda - Instalatér & Trafika</title>
        <meta name="description" content="Kontaktujte Pavla Kovandu pro instalatérské práce v Lounech a okolí. Rychlá reakce, profesionální přístup a férové ceny." />
        <meta name="keywords" content="kontakt instalatér, kontakt trafika, telefon, email, adresa, Louny, Pavel Kovanda" />
        <meta name="author" content="Pavel Kovanda" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://pavelkovanda.cz/contact" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pavelkovanda.cz/contact" />
        <meta property="og:title" content="Kontakt | Pavel Kovanda" />
        <meta property="og:description" content="Potřebujete instalatéra nebo hledáte trafiku v Lounech? Kontaktujte Pavla Kovandu." />
        <meta property="og:image" content="https://pavelkovanda.cz/images/contact-og.jpg" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://pavelkovanda.cz/contact" />
        <meta property="twitter:title" content="Kontakt | Pavel Kovanda" />
        <meta property="twitter:description" content="Instalatérské služby a trafika v Lounech - kontaktní informace." />
        <meta property="twitter:image" content="https://pavelkovanda.cz/images/contact-twitter.jpg" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "name": "Kontaktní stránka Pavel Kovanda",
            "url": "https://pavelkovanda.cz/contact",
            "mainEntity": {
              "@type": "Person",
              "name": "Pavel Kovanda",
              "telephone": "+420602175680",
              "email": "kovanda28@seznam.cz",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Jablonského 402/18",
                "addressLocality": "Písek",
                "postalCode": "39701",
                "addressCountry": "CZ"
            },
            }
          })}
        </script>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="main" style={{ overflowX: "hidden" }}>
        <AnimatePresence mode="wait">
          {firstLoad && <PreLoader />}
        </AnimatePresence>
        <Contact />
      </main>
    </>
  );
}
