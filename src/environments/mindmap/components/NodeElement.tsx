import type { MouseEvent } from "react";
import type { MindMapNode } from "../state/mindmapStore";
import { useMindMapStore } from "../state/mindmapStore";
import { useDrag } from "../hooks/useDrag";

interface NodeElementProps {
  node: MindMapNode;
}

export default function NodeElement({ node }: NodeElementProps) {
  const pending = useMindMapStore((s) => s.pendingConnectionStart);
  const startConnection = useMindMapStore((s) => s.startConnection);
  const completeConnection = useMindMapStore((s) => s.completeConnection);
  const updateNode = useMindMapStore((s) => s.updateNode);
  const focusedNode = useMindMapStore((s) => s.focusedNode);
  const setFocusedNode = useMindMapStore((s) => s.setFocusedNode);
  const { handlePointerDown } = useDrag(node);

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    setFocusedNode(node.id);

    if (e.target instanceof HTMLInputElement) {
      return;
    }

    // No connection started yet → start one
    if (!pending) {
      startConnection(node.id);
      return;
    }

    // Clicking the same node → ignore
    if (pending === node.id) {
      return;
    }

    // Clicking a different node → complete the connection
    completeConnection(node.id);
  };

  return (
    <div
      className={`mindmap-node${pending === node.id ? " connecting" : ""}${focusedNode === node.id ? " focused" : ""}`}
      style={{ left: node.x ?? 0, top: node.y ?? 0 }}
      onPointerDown={handlePointerDown}
      onClick={handleClick}
      onDoubleClick={(e) => e.stopPropagation()}
    >
      <input
        className="node-input"
        value={node.text}
        onChange={(e) => updateNode(node.id, { text: e.target.value })}
        onFocus={(e) => {
          setFocusedNode(node.id);
          e.target.select();
        }}
        onClick={(e) => e.stopPropagation()}
        onPointerDown={(e) => e.stopPropagation()}
        placeholder="Type an idea..."
      />
    </div>
  );
}
