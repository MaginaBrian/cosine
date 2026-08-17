export default function ContactPage() {
  return (
    <div className="page-banner">
      <div className="page-banner__head">
        <span className="eyebrow">Contact</span>
        <h1>
          Let's make
          <br />
          something timeless.
        </h1>
      </div>

      <div className="contact-page">
        <a className="contact-page__mail" href="mailto:studio@cosinemade.com">
          studio@cosinemade.com ↗
        </a>

        <div className="contact-page__cols">
          <div>
            <span className="footer__label">Studio</span>
            <p>Nairobi, Kenya</p>
          </div>
          <div>
            <span className="footer__label">Follow</span>
            <p>
              <a href="/">Instagram</a>
              <br />
              <a href="/">Pinterest</a>
            </p>
          </div>
          <div>
            <span className="footer__label">Response time</span>
            <p>Within 2 business days</p>
          </div>
        </div>
      </div>
    </div>
  );
}
