import { $authHost, $host } from "./index";
import { jwtDecode } from "jwt-decode";

export const createRating = async (deviceId, rate) => {
  const { data } = await $authHost.post("api/rating", {
    deviceId,
    rate,
  });
  return data;
};
