import Head from "next/head";
import { CountDown } from "@/components/data-display/CountDown";
import Error from "@/components/data-display/Error";
import Loading from "@/components/data-display/Loading";
import { Map } from "@/components/data-display/Map";
import useMap from "@/hooks/useMap";

export const Home = () => {
  const { data: tiles, isLoading, isError } = useMap();

  if (isError) return <Error message="Could not load map..." />;
  if (isLoading) return <Loading />;
  if (!tiles) return <Error message="Could not load map..." />;

  return (
    <>
      <Head>
        <title>Explorerz</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CountDown subTitle="The lower the timer, the more land you receive. When the map is full, the game ends." />
      <Map tiles={tiles} />
    </>
  );
};

export default Home;
