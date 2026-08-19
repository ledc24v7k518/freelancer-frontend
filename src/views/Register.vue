<template>
  <div class="row justify-content-center">
    <div class="col-md-5">
      <h3 class="mb-3">Đăng ký tài khoản</h3>
      <div v-if="errorMsg" class="alert alert-danger">{{ errorMsg }}</div>
      <div v-if="successMsg" class="alert alert-success">{{ successMsg }}</div>
      <form @submit.prevent="handleRegister">
        <div class="mb-3">
          <label class="form-label">Bạn đăng ký với vai trò</label>
          <select v-model="form.role" class="form-select">
            <option value="freelancer">Freelancer</option>
            <option value="employer">Doanh nghiệp</option>
          </select>
        </div>
        <div class="mb-3">
          <label class="form-label">{{ form.role === "employer" ? "Tên công ty" : "Họ tên" }}</label>
          <input v-model="form.name" type="text" class="form-control" required />
        </div>
        <div class="mb-3">
          <label class="form-label">Email</label>
          <input v-model="form.email" type="email" class="form-control" required />
        </div>
        <div class="mb-3">
          <label class="form-label">Mật khẩu</label>
          <input v-model="form.password" type="password" class="form-control" minlength="6" required />
        </div>
        <button type="submit" class="btn btn-primary w-100" :disabled="loading">
          {{ loading ? "Đang xử lý..." : "Đăng ký" }}
        </button>
      </form>
      <p class="mt-3 text-center">
        Đã có tài khoản? <RouterLink to="/login">Đăng nhập</RouterLink>
      </p>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { register } from "../api/authService";
import auth from "../store/auth";

const router = useRouter();
const form = reactive({ name: "", email: "", password: "", role: "freelancer" });
const loading = ref(false);
const errorMsg = ref("");
const successMsg = ref("");

async function handleRegister() {
  loading.value = true;
  errorMsg.value = "";
  try {
    const { data } = await register(form);
    auth.setAuth(data.user, data.token);
    successMsg.value = "Đăng ký thành công!";
    setTimeout(() => router.push("/"), 600);
  } catch (err) {
    errorMsg.value = err.response?.data?.message || "Đăng ký thất bại";
  } finally {
    loading.value = false;
  }
}
</script>
