import axios from "axios";
const instance = axios.create({
  // baseURL: "http://localhost:8800",
  // baseURL: "http://192.168.1.33:8800",
  baseURL: "http://192.168.5.180:8800",
});
instance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem("token");
  return config;
});
export default instance;
