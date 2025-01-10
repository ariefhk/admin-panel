import type { AppProps } from "next/app";
import { Session } from "next-auth";
import { ReactElement, ReactNode } from "react";
import { NextPage } from "next";
import { CustomAppProps } from "@/types/app";

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

export interface CustomAppProps extends AppProps {
  session: Session;
  Component: NextPageWithLayout;
}
