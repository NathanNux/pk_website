import Head from "next/head";
import { useGlobalContext } from "@/context/globalContext";
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
        <PageNotFound />
      </main>
    </>
  );
}
