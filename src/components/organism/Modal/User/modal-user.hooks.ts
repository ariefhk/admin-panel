import { toast } from "@/hooks/use-toast";
import { User } from "@prisma/client";
import axios from "axios";
import { useState } from "react";

interface FetchingState {
  isInitial: boolean;
  isSuccess: boolean;
  isError: boolean;
  isLoading: boolean;
}

const useModalUserHooks = () => {
  const [createUserState, setCreateUserState] = useState<FetchingState>({
    isInitial: true,
    isSuccess: false,
    isError: false,
    isLoading: false,
  });

  const [editUserState, setEditUserState] = useState<FetchingState>({
    isInitial: true,
    isSuccess: false,
    isError: false,
    isLoading: false,
  });

  const [deleteUserState, setDeleteUserState] = useState<FetchingState>({
    isInitial: true,
    isSuccess: false,
    isError: false,
    isLoading: false,
  });

  const handleCreateUser = async (values: Partial<User>) => {
    setCreateUserState({ isInitial: false, isSuccess: false, isError: false, isLoading: true });
    try {
      await axios.post("/api/user", values);
      toast({
        title: "Success",
        description: "User has been created!",
      });
      setCreateUserState({ isInitial: false, isSuccess: true, isError: false, isLoading: false });
    } catch (err) {
      console.error(err);
      toast({
        title: "Error",
        description: "User failed to create!",
        variant: "destructive",
      });
      setCreateUserState({ isInitial: false, isSuccess: false, isError: true, isLoading: false });
    } finally {
      setTimeout(() => {
        setCreateUserState({ isInitial: true, isSuccess: false, isError: false, isLoading: false });
      }, 1000);
    }
  };

  const handleEditUser = async (id: number, values: Partial<User>) => {
    setEditUserState({ isInitial: false, isSuccess: false, isError: false, isLoading: true });
    try {
      await axios.put(`/api/user/${id}`, values);
      toast({
        title: "Success",
        description: "User has been edited!",
      });
      setEditUserState({ isInitial: false, isSuccess: true, isError: false, isLoading: false });
    } catch (err) {
      toast({
        title: "Error",
        description: "User failed to edit!",
        variant: "destructive",
      });
      console.error(err);
      setEditUserState({ isInitial: false, isSuccess: false, isError: true, isLoading: false });
    } finally {
      setTimeout(() => {
        setEditUserState({ isInitial: true, isSuccess: false, isError: false, isLoading: false });
      }, 1000);
    }
  };

  const handleDeleteUser = async (id: number) => {
    setDeleteUserState({ isInitial: false, isSuccess: false, isError: false, isLoading: true });
    try {
      await axios.delete(`/api/user/${id}`);
      toast({
        title: "Success",
        description: "User has been deleted!",
      });
      setDeleteUserState({ isInitial: false, isSuccess: true, isError: false, isLoading: false });
    } catch (err) {
      toast({
        title: "Error",
        description: "User failed to delete!",
        variant: "destructive",
      });
      console.error(err);
      setDeleteUserState({ isInitial: false, isSuccess: false, isError: true, isLoading: false });
    } finally {
      setTimeout(() => {
        setDeleteUserState({ isInitial: true, isSuccess: false, isError: false, isLoading: false });
      }, 1000);
    }
  };

  return {
    createUserState,
    editUserState,
    deleteUserState,
    handleCreateUser,
    handleEditUser,
    handleDeleteUser,
  };
};

export default useModalUserHooks;
