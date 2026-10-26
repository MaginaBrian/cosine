import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./auth";

export default function RequireAuth({ children, admin = false }) {
  const { status, isAuthenticated, isAdmin } = useAuth();
  const location = useLocation();

  if (status === "loading") {
    return (
      <div className="account">
        <p className="account__status">Checking your account…</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    const next = `${location.pathname}${location.search}`;
    return <Navigate to={`/account?next=${encodeURIComponent(next)}`} replace />;
  }

  if (admin && !isAdmin) {
    return <Navigate to="/account?denied=studio" replace />;
  }

  return children;
}
