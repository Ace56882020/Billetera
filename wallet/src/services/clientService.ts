import axiosInstance from "./apiServce";

export const createClient = async (data: any) => {
  const response = await axiosInstance.post("client/register", data);
  return response.data;
};

export const getBalance = async (document: any, cellphone: any) => {
  const response = await axiosInstance.get("/client/balance", {
    params: {
      document,
      cellphone,
    },
  });
  return response.data;
};

export const rechargeBalance = async (data: any) => {
  const response = await axiosInstance.post("client/recharge", data);
  return response.data;
};
