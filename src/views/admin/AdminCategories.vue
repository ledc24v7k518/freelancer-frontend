<template>
  <div class="row">
    <div class="col-md-5">
      <h3 class="mb-3">Thêm danh mục</h3>
      <form @submit.prevent="handleCreate">
        <div class="mb-3">
          <label class="form-label">Tên danh mục</label>
          <input v-model="newCategory.name" type="text" class="form-control" required />
        </div>
        <div class="mb-3">
          <label class="form-label">Mô tả</label>
          <input v-model="newCategory.description" type="text" class="form-control" />
        </div>
        <button type="submit" class="btn btn-primary" :disabled="saving">Thêm</button>
      </form>
    </div>

    <div class="col-md-7">
      <h3 class="mb-3">Danh sách danh mục</h3>
      <div v-if="loading">Đang tải...</div>
      <ul v-else class="list-group">
        <li v-for="c in categories" :key="c._id" class="list-group-item d-flex justify-content-between align-items-center">
          <span>{{ c.name }}</span>
          <button class="btn btn-sm btn-outline-danger" @click="handleDelete(c._id)">Xóa</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { getCategories, createCategory, deleteCategory } from "../../api/adminService";

const categories = ref([]);
const loading = ref(true);
const saving = ref(false);
const newCategory = reactive({ name: "", description: "" });

async function fetchCategories() { // Lấy danh sách danh mục từ API
  loading.value = true;
  try {
    const { data } = await getCategories();
    categories.value = data.categories;
  } finally {
    loading.value = false;
  }
}

async function handleCreate() {
  saving.value = true;
  try {
    await createCategory(newCategory);
    newCategory.name = "";
    newCategory.description = "";
    await fetchCategories();
  } finally {
    saving.value = false;
  }
}

async function handleDelete(id) {
  if (!confirm("Xóa danh mục này?")) return;
  await deleteCategory(id);
  await fetchCategories();
}

onMounted(fetchCategories);
</script>
