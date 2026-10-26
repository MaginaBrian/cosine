import StudioStory, { StoryBlock } from "./StudioStory";

export default function ProductStoryPage() {
  return (
    <StudioStory kicker="Cloth & cut" title="/ Product">
      <StoryBlock title="Made thoughtfully">
        <p>
          Every Cosine Made piece starts with the cloth. We choose weight, hand, and finish for how
          the garment will live — not for a photo alone. Pattern work is slow on purpose: fit first,
          then line, then production.
        </p>
      </StoryBlock>

      <StoryBlock title="Made for today / tomorrow / on repeat">
        <p>
          Collection One is built to move from morning to late without costume changes. Wide
          trousers, structured outerwear, soft knits, and clean tops — pieces that stack and stay
          relevant as the brand grows.
        </p>
      </StoryBlock>

      <StoryBlock title="Our cloth">
        <p>
          <strong>Wools & suiting.</strong> Medium-weight blends that hold a shoulder and still
          breathe in Nairobi heat.
        </p>
        <p>
          <strong>Cotton & washed jersey.</strong> Overshirts, tees, and chinos with a soft face and
          a dry finish after washing.
        </p>
        <p>
          <strong>Silk & fluid cloth.</strong> Slips and wide trousers cut on the bias or with a
          pressed crease — light, lasting, never loud.
        </p>
      </StoryBlock>

      <StoryBlock title="Our making">
        <p>
          Samples and production runs stay in-studio or with a short list of Nairobi partners we
          visit. We favour short runs, clear specs, and finishes you can feel at the hem and the
          buttonhole.
        </p>
        <p>
          No warehouse of dead stock. No next-season pile before this one has been worn in. The
          product is the experience — and the experience is meant to last.
        </p>
      </StoryBlock>
    </StudioStory>
  );
}
