import Hero from "../components/Hero";
import GenderSplit from "../components/GenderSplit";
import Philosophy from "../components/Philosophy";
import Craft from "../components/Craft";
import Testimonials from "../components/Testimonials";

export default function Home() {
  return (
    <>
      <Hero />
      <GenderSplit />
      <Philosophy />
      <Craft />
      <Testimonials />
    </>
  );
}