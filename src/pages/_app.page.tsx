import { useState } from "react";
import type { AppProps } from "next/app";
import "@/shared/styles/global.css";
import Page from "@/components/layout/Page";
import "@/flow/config";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Provider as JotaiProvider } from "jotai";

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate>
        <Page>
          <JotaiProvider>
            <Component {...pageProps} />
          </JotaiProvider>
        </Page>
      </Hydrate>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
