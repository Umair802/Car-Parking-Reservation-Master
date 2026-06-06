import api from "@/config/api";

export const loginApi = (data: { email: string; password: string }) => {
  return () => api.post("/login", data);
};

export const registerApi = (data: {
  name: string;
  email: string;
  password: string;
}) => {
  return () => api.post("/register", data);
};
