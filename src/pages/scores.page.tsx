import Head from "next/head";
import LeaderBoard from "@/components/data-display/LeaderBoard";
import RewardContent from "@/components/data-display/RewardContent";

export const Scores = () => {
  return (
    <>
      <Head>
        <title>Explorerz</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <RewardContent />
        <LeaderBoard />
      </div>
    </>
  );
};

export default Scores;
