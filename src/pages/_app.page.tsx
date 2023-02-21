import type { AppProps } from "next/app";
import "@/shared/styles/global.css";
import "@/flow/config";
import { Press_Start_2P } from "@next/font/google";

const font = Press_Start_2P({ subsets: ["latin"], weight: "400" });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={font.className}>
      <Component {...pageProps} />
    </main>
  );
}
