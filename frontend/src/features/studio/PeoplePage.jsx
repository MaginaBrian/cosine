import StudioStory, { StoryBlock } from "./StudioStory";

export default function PeoplePage() {
  return (
    <StudioStory kicker="Studio & makers" title="/ People">
      <StoryBlock title="The studio">
        <p>
          Cosine Made is a small team in Nairobi — design, pattern, and production talking across
          the same table. We are cutters, fitters, and people who care how clothing feels on a real
          body after a long day.
        </p>
      </StoryBlock>

      <StoryBlock title="Who we dress">
        <p>
          Insiders, regulars, and first-time buyers who want quiet pieces with a clear point of
          view. We design across Men and Women with the same standard: considered cloth, honest
          fit, no decoration for its own sake.
        </p>
      </StoryBlock>

      <StoryBlock title="How we work with makers">
        <p>
          When work leaves our cutting room, it goes to partners we know by name. We share a simple
          code: fair pay for the run, safe floors, and time enough to finish a seam properly. Short
          chains, fewer hands, clearer responsibility.
        </p>
      </StoryBlock>

      <StoryBlock title="Access">
        <p>
          We want the site and the shop to work for more people — clear type, keyboard paths, and
          language that does not hide behind fashion jargon. If something blocks you from browsing
          or ordering, write{" "}
          <a href="mailto:studio@cosinemade.com">studio@cosinemade.com</a> and we will fix it.
        </p>
      </StoryBlock>
    </StudioStory>
  );
}
