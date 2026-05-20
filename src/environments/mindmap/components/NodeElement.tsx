import { useMindMapStore } from "../state/mindmapStore";
import { useDrag } from "../hooks/useDrag";

export default function NodeElement({ node }) {
  const updateNode = useMindMapStore((s) => s.updateNode);
  const setFocused = useMindMapStore((s) => s.setFocusedNode);
  const focusedNode = useMindMapStore((s) => s.focusedNode);
  const { handlePointerDown } = useDrag(node);

  return (
    <div
      className={`mindmap-node ${node.id === focusedNode ? "focused" : ""}`}
      style={{ left: node.x, top: node.y }}
      onPointerDown={handlePointerDown}
      onClick={() => setFocused(node.id)}
    >
      <input
        className="node-input"
        value={node.text}
        onChange={(e) => updateNode(node.id, { text: e.target.value })}
        placeholder="Thought…"
      />
    </div>
  );
}
