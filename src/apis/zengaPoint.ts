import { axiosInstance } from "./axiosInstance";

export const fetchZengaPoint = async (): Promise<number> => {
  const { data } = await axiosInstance.get("/point/total");

  return data.data.point;
};
