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
        <title>Pavel Kovanda - Trafika stranka</title>
        <meta name="description" content="Osobní webové strány Pavla Kovandy - trafika a jeji informace" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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
