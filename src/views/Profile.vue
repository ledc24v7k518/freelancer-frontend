<template>
  <div class="row justify-content-center">
    <div class="col-md-7">
      <h3 class="mb-3">Hồ sơ cá nhân</h3>
      <div v-if="successMsg" class="alert alert-success">{{ successMsg }}</div>
      <div v-if="loading">Đang tải...</div>
      <form v-else @submit.prevent="handleSave">
        <div class="mb-3">
          <label class="form-label">Giới thiệu bản thân</label>
          <textarea v-model="form.bio" class="form-control" rows="4"></textarea>
        </div>
        <div class="mb-3">
          <label class="form-label">Kỹ năng (cách nhau bởi dấu phẩy)</label>
          <input v-model="skillsInput" type="text" class="form-control" placeholder="Vue.js, Node.js, MongoDB" />
        </div>
        <div class="mb-3">
          <label class="form-label">Liên kết Portfolio</label>
          <input v-model="form.portfolioUrl" type="url" class="form-control" placeholder="https://github.com/..." />
        </div>
        <button type="submit" class="btn btn-primary" :disabled="saving">
          {{ saving ? "Đang lưu..." : "Lưu hồ sơ" }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from "vue";
import { getMyProfile, updateMyProfile } from "../api/profileService";

const loading = ref(true);
const saving = ref(false);
const successMsg = ref("");
const skillsInput = ref("");

const form = reactive({ bio: "", portfolioUrl: "" });

onMounted(async () => {
  try {
    const { data } = await getMyProfile();
    form.bio = data.profile.bio || "";
    form.portfolioUrl = data.profile.portfolioUrl || "";
    skillsInput.value = (data.profile.skills || []).join(", ");
  } finally {
    loading.value = false;
  }
});

async function handleSave() {
  saving.value = true;
  successMsg.value = "";
  try {
    const skills = skillsInput.value.split(",").map((s) => s.trim()).filter(Boolean);
    await updateMyProfile({ ...form, skills });
    successMsg.value = "Cập nhật hồ sơ thành công!";
  } finally {
    saving.value = false;
  }
}
</script>
