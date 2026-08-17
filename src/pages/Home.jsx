import Hero from "../components/Hero";
import Marquee from "../components/Marquee";
import GenderSplit from "../components/GenderSplit";
import Philosophy from "../components/Philosophy";
import Craft from "../components/Craft";
import Lookbook from "../components/Lookbook";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <GenderSplit />
      <Philosophy />
      <Craft />
      <Lookbook />
    </>
  );
}
