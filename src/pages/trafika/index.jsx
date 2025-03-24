import Head from "next/head";
import styles from "@/styles/styles.scss";

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
        <title>Pavel Kovanda - Trafika stranka</title>
        <meta name="description" content="Osobní webové strány Pavla Kovandy - trafika a jeji informace" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="main">
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
