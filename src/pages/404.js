import Head from "next/head";
import PreLoader from "@/components/PreLoader";
import MainIntro from "@/components/Main/Intro";
import WhatIDo from "@/components/Main/WhatIDo";
import Trafika from "@/components/Main/Trafika";
import Contact from "@/components/Main/Contact";
import { useGlobalContext } from "@/context/globalContext";
import { AnimatePresence } from "framer-motion";
import PageNotFound from "@/components/404";

export default function Home() {
  const { firstLoad } = useGlobalContext();


  return (
    <>
      <Head>
        <title>Pavel Kovanda - Osovbní stránky</title>
        <meta name="description" content="Osobní webové strány Pavla Kovandy se všemi informacemi." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="main" style={{ overflowX: "hidden" }}>
        <AnimatePresence mode="wait">
          {firstLoad && <PreLoader />}
        </AnimatePresence>
        <PageNotFound />
      </main>
    </>
  );
}
