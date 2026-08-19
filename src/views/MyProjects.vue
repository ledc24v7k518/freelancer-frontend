<template>
  <div>
    <h3 class="mb-3">Dự án của tôi</h3>
    <div v-if="loading">Đang tải...</div>
    <div v-else-if="projects.length === 0" class="text-muted">Bạn chưa đăng dự án nào.</div>
    <table v-else class="table align-middle">
      <thead>
        <tr>
          <th>Tiêu đề</th>
          <th>Danh mục</th>
          <th>Trạng thái</th>
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="p in projects" :key="p._id">
          <td>{{ p.title }}</td>
          <td>{{ p.categoryId?.name }}</td>
          <td>
            <span class="badge" :class="p.status === 'open' ? 'bg-success' : 'bg-secondary'">
              {{ p.status === "open" ? "Đang mở" : "Đã đóng" }}
            </span>
          </td>
          <td class="d-flex gap-2">
            <RouterLink :to="`/my-projects/${p._id}/applicants`" class="btn btn-sm btn-outline-primary">Ứng viên</RouterLink>
            <RouterLink :to="`/my-projects/${p._id}/edit`" class="btn btn-sm btn-outline-secondary">Sửa</RouterLink>
            <button v-if="p.status === 'open'" class="btn btn-sm btn-outline-danger" @click="handleClose(p._id)">Đóng</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getProjects, closeProject } from "../api/projectService";
import auth from "../store/auth";

const projects = ref([]);
const loading = ref(true);

async function fetchMyProjects() {
  loading.value = true;
  try {
    // Backend chưa có filter theo employerId riêng, nên lọc lại ở client theo id đang đăng nhập
    const { data } = await getProjects({ status: "open" });
    const { data: dataClosed } = await getProjects({ status: "closed" });
    const all = [...data.projects, ...dataClosed.projects];
    projects.value = all.filter((p) => p.employerId?._id === auth.state.user.id);
  } finally {
    loading.value = false;
  }
}

async function handleClose(id) {
  if (!confirm("Bạn chắc chắn muốn đóng dự án này?")) return;
  await closeProject(id);
  await fetchMyProjects();
}

onMounted(fetchMyProjects);
</script>
