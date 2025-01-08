import DashboardLayout from "@/components/layouts/DashboardLayout";
import DashboardPage from "@/components/pages/DashboardPage";
import { withAuth } from "@/utils/with-auth";
import { ReactElement } from "react";

export default function Home() {
  return <DashboardPage />;
}

Home.getLayout = function getLayout(page: ReactElement) {
  const breadcrumbLinks = [
    {
      title: "Dashboard",
      href: "/",
      isActive: true,
    },
  ];

  return <DashboardLayout breadcrumbLinks={breadcrumbLinks}>{page}</DashboardLayout>;
};

export const getServerSideProps = withAuth(async (context, session) => {
  return {
    props: { session },
  };
});
