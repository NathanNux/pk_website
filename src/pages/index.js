import Head from "next/head";
import PreLoader from "@/components/PreLoader";
import MainIntro from "@/components/Main/Intro";
import WhatIDo from "@/components/Main/WhatIDo";
import Trafika from "@/components/Main/Trafika";
import Contact from "@/components/Main/Contact";
import { useGlobalContext } from "@/context/globalContext";
import { AnimatePresence } from "framer-motion";

export default function Home() {
  const { firstLoad } = useGlobalContext();


  return (
    <>
      <Head>
        <title>Pavel Kovanda | Instalatérské služby & Trafika</title>
        <meta name="description" content="Kvalitní a spolehlivé instalatérské služby v Lounech a okolí. Navštivte také mou oblíbenou trafiku s širokou nabídkou tiskovin a tabákových výrobků." />
        <meta name="keywords" content="instalatér, instalatérské práce, voda, topení, odpad, trafika, Louny, Pavel Kovanda" />
        <meta name="author" content="Pavel Kovanda" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://pavelkovanda.cz" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pavelkovanda.cz" />
        <meta property="og:title" content="Pavel Kovanda | Instalatérské služby & Trafika Louny" />
        <meta property="og:description" content="Instalatérské práce a trafika v Lounech. Vše na jednom místě od Pavla Kovandy." />
        <meta property="og:image" content="https://pavelkovanda.cz/images/og-image.jpg" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://pavelkovanda.cz" />
        <meta property="twitter:title" content="Pavel Kovanda | Instalatér & Trafika Louny" />
        <meta property="twitter:description" content="Instalatér s letitou praxí a vlastník trafiky v Písku, Jih." />
        <meta property="twitter:image" content="https://pavelkovanda.cz/images/twitter-image.jpg" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Pavel Kovanda - Instalatérské služby & Trafika",
            "image": "https://pavelkovanda.cz/images/logo.jpg",
            "url": "https://pavelkovanda.cz",
            "telephone": "+420602175680",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Jablonského 402/18",
              "addressLocality": "Písek",
              "postalCode": "39701",
              "addressCountry": "CZ"
            },
            "openingHoursSpecification": [
              {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                "opens": "09:00",
                "closes": "17:00"
              }
            ],
            "priceRange": "$",
            "sameAs": [
              "https://www.facebook.com/profile.php?id=61557461697885"
            ]
          })}
        </script>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="main" style={{ overflowX: "hidden" }}>
        <AnimatePresence mode="wait">
          {firstLoad && <PreLoader />}
        </AnimatePresence>
        <MainIntro />
        <WhatIDo />
        <Trafika />
        <Contact />
      </main>
    </>
  );
}
