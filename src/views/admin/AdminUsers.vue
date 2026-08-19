<template>
  <div>
    <h3 class="mb-3">Quản lý tài khoản</h3>
    <div v-if="loading">Đang tải...</div>
    <table v-else class="table align-middle">
      <thead>
        <tr>
          <th>Tên</th>
          <th>Email</th>
          <th>Vai trò</th>
          <th>Trạng thái</th>
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="u in users" :key="u._id">
          <td>{{ u.name }}</td>
          <td>{{ u.email }}</td>
          <td>{{ u.role === "freelancer" ? "Freelancer" : "Doanh nghiệp" }}</td>
          <td>
            <span class="badge" :class="u.isLocked ? 'bg-danger' : 'bg-success'">
              {{ u.isLocked ? "Đã khóa" : "Hoạt động" }}
            </span>
          </td>
          <td class="d-flex gap-2">
            <button class="btn btn-sm btn-outline-warning" @click="handleToggleLock(u._id)">
              {{ u.isLocked ? "Mở khóa" : "Khóa" }}
            </button>
            <button class="btn btn-sm btn-outline-danger" @click="handleDelete(u._id)">Xóa</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getUsers, toggleLockUser, deleteUser } from "../../api/adminService";

const users = ref([]);
const loading = ref(true);

async function fetchUsers() {
  loading.value = true;
  try {
    const { data } = await getUsers();
    users.value = data.users;
  } finally {
    loading.value = false;
  }
}

async function handleToggleLock(id) {
  await toggleLockUser(id);
  await fetchUsers();
}

async function handleDelete(id) {
  if (!confirm("Bạn chắc chắn muốn xóa tài khoản này?")) return;
  await deleteUser(id);
  await fetchUsers();
}

onMounted(fetchUsers);
</script>
