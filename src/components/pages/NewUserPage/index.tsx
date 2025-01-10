import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/shadcn-ui/table";
import { Button } from "@/components/shadcn-ui/button";
import React, { ReactElement, useState } from "react";
import ModalUser from "@/components/organism/Modal/User";
import { User } from "@prisma/client";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { withAuth } from "@/utils/with-auth";
import { useGetUsers } from "@/services/client/user";
import { UsersPageProps } from "@/types/user";
import { newUserBreadcrumbLinks } from "./NewUserPage.constant";
import { NextPageWithLayout } from "@/types/app";

const NewUsersPage: NextPageWithLayout<UsersPageProps> = ({ session }) => {
  const { data: users } = useGetUsers(session?.user?.token);
  const [isOpenAddUserModal, setIsOpenAddUserModal] = useState(false);
  const [isOpenEditUserModal, setIsOpenEditUserModal] = useState(false);
  const [isOpenDeleteUserModal, setIsOpenDeleteUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined);

  return (
    <>
      <div className="flex-1 space-y-4">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Users</h2>
          <div className="flex items-center space-x-2">
            <Button className="min-w-[100px]" onClick={() => setIsOpenAddUserModal(true)}>
              Add User
            </Button>
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Id</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users ? (
              users?.length >= 0 &&
              users.map((user) => {
                return (
                  <TableRow key={user.id}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell className="text-right space-x-5">
                      <Button
                        className="bg-blue-500 hover:bg-blue-800 text-white min-w-[100px]"
                        onClick={() => {
                          setSelectedUser(user);
                          setIsOpenEditUserModal(true);
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant={"destructive"}
                        className="min-w-[100px]"
                        onClick={() => {
                          setSelectedUser(user);
                          setIsOpenDeleteUserModal(true);
                        }}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={4}>Loading...</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <ModalUser type="create" isOpenUserModal={isOpenAddUserModal} handleOpenUserModal={setIsOpenAddUserModal} />
      <ModalUser
        type="edit"
        user={selectedUser}
        isOpenUserModal={isOpenEditUserModal}
        handleOpenUserModal={setIsOpenEditUserModal}
        handleSelectedUser={setSelectedUser}
      />
      <ModalUser
        type="delete"
        user={selectedUser}
        isOpenUserModal={isOpenDeleteUserModal}
        handleOpenUserModal={setIsOpenDeleteUserModal}
        handleSelectedUser={setSelectedUser}
      />
    </>
  );
};

export default NewUsersPage;

NewUsersPage.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout breadcrumbLinks={newUserBreadcrumbLinks}>{page}</DashboardLayout>;
};

export const getServerSideProps = withAuth(async (context, session) => {
  return {
    props: { session },
  };
});
