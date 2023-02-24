import { useState } from "react";
import Head from "next/head";
import Error from "@/components/data-display/Error";
import { FAQ } from "@/components/data-display/FAQ";
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
      <Map tiles={tiles} />
    </>
  );
};

export default Home;
