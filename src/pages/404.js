import Head from "next/head";
import { useGlobalContext } from "@/context/globalContext";
import PageNotFound from "@/components/404";

export default function NotFoundPage() {
  const { firstLoad } = useGlobalContext();

  return (
    <>
      <Head>
        <title>Stránka nenalezena (404) | Pavel Kovanda</title>
        <meta name="description" content="Omlouváme se, ale hledaná stránka nebyla nalezena. Vraťte se na hlavní stránku a pokračujte v prohlížení nabídky instalatérských služeb a trafiky." />
        <meta name="keywords" content="404, stránka nenalezena, chyba, Pavel Kovanda, instalatér, trafika" />
        <meta name="author" content="Pavel Kovanda" />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="https://pavelkovanda.cz" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pavelkovanda.cz/404" />
        <meta property="og:title" content="Stránka nenalezena | Pavel Kovanda" />
        <meta property="og:description" content="Omlouváme se, ale hledaná stránka nebyla nalezena. Vraťte se na hlavní stránku s nabídkou instalatérských služeb a trafiky." />
        <meta property="og:image" content="https://pavelkovanda.cz/images/og-image.jpg" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://pavelkovanda.cz/404" />
        <meta property="twitter:title" content="Stránka nenalezena | Pavel Kovanda" />
        <meta property="twitter:description" content="Omlouváme se, ale hledaná stránka nebyla nalezena." />
        <meta property="twitter:image" content="https://pavelkovanda.cz/images/twitter-image.jpg" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Stránka nenalezena",
            "description": "Tato stránka nebyla nalezena (chyba 404)",
            "isPartOf": {
              "@type": "WebSite",
              "name": "Pavel Kovanda - Instalatérské služby & Trafika",
              "url": "https://pavelkovanda.cz"
            },
            "publisher": {
              "@type": "Person",
              "name": "Pavel Kovanda",
              "telephone": "+420602175680",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Jablonského 402/18",
                "addressLocality": "Písek",
                "postalCode": "39701",
                "addressCountry": "CZ"
              }
            }
          })}
        </script>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="main" style={{ overflowX: "hidden" }}>
        <PageNotFound />
      </main>
    </>
  );
}