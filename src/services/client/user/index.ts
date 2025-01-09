import { axiosInstance } from "../axios";
import { useQuery } from "react-query";

const fetchGetUser = async () => {
  const result = await axiosInstance("/user");
  return result.data;
};

const useGetUsers = (token: string) => {
  console.log(token);
  return useQuery(["users"], () => fetchGetUser());
};

export { useGetUsers, fetchGetUser };
