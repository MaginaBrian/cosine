import Slider from "./Slider";

const TESTIMONIALS = [
  {
    id: 1,
    name: "Amara K.",
    headline: "The fit I didn't know I was missing.",
    quote:
      "Everything just sits right — understated, considered, and exactly what I wanted from a small studio label.",
    rating: 5,
    verified: true,
  },
  {
    id: 2,
    name: "Daniel O.",
    headline: "Still looks brand new.",
    quote: "Bought the overshirt on a whim. Three washes later it still looks brand new.",
    rating: 5,
    verified: true,
  },
  {
    id: 3,
    name: "Wanjiru M.",
    headline: "Understated in the best way.",
    quote: "I get asked about it more than anything flashy I own. Quiet pieces that still get noticed.",
    rating: 5,
    verified: true,
  },
  {
    id: 4,
    name: "Kenji T.",
    headline: "Arrived exactly as pictured.",
    quote: "Ordered internationally and it arrived exactly as pictured. Rare these days.",
    rating: 4,
    verified: true,
  },
  {
    id: 5,
    name: "Sara A.",
    headline: "The one piece I reach for.",
    quote: "The trench is the one piece I reach for regardless of season.",
    rating: 5,
    verified: true,
  },
  {
    id: 6,
    name: "Marcus B.",
    headline: "Exactly what the brand promises.",
    quote: "Quiet, considered, well made. Exactly what the brand promises.",
    rating: 5,
    verified: true,
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

function Stars({ rating }) {
  return (
    <div className="testimonial-card__stars" aria-label={`${rating} out of 5 stars`}>
      <span aria-hidden="true">{"★".repeat(rating)}</span>
      {rating < 5 && (
        <span className="testimonial-card__stars-empty" aria-hidden="true">
          {"★".repeat(5 - rating)}
        </span>
      )}
    </div>
  );
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
            <div className="testimonial-card__top">
              <h3 className="testimonial-card__headline">{t.headline}</h3>
              <Stars rating={t.rating} />
            </div>

            <blockquote className="testimonial-card__quote">{t.quote}</blockquote>

            <hr className="testimonial-card__rule" />

            <div className="testimonial-card__foot">
              <div className="testimonial-card__profile">
                <span className="testimonial-card__avatar">{initials(t.name)}</span>
                <span className="testimonial-card__name">{t.name}</span>
              </div>
              {t.verified && (
                <span className="testimonial-card__verified">
                  <span className="testimonial-card__verified-icon" aria-hidden="true">
                    ✓
                  </span>
                  Verified
                </span>
              )}
            </div>
          </figure>
        ))}
      </Slider>
    </section>
  );
}
