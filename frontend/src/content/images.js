import heroLandscape from "@/assets/hero-landscape.jpg";

// Free-to-use editorial / fashion imagery (Unsplash CDN, hotlinked).
// Swap any of these for real Cosine Made photography/video later —
// every component below is built to take either an <img> or <video> source.
const u = (id, w = 1400) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const heroImage = heroLandscape;

// Large chooser panels on the homepage — link straight to /men and /women.
export const menPanelImage = u("photo-1441986300917-64674bd600d8", 1400);
export const womenPanelImage = u("photo-1490578474895-699cd4e2cf59", 1400);

// The categories that populate each nav dropdown. "type" on a catalog item
// below must match one of these strings to show up under that filter.
export const MEN_TYPES = ["Outerwear", "Tops", "Bottoms"];
export const WOMEN_TYPES = ["Outerwear", "Tops", "Bottoms"];
export const KIDS_TYPES = ["Outerwear", "Tops", "Bottoms"];

export const lookbook = [
  u("photo-1483985988355-763728e1935b"),
  u("photo-1490114538077-0a7f8cb49891"),
  u("photo-1524504388940-b1c1722653e1"),
  u("photo-1544022613-e87ca75a784a"),
  u("photo-1490578474895-699cd4e2cf59"),
  u("photo-1515886657613-9f3515b0c78f"),
];

export const craftImage = u("photo-1445205170230-053b83016050", 1800);
export const philosophyImage = u("photo-1552374196-c4e7ffc6e126", 1400);
export const originImage = u("photo-1441984904996-e0b6ba687e04", 1600);