import axios from "axios";
import store from "@/store/index.js";

// const isProd = process.env.NODE_ENV === "production";
let isProd = true;
const apiUrl = isProd
  ? "https://smart-nutri-c0a046f8ac11.herokuapp.com/"
  : "https://smart-nutri-c0a046f8ac11.herokuapp.com/";

const api = axios.create({
  baseURL: apiUrl,
  timeout: 5000,
});

// api.interceptors.request.use(async config => {
//     const token = store.state.auth.token;
//     if (token) config.headers.Authorization = `Bearer ${token}`;
//     return config;
// });

export default api;
