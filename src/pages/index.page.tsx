import Head from "next/head";
import { Map } from "@/components/data-display/Map";
import { Tile } from "@/components/data-display/Tile";
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

const customRow = [
  {
    id: 0,
    kind: "grass",
    image: {
      src: "/images/grass.png",
      alt: "Grass",
    },
  } as Tile,
  {
    id: 0,
    kind: "stone",
    image: {
      src: "/images/stone.png",
      alt: "Stone",
    },
  } as Tile,
  {
    id: 0,
    kind: "sand",
    image: {
      src: "/images/sand.png",
      alt: "Sand",
    },
  } as Tile,
  {
    id: 0,
    kind: "water",
    image: {
      src: "/images/water.png",
      alt: "Water",
    },
  } as Tile,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
];

const tiles = [
  customRow,
  row,
  row,
  row,
  row,
  row,
  row,
  row,
  row,
  row,
  row,
  row,
];

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
