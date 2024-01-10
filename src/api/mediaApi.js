import { axios } from "configs";

const mediaApi = {
  postPostMedias: (dataForm) => {
    return axios.post(`/v3/post-medias`, dataForm);
  },

  getPostMedias: (id) => {
    return axios.get(`/v3/post-medias/by-admin`);
  },

  getPostMediaById: (id) => {
    return axios.get(`/v3/post-medias/${id}`);
  },

  putPostMedia: (id, body) => {
    return axios.put(`/v3/post-medias/${id}`, body);
  },

  deletePostMedia: (id) => {
    return axios.delete(`/v3/post-medias/${id}`);
  },
};

export default mediaApi;
