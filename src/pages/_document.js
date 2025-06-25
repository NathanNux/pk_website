import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="cs">
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://syjlnusygybtuzoxirnw.supabase.co" />
        <link rel="dns-prefetch" href="https://syjlnusygybtuzoxirnw.supabase.co" />
      </Head>
      <body>
        <Main />
        <NextScript />
        
        {/* Google Analytics with Next.js Script component */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-LXSEHDDLM3"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-LXSEHDDLM3');
          `}
        </Script>
      </body>
    </Html>
  );
}