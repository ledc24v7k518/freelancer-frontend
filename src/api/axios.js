import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Tự động đính kèm JWT token vào mọi request nếu người dùng đã đăng nhập
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Tự động xử lý lỗi 401 Unauthorized và xóa token khỏi localStorage
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
    return Promise.reject(error);
  }
);

export default api;
