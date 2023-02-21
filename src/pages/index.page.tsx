import Head from "next/head";
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
          <h1>Welcome</h1>
        </Page>
      </main>
    </>
  );
};

export default Home;
