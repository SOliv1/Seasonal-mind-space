import type { PointerEvent } from "react";
import type { MindMapNode } from "../state/mindmapStore";
import { useMindMapStore } from "../state/mindmapStore";

export function useDrag(node: MindMapNode) {
  const updateNode = useMindMapStore((s) => s.updateNode);

  const handlePointerDown = (e: PointerEvent<HTMLElement>) => {
    if (e.button !== 0) return;

    e.stopPropagation();
    e.preventDefault();

    const ownerWindow = e.currentTarget.ownerDocument.defaultView ?? window;
    const ownerDocument = e.currentTarget.ownerDocument;
    const pointerId = e.pointerId;
    const startX = e.clientX;
    const startY = e.clientY;
    const initialX = node.x;
    const initialY = node.y;
    const dragThreshold = 3;
    let released = false;

    const handlePointerMove = (moveEvent: globalThis.PointerEvent) => {
      if (moveEvent.pointerId !== pointerId) return;

      const dx = moveEvent.clientX - startX;
      const dy = moveEvent.clientY - startY;
      const movedEnough = Math.hypot(dx, dy) >= dragThreshold;

      if (!movedEnough) return;

      updateNode(node.id, {
        x: initialX + dx,
        y: initialY + dy,
      });
    };

    const stopDragging = () => {
      if (released) return;

      released = true;
      ownerWindow.removeEventListener("pointermove", handlePointerMove, true);
      ownerWindow.removeEventListener("pointerup", stopDragging, true);
      ownerWindow.removeEventListener("pointercancel", stopDragging, true);
      ownerWindow.removeEventListener("blur", stopDragging, true);
      ownerDocument.removeEventListener("mouseleave", stopDragging, true);
    };

    ownerWindow.addEventListener("pointermove", handlePointerMove, true);
    ownerWindow.addEventListener("pointerup", stopDragging, true);
    ownerWindow.addEventListener("pointercancel", stopDragging, true);
    ownerWindow.addEventListener("blur", stopDragging, true);
    ownerDocument.addEventListener("mouseleave", stopDragging, true);
  };

  return { handlePointerDown };
}
