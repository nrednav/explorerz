import type { AppProps } from "next/app";
import "@/shared/styles/global.css";
import localFont from "@next/font/local";

// Font files can be colocated inside of `pages`
const myFont = localFont({
  src: "../../public/fonts/Eight-Bit Madness.ttf",
  variable: "--font-8bit",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={myFont.className}>
      <Component {...pageProps} />
    </main>
  );
}
