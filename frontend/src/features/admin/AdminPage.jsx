import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiFetch } from "@/lib/http";

const KEY_STORAGE = "cosine-admin-key";
const STAGES = ["Processing", "Production", "Stock", "Dispatch"];

function stageClass(stage) {
  return `admin-order admin-order--${String(stage || "Processing").toLowerCase()}`;
}

function formatWhen(iso) {
  if (!iso) return "—";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleString("en-KE", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function AdminPage() {
  const [key, setKey] = useState(() => sessionStorage.getItem(KEY_STORAGE) || "");
  const [draftKey, setDraftKey] = useState("");
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState(key ? "loading" : "locked");
  const [error, setError] = useState("");

  const load = useCallback(async (adminKey) => {
    setStatus("loading");
    setError("");
    try {
      const response = await apiFetch("/api/orders", {
        headers: { "X-Admin-Key": adminKey },
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(data.error || "Could not load orders.");
      }
      setOrders(data.orders || []);
      setStatus("ready");
    } catch (err) {
      setOrders([]);
      setStatus("error");
      setError(err.message);
    }
  }, []);

  useEffect(() => {
    if (key) load(key);
  }, [key, load]);

  const signIn = async (event) => {
    event.preventDefault();
    setError("");
    const response = await apiFetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key: draftKey }),
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      setError(data.error || "Wrong studio key.");
      return;
    }
    sessionStorage.setItem(KEY_STORAGE, draftKey);
    setKey(draftKey);
    setDraftKey("");
  };

  const signOut = () => {
    sessionStorage.removeItem(KEY_STORAGE);
    setKey("");
    setOrders([]);
    setStatus("locked");
  };

  const setStage = async (orderId, stage) => {
    const previous = orders;
    setOrders((current) =>
      current.map((order) => (order.id === orderId ? { ...order, stage } : order))
    );
    const response = await apiFetch(`/api/orders/${orderId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "X-Admin-Key": key,
      },
      body: JSON.stringify({ stage }),
    });
    if (!response.ok) {
      setOrders(previous);
      const data = await response.json().catch(() => ({}));
      setError(data.error || "Could not update the stage.");
    }
  };

  const remove = async (orderId) => {
    if (!window.confirm("Delete this order from the studio list?")) return;
    const response = await apiFetch(`/api/orders/${orderId}`, {
      method: "DELETE",
      headers: { "X-Admin-Key": key },
    });
    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      setError(data.error || "Could not delete the order.");
      return;
    }
    setOrders((current) => current.filter((order) => order.id !== orderId));
  };

  if (status === "locked") {
    return (
      <div className="admin">
        <div className="admin__intro">
          <span className="eyebrow">Studio</span>
          <h1>All orders.</h1>
          <p>Sign in with the studio key to move pieces through Processing, Production, Stock, and Dispatch.</p>
        </div>
        <form className="admin__login" onSubmit={signIn}>
          <label>
            <span>Studio key</span>
            <input
              type="password"
              value={draftKey}
              onChange={(event) => setDraftKey(event.target.value)}
              autoComplete="current-password"
              required
            />
          </label>
          {error && <p className="admin__error">{error}</p>}
          <button type="submit">Sign in</button>
        </form>
      </div>
    );
  }

  return (
    <div className="admin">
      <div className="admin__intro">
        <div className="admin__intro-row">
          <div>
            <span className="eyebrow">Studio</span>
            <h1>All orders.</h1>
            <p>
              Processing stays black and white. Production turns the row blue. Stock turns it orange.
              Dispatch turns it green.
            </p>
          </div>
          <div className="admin__actions">
            <button type="button" onClick={() => load(key)}>
              Refresh
            </button>
            <button type="button" onClick={signOut}>
              Sign out
            </button>
          </div>
        </div>
      </div>

      {error && <p className="admin__error">{error}</p>}

      {status === "loading" && <p className="admin__empty">Loading orders…</p>}

      {status === "ready" && orders.length === 0 && (
        <p className="admin__empty">
          No orders yet. Place one from the <Link to="/collections">shop</Link>, then refresh.
        </p>
      )}

      {status === "ready" && orders.length > 0 && (
        <>
          <p className="admin__count">{orders.length} orders</p>
          <div className="admin__list">
            {orders.map((order) => {
              const who = order.delivery || {};
              return (
                <article key={order.id} className={stageClass(order.stage)}>
                  <header className="admin-order__head">
                    <div>
                      <p className="admin-order__number">{order.number}</p>
                      <p className="admin-order__when">{formatWhen(order.createdAt)}</p>
                    </div>
                    <label className="admin-order__stage">
                      <span>Stage</span>
                      <select
                        value={order.stage}
                        onChange={(event) => setStage(order.id, event.target.value)}
                      >
                        {STAGES.map((stage) => (
                          <option key={stage} value={stage}>
                            {stage}
                          </option>
                        ))}
                      </select>
                    </label>
                  </header>

                  <div className="admin-order__who">
                    <p>
                      <strong>
                        {who.name} {who.surname}
                      </strong>
                      <br />
                      {who.email}
                      <br />
                      {who.prefix} {who.telephone}
                    </p>
                    <p>
                      {who.house}, {who.address}
                      <br />
                      {who.town} {who.postCode}
                      <br />
                      {who.region}
                    </p>
                    <p className="admin-order__total">{order.subtotalLabel}</p>
                  </div>

                  <div className="admin-order__table-wrap">
                    <table>
                      <thead>
                        <tr>
                          <th>Product</th>
                          <th>Color</th>
                          <th>Size</th>
                          <th>Qty</th>
                          <th>Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {order.lines.map((line) => (
                          <tr key={line.id}>
                            <td>{line.title}</td>
                            <td>{line.color}</td>
                            <td>{line.size}</td>
                            <td>{line.qty}</td>
                            <td>{line.priceExact}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <footer className="admin-order__foot">
                    <button type="button" onClick={() => remove(order.id)}>
                      Delete order
                    </button>
                  </footer>
                </article>
              );
            })}
          </div>
        </>
      )}

    </div>
  );
}
