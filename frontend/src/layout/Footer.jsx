import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/features/account/auth";

export default function Footer() {
  const { status, isAdmin } = useAuth();
  const showStudio = status === "ready" && isAdmin;
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const join = (event) => {
    event.preventDefault();
    if (!email.trim()) return;
    setSent(true);
    setEmail("");
  };

  return (
    <footer className="footer">
      <div className="footer__bar">
        <form className="footer__join" onSubmit={join}>
          <span className="footer__join-label">Join the conversation</span>
          {sent ? (
            <p className="footer__join-done">You’re on the list.</p>
          ) : (
            <label className="footer__join-field">
              <span className="sr-only">Email address</span>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Email address"
                autoComplete="email"
                required
              />
              <button type="submit" aria-label="Subscribe">
                →
              </button>
            </label>
          )}
        </form>

        <nav className="footer__links" aria-label="Site">
          <Link to="/contact">Contact</Link>
          <Link to="/faq">Client services</Link>
          <Link to="/privacy">Legal notices</Link>
          <a href="https://instagram.com" target="_blank" rel="noreferrer">
            Social
          </a>
          {showStudio && <Link to="/admin">Studio</Link>}
        </nav>
      </div>
    </footer>
  );
}
