import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "./auth";

export default function AccountPage() {
  const { user, status, isAuthenticated, isAdmin, login, register, logout } = useAuth();
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const next = params.get("next") || "/";
  const studioNext = next === "/admin" || next.startsWith("/admin?");
  const deniedStudio = params.get("denied") === "studio";

  const update = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
    setError("");
  };

  const passwordProblem = (password, confirmPassword) => {
    if (password.length < 8) return "Use at least 8 characters.";
    if (!/[^A-Za-z0-9]/.test(password)) return "Include at least one special character.";
    if (password !== confirmPassword) return "Passwords do not match.";
    return null;
  };

  const submit = async (event) => {
    event.preventDefault();
    setPending(true);
    setError("");
    try {
      let signedIn;
      if (mode === "login") {
        signedIn = await login(form.email, form.password);
      } else {
        const problem = passwordProblem(form.password, form.confirmPassword);
        if (problem) throw new Error(problem);
        signedIn = await register({
          name: form.name,
          email: form.email,
          password: form.password,
          confirmPassword: form.confirmPassword,
        });
      }
      const destination = next.startsWith("/") ? next : "/";
      // Studio staff landing on a generic next path still get a clear way into orders.
      if (signedIn?.role === "admin" && (destination === "/" || destination === "/account")) {
        navigate("/admin", { replace: true });
      } else {
        navigate(destination, { replace: true });
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setPending(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="account">
        <p className="account__status">Loading account…</p>
      </div>
    );
  }

  if (isAuthenticated) {
    return (
      <div className="account">
        <div className="account__intro">
          <span className="eyebrow">Account</span>
          <h1>Signed in.</h1>
          <p>
            {user.name}
            <br />
            {user.email}
          </p>
        </div>
        <div className="account__panel">
          {status === "ready" && isAdmin && (
            <Link to="/admin" className="account__cta">
              Open studio orders
            </Link>
          )}
          {status === "ready" && !isAdmin && deniedStudio && (
            <p className="account__error">Studio orders are limited to admin accounts.</p>
          )}
          {next === "/checkout" && (
            <Link to="/checkout" className="account__cta">
              Continue to checkout
            </Link>
          )}
          <button type="button" className="account__ghost" onClick={logout}>
            Sign out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="account">
      <div className="account__intro">
        <span className="eyebrow">Account</span>
        <h1>{mode === "login" ? "Sign in." : "Create an account."}</h1>
        <p>
          {deniedStudio
            ? "Studio orders are for admin accounts only. Sign in with the studio email to continue."
            : studioNext
              ? "Sign in with the studio account to open orders. Customers should use a regular account."
              : next === "/checkout"
                ? "Create an account or sign in before checkout. You can browse and fill the bag freely."
                : "Sign in to manage checkout, or create an account if you are new. Studio staff can open orders after signing in."}
        </p>
        {deniedStudio && (
          <p className="account__error">That page is restricted to studio admins.</p>
        )}
      </div>

      <div className="account__tabs">
        <button type="button" className={mode === "login" ? "is-active" : ""} onClick={() => setMode("login")}>
          Sign in
        </button>
        <button type="button" className={mode === "register" ? "is-active" : ""} onClick={() => setMode("register")}>
          Create account
        </button>
      </div>

      <form className="account__form" onSubmit={submit}>
        {mode === "register" && (
          <label>
            <span>Name</span>
            <input name="name" value={form.name} onChange={update} autoComplete="name" required />
          </label>
        )}
        <label>
          <span>Email</span>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={update}
            autoComplete="email"
            required
          />
        </label>
        <label>
          <span>Password</span>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={update}
            autoComplete={mode === "login" ? "current-password" : "new-password"}
            minLength={mode === "register" ? 8 : undefined}
            required
          />
        </label>
        {mode === "register" && (
          <>
            <label>
              <span>Confirm password</span>
              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={update}
                autoComplete="new-password"
                minLength={8}
                required
              />
            </label>
            <p className="account__hint">At least 8 characters, including a special character such as ! @ # $ %.</p>
          </>
        )}
        {error && <p className="account__error">{error}</p>}
        <button type="submit" disabled={pending}>
          {pending ? "Please wait…" : mode === "login" ? "Sign in" : "Create account"}
        </button>
      </form>
    </div>
  );
}
