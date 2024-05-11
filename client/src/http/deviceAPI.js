import { $authHost, $host } from "./index";
import { jwtDecode } from "jwt-decode";

export const createType = async (type) => {
  const { data } = await $authHost.post("api/type", type);
  return data;
};

export const fetchTypes = async () => {
  const { data } = await $host.get("api/type");
  return data;
};

export const createBrand = async (brand) => {
  const { data } = await $host.post("api/brand", brand);
  return data;
};
export const fetchBrands = async () => {
  const { data } = await $host.get("api/brand");
  return data;
};
export const createDevice = async (device) => {
  const { data } = await $host.post("api/device", device);
  return data;
};
export const fetchDevice = async (typeId, brandId, page, limit = 5) => {
  const { data } = await $host.get("api/device", {
    params: {
      typeId,
      brandId,
      page,
      limit,
    },
  });
  return data;
};

export const fetchOneDevice = async (id) => {
  const { data } = await $host.get("api/device/" + id);
  return data;
};

export const fetchManyDevices = async (devices) => {
  if (!devices) {
    return [];
  }

  const promises = Object.entries(devices).map(([i, value]) => {
    return fetchOneDevice(value.deviceId);
  });
  const datas = await Promise.all(promises);
  return datas;
};
