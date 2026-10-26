import { useState } from "react";
import { Link } from "react-router-dom";

const PERKS = [
  {
    title: "Early Access",
    body: "Sign up to shop every drop first — Collection One, restocks that never come, and studio sales too.",
  },
  {
    title: "Birthday Treats",
    body: "A quiet note in your inbox on the day, with something made for you from the studio.",
  },
  {
    title: "Event Priority",
    body: "From fittings in Nairobi to trunk shows and lookbook nights — Insiders get first dibs.",
  },
  {
    title: "Product Exclusives",
    body: "Small runs cut only for Insiders: colourways and pieces that never hit the open shop.",
  },
];

const empty = { name: "", email: "", birthday: "", phone: "" };

export default function InsidersPage() {
  const [form, setForm] = useState(empty);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const update = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
    setError("");
  };

  const submit = (event) => {
    event.preventDefault();
    if (!form.email.trim()) {
      setError("Enter your email to join.");
      return;
    }
    setDone(true);
  };

  return (
    <section className="insiders">
      <div className="insiders__hero">
        <p className="insiders__eyebrow">Studio list</p>
        <h1>Cosine Insiders</h1>
        <p className="insiders__lede">
          Where everyone wants to be. Sign up for early access to every collection, birthday notes
          from the studio, and pieces cut just for Insiders.
        </p>
      </div>

      <div className="insiders__perks">
        {PERKS.map((perk) => (
          <article key={perk.title} className="insiders__perk">
            <h2>{perk.title}</h2>
            <p>{perk.body}</p>
          </article>
        ))}
      </div>

      <div className="insiders__join">
        <h2>Become an Insider</h2>
        {done ? (
          <p className="insiders__thanks">
            You’re on the list. We’ll write when something new leaves the cutting room.{" "}
            <Link to="/collections">Browse the shop →</Link>
          </p>
        ) : (
          <form className="insiders__form" onSubmit={submit}>
            <label>
              <span>First name</span>
              <input name="name" value={form.name} onChange={update} autoComplete="given-name" />
            </label>
            <label>
              <span>Email address *</span>
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
              <span>Birthday</span>
              <input type="date" name="birthday" value={form.birthday} onChange={update} />
            </label>
            <label>
              <span>Phone</span>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={update}
                autoComplete="tel"
                placeholder="+254…"
              />
            </label>
            {error && <p className="insiders__error">{error}</p>}
            <button type="submit">Become an Insider</button>
            <p className="insiders__fine">
              By joining you agree to hear from Cosine Made about drops and studio news. Read our{" "}
              <Link to="/privacy">privacy note</Link>.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
