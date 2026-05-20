import { useMindMapStore } from "../state/mindmapStore";

export function useDrag(node) {
  const updateNode = useMindMapStore((s) => s.updateNode);

  const handlePointerDown = (e: React.PointerEvent) => {
    e.stopPropagation();
    const startX = e.clientX;
    const startY = e.clientY;

    const initialX = node.x;
    const initialY = node.y;

    const handlePointerMove = (moveEvent) => {
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
