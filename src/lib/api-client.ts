import axios from "axios";

export const apiClient = axios.create({
  baseURL: "https://whatsappai-backend-3ji4.onrender.com/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor – attach auth token
apiClient.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("waai_access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Response interceptor – handle 401
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("waai_access_token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default apiClient;
