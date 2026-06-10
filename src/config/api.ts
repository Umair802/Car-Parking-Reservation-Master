import axios from "axios";
import Cookies from "js-cookie";

const rawBaseURL = process.env.NEXT_PUBLIC_API_BASE_URL?.trim() || "";

const normalizedBaseURL = (() => {
  if (!rawBaseURL) return "/api";

  // Keep absolute URLs as-is, otherwise force a leading slash for relative API paths.
  if (rawBaseURL.startsWith("http://") || rawBaseURL.startsWith("https://")) {
    return rawBaseURL.replace(/\/$/, "");
  }

  return `/${rawBaseURL.replace(/^\/+/, "").replace(/\/$/, "")}`;
})();

const api = axios.create({
  baseURL: normalizedBaseURL,
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
