import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "", // optional, if using env
  headers: {
    "Content-Type": "application/json",
  },
});

// Add an interceptor to attach the token
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Capital B for convention
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;

// Optional: for file uploads
export const formHeader = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};
