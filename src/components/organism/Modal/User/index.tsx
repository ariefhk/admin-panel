/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useInput from "@/hooks/use-input";
import { User } from "@prisma/client";
import React, { useEffect } from "react";
import useModalUserHooks from "./modal-user.hooks";

interface ModalUserProps {
  isOpenUserModal: boolean;
  user?: User;
  type: "create" | "edit" | "delete";
  handleOpenUserModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleTriggerLoad: React.Dispatch<React.SetStateAction<boolean>>;
  handleSelectedUser?: React.Dispatch<React.SetStateAction<User | undefined>>;
}

const ModalUser: React.FC<ModalUserProps> = ({
  isOpenUserModal,
  user,
  handleOpenUserModal,
  handleTriggerLoad,
  handleSelectedUser,
  type,
}) => {
  const { values, handleChange, reset } = useInput(
    type === "edit" && user
      ? {
          name: user.name,
          email: user.email,
          password: "",
        }
      : {
          name: "",
          email: "",
          password: "",
        }
  );
  const { createUserState, handleCreateUser, handleDeleteUser, editUserState, handleEditUser, deleteUserState } =
    useModalUserHooks();

  useEffect(() => {
    if (createUserState.isSuccess || editUserState.isSuccess || deleteUserState.isSuccess) {
      handleTriggerLoad(true);
      handleOpenUserModal(false);
      if (user) handleSelectedUser?.(undefined);
    }
  }, [createUserState.isSuccess, editUserState.isSuccess, deleteUserState.isSuccess]);

  if (!isOpenUserModal) {
    return null;
  }

  if (type === "create") {
    return (
      <Dialog open={isOpenUserModal} onOpenChange={handleOpenUserModal}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>Add User</DialogTitle>
            <DialogDescription>Modal to add user</DialogDescription>
          </DialogHeader>
          <div className="border-transparent py-3">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleCreateUser(values);
                reset();
              }}
            >
              <div className="flex flex-col space-y-2">
                <div>
                  <Label htmlFor="name" className="text-sm">
                    Name
                  </Label>
                  <Input id="name" placeholder="john doe" name="name" value={values?.name ?? ""} onChange={handleChange} />
                </div>
                <div>
                  <Label htmlFor="email" className="text-sm">
                    Email
                  </Label>
                  <Input
                    id="email"
                    placeholder="john@example.com"
                    name="email"
                    value={values?.email ?? ""}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label htmlFor="password" className="text-sm">
                    Password
                  </Label>
                  <Input
                    id="password"
                    placeholder="very secret"
                    type="password"
                    name="password"
                    value={values?.password ?? ""}
                    onChange={handleChange}
                  />
                </div>

                <div className="flex justify-end space-x-2 pt-2">
                  <Button variant="destructive" onClick={() => handleOpenUserModal(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={createUserState.isLoading}>
                    Add User
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (type === "edit") {
    return (
      <Dialog open={isOpenUserModal} onOpenChange={handleOpenUserModal}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>Modal to edit user</DialogDescription>
          </DialogHeader>
          <div className="border-transparent py-3">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (user) handleEditUser(user.id, values);
                reset();
              }}
            >
              <div className="flex flex-col space-y-2">
                <div>
                  <Label htmlFor="name" className="text-sm">
                    Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="john doe"
                    name="name"
                    value={values?.name || user?.name || ""}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-sm">
                    Email
                  </Label>
                  <Input
                    id="email"
                    placeholder="john@example.com"
                    name="email"
                    value={values?.email || user?.email || ""}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label htmlFor="password" className="text-sm">
                    Password
                  </Label>
                  <Input
                    id="password"
                    placeholder="change your password"
                    type="password"
                    name="password"
                    value={values?.password || ""}
                    onChange={handleChange}
                  />
                </div>

                <div className="flex justify-end space-x-2 pt-2">
                  <Button variant="destructive" onClick={() => handleOpenUserModal(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={editUserState.isLoading}>
                    Edit User
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (type === "delete") {
    return (
      <Dialog open={isOpenUserModal} onOpenChange={handleOpenUserModal}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>Delete User : {user?.name}</DialogTitle>
            <DialogDescription>Modal to Delete user with email : {user?.email}</DialogDescription>
          </DialogHeader>
          <div className="border-transparent py-3">
            <div className="flex justify-end space-x-2 pt-2">
              <Button onClick={() => handleOpenUserModal(false)}>Cancel</Button>
              <Button
                variant="destructive"
                disabled={deleteUserState.isLoading}
                onClick={() => {
                  if (user) {
                    handleDeleteUser(user.id);
                  }
                }}
              >
                Delete User
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }
};

export default ModalUser;
