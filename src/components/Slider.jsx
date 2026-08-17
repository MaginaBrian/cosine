import { forwardRef, useImperativeHandle, useRef } from "react";

const Slider = forwardRef(function Slider({ children, className = "" }, ref) {
  const trackRef = useRef(null);
  const drag = useRef({ active: false, startX: 0, startScroll: 0, moved: false });

  useImperativeHandle(ref, () => ({
    scrollToIndex(index) {
      const el = trackRef.current;
      if (!el) return;
      const card = el.children[index];
      if (!card) return;
      const trackPad = parseFloat(getComputedStyle(el).paddingLeft) || 0;
      el.scrollTo({ left: card.offsetLeft - trackPad, behavior: "smooth" });
    },
  }));

  const scrollBy = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: el.clientWidth * 0.8 * dir, behavior: "smooth" });
  };

  const onPointerDown = (e) => {
    drag.current = {
      active: true,
      startX: e.clientX,
      startScroll: trackRef.current.scrollLeft,
      moved: false,
    };
    trackRef.current.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e) => {
    if (!drag.current.active) return;
    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > 4) drag.current.moved = true;
    trackRef.current.scrollLeft = drag.current.startScroll - dx;
  };

  const onPointerUp = () => {
    drag.current.active = false;
  };

  return (
    <div className={`slider ${className}`}>
      <div
        className="slider__track"
        ref={trackRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        {children}
      </div>

      <div className="slider__controls">
        <button aria-label="Previous" onClick={() => scrollBy(-1)}>
          ←
        </button>
        <button aria-label="Next" onClick={() => scrollBy(1)}>
          →
        </button>
      </div>
    </div>
  );
});

export default Slider;
