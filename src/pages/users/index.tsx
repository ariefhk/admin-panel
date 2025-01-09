import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import React, { ReactElement, useEffect, useState } from "react";
import ModalUser from "@/components/organism/Modal/User";
import { User } from "@prisma/client";
import axios from "axios";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { withAuth } from "@/utils/with-auth";
import { useGetUsers } from "@/services/client/user";
import { NextPageWithLayout } from "../_app";

interface UsersPageProps {
  session: {
    user: {
      email: string;
      name: string;
      image: string;
      token: string;
    };
  };
}

const UsersPage: NextPageWithLayout<UsersPageProps> = ({ session }) => {
  const { data } = useGetUsers(session?.user?.token);

  console.log(data);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState<boolean>(false);
  const [triggerLoad, setTriggerLoad] = useState<boolean>(true);
  const [isOpenAddUserModal, setIsOpenAddUserModal] = useState(false);
  const [isOpenEditUserModal, setIsOpenEditUserModal] = useState(false);
  const [isOpenDeleteUserModal, setIsOpenDeleteUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    if (triggerLoad) {
      setIsLoadingUsers(true);
      axios
        .get("/api/user")
        .then((res) => {
          console.log(res.data);
          setUsers(res.data);
        })
        .catch(() => {})
        .finally(() => {
          setIsLoadingUsers(false);
          setTriggerLoad(false);
        });
    }
  }, [triggerLoad]);
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
            {!isLoadingUsers ? (
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
      <ModalUser
        type="create"
        isOpenUserModal={isOpenAddUserModal}
        handleOpenUserModal={setIsOpenAddUserModal}
        handleTriggerLoad={setTriggerLoad}
      />
      <ModalUser
        type="edit"
        user={selectedUser}
        isOpenUserModal={isOpenEditUserModal}
        handleOpenUserModal={setIsOpenEditUserModal}
        handleTriggerLoad={setTriggerLoad}
        handleSelectedUser={setSelectedUser}
      />
      <ModalUser
        type="delete"
        user={selectedUser}
        isOpenUserModal={isOpenDeleteUserModal}
        handleOpenUserModal={setIsOpenDeleteUserModal}
        handleTriggerLoad={setTriggerLoad}
        handleSelectedUser={setSelectedUser}
      />
    </>
  );
};

export default UsersPage;

UsersPage.getLayout = function getLayout(page: ReactElement) {
  const breadcrumbLinks = [
    {
      title: "Users",
      href: "#",
      isActive: false,
    },
    {
      title: "List",
      href: "/users",
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
