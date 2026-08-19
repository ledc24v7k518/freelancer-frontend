<template>
  <div class="row justify-content-center">
    <div class="col-md-5">
      <h3 class="mb-3">Đăng nhập</h3>
      <div v-if="errorMsg" class="alert alert-danger">{{ errorMsg }}</div>
      <form @submit.prevent="handleLogin">
        <div class="mb-3">
          <label class="form-label">Email</label>
          <input v-model="form.email" type="email" class="form-control" required />
        </div>
        <div class="mb-3">
          <label class="form-label">Mật khẩu</label>
          <input v-model="form.password" type="password" class="form-control" required />
        </div>
        <button type="submit" class="btn btn-primary w-100" :disabled="loading">
          {{ loading ? "Đang xử lý..." : "Đăng nhập" }}
        </button>
      </form>
      <p class="mt-3 text-center">
        Chưa có tài khoản? <RouterLink to="/register">Đăng ký</RouterLink>
      </p>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { login } from "../api/authService";
import auth from "../store/auth";

const router = useRouter();
const route = useRoute();

const form = reactive({ email: "", password: "" });
const loading = ref(false);
const errorMsg = ref("");

async function handleLogin() {
  loading.value = true;
  errorMsg.value = "";
  try {
    const { data } = await login(form);
    auth.setAuth(data.user, data.token);
    router.push(route.query.redirect || "/");
  } catch (err) {
    errorMsg.value = err.response?.data?.message || "Đăng nhập thất bại";
  } finally {
    loading.value = false;
  }
}
</script>
