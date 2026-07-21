const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8100/api";

interface RequestOptions {
  method?: string;
  body?: unknown;
  token?: string;
}

async function request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const { method = "GET", body, token } = options;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || `HTTP ${res.status}`);
  }

  return data as T;
}

export interface Article {
  _id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  featuredImage: string;
  sourceUrl: string;
  source: string;
}

export interface ArticlesResponse {
  data: Article[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    accountType: string;
  };
}

export const api = {
  articles: {
    list: (params: { page?: number; limit?: number; search?: string; source?: string } = {}) => {
      const qs = new URLSearchParams();
      if (params.page) qs.set("page", String(params.page));
      if (params.limit) qs.set("limit", String(params.limit));
      if (params.search) qs.set("search", params.search);
      if (params.source) qs.set("source", params.source);
      return request<ArticlesResponse>(`/articles?${qs.toString()}`);
    },
    get: (slug: string) => request<{ data: Article }>(`/articles/${slug}`),
  },
  auth: {
    login: (email: string, password: string) =>
      request<AuthResponse>("/auth/login", { method: "POST", body: { email, password } }),
    register: (name: string, email: string, password: string) =>
      request<AuthResponse>("/auth/register", { method: "POST", body: { name, email, password } }),
    me: (token: string) => request<{ data: { id: string; name: string; email: string } }>("/auth/me", { token }),
  },
};
