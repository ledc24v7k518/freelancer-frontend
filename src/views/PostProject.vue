<template>
  <div class="row justify-content-center">
    <div class="col-md-7">
      <h3 class="mb-3">{{ isEdit ? "Sửa dự án" : "Đăng dự án mới" }}</h3>
      <div v-if="errorMsg" class="alert alert-danger">{{ errorMsg }}</div>
      <div v-if="loading">Đang tải...</div>
      <form v-else @submit.prevent="handleSubmit">
        <div class="mb-3">
          <label class="form-label">Tiêu đề</label>
          <input v-model="form.title" type="text" class="form-control" required />
        </div>
        <div class="mb-3">
          <label class="form-label">Danh mục</label>
          <select v-model="form.categoryId" class="form-select" required>
            <option value="" disabled>-- Chọn danh mục --</option>
            <option v-for="c in categories" :key="c._id" :value="c._id">{{ c.name }}</option>
          </select>
        </div>
        <div class="mb-3">
          <label class="form-label">Mô tả</label>
          <textarea v-model="form.description" class="form-control" rows="5" required></textarea>
        </div>
        <button type="submit" class="btn btn-primary" :disabled="saving">
          {{ saving ? "Đang lưu..." : isEdit ? "Cập nhật" : "Đăng dự án" }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { getProjectById, createProject, updateProject } from "../api/projectService";
import { getCategories } from "../api/adminService";

const props = defineProps({ id: { type: String, default: null } });
const router = useRouter();
const isEdit = computed(() => !!props.id);

const categories = ref([]);
const loading = ref(true);
const saving = ref(false);
const errorMsg = ref("");
const form = reactive({ title: "", categoryId: "", description: "" });

onMounted(async () => {
  const { data } = await getCategories();
  categories.value = data.categories;

  if (isEdit.value) {
    const res = await getProjectById(props.id);
    form.title = res.data.project.title;
    form.description = res.data.project.description;
    form.categoryId = res.data.project.categoryId?._id || res.data.project.categoryId;
  }
  loading.value = false;
});

async function handleSubmit() {
  saving.value = true;
  errorMsg.value = "";
  try {
    if (isEdit.value) {
      await updateProject(props.id, form);
    } else {
      await createProject(form);
    }
    router.push("/my-projects");
  } catch (err) {
    errorMsg.value = err.response?.data?.message || "Có lỗi xảy ra";
  } finally {
    saving.value = false;
  }
}
</script>
