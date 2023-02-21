import Head from "next/head";
import { Map } from "@/components/data-display/Map";
import { ComponentLayout } from "@/components/layout/ComponentLayout";
import { Page } from "@/components/layout/Page";

const row = [
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
];

const tiles = [row, row, row, row, row, row, row, row, row, row, row, row];

export const Home = () => {
  return (
    <>
      <Head>
        <title>Explorerz</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Page>
          <ComponentLayout>
            <Map tiles={tiles} />
          </ComponentLayout>
        </Page>
      </main>
    </>
  );
};

export default Home;
