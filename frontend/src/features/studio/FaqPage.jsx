import { useEffect, useState } from "react";
import { FAQ_SECTIONS } from "@/content/faq";

function itemKey(sectionId, index) {
  return `${sectionId}-${index}`;
}

function FaqAnswer({ item }) {
  return (
    <div className="faq__answer">
      {item.bullets?.length > 0 && (
        <ul className="faq__bullets">
          {item.bullets.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      )}
      {(item.answer || []).map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </div>
  );
}

export default function FaqPage() {
  const [active, setActive] = useState(FAQ_SECTIONS[0].id);
  const [open, setOpen] = useState(() => new Set());

  useEffect(() => {
    const nodes = FAQ_SECTIONS.map((section) =>
      document.getElementById(`faq-${section.id}`),
    ).filter(Boolean);

    if (!nodes.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) {
          setActive(visible.target.id.replace(/^faq-/, ""));
        }
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: [0.1, 0.35, 0.6] },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const toggle = (key) => {
    setOpen((current) => {
      const next = new Set(current);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const expandSection = (section) => {
    const keys = section.items.map((_, index) => itemKey(section.id, index));
    const allOpen = keys.every((key) => open.has(key));
    setOpen((current) => {
      const next = new Set(current);
      keys.forEach((key) => {
        if (allOpen) next.delete(key);
        else next.add(key);
      });
      return next;
    });
  };

  const sectionFullyOpen = (section) =>
    section.items.every((_, index) => open.has(itemKey(section.id, index)));

  return (
    <section className="faq">
      <aside className="faq__nav" aria-label="FAQ sections">
        {FAQ_SECTIONS.map((section) => (
          <a
            key={section.id}
            href={`#faq-${section.id}`}
            className={active === section.id ? "is-active" : undefined}
            onClick={() => setActive(section.id)}
          >
            {section.title}
          </a>
        ))}
      </aside>

      <div className="faq__main">
        {FAQ_SECTIONS.map((section) => (
          <div key={section.id} id={`faq-${section.id}`} className="faq__section">
            <header className="faq__section-head">
              <h2>{section.title}</h2>
              <button
                type="button"
                className="faq__expand"
                onClick={() => expandSection(section)}
              >
                {sectionFullyOpen(section) ? "Collapse all" : "Expand all"}
              </button>
            </header>

            <div className="faq__list">
              {section.items.map((item, index) => {
                const key = itemKey(section.id, index);
                const isOpen = open.has(key);
                return (
                  <div key={key} className={`faq__item${isOpen ? " is-open" : ""}`}>
                    <button
                      type="button"
                      className="faq__question"
                      aria-expanded={isOpen}
                      onClick={() => toggle(key)}
                    >
                      <span>{item.question}</span>
                      <span className="faq__icon" aria-hidden="true">
                        {isOpen ? "−" : "+"}
                      </span>
                    </button>
                    {isOpen && <FaqAnswer item={item} />}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
