import type { MouseEvent } from "react";
import { useMindMapStore } from "../state/mindmapStore";
import NodeElement from "./NodeElement";
import ConnectionLine from "./ConnectionLine";

export default function Canvas() {
  const nodes = useMindMapStore((s) => s.nodes);
  const connections = useMindMapStore((s) => s.connections);
  const addNode = useMindMapStore((s) => s.addNode);
  const safeNodes = nodes ?? [];

  const handleDoubleClick = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    addNode({ x, y, text: "New idea" });
  };

  return (
    <div className="mindmap-canvas" onDoubleClick={handleDoubleClick}>
      {connections.map((c) => (
        <ConnectionLine key={c.id} connection={c} />
      ))}

      {safeNodes.map((node) => (
        <NodeElement key={node.id} node={node} />
      ))}
    </div>
  );
}
