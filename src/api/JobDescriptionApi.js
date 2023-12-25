import { axios } from "configs";

const jobDescriptionApi = {
  createJobDescription: (data) => {
    return axios.post("/v3/category-description-templates/by-admin", data);
  },
  getListJobDescription: () => {
    return axios.get("/v3/category-description-templates/by-admin");
  },
  getJobDescriptionDetail: (id) => {
    return axios.get(`/v3/category-description-templates/${id}`);
  },
  updateJobDescription: (id, data) => {
    return axios.put(`/v3/category-description-templates/${id}/by-admin`, data);
  },
  deleteJobDescription: (id) => {
    return axios.delete(`/v3/category-description-templates/${id}/by-admin`);
  },
};

export default jobDescriptionApi;
