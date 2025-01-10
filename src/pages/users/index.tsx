import React, { ReactElement } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { withAuth } from "@/utils/with-auth";
import NewUsersPage from "@/components/pages/NewUserPage";
import { newUserBreadcrumbLinks } from "@/components/pages/NewUserPage/NewUserPage.constant";
import { UsersPageProps } from "@/types/user";
import { NextPageWithLayout } from "@/types/app";

const UsersPage: NextPageWithLayout<UsersPageProps> = ({ session }) => {
  return <NewUsersPage session={session} />;
};

export default UsersPage;

UsersPage.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout breadcrumbLinks={newUserBreadcrumbLinks}>{page}</DashboardLayout>;
};

export const getServerSideProps = withAuth(async (context, session) => {
  return {
    props: { session },
  };
});
