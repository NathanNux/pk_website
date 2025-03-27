import Head from "next/head";

import BackgroundGradiet from "@/components/common/Backgorund";

import IntroTrafika from "@/components/Trafika/Intro";
import TrafikaMain from "@/components/Trafika/Main";
import { useGlobalContext } from "@/context/globalContext";
import PreLoader from "@/components/PreLoader";
import { AnimatePresence } from "framer-motion";


export default function TrafikaPage() {
  const { firstLoad } = useGlobalContext();

  return (
    <>
      <Head>
        <title>Trafika Pavel Kovanda | Noviny, Časopisy & Tabákové výrobky</title>
        <meta name="description" content="Navštivte naši trafiku v Lounech s širokou nabídkou tiskovin, tabákových výrobků a doplňkového sortimentu. Hlasujte o nových produktech na Facebooku!" />
        <meta name="keywords" content="trafika, noviny, časopisy, tabák, cigarety, doutníky, losy, jízdenky, Louny" />
        <meta name="author" content="Pavel Kovanda" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://pavelkovanda.cz/trafika" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pavelkovanda.cz/trafika" />
        <meta property="og:title" content="Trafika Pavel Kovanda | Noviny & Tabákové výrobky" />
        <meta property="og:description" content="Kompletní sortiment novin, časopisů a tabákových výrobků v Lounech. Hlasujte o nových produktech!" />
        <meta property="og:image" content="https://pavelkovanda.cz/images/trafika-og.jpg" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://pavelkovanda.cz/trafika" />
        <meta property="twitter:title" content="Trafika Pavel Kovanda | Louny" />
        <meta property="twitter:description" content="Veškerý sortiment tiskovin a tabákových výrobků. Hlasujte o nových produktech na našem Facebooku!" />
        <meta property="twitter:image" content="https://pavelkovanda.cz/images/trafika-twitter.jpg" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Store",
            "name": "Trafika Pavel Kovanda",
            "image": "https://pavelkovanda.cz/images/trafika.jpg",
            "url": "https://pavelkovanda.cz/trafika",
            "telephone": "+420XXXXXXXXX",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Ulice XX",
              "addressLocality": "Louny",
              "postalCode": "44001",
              "addressCountry": "CZ"
            },
            "openingHoursSpecification": [
              {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                "opens": "07:00",
                "closes": "17:00"
              },
              {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Saturday"],
                "opens": "08:00",
                "closes": "12:00"
              }
            ],
            "sameAs": [
              "https://facebook.com/PavelKovandaInstalaterTrafika"
            ]
          })}
        </script>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="main" lang="cs">
        <AnimatePresence mode="wait">
          {firstLoad && <PreLoader />}
        </AnimatePresence>
        <BackgroundGradiet />      
        <IntroTrafika />
        <TrafikaMain />
      </main>
    </>
  );
}
