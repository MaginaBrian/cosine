import StudioStory, { StoryBlock } from "./StudioStory";

export default function PurposePage() {
  return (
    <StudioStory kicker="We are Cosine" title="/ Purpose">
      <StoryBlock title="Why we cut">
        <p>
          Cosine Made exists to slow the wardrobe down. We cut small, ship once, and refuse the
          restock cycle — so each piece can be worn hard and kept for years, not seasons.
        </p>
        <p>
          Purpose before decoration. Every seam, hem, and finish has a job. If it does not serve
          the cloth or the person wearing it, it does not leave the studio.
        </p>
      </StoryBlock>

      <StoryBlock title="Made in Nairobi">
        <p>
          Our studio sits in Nairobi. Pattern, sample, and finish happen under one roof with a
          small team of cutters and makers. We work close to the cloth so decisions stay sharp and
          waste stays low.
        </p>
      </StoryBlock>

      <StoryBlock title="Never restocked">
        <p>
          When a run is done, it is done. That scarcity is not a marketing trick — it is how we
          keep production honest and collections considered. Shop what is here, wear it out, come
          back for what comes next.
        </p>
      </StoryBlock>

      <StoryBlock title="Quiet luxury, loud care">
        <p>
          We stay quiet so the garment can speak: drape after the tenth wash, a collar that still
          sits, colour that does not shout. The experience is the product.
        </p>
      </StoryBlock>
    </StudioStory>
  );
}
