import { reactive } from "vue";

const state = reactive({
  user: JSON.parse(localStorage.getItem("user") || "null"),
  token: localStorage.getItem("token") || null,
});

function setAuth(user, token) {
  state.user = user;
  state.token = token;
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("token", token);
}

function clearAuth() {
  state.user = null;
  state.token = null;
  localStorage.removeItem("user");
  localStorage.removeItem("token");
}

function isAuthenticated() {
  return !!state.token;
}

function hasRole(...roles) {
  return state.user && roles.includes(state.user.role);
}

export default { state, setAuth, clearAuth, isAuthenticated, hasRole };
