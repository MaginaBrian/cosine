import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { apiFetch, getToken, setToken } from "@/lib/http";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState(getToken() ? "loading" : "guest");

  const refresh = useCallback(async () => {
    const token = getToken();
    if (!token) {
      setUser(null);
      setStatus("guest");
      return null;
    }
    setStatus("loading");
    try {
      const response = await apiFetch("/api/auth/me");
      if (!response.ok) throw new Error("session");
      const data = await response.json();
      setUser(data.user);
      setStatus("ready");
      return data.user;
    } catch {
      setToken("");
      setUser(null);
      setStatus("guest");
      return null;
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const login = useCallback(async (email, password) => {
    const response = await apiFetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.error || "Could not sign in.");
    setToken(data.token);
    setUser(data.user);
    setStatus("ready");
    return data.user;
  }, []);

  const register = useCallback(async (payload) => {
    const response = await apiFetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.error || "Could not create the account.");
    setToken(data.token);
    setUser(data.user);
    setStatus("ready");
    return data.user;
  }, []);

  const logout = useCallback(() => {
    setToken("");
    setUser(null);
    setStatus("guest");
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        status,
        isAuthenticated: Boolean(user),
        isAdmin: user?.role === "admin",
        login,
        register,
        logout,
        refresh,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) throw new Error("useAuth must be used within AuthProvider");
  return value;
}
