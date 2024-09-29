import axios, { AxiosError } from "axios";

const API = axios;

axios.interceptors.response.use((value) => value, (error) => {
  return Promise.reject(error.response?.data.message ?? error.message);
});

export default API;