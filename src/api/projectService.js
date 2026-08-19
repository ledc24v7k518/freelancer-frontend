import api from "./axios";

export const getProjects = (params) => api.get("/projects", { params });
export const getProjectById = (id) => api.get(`/projects/${id}`);
export const createProject = (data) => api.post("/projects", data);
export const updateProject = (id, data) => api.put(`/projects/${id}`, data);
export const closeProject = (id) => api.patch(`/projects/${id}/close`);
export const getProjectApplications = (id) => api.get(`/projects/${id}/applications`);
