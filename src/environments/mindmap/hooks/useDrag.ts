import type { PointerEvent } from "react";
import type { MindMapNode } from "../state/mindmapStore";
import { useMindMapStore } from "../state/mindmapStore";

export function useDrag(node: MindMapNode) {
  const updateNode = useMindMapStore((s) => s.updateNode);

  const handlePointerDown = (e: PointerEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const startX = e.clientX;
    const startY = e.clientY;

    const initialX = node.x;
    const initialY = node.y;

    const handlePointerMove = (moveEvent: globalThis.PointerEvent) => {
      const dx = moveEvent.clientX - startX;
      const dy = moveEvent.clientY - startY;

      updateNode(node.id, {
        x: initialX + dx,
        y: initialY + dy,
      });
    };

    const handlePointerUp = () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
  };

  return { handlePointerDown };
}
