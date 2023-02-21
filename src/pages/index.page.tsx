import Head from "next/head";
import Error from "@/components/data-display/Error";
import Loading from "@/components/data-display/Loading";
import { Map } from "@/components/data-display/Map";
import useMap from "@/hooks/useMap";

export const Home = () => {
  const { data: tiles, isLoading, isError } = useMap();

  if (isError) return <Error message="Could not load map..." />;
  if (isLoading) return <Loading />;

  return (
    <>
      <Head>
        <title>Explorerz</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {tiles ? <Map tiles={tiles} /> : <Loading />}
    </>
  );
};

export default Home;
