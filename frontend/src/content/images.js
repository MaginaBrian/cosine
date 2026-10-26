// Editorial fashion placeholders (Unsplash). Swap for Cosine Made photography later.
const u = (id, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=85`;

// Full-bleed landing hero — dark, high-contrast campaign energy.
export const heroImage = u("photo-1529139574466-a303027c1d8b", 2400);

// Large chooser panels on the homepage.
export const menPanelImage = u("photo-1617137968427-85924c800a22", 1400);
export const womenPanelImage = u("photo-1515886657613-9f3515b0c78f", 1400);

// Nav category filters — "type" on catalog items must match these strings.
export const MEN_TYPES = ["Outerwear", "Tops", "Bottoms"];
export const WOMEN_TYPES = ["Outerwear", "Tops", "Bottoms"];
export const KIDS_TYPES = ["Outerwear", "Tops", "Bottoms"];

export const lookbook = [
  u("photo-1509631179647-0177331693ae"),
  u("photo-1469334031218-e382a71b716b"),
  u("photo-1487222477894-8943e31ef7b2"),
  u("photo-1490481651871-ab68de25d43d"),
  u("photo-1552374196-c4e7ffc6e126"),
  u("photo-1505022610480-028101dfd732"),
  u("photo-1485968579580-b6d095142e6e"),
  u("photo-1496747611176-843222e1e57c"),
];

export const craftImage = u("photo-1558769132-cb1aea458c5e", 1800);
export const philosophyImage = u("photo-1503342217505-b0a15ec3261c", 1400);
export const originImage = u("photo-1441984904996-e0b6ba687e04", 1600);
