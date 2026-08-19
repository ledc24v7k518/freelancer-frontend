<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-3">
    <RouterLink to="/">
      <img src="/logo.png" alt="FreelanceConnect" class="logo" />
    </RouterLink>
    <div class="d-flex ms-auto align-items-center gap-3">
      <RouterLink to="/" class="nav-link text-white d-inline">Việc làm</RouterLink>

      <template v-if="!auth.isAuthenticated()">
        <RouterLink to="/login" class="nav-link text-white d-inline">Đăng nhập</RouterLink>
        <RouterLink to="/register" class="nav-link text-white d-inline">Đăng ký</RouterLink>
      </template>

      <template v-else-if="auth.hasRole('freelancer')">
        <RouterLink to="/profile" class="nav-link text-white d-inline">Hồ sơ</RouterLink>
        <RouterLink to="/my-applications" class="nav-link text-white d-inline">Đơn ứng tuyển</RouterLink>
        <button class="btn btn-outline-light btn-sm" @click="logout">Đăng xuất</button>
      </template>

      <template v-else-if="auth.hasRole('employer')">
        <RouterLink to="/post-project" class="nav-link text-white d-inline">Đăng dự án</RouterLink>
        <RouterLink to="/my-projects" class="nav-link text-white d-inline">Dự án của tôi</RouterLink>
        <button class="btn btn-outline-light btn-sm" @click="logout">Đăng xuất</button>
      </template>

      <template v-else-if="auth.hasRole('admin')">
        <RouterLink to="/admin/users" class="nav-link text-white d-inline">Tài khoản</RouterLink>
        <RouterLink to="/admin/categories" class="nav-link text-white d-inline">Danh mục</RouterLink>
        <button class="btn btn-outline-light btn-sm" @click="logout">Đăng xuất</button>
      </template>
    </div>
  </nav>

  <main class="container py-4">
    <RouterView />
  </main>
</template>

<script setup>
import { useRouter } from "vue-router";
import auth from "./store/auth";

const router = useRouter();

function logout() {
  auth.clearAuth();
  router.push("/login");
}
</script>

<style scoped>
.logo {
  height: 40px;        
  width: auto;         
  object-fit: contain;
  display: block;
}

</style>

