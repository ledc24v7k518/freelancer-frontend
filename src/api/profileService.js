import api from "./axios";

export const getMyProfile = () => api.get("/profiles/me");
export const updateMyProfile = (data) => api.put("/profiles/me", data);
