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
