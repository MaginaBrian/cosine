import { useEffect, useState } from "react";

let cache = null;
let pending = null;

export function loadCatalog() {
  if (cache) return Promise.resolve(cache);
  if (!pending) {
    pending = fetch("/api/products")
      .then((response) => {
        if (!response.ok) throw new Error("Catalog request failed");
        return response.json();
      })
      .then((products) => {
        cache = products;
        return products;
      })
      .catch((error) => {
        pending = null;
        throw error;
      });
  }
  return pending;
}

export function useCatalog() {
  const [state, setState] = useState({
    products: cache || [],
    status: cache ? "ready" : "loading",
  });

  useEffect(() => {
    let cancelled = false;
    loadCatalog()
      .then((products) => {
        if (!cancelled) setState({ products, status: "ready" });
      })
      .catch(() => {
        if (!cancelled) setState({ products: [], status: "error" });
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}

export function useProduct(id) {
  const [state, setState] = useState({ product: null, status: "loading" });

  useEffect(() => {
    let cancelled = false;
    setState({ product: null, status: "loading" });
    fetch(`/api/products/${id}`)
      .then(async (response) => {
        if (response.status === 404) throw new Error("missing");
        if (!response.ok) throw new Error("error");
        return response.json();
      })
      .then((product) => {
        if (!cancelled) setState({ product, status: "ready" });
      })
      .catch((error) => {
        if (!cancelled) {
          setState({
            product: null,
            status: error.message === "missing" ? "missing" : "error",
          });
        }
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  return state;
}
