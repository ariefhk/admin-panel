import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/shadcn-ui/toaster";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { CustomAppProps } from "@/types/app";
import React from "react";

export const queryClientInstance = new QueryClient();

const App: React.FC<CustomAppProps> = ({ session, Component, pageProps }) => {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClientInstance}>
        <Hydrate state={pageProps.dehydratedState}>
          {getLayout(<Component {...pageProps} />)}
          <Toaster />
        </Hydrate>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default App;
