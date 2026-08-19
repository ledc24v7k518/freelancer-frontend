<template>
  <div>
    <h3 class="mb-3">Danh sách công việc</h3>
    <div class="row mb-3">
      <div class="col-md-4">
        <select v-model="selectedCategory" class="form-select" @change="fetchProjects">
          <option value="">Tất cả danh mục</option>
          <option v-for="c in categories" :key="c._id" :value="c._id">{{ c.name }}</option>
        </select>
      </div>
    </div>

    <div v-if="loading">Đang tải...</div>
    <div v-else-if="projects.length === 0" class="text-muted">Chưa có dự án nào phù hợp.</div>
    <div v-else class="list-group">
      <RouterLink
        v-for="project in projects"
        :key="project._id"
        :to="`/projects/${project._id}`"
        class="list-group-item list-group-item-action"
      >
        <div class="d-flex justify-content-between">
          <h5 class="mb-1">{{ project.title }}</h5>
          <small class="text-muted">{{ project.categoryId?.name }}</small>
        </div>
        <p class="mb-1 text-truncate">{{ project.description }}</p>
        <small class="text-muted">Đăng bởi: {{ project.employerId?.name }}</small>
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getProjects } from "../api/projectService";
import { getCategories } from "../api/adminService";

const projects = ref([]);
const categories = ref([]);
const selectedCategory = ref("");
const loading = ref(true);

async function fetchProjects() {
  loading.value = true;
  try {
    const params = {};
    if (selectedCategory.value) params.categoryId = selectedCategory.value;
    const { data } = await getProjects(params);
    projects.value = data.projects;
  } finally {
    loading.value = false;
  }
}

onMounted(async () => {
  const { data } = await getCategories();
  categories.value = data.categories;
  await fetchProjects();
});
</script>
