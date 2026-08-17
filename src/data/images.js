// Free-to-use editorial / fashion imagery (Unsplash CDN, hotlinked).
// Swap any of these for real Cosine Made photography/video later —
// every component below is built to take either an <img> or <video> source.
const u = (id, w = 1400) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const heroImage = u("photo-1490481651871-ab68de25d43d", 2000);

// Large chooser panels on the homepage — link straight to /men and /women.
export const menPanelImage = u("photo-1441986300917-64674bd600d8", 1400);
export const womenPanelImage = u("photo-1490578474895-699cd4e2cf59", 1400);

// The categories that populate each nav dropdown. "type" on a catalog item
// below must match one of these strings to show up under that filter.
export const MEN_TYPES = ["Outerwear", "Tops", "Bottoms", "Knitwear"];
export const WOMEN_TYPES = ["Knitwear", "Denim", "Dresses", "Outerwear", "Bottoms"];

export const KIDS_TYPES = ["Tops", "Bottoms"];

export const kidsCatalog = [
  {
    id: "k1",
    category: "kids",
    type: "Tops",
    title: "Junior Crewneck",
    price: "KSh 4,200",
    img: u("photo-1519238263530-99bdd11df2ea"),
  },
  {
    id: "k2",
    category: "kids",
    type: "Bottoms",
    title: "Relaxed Jogger",
    price: "KSh 3,600",
    img: u("photo-1622290291468-a28f7a7dc6a8"),
  },
  {
    id: "k3",
    category: "kids",
    type: "Tops",
    title: "Mini Overshirt",
    price: "KSh 4,800",
    img: u("photo-1622290291468-a28f7a7dc6a8"),
  },
];

// Featured page — a small curated pull from across the full catalog.
export const featuredIds = ["m1", "w3", "m6", "w1", "m2", "w5"];

export const collectionsCatalog = [
  // ---- Men ----
  {
    id: "m1",
    category: "men",
    type: "Outerwear",
    title: "Structured Wool Blazer",
    price: "KSh 24,500",
    img: u("photo-1520975954732-35dd22299614"),
  },
  {
    id: "m2",
    category: "men",
    type: "Bottoms",
    title: "Wide Leg Trouser",
    price: "KSh 14,200",
    img: u("photo-1594938298603-c8148c4dae35"),
  },
  {
    id: "m3",
    category: "men",
    type: "Tops",
    title: "Relaxed Overshirt",
    price: "KSh 12,800",
    img: u("photo-1521572163474-6864f9cf17ab"),
  },
  {
    id: "m4",
    category: "men",
    type: "Tops",
    title: "Boxy Tee",
    price: "KSh 6,200",
    img: u("photo-1551232864-3f0890e580d9"),
  },
  {
    id: "m5",
    category: "men",
    type: "Bottoms",
    title: "Belted Chino",
    price: "KSh 13,900",
    img: u("photo-1445205170230-053b83016050"),
  },
  {
    id: "m6",
    category: "men",
    type: "Knitwear",
    title: "Merino Crewneck",
    price: "KSh 11,400",
    img: u("photo-1516257984-b1b4d707412e"),
  },
  // ---- Women ----
  {
    id: "w1",
    category: "women",
    type: "Knitwear",
    title: "Cropped Knit Cardigan",
    price: "KSh 15,600",
    img: u("photo-1483985988355-763728e1935b"),
  },
  {
    id: "w2",
    category: "women",
    type: "Denim",
    title: "Straight Leg Denim",
    price: "KSh 13,200",
    img: u("photo-1509631179647-0177331693ae"),
  },
  {
    id: "w3",
    category: "women",
    type: "Dresses",
    title: "Silk Slip Dress",
    price: "KSh 18,400",
    img: u("photo-1490114538077-0a7f8cb49891"),
  },
  {
    id: "w4",
    category: "women",
    type: "Outerwear",
    title: "Tailored Vest",
    price: "KSh 11,700",
    img: u("photo-1524504388940-b1c1722653e1"),
  },
  {
    id: "w5",
    category: "women",
    type: "Bottoms",
    title: "Wide Trousers",
    price: "KSh 14,900",
    img: u("photo-1490481651871-ab68de25d43d"),
  },
  {
    id: "w6",
    category: "women",
    type: "Outerwear",
    title: "Relaxed Trench",
    price: "KSh 19,800",
    img: u("photo-1551232864-3f0890e580d9"),
  },
];

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

export const allProducts = [...collectionsCatalog, ...kidsCatalog];
export const featuredCatalog = featuredIds
  .map((id) => allProducts.find((item) => item.id === id))
  .filter(Boolean);
