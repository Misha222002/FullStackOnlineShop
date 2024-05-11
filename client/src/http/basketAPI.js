import { $authHost, $host } from "./index";

export const createGood = async (device) => {
  const { data } = await $authHost.post("api/basket", device);
  return data;
};

export const fetchGoods = async () => {
  const { data } = await $authHost.get("api/basket");
  return data;
};

export const updateOne = async (busketDevice) => {
  const { data } = await $authHost.put("api/basket", busketDevice);
  return data;
};
