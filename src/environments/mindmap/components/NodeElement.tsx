import type { KeyboardEvent, MouseEvent } from "react";
import type { MindMapNode } from "../state/mindmapStore";
import { useMindMapStore } from "../state/mindmapStore";
import { useDrag } from "../hooks/useDrag";

interface NodeElementProps {
  node: MindMapNode;
}

export default function NodeElement({ node }: NodeElementProps) {
  const connectionMode = useMindMapStore((s) => s.connectionMode);
  const pending = useMindMapStore((s) => s.pendingConnectionStart);
  const startConnection = useMindMapStore((s) => s.startConnection);
  const completeConnection = useMindMapStore((s) => s.completeConnection);
  const updateNode = useMindMapStore((s) => s.updateNode);
  const focusedNode = useMindMapStore((s) => s.focusedNode);
  const setFocusedNode = useMindMapStore((s) => s.setFocusedNode);
  const { handlePointerDown } = useDrag(node);

  const handleConnectionClick = () => {
    if (!pending) {
      startConnection(node.id);
      return;
    }

    completeConnection(node.id);
  };

  const handleConnectionKeyDown = (e: KeyboardEvent<HTMLSpanElement>) => {
    if (e.key !== "Enter" && e.key !== " ") return;

    e.preventDefault();
    e.stopPropagation();
    setFocusedNode(node.id);
    handleConnectionClick();
    e.currentTarget.blur();
  };

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    setFocusedNode(node.id);

    if (e.target instanceof HTMLInputElement) {
      return;
    }

    if (connectionMode) {
      handleConnectionClick();
    }
  };

  return (
    <div
      className={`mindmap-node${connectionMode ? " connectable" : ""}${pending === node.id ? " connecting" : ""}${focusedNode === node.id ? " focused" : ""}`}
      style={{ left: node.x ?? 0, top: node.y ?? 0 }}
      onClick={handleClick}
      onDoubleClick={(e) => e.stopPropagation()}
    >
      <span
        className={`node-drag-handle${connectionMode ? " disabled" : ""}`}
        role="button"
        tabIndex={connectionMode ? -1 : 0}
        aria-disabled={connectionMode}
        aria-label="Drag node"
        title="Drag node"
        onPointerDown={(e) => {
          if (connectionMode) return;
          handlePointerDown(e);
        }}
        onPointerUp={(e) => {
          e.stopPropagation();
          e.currentTarget.blur();
        }}
        onPointerCancel={(e) => {
          e.stopPropagation();
          e.currentTarget.blur();
        }}
        onClick={(e: MouseEvent<HTMLSpanElement>) => {
          e.stopPropagation();
          e.currentTarget.blur();
        }}
      />
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
      <span
        className="node-connect-handle"
        role="button"
        tabIndex={0}
        aria-label={pending ? "Complete connection" : "Start connection"}
        title={pending ? "Complete connection" : "Start connection"}
        onKeyDown={handleConnectionKeyDown}
        onClick={(e: MouseEvent<HTMLSpanElement>) => {
          e.stopPropagation();
          e.preventDefault();
          setFocusedNode(node.id);
          handleConnectionClick();
          e.currentTarget.blur();
        }}
        onPointerUp={(e) => {
          e.stopPropagation();
          e.currentTarget.blur();
        }}
        onPointerCancel={(e) => {
          e.stopPropagation();
          e.currentTarget.blur();
        }}
      />
    </div>
  );
}
