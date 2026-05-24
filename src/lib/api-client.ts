import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// ✅ Create axios instance
const apiClient = axios.create({
  baseURL: `${API_URL}/v1`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Request interceptor – attach auth token
apiClient.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("waai_access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// ✅ Response interceptor – handle 401
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("waai_access_token");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

// ✅ ONLY ONE export (IMPORTANT)
export default apiClient;
