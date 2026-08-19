<template>
  <div v-if="loading">Đang tải...</div>
  <div v-else-if="project" class="row justify-content-center">
    <div class="col-md-8">
      <span class="badge bg-secondary mb-2">{{ project.categoryId?.name }}</span>
      <h3>{{ project.title }}</h3>
      <p class="text-muted">Đăng bởi: {{ project.employerId?.name }} — {{ project.employerId?.email }}</p>
      <span class="badge" :class="project.status === 'open' ? 'bg-success' : 'bg-danger'">
        {{ project.status === "open" ? "Đang mở" : "Đã đóng" }}
      </span>
      <p class="mt-3" style="white-space: pre-line">{{ project.description }}</p>

      <div v-if="successMsg" class="alert alert-success mt-3">{{ successMsg }}</div>
      <div v-if="errorMsg" class="alert alert-danger mt-3">{{ errorMsg }}</div>

      <button
        v-if="auth.hasRole('freelancer') && project.status === 'open'"
        class="btn btn-primary"
        :disabled="applying"
        @click="handleApply"
      >
        {{ applying ? "Đang gửi..." : "Ứng tuyển ngay" }}
      </button>
      <RouterLink v-else-if="!auth.isAuthenticated()" to="/login" class="btn btn-outline-primary">
        Đăng nhập để ứng tuyển
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getProjectById } from "../api/projectService";
import { applyToProject } from "../api/applicationService";
import auth from "../store/auth";

const props = defineProps({ id: String });
const project = ref(null);
const loading = ref(true);
const applying = ref(false);
const successMsg = ref("");
const errorMsg = ref("");

onMounted(async () => {
  const { data } = await getProjectById(props.id);
  project.value = data.project;
  loading.value = false;
});

async function handleApply() {
  applying.value = true;
  errorMsg.value = "";
  try {
    await applyToProject(props.id);
    successMsg.value = "Ứng tuyển thành công! Bạn có thể theo dõi ở mục Đơn ứng tuyển.";
  } catch (err) {
    errorMsg.value = err.response?.data?.message || "Ứng tuyển thất bại";
  } finally {
    applying.value = false;
  }
}
</script>
