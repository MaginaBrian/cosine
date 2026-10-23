import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "@/features/bag/cart";
import { apiFetch } from "@/lib/http";

const REGIONS = [
  { name: "Kenya", prefix: "+254" },
  { name: "Uganda", prefix: "+256" },
  { name: "Tanzania", prefix: "+255" },
  { name: "United Kingdom", prefix: "+44" },
  { name: "United States", prefix: "+1" },
];

const EMPTY = {
  name: "",
  surname: "",
  region: "Kenya",
  postCode: "",
  address: "",
  house: "",
  town: "",
  email: "",
  prefix: "+254",
  telephone: "",
  business: false,
  company: "",
  taxId: "",
  marketing: false,
};

function Field({ name, label, value, onChange, error, as = "input", children, autoComplete }) {
  const control =
    as === "select" ? (
      <select id={name} name={name} value={value} onChange={onChange} autoComplete={autoComplete}>
        {children}
      </select>
    ) : (
      <input
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        aria-invalid={error ? "true" : undefined}
      />
    );

  return (
    <label className={`checkout__field ${error ? "is-invalid" : ""}`} htmlFor={name}>
      <span>{label}</span>
      {control}
      {error && <em>{error}</em>}
    </label>
  );
}

export default function CheckoutPage() {
  const { cart, status } = useCart();
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [pending, setPending] = useState(false);
  const [order, setOrder] = useState(null);
  const [summaryOpen, setSummaryOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;
    apiFetch("/api/checkout")
      .then((response) => (response.ok ? response.json() : null))
      .then((draft) => {
        if (!cancelled && draft?.delivery) setForm({ ...EMPTY, ...draft.delivery });
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  const update = (event) => {
    const { name, value } = event.target;
    setForm((current) => {
      const next = { ...current, [name]: value };
      if (name === "region") {
        next.prefix = REGIONS.find((region) => region.name === value)?.prefix || current.prefix;
      }
      return next;
    });
    setErrors((current) => ({ ...current, [name]: undefined }));
    setFormError("");
  };

  const submit = async (event) => {
    event.preventDefault();
    setPending(true);
    setFormError("");
    try {
      const response = await apiFetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        setErrors(data.fields || {});
        setFormError(data.error || "Check the delivery details.");
        return;
      }
      setErrors({});
      setOrder(data);
    } catch {
      setFormError("The shop API is not responding. Start it with npm run api, then try again.");
    } finally {
      setPending(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="checkout">
        <p className="checkout__status">Loading your bag…</p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="checkout">
        <p className="checkout__status">The shop API is not responding. Start it with npm run api, then refresh.</p>
      </div>
    );
  }

  if (cart.count === 0 && !order) {
    return (
      <div className="checkout">
        <p className="checkout__status">Your bag is empty.</p>
        <Link to="/collections" className="checkout__back">
          Browse the collection
        </Link>
      </div>
    );
  }

  if (order) {
    const { delivery } = order;
    return (
      <div className="checkout">
        <h1 className="checkout__heading">Delivery details saved</h1>
        <div className="checkout__saved">
          <p>
            {delivery.name} {delivery.surname}
            <br />
            {delivery.house}, {delivery.address}
            <br />
            {delivery.town} {delivery.postCode}
            <br />
            {delivery.region}
          </p>
          <p>
            {delivery.email}
            <br />
            {delivery.prefix} {delivery.telephone}
          </p>
          {delivery.business && (
            <p>
              {delivery.company}
              {delivery.taxId ? ` · ${delivery.taxId}` : ""}
            </p>
          )}
          <p>Total {order.subtotalLabel}. Payment is the next step. All sales are final.</p>
          <button type="button" className="checkout__edit" onClick={() => setOrder(null)}>
            Edit details
          </button>
        </div>
      </div>
    );
  }

  return (
    <form className="checkout" onSubmit={submit} noValidate>
      <h1 className="checkout__heading">Please enter the delivery details</h1>

      <div className="checkout__grid">
        <Field name="name" label="Name" value={form.name} onChange={update} error={errors.name} autoComplete="given-name" />
        <Field name="surname" label="Surname" value={form.surname} onChange={update} error={errors.surname} autoComplete="family-name" />

        <Field name="region" label="Region" as="select" value={form.region} onChange={update} error={errors.region} autoComplete="country-name">
          {REGIONS.map((region) => (
            <option key={region.name} value={region.name}>
              {region.name}
            </option>
          ))}
        </Field>
        <span className="checkout__spacer" aria-hidden="true" />

        <Field name="postCode" label="Post code" value={form.postCode} onChange={update} error={errors.postCode} autoComplete="postal-code" />
        <span className="checkout__spacer" aria-hidden="true" />

        <Field name="address" label="Address" value={form.address} onChange={update} error={errors.address} autoComplete="address-line1" />
        <Field name="house" label="House number and/or name" value={form.house} onChange={update} error={errors.house} autoComplete="address-line2" />

        <Field name="town" label="Town" value={form.town} onChange={update} error={errors.town} autoComplete="address-level2" />
        <span className="checkout__spacer" aria-hidden="true" />

        <Field name="email" label="E-mail" value={form.email} onChange={update} error={errors.email} autoComplete="email" />
        <div className="checkout__phone">
          <Field name="prefix" label="Prefix" as="select" value={form.prefix} onChange={update} error={errors.prefix} autoComplete="tel-country-code">
            {REGIONS.map((region) => (
              <option key={region.prefix} value={region.prefix}>
                {region.prefix}
              </option>
            ))}
          </Field>
          <Field name="telephone" label="Telephone" value={form.telephone} onChange={update} error={errors.telephone} autoComplete="tel-national" />
        </div>
      </div>

      <div className="checkout__business-row">
        <span>Business</span>
        <button
          type="button"
          className={`checkout__switch ${form.business ? "is-on" : ""}`}
          role="switch"
          aria-checked={form.business}
          aria-label="Business"
          onClick={() => setForm((current) => ({ ...current, business: !current.business }))}
        >
          <span />
        </button>
      </div>

      {form.business && (
        <div className="checkout__grid checkout__business">
          <Field name="company" label="Company" value={form.company} onChange={update} error={errors.company} autoComplete="organization" />
          <Field name="taxId" label="Tax id" value={form.taxId} onChange={update} error={errors.taxId} />
        </div>
      )}

      <label className="checkout__optin">
        <input
          type="checkbox"
          checked={form.marketing}
          onChange={(event) => setForm((current) => ({ ...current, marketing: event.target.checked }))}
        />
        <span>I want to receive personalised commercial communications from Cosine Made by email.</span>
      </label>

      <p className="checkout__policy">
        I have read and understand the <Link to="/privacy">Privacy and Cookies Policy</Link>.
      </p>

      {formError && <p className="checkout__form-error">{formError}</p>}

      <div className="checkout__bar">
        {summaryOpen && (
          <ul className="checkout__summary">
            {cart.lines.map((line) => (
              <li key={line.id}>
                <span>
                  {line.title}
                  <small>
                    {line.color} / {line.size} · Qty {line.qty}
                  </small>
                </span>
                <span>{line.priceExact}</span>
              </li>
            ))}
          </ul>
        )}
        <div className="checkout__bar-row">
          <button
            type="button"
            className="checkout__total"
            aria-expanded={summaryOpen}
            onClick={() => setSummaryOpen((open) => !open)}
          >
            <span>Total</span>
            <strong>{cart.subtotalLabel}</strong>
            <span className={`checkout__chevron ${summaryOpen ? "is-open" : ""}`} aria-hidden="true" />
          </button>
          <button type="submit" className="checkout__continue" disabled={pending}>
            {pending ? "Saving…" : "Continue"}
          </button>
        </div>
      </div>
    </form>
  );
}
