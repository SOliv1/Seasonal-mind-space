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

  const x1 = from.x + 80; // approximate center of node
  const y1 = from.y + 20;
  const x2 = to.x + 80;
  const y2 = to.y + 20;

  const path = `M ${x1} ${y1} C ${x1} ${y2}, ${x2} ${y1}, ${x2} ${y2}`;

  return (
    <svg className="connection-line">
      <path className="connection-path" d={path} />
    </svg>
  );
}
