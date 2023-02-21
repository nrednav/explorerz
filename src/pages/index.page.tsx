import Head from "next/head";
import { Map } from "@/components/data-display/Map";
import { ComponentLayout } from "@/components/layout/ComponentLayout";
import { Page } from "@/components/layout/Page";
import useMap from "@/hooks/useMap";

export const Home = () => {
  const { tiles } = useMap();

  return (
    <>
      <Head>
        <title>Explorerz</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Page>
          <ComponentLayout>
            {tiles ? <Map tiles={tiles} /> : <h1>Map loading...</h1>}
          </ComponentLayout>
        </Page>
      </main>
    </>
  );
};

export default Home;
