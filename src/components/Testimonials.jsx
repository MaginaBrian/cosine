import Slider from "./Slider";

const TESTIMONIALS = [
  {
    id: 1,
    name: "Amara K.",
    location: "Nairobi",
    quote: "The fit is exactly what I didn't know I was missing — everything just sits right.",
    rating: 5,
  },
  {
    id: 2,
    name: "Daniel O.",
    location: "London",
    quote: "Bought the overshirt on a whim. Three washes later it still looks brand new.",
    rating: 5,
  },
  {
    id: 3,
    name: "Wanjiru M.",
    location: "Nairobi",
    quote: "Understated in the best way. I get asked about it more than anything flashy I own.",
    rating: 5,
  },
  {
    id: 4,
    name: "Kenji T.",
    location: "Tokyo",
    quote: "Ordered internationally and it arrived exactly as pictured. Rare these days.",
    rating: 4,
  },
  {
    id: 5,
    name: "Sara A.",
    location: "Dubai",
    quote: "The trench is the one piece I reach for regardless of season.",
    rating: 5,
  },
  {
    id: 6,
    name: "Marcus B.",
    location: "New York",
    quote: "Quiet, considered, well made. Exactly what the brand promises.",
    rating: 5,
  },
];

function initials(name) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function Testimonials() {
  return (
    <section className="testimonials">
      <div className="section-head section-head--light section-head--tight">
        <span className="eyebrow">From our customers</span>
      </div>

      <Slider className="testimonials__slider">
        {TESTIMONIALS.map((t) => (
          <figure className="testimonial-card" key={t.id}>
            <div className="testimonial-card__head">
              <span className="testimonial-card__avatar">{initials(t.name)}</span>
              <div>
                <span className="testimonial-card__name">{t.name}</span>
                <span className="testimonial-card__meta">{t.location} · Verified buyer</span>
              </div>
            </div>
            <blockquote className="testimonial-card__quote">"{t.quote}"</blockquote>
            <div className="testimonial-card__stars" aria-label={`${t.rating} out of 5 stars`}>
              {"★".repeat(t.rating)}
              {"☆".repeat(5 - t.rating)}
            </div>
          </figure>
        ))}
      </Slider>
    </section>
  );
}