import axios from "axios";
import store from "@/store/index.js";

// const isProd = process.env.NODE_ENV === "production";
let isProd = true;
const apiUrl = isProd
  ? "http://localhost:8080/"
  : "http://127.0.0.0:8080/";

const api = axios.create({
  baseURL: 'http://localhost:8080/',
  timeout: 5000,
});

// api.interceptors.request.use(async config => {
//     const token = store.state.auth.token;
//     if (token) config.headers.Authorization = `Bearer ${token}`;
//     return config;
// });

export default api;
