// Empty in local dev (Vite proxies /api). Set to the API origin on Render.
const API_BASE = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");

export function apiFetch(path, options = {}) {
  return fetch(`${API_BASE}${path}`, {
    credentials: "include",
    ...options,
  });
}
