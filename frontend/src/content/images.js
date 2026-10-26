// Editorial fashion placeholders (Unsplash). Swap for Cosine Made photography later.
const u = (id, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=85`;

// Full-bleed landing hero — dark, high-contrast campaign energy.
export const heroImage = u("photo-1529139574466-a303027c1d8b", 2400);

// Large chooser panels on the homepage.
export const menPanelImage = u("photo-1488161628813-0885872a41fc", 1400);
export const womenPanelImage = u("photo-1515886657613-9f3515b0c78f", 1400);

// Nav category filters — "type" on catalog items must match these strings.
export const MEN_TYPES = ["Outerwear", "Tops", "Bottoms"];
export const WOMEN_TYPES = ["Outerwear", "Tops", "Bottoms"];
export const KIDS_TYPES = ["Outerwear", "Tops", "Bottoms"];

/**
 * Shop by Colour stories (TALA-style).
 * `match` is matched against product colour names (case-insensitive).
 * `looks` are the four lifestyle frames shown when a colour is selected.
 */
export const colourStories = [
  {
    slug: "coffee-browns",
    name: "Coffee Browns",
    swatch: u("photo-1601924994987-69e26d50dc26", 900),
    match: ["camel", "cocoa", "stone", "sand", "khaki", "oatmeal"],
    looks: [
      u("photo-1552374196-c4e7ffc6e126", 900),
      u("photo-1509631179647-0177331693ae", 900),
      u("photo-1487222477894-8943e31ef7b2", 900),
      u("photo-1490481651871-ab68de25d43d", 900),
    ],
  },
  {
    slug: "blush",
    name: "Blush",
    swatch: u("photo-1576566588028-4147f3842f27", 900),
    match: ["champagne", "ivory", "pearl", "ecru"],
    looks: [
      u("photo-1515886657613-9f3515b0c78f", 900),
      u("photo-1496747611176-843222e1e57c", 900),
      u("photo-1469334031218-e382a71b716b", 900),
      u("photo-1490114538077-0a7f8cb49891", 900),
    ],
  },
  {
    slug: "ink",
    name: "Ink",
    swatch: u("photo-1618354691373-d851c5c3a990", 900),
    match: ["black", "onyx", "ink", "charcoal"],
    looks: [
      u("photo-1505022610480-028101dfd732", 900),
      u("photo-1617137968427-85924c800a22", 900),
      u("photo-1529139574466-a303027c1d8b", 900),
      u("photo-1467043237213-65f2da53396f", 900),
    ],
  },
  {
    slug: "olive",
    name: "Dark Olive",
    swatch: u("photo-1594938298603-c8148c4dae35", 900),
    match: ["khaki", "stone", "sand", "camel"],
    looks: [
      u("photo-1441984904996-e0b6ba687e04", 900),
      u("photo-1507679799987-c73779587ccf", 900),
      u("photo-1558171813-4c088753af8f", 900),
      u("photo-1488161628813-0885872a41fc", 900),
    ],
  },
  {
    slug: "navy",
    name: "Midnight Navy",
    swatch: u("photo-1558769132-cb1aea458c5e", 900),
    match: ["navy", "indigo", "ink"],
    looks: [
      u("photo-1617127365659-c47fa864d8bc", 900),
      u("photo-1507003211169-0a1dd7228f2d", 900),
      u("photo-1521572163474-6864f9cf17ab", 900),
      u("photo-1489987707025-afc232f7ea0f", 900),
    ],
  },
];

export function findColourStory(slug) {
  return colourStories.find((story) => story.slug === slug) || null;
}

export function productMatchesColour(product, story) {
  const colours = (product.colors || []).map((c) => String(c).toLowerCase());
  return story.match.some((token) => colours.some((c) => c.includes(token)));
}

export const craftImage = u("photo-1558769132-cb1aea458c5e", 1800);
export const philosophyImage = u("photo-1503342217505-b0a15ec3261c", 1400);
export const originImage = u("photo-1441984904996-e0b6ba687e04", 1600);
