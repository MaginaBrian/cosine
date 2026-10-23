import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { apiFetch } from "@/lib/http";

const EMPTY = { lines: [], count: 0, subtotal: 0, subtotalLabel: "KSh0.00" };

const CartContext = createContext(null);

async function readJson(response) {
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error || "Something went wrong.");
  }
  return data;
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(EMPTY);
  const [status, setStatus] = useState("loading");

  const refresh = useCallback(() => {
    apiFetch("/api/cart")
      .then((response) => (response.ok ? response.json() : EMPTY))
      .then((data) => {
        setCart(data);
        setStatus("ready");
      })
      .catch(() => setStatus("error"));
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const add = useCallback(async (payload) => {
    const response = await apiFetch("/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await readJson(response);
    setCart(data);
    return data;
  }, []);

  const remove = useCallback(async (lineId) => {
    const response = await apiFetch(`/api/cart/${lineId}`, { method: "DELETE" });
    const data = await readJson(response);
    setCart(data);
    return data;
  }, []);

  return (
    <CartContext.Provider value={{ cart, status, add, remove, refresh }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const value = useContext(CartContext);
  if (!value) throw new Error("useCart must be used within CartProvider");
  return value;
}
