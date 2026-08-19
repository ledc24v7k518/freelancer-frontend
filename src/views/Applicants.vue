<template>
  <div>
    <h3 class="mb-3">Danh sách ứng viên</h3>
    <div v-if="loading">Đang tải...</div>
    <div v-else-if="applications.length === 0" class="text-muted">Chưa có Freelancer nào ứng tuyển.</div>
    <div v-else class="list-group">
      <div v-for="app in applications" :key="app._id" class="list-group-item">
        <div class="d-flex justify-content-between align-items-center">
          <div>
            <strong>{{ app.freelancerId?.name }}</strong>
            <div class="text-muted small">{{ app.freelancerId?.email }}</div>
            <span class="badge mt-1" :class="statusClass(app.status)">{{ statusLabel(app.status) }}</span>
          </div>
          <div v-if="app.status === 'pending'" class="d-flex gap-2">
            <button class="btn btn-sm btn-success" @click="handleAccept(app._id)">Chấp nhận</button>
            <button class="btn btn-sm btn-outline-danger" @click="handleReject(app._id)">Từ chối</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getProjectApplications } from "../api/projectService";
import { acceptApplication, rejectApplication } from "../api/applicationService";

const props = defineProps({ id: String });
const applications = ref([]);
const loading = ref(true);

async function fetchApplications() {
  loading.value = true;
  try {
    const { data } = await getProjectApplications(props.id);
    applications.value = data.applications;
  } finally {
    loading.value = false;
  }
}

function statusLabel(status) {
  return { pending: "Đang chờ", accepted: "Đã chấp nhận", rejected: "Đã từ chối" }[status];
}
function statusClass(status) {
  return { pending: "bg-warning text-dark", accepted: "bg-success", rejected: "bg-danger" }[status];
}

async function handleAccept(id) {
  await acceptApplication(id);
  await fetchApplications();
}
async function handleReject(id) {
  await rejectApplication(id);
  await fetchApplications();
}

onMounted(fetchApplications);
</script>
