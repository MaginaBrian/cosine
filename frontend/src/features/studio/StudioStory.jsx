/** Shared layout for Purpose / Product / People studio pages. */
export default function StudioStory({ kicker, title, children }) {
  return (
    <section className="studio-story">
      <header className="studio-story__head">
        {kicker && <p className="studio-story__kicker">{kicker}</p>}
        <h1>{title}</h1>
      </header>
      <div className="studio-story__body">{children}</div>
    </section>
  );
}

export function StoryBlock({ title, children }) {
  return (
    <div className="studio-story__block">
      {title && <h2>{title}</h2>}
      {children}
    </div>
  );
}
