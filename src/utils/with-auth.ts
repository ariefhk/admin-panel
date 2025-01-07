// lib/withAuth.ts
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";

export function withAuth<T extends Record<string, unknown>>(
  handler: (context: GetServerSidePropsContext, session: Session) => Promise<GetServerSidePropsResult<T>>
): GetServerSideProps<T> {
  return async (context) => {
    const session = await getSession(context);

    if (!session) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }

    return handler(context, session);
  };
}
