import { useState } from "react";

const REASONS = [
  "General inquiry",
  "Order status",
  "Returns & exchanges",
  "Damages",
  "My account",
  "Cancellation request",
  "Other",
];

const empty = { name: "", reason: REASONS[0], email: "", message: "" };

export default function ContactPage() {
  const [form, setForm] = useState(empty);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const update = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
    setError("");
  };

  const submit = (event) => {
    event.preventDefault();
    if (!form.email.trim() || !form.message.trim()) {
      setError("Email and message are required.");
      return;
    }
    setSent(true);
  };

  return (
    <section className="contact">
      <h1>Contact</h1>

      <div className="contact__meta">
        <div>
          <h2>General inquiries</h2>
          <a href="mailto:studio@cosinemade.com">studio@cosinemade.com</a>
        </div>
        <div>
          <h2>Returns</h2>
          <a href="mailto:studio@cosinemade.com?subject=Return%20request">
            studio@cosinemade.com
          </a>
        </div>
      </div>

      <div className="contact__form-wrap">
        <h2>Send us a message</h2>
        <p className="contact__note">
          To ensure you receive emails from Cosine Made, please check your spam folder for messages
          from the studio. Make sure your email settings are up to date by adding{" "}
          <strong>studio@cosinemade.com</strong> to your safe senders list.
        </p>

        {sent ? (
          <p className="contact__thanks">
            Message sent. We’ll get back within two business days.
          </p>
        ) : (
          <form className="contact__form" onSubmit={submit}>
            <label>
              <span>Name</span>
              <input
                name="name"
                value={form.name}
                onChange={update}
                placeholder="Name"
                autoComplete="name"
              />
            </label>

            <label>
              <span>Reason</span>
              <select name="reason" value={form.reason} onChange={update}>
                {REASONS.map((reason) => (
                  <option key={reason} value={reason}>
                    {reason}
                  </option>
                ))}
              </select>
            </label>

            <label>
              <span>Email *</span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={update}
                placeholder="Email"
                autoComplete="email"
                required
              />
            </label>

            <label>
              <span>Message</span>
              <textarea
                name="message"
                value={form.message}
                onChange={update}
                rows={8}
                required
              />
            </label>

            {error && <p className="contact__error">{error}</p>}
            <button type="submit">Send</button>
          </form>
        )}
      </div>
    </section>
  );
}
