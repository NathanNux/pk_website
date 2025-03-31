import Head from "next/head";
import FotoGalerie from "@/components/FotoGalerie";
import { AnimatePresence } from "framer-motion";
import PreLoader from "@/components/PreLoader";
import { useGlobalContext } from "@/context/globalContext";


export default function FotoGaleriePage() {
    const { firstLoad } = useGlobalContext();
  

  return (
    <>
      <Head>
        <title>Fotogalerie | Realizované instalatérské práce Pavla Kovandy</title>
        <meta name="description" content="Prohlédněte si fotografie z realizovaných instalatérských prací. Kvalitní řemeslo, spolehlivost a profesionální přístup." />
        <meta name="keywords" content="instalatér fotogalerie, instalatérské práce, reference, rozvody vody, topení, odpad, realizace, Louny" />
        <meta name="author" content="Pavel Kovanda" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://pavelkovanda.cz/fotogalerie" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pavelkovanda.cz/fotogalerie" />
        <meta property="og:title" content="Fotogalerie instalatérských prací | Pavel Kovanda" />
        <meta property="og:description" content="Ukázky dokončených instalatérských prací a rekonstrukcí koupelen v Lounech a okolí." />
        <meta property="og:image" content="https://pavelkovanda.cz/images/fotogalerie-og.jpg" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://pavelkovanda.cz/fotogalerie" />
        <meta property="twitter:title" content="Fotogalerie | Pavel Kovanda Instalatér" />
        <meta property="twitter:description" content="Profesionální instalatérské práce v Lounech a okolí - prohlédněte si naše reference." />
        <meta property="twitter:image" content="https://pavelkovanda.cz/images/fotogalerie-twitter.jpg" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ImageGallery",
            "name": "Fotogalerie instalatérských prací Pavla Kovandy",
            "description": "Ukázky dokončených instalatérských prací a rekonstrukcí",
            "url": "https://pavelkovanda.cz/fotogalerie",
            "mainEntity": {
              "@type": "Service",
              "name": "Instalatérské služby",
              "provider": {
                "@type": "Person",
                "name": "Pavel Kovanda"
              }
            }
          })}
        </script>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="main" style={{ overflowX: "hidden" }}>
        <AnimatePresence mode="wait">
          {firstLoad && <PreLoader />}
        </AnimatePresence>
        <FotoGalerie />
      </main>
    </>
  );
}
