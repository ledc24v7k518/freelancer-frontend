import api from "./axios";

export const getCategories = () => api.get("/categories");
export const createCategory = (data) => api.post("/categories", data);
export const updateCategory = (id, data) => api.put(`/categories/${id}`, data);
export const deleteCategory = (id) => api.delete(`/categories/${id}`);

export const getUsers = (params) => api.get("/admin/users", { params });
export const toggleLockUser = (id) => api.patch(`/admin/users/${id}/lock`);
export const deleteUser = (id) => api.delete(`/admin/users/${id}`);
