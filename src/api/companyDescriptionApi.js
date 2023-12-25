import { axios } from "configs";

const companyDescriptionApi = {
  createCompanyDescription: (data) => {
    return axios.post("/v3/company-description-templates/by-admin", data);
  },
  getListCompanyDescription: () => {
    return axios.get("/v3/company-description-templates/by-admin");
  },

  getCompanyDescriptionDetail: (id) => {
    return axios.get(`/v3/company-description-templates/${id}`);
  },

  updateCompanyDescription: (id, body) => {
    return axios.put(`/v3/company-description-templates/${id}/by-admin`, body);
  },

  deleteCompanyDescription: (id) => {
    return axios.delete(`/v3/company-description-templates/${id}/by-admin`);
  },
};

export default companyDescriptionApi;
