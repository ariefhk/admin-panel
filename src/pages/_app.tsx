import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import { Toaster } from "@/components/ui/toaster";
import { ReactElement, ReactNode } from "react";
import { NextPage } from "next";

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

interface CustomAppProps extends AppProps {
  session: Session;
  Component: NextPageWithLayout;
}

export default function App({ session, Component, pageProps }: Readonly<CustomAppProps>) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <SessionProvider session={session}>
      {getLayout(<Component {...pageProps} />)}
      <Toaster />
    </SessionProvider>
  );
}
