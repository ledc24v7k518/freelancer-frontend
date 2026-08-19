<template>
  <div>
    <h3 class="mb-3">Lịch sử ứng tuyển</h3>
    <div v-if="loading">Đang tải...</div>
    <div v-else-if="applications.length === 0" class="text-muted">Bạn chưa ứng tuyển dự án nào.</div>
    <div v-else class="list-group">
      <div v-for="app in applications" :key="app._id" class="list-group-item">
        <div class="d-flex justify-content-between align-items-center">
          <div>
            <strong>{{ app.projectId?.title }}</strong>
            <div class="text-muted small">Công ty: {{ app.projectId?.employerId?.name }}</div>
          </div>
          <span class="badge" :class="statusClass(app.status)">{{ statusLabel(app.status) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getMyApplications } from "../api/applicationService";

const applications = ref([]);
const loading = ref(true);

function statusLabel(status) {
  return { pending: "Đang chờ", accepted: "Đã chấp nhận", rejected: "Đã từ chối" }[status];
}
function statusClass(status) {
  return { pending: "bg-warning text-dark", accepted: "bg-success", rejected: "bg-danger" }[status];
}

onMounted(async () => {
  const { data } = await getMyApplications();
  applications.value = data.applications;
  loading.value = false;
});
</script>
