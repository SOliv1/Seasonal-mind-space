import { useMindMapStore } from "./state/mindmapStore";
import Canvas from "./components/Canvas";
import ControlsBar from "./components/ControlsBar";

export default function MindMapSpace() {
  const focusedNode = useMindMapStore((s) => s.focusedNode);

  return (
    <div className={`mindmap-space ${focusedNode ? "focus-mode" : ""}`}>
      <Canvas />
      <ControlsBar />
    </div>
  );
}
