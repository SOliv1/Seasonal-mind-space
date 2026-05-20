export const seasonPalettes = {
  spring: {
    name: "Spring",
    title: "rgb(42, 126, 96)",
    glow: "rgba(79, 222, 169, 0.34)",
    colors: [
      "#4FDEA9", // fresh mint
      "#F4A8C7", // blossom pink
      "#B9F3D0", // mint leaf
      "#F8E56F", // daffodil yellow
      "#77D7C8"  // aqua mint
    ]
  },

  summer: {
    name: "Summer",
    title: "rgb(230, 140, 60)",
    glow: "rgba(255, 200, 120, 0.25)",
    colors: [
      "#00A8E8", // ocean blue
      "#FF6F59", // coral
      "#FFD23F", // sunflower
      "#4ECDC4", // tropical mint
      "#FF9F1C"  // citrus orange
    ]
  },

  autumn: {
    name: "Autumn",
    title: "rgb(160, 90, 50)",
    glow: "rgba(255, 180, 120, 0.25)",
    colors: [
      "#C65D2E", // burnt orange
      "#8C3F2B", // chestnut
      "#D4A373", // warm tan
      "#6B705C", // olive grey
      "#CB997E"  // muted clay
    ]
  },

  winter: {
    name: "Winter",
    title: "rgb(90, 120, 170)",
    glow: "rgba(180, 220, 255, 0.25)",
    colors: [
      "#A9D6E5", // icy blue
      "#1B4965", // deep navy
      "#E1E5F2", // frost white
      "#5FA8D3", // cold sky
      "#C9D6DF"  // steel grey
    ]
  }
} as const;

export type SeasonName = keyof typeof seasonPalettes;
