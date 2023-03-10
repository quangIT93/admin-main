import { axios } from "configs";

export const fetchAllLocations = async () => {
  let locations;
  const res = await axios.get("/locations");
  if (res.success) {
    locations = res.data;
    return locations;
  }
};
