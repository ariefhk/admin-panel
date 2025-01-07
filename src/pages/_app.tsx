import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";

import { Session } from "next-auth";
import { Toaster } from "@/components/ui/toaster";

interface CustomAppProps extends AppProps {
  session: Session;
}

export default function App({ session, Component, pageProps }: Readonly<CustomAppProps>) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
      <Toaster />
    </SessionProvider>
  );
}
