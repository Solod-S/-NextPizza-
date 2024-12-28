import { User } from "@prisma/client";
import { axiosInstance } from "./axios-instance";

export const getMe = async () => {
  try {
    console.log(122);
    const { data } = await axiosInstance.get<User>("/auth/me");
    return data;
  } catch (error) {
    console.log(`getMe error`, error);
  }
};
