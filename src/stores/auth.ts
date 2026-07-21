import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { api } from "@/services/api";

const TOKEN_KEY = "phb_auth_token";
const USER_KEY = "phb_auth_user";

interface AuthUser {
  id: string;
  name: string;
  email: string;
  accountType: string;
}

export const useAuthStore = defineStore("auth", () => {
  const token = ref<string | null>(localStorage.getItem(TOKEN_KEY));
  const user = ref<AuthUser | null>(null);

  // Hydrate user from localStorage
  const stored = localStorage.getItem(USER_KEY);
  if (stored) {
    try {
      user.value = JSON.parse(stored);
    } catch {
      user.value = null;
    }
  }

  const isAuthenticated = computed(() => !!token.value && !!user.value);

  async function login(email: string, password: string) {
    const res = await api.auth.login(email, password);
    token.value = res.token;
    user.value = res.user;
    localStorage.setItem(TOKEN_KEY, res.token);
    localStorage.setItem(USER_KEY, JSON.stringify(res.user));
  }

  async function register(name: string, email: string, password: string) {
    const res = await api.auth.register(name, email, password);
    token.value = res.token;
    user.value = res.user;
    localStorage.setItem(TOKEN_KEY, res.token);
    localStorage.setItem(USER_KEY, JSON.stringify(res.user));
  }

  function logout() {
    token.value = null;
    user.value = null;
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }

  return { token, user, isAuthenticated, login, register, logout };
});
