import axiosInstance from "./apiServce";

export const payment = async (data: any) => {
  const response = await axiosInstance.post("payment", data);
  return response.data;
};


export const confirmPayment = async (data: any) => {
  const response = await axiosInstance.post("payment/confirm", data);
  return response.data;
};
