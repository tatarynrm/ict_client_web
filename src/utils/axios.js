import axios from "axios";
const instance = axios.create({
  baseURL: "http://localhost:5002",
  // baseURL: "http://192.168.1.33:5002",
  // baseURL: "http://192.168.4.115:5002",
  // baseURL: "http://192.168.2.124:5002",
});
instance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem("token");
  return config;
});
export default instance;
