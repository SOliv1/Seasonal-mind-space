import type { MindMapConnection } from "../state/mindmapStore";
import { useMindMapStore } from "../state/mindmapStore";

interface ConnectionLineProps {
  connection: MindMapConnection;
}

export default function ConnectionLine({ connection }: ConnectionLineProps) {
  const nodes = useMindMapStore((s) => s.nodes);

  const from = nodes.find((n) => n.id === connection.from);
  const to = nodes.find((n) => n.id === connection.to);

  if (!from || !to) return null;

  const nodeWidth = 192;
  const nodeHeight = 48;
  const fromIsLeft = from.x <= to.x;
  const x1 = from.x + (fromIsLeft ? nodeWidth : 0);
  const y1 = from.y + nodeHeight / 2;
  const x2 = to.x + (fromIsLeft ? 0 : nodeWidth);
  const y2 = to.y + nodeHeight / 2;
  const controlOffset = Math.max(56, Math.abs(x2 - x1) * 0.42);

  const path = fromIsLeft
    ? `M ${x1} ${y1} C ${x1 + controlOffset} ${y1}, ${x2 - controlOffset} ${y2}, ${x2} ${y2}`
    : `M ${x1} ${y1} C ${x1 - controlOffset} ${y1}, ${x2 + controlOffset} ${y2}, ${x2} ${y2}`;

  return (
    <svg className="connection-line">
      <path className="connection-path connection-path-outline" d={path} />
      <path className="connection-path" d={path} />
    </svg>
  );
}
