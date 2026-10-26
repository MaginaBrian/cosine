// Editorial fashion placeholders (Unsplash). Swap for Cosine Made photography later.
const u = (id, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=85`;

// Full-bleed AXIS landing hero.
export const heroImage = u("photo-1614252369475-531eba835eb1", 2400);

// Nav category filters — "type" on catalog items must match these strings.
export const MEN_TYPES = ["Outerwear", "Tops", "Bottoms"];
export const WOMEN_TYPES = ["Outerwear", "Tops", "Bottoms"];
export const KIDS_TYPES = ["Outerwear", "Tops", "Bottoms"];

/**
 * Kith-style home collections: campaign + four look tiles.
 * `productId` is optional — bag icon routes to that PDP when set.
 */
export const homeCollections = [
  {
    id: "axis",
    title: "AXIS",
    kicker: "Collection One · 2026",
    href: "/collections",
    looks: [
      { src: u("photo-1531384441138-2736e62e0919", 1100), productId: "m1", alt: "AXIS — structured outerwear" },
      { src: u("photo-1522529599102-193c0d76b5b6", 1100), productId: "m3", alt: "AXIS — easy layering" },
      { src: u("photo-1492562080023-ab3db95bfbce", 1100), productId: "m6", alt: "AXIS — knit portrait" },
      { src: u("photo-1614252369475-531eba835eb1", 1100), productId: "m2", alt: "AXIS — tailored look" },
    ],
  },
  {
    id: "summer",
    title: "Summer",
    kicker: "Collection Two · 2026",
    copy: "Light cloth, open air, pieces cut for heat and late light.",
    banner: u("photo-1531123897727-8f129e1688ce", 2400),
    href: "/featured",
    looks: [
      { src: u("photo-1524504388940-b1c1722653e1", 1100), productId: "w3", alt: "Summer — silk slip" },
      { src: u("photo-1488426862026-3ee34a7d66df", 1100), productId: "w1", alt: "Summer — knit soft" },
      { src: u("photo-1594737625785-a6cbdabd333c", 1100), productId: "w5", alt: "Summer — wide trousers" },
      { src: u("photo-1634826225912-905141f688f3", 1100), productId: "w2", alt: "Summer — day denim" },
    ],
  },
  {
    id: "essentials",
    title: "Essentials",
    kicker: "Everyday · Always",
    copy: "The quiet staples — worn hard, kept close, never overdone.",
    banner: u("photo-1595882669314-919b3d51f2c7", 2400),
    href: "/collections",
    looks: [
      { src: u("photo-1634826210700-efc8e0375bf9", 1100), productId: "m4", alt: "Essentials — boxy tee" },
      { src: u("photo-1620577438168-b2079ab90f86", 1100), productId: "m3", alt: "Essentials — overshirt" },
      { src: u("photo-1596015301017-471ad3599a30", 1100), productId: "w4", alt: "Essentials — tailored vest" },
      { src: u("photo-1634826260499-7d97a6049913", 1100), productId: "w6", alt: "Essentials — relaxed trench" },
    ],
  },
];

/**
 * Shop by Colour stories (TALA-style fabric tones).
 * `tone` is the swatch colour; `match` filters product colour names.
 */
export const colourStories = [
  {
    slug: "coffee-browns",
    name: "Coffee Browns",
    tone: "#4A3428",
    match: ["camel", "cocoa", "stone", "sand", "khaki", "oatmeal"],
    looks: [
      u("photo-1531384441138-2736e62e0919", 900),
      u("photo-1524504388940-b1c1722653e1", 900),
      u("photo-1614252369475-531eba835eb1", 900),
      u("photo-1594737625785-a6cbdabd333c", 900),
    ],
  },
  {
    slug: "blush-pink",
    name: "Blush Pink",
    tone: "#E8C4C0",
    match: ["champagne", "ivory", "pearl", "ecru"],
    looks: [
      u("photo-1488426862026-3ee34a7d66df", 900),
      u("photo-1531123897727-8f129e1688ce", 900),
      u("photo-1634826225912-905141f688f3", 900),
      u("photo-1596015301017-471ad3599a30", 900),
    ],
  },
  {
    slug: "burgundy",
    name: "Burgundy",
    tone: "#5C1A2E",
    match: ["cocoa", "charcoal", "black", "onyx"],
    looks: [
      u("photo-1463453091185-61582044d556", 900),
      u("photo-1492562080023-ab3db95bfbce", 900),
      u("photo-1522529599102-193c0d76b5b6", 900),
      u("photo-1620577438168-b2079ab90f86", 900),
    ],
  },
  {
    slug: "olive",
    name: "Dark Olive",
    tone: "#3D4630",
    match: ["khaki", "stone", "sand", "camel"],
    looks: [
      u("photo-1634826260499-7d97a6049913", 900),
      u("photo-1595882669314-919b3d51f2c7", 900),
      u("photo-1634826210700-efc8e0375bf9", 900),
      u("photo-1531384441138-2736e62e0919", 900),
    ],
  },
  {
    slug: "navy",
    name: "Midnight Navy",
    tone: "#0F1A2E",
    match: ["navy", "indigo", "ink"],
    looks: [
      u("photo-1614252369475-531eba835eb1", 900),
      u("photo-1524504388940-b1c1722653e1", 900),
      u("photo-1463453091185-61582044d556", 900),
      u("photo-1488426862026-3ee34a7d66df", 900),
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

export const originImage = u("photo-1522529599102-193c0d76b5b6", 1600);

/** Fixed four pillars after reviews (TALA-style — no carousel). */
export const studioPillars = [
  {
    id: "insiders",
    label: "Cosine Insiders",
    href: "/insiders",
    src: u("photo-1594737625785-a6cbdabd333c", 1200),
  },
  {
    id: "purpose",
    label: "Purpose",
    href: "/purpose",
    src: u("photo-1634826210700-efc8e0375bf9", 1200),
  },
  {
    id: "product",
    label: "Product",
    href: "/product",
    src: u("photo-1558769132-cb1aea458c5e", 1200),
  },
  {
    id: "people",
    label: "People",
    href: "/people",
    src: u("photo-1531123897727-8f129e1688ce", 1200),
  },
];


