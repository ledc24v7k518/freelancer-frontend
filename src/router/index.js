import { createRouter, createWebHistory } from "vue-router";
import auth from "../store/auth";
// Các route của ứng dụng
const routes = [
  { path: "/", name: "Projects", component: () => import("../views/Projects.vue") },
  { path: "/projects/:id", name: "ProjectDetail", component: () => import("../views/ProjectDetail.vue"), props: true },
  { path: "/login", name: "Login", component: () => import("../views/Login.vue") },
  { path: "/register", name: "Register", component: () => import("../views/Register.vue") },

  { path: "/profile", name: "Profile", component: () => import("../views/Profile.vue"), meta: { roles: ["freelancer"] } },
  { path: "/my-applications", name: "MyApplications", component: () => import("../views/MyApplications.vue"), meta: { roles: ["freelancer"] } },

  { path: "/post-project", name: "PostProject", component: () => import("../views/PostProject.vue"), meta: { roles: ["employer"] } },
  { path: "/my-projects", name: "MyProjects", component: () => import("../views/MyProjects.vue"), meta: { roles: ["employer"] } },
  { path: "/my-projects/:id/edit", name: "EditProject", component: () => import("../views/PostProject.vue"), props: true, meta: { roles: ["employer"] } },
  { path: "/my-projects/:id/applicants", name: "Applicants", component: () => import("../views/Applicants.vue"), props: true, meta: { roles: ["employer"] } },

  { path: "/admin/users", name: "AdminUsers", component: () => import("../views/admin/AdminUsers.vue"), meta: { roles: ["admin"] } },
  { path: "/admin/categories", name: "AdminCategories", component: () => import("../views/admin/AdminCategories.vue"), meta: { roles: ["admin"] } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Route guard: chặn truy cập nếu chưa đăng nhập hoặc sai vai trò
router.beforeEach((to) => {
  const requiredRoles = to.meta.roles;
  if (!requiredRoles) return true;

  if (!auth.isAuthenticated()) {
    return { name: "Login", query: { redirect: to.fullPath } };
  }
  if (!auth.hasRole(...requiredRoles)) {
    return { name: "Projects" };
  }
  return true;
});

export default router;
