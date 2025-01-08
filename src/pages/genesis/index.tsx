import DashboardLayout from "@/components/layouts/DashboardLayout";
import { withAuth } from "@/utils/with-auth";
import React, { ReactElement } from "react";

const GenesisPage = () => {
  return <h1>test</h1>;
};

export default GenesisPage;

GenesisPage.getLayout = function getLayout(page: ReactElement) {
  const breadcrumbLinks = [
    {
      title: "Genesis",
      href: "/genesis",
      isActive: false,
    },
  ];

  return <DashboardLayout breadcrumbLinks={breadcrumbLinks}>{page}</DashboardLayout>;
};

export const getServerSideProps = withAuth(async (context, session) => {
  return {
    props: { session },
  };
});
