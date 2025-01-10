import DashboardLayout from "@/components/layouts/DashboardLayout";
import DashboardPage from "@/components/pages/DashboardPage";
import { dashboardBreadcrumbLinks } from "@/components/pages/DashboardPage/DashboardPage.constant";
import { withAuth } from "@/utils/with-auth";
import { ReactElement } from "react";

export default function Home() {
  return <DashboardPage />;
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout breadcrumbLinks={dashboardBreadcrumbLinks}>{page}</DashboardLayout>;
};

export const getServerSideProps = withAuth(async (context, session) => {
  return {
    props: { session },
  };
});
