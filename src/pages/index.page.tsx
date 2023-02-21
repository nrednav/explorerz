import Head from "next/head";
import { Map } from "@/components/data-display/Map";
import { Page } from "@/components/layout/Page";

export const Home = () => {
  return (
    <>
      <Head>
        <title>Explorerz</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Page>
          <Map />
        </Page>
      </main>
    </>
  );
};

export default Home;
