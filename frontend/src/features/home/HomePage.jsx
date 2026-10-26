import Hero from "./Hero";
import GenderSplit from "./GenderSplit";
import Lookbook from "./Lookbook";
import Philosophy from "./Philosophy";
import Craft from "./Craft";
import Testimonials from "./Testimonials";
import Reveal from "./Reveal";

export default function Home() {
  return (
    <>
      <Hero />
      <Reveal>
        <GenderSplit />
      </Reveal>
      <Lookbook />
      <Reveal>
        <Philosophy />
      </Reveal>
      <Reveal>
        <Craft />
      </Reveal>
      <Reveal>
        <Testimonials />
      </Reveal>
    </>
  );
}
