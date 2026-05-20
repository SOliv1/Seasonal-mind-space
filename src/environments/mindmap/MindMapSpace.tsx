import type { CSSProperties } from "react";
import Canvas from "./components/Canvas";
import ControlsBar from "./components/ControlsBar";
import { calmPalette } from "./colors/calmPalette";
import { seasonPalettes, type SeasonName } from "./colors/seasonPalettes";
import { useMindMapStore } from "./state/mindmapStore";

type CSSVarStyle = CSSProperties & Record<`--${string}`, string>;

const seasonalTaglines: Record<SeasonName, string> = {
  spring: "Soft renewal",
  summer: "Bright momentum",
  autumn: "Gather and refine",
  winter: "Quiet clarity",
};

function buildPaletteStyle(season: SeasonName, calmMode: boolean): CSSVarStyle {
  const palette = seasonPalettes[season];
  const colors = calmMode ? calmPalette.primary : palette.colors;
  const accents = calmMode ? calmPalette.accents : palette.colors;
  const glow = calmMode ? calmPalette.glow : palette.glow;
  const headerTextColor = "#ffffff";
  const nodeTextColor = "#1f2f3a";

  if (calmMode) {
    return {
      "--space-bg": `
        radial-gradient(circle at 15% 16%, ${calmPalette.accents[0]}99, transparent 30%),
        radial-gradient(circle at 82% 18%, ${calmPalette.accents[1]}99, transparent 28%),
        radial-gradient(circle at 20% 82%, ${calmPalette.accents[2]}88, transparent 30%),
        radial-gradient(circle at 82% 76%, ${calmPalette.primary[3]}88, transparent 28%),
        linear-gradient(135deg, ${calmPalette.primary[0]} 0%, ${calmPalette.primary[1]} 30%, ${calmPalette.primary[2]} 58%, ${calmPalette.primary[4]} 100%)
      `,
      "--node-bg": `linear-gradient(135deg, ${calmPalette.accents[3]}dd, ${calmPalette.accents[4]}bb)`,
      "--node-border": `${calmPalette.primary[0]}aa`,
      "--node-shadow": `${calmPalette.primary[2]}55`,
      "--node-text": nodeTextColor,
      "--connection-tint": `${calmPalette.primary[1]}dd`,
      "--controls-bg": `${calmPalette.accents[3]}cc`,
      "--controls-border": `${calmPalette.accents[0]}99`,
      "--season-title": headerTextColor,
      "--season-glow": calmPalette.glow,
    };
  }

  if (season === "spring") {
    return {
      "--space-bg": `
        radial-gradient(circle at 16% 18%, ${glow}, transparent 32%),
        radial-gradient(circle at 78% 24%, ${colors[2]}aa, transparent 28%),
        radial-gradient(circle at 82% 78%, ${colors[4]}88, transparent 30%),
        linear-gradient(135deg, ${colors[0]} 0%, ${colors[2]} 42%, ${colors[4]} 100%)
      `,
      "--node-bg": `linear-gradient(135deg, ${colors[2]}ee, ${colors[0]}cc)`,
      "--node-border": `${colors[0]}cc`,
      "--node-shadow": `${colors[0]}66`,
      "--node-text": nodeTextColor,
      "--connection-tint": `${colors[4]}dd`,
      "--controls-bg": `${colors[2]}cc`,
      "--controls-border": `${colors[0]}99`,
      "--season-title": headerTextColor,
      "--season-glow": glow,
    };
  }

  return {
    "--space-bg": `
      radial-gradient(circle at 18% 18%, ${glow}, transparent 34%),
      radial-gradient(circle at 82% 72%, ${accents[1]}66, transparent 32%),
      linear-gradient(135deg, ${colors[0]} 0%, ${colors[2]} 52%, ${accents[4]} 100%)
    `,
    "--node-bg": `linear-gradient(135deg, ${accents[3]}dd, ${colors[0]}aa)`,
    "--node-border": `${colors[0]}aa`,
    "--node-shadow": `${colors[0]}55`,
    "--node-text": nodeTextColor,
    "--connection-tint": `${colors[1]}cc`,
    "--controls-bg": `${accents[3]}cc`,
    "--controls-border": `${colors[0]}88`,
    "--season-title": headerTextColor,
    "--season-glow": glow,
  };
}

export default function MindMapSpace() {
  const season = useMindMapStore((s) => s.season);
  const focusedNode = useMindMapStore((s) => s.focusedNode);
  const calmMode = useMindMapStore((s) => s.calmMode);
  const className = `mindmap-space season-${season}${calmMode ? " calm-mode" : ""}${focusedNode ? " focus-mode" : ""}`;
  const paletteStyle = buildPaletteStyle(season, calmMode);
  const title = calmMode ? calmPalette.name : seasonPalettes[season].name;
  const tagline = calmMode ? "Soft focus" : seasonalTaglines[season];

  return (
    <div className={className} style={paletteStyle}>
      <div className="mindmap-title">{title} Mindspace</div>
      <div className="mindmap-subtitle">{tagline}</div>

      <Canvas />
      <ControlsBar />
    </div>
  );
}
