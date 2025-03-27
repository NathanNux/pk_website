import CookiesContent from "@/components/CookiesPage"
import PreLoader from "@/components/PreLoader";
import { useGlobalContext } from "@/context/globalContext";
import { AnimatePresence } from "framer-motion";
import Head from "next/head"


export default function CookiesPage() {
    const { firstLoad } = useGlobalContext();
    return (
        <>
            <Head>
              <title>Zásady cookies | Pavel Kovanda</title>
              <meta name="description" content="Informace o používání cookies na webu Pavel Kovanda. Zjistěte, jak používáme cookies pro zlepšení vašeho zážitku z prohlížení." />
              <meta name="keywords" content="cookies, zásady cookies, ochrana soukromí, GDPR, Pavel Kovanda" />
              <meta name="author" content="Pavel Kovanda" />
              <meta name="robots" content="index, follow" />
              <link rel="canonical" href="https://pavelkovanda.cz/cookies" />
              <meta property="og:type" content="website" />
              <meta property="og:url" content="https://pavelkovanda.cz/cookies" />
              <meta property="og:title" content="Zásady cookies | Pavel Kovanda" />
              <meta property="og:description" content="Informace o používání cookies a ochraně soukromí na webu Pavel Kovanda." />
              <meta property="og:image" content="https://pavelkovanda.cz/images/cookies-og.jpg" />
              <meta property="twitter:card" content="summary_large_image" />
              <meta property="twitter:url" content="https://pavelkovanda.cz/cookies" />
              <meta property="twitter:title" content="Zásady cookies | Pavel Kovanda" />
              <meta property="twitter:description" content="Informace o cookies a ochraně soukromí." />
              <meta property="twitter:image" content="https://pavelkovanda.cz/images/cookies-twitter.jpg" />
              <script type="application/ld+json">
                {JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "WebPage",
                  "name": "Zásady používání cookies",
                  "description": "Informace o používání cookies na webu Pavel Kovanda",
                  "url": "https://pavelkovanda.cz/cookies",
                  "publisher": {
                    "@type": "Person",
                    "name": "Pavel Kovanda",
                    "url": "https://pavelkovanda.cz"
                  },
                  "inLanguage": "cs-CZ"
                })}
              </script>
            </Head>
            <main lang="cs">
                <AnimatePresence mode="wait">
                    {firstLoad && <PreLoader />}
                </AnimatePresence>
                <CookiesContent />
            </main>
        </>
    )
}