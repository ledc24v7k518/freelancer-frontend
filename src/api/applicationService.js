import api from "./axios";

export const applyToProject = (projectId) => api.post("/applications", { projectId });
export const getMyApplications = () => api.get("/applications/me");
export const acceptApplication = (id) => api.patch(`/applications/${id}/accept`);
export const rejectApplication = (id) => api.patch(`/applications/${id}/reject`);
