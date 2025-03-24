import Head from "next/head";
import { Geist, Geist_Mono } from "next/font/google";
import styles from "@/styles/styles.scss";
import FotoGalerie from "@/components/FotoGalerie";
import BackgroundGradient from "@/components/common/Backgorund";
import { AnimatePresence } from "framer-motion";
import PreLoader from "@/components/PreLoader";
import { useGlobalContext } from "@/context/globalContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function FotoGaleriePage() {
    const { firstLoad } = useGlobalContext();
  

  return (
    <>
      <Head>
        <title>Pavel Kovanda - Trafika stranka</title>
        <meta name="description" content="Osobní webové strány Pavla Kovandy - trafika a jeji informace" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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
