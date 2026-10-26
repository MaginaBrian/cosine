import { homeCollections } from "@/content/images";
import Hero from "./Hero";
import CampaignBlock from "./CampaignBlock";
import ShopByColour from "./ShopByColour";
import Philosophy from "./Philosophy";
import Craft from "./Craft";
import Testimonials from "./Testimonials";
import Reveal from "./Reveal";

const followOns = homeCollections.filter((c) => c.id !== "axis");

export default function Home() {
  return (
    <>
      <Hero />
      {followOns.map((collection) => (
        <CampaignBlock key={collection.id} collection={collection} />
      ))}
      <ShopByColour />
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
