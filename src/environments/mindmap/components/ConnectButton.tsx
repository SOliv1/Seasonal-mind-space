import { useMindMapStore } from "../state/mindmapStore";

export default function ConnectButton() {
  const connectionMode = useMindMapStore((s) => s.connectionMode);
  const pending = useMindMapStore((s) => s.pendingConnectionStart);
  const toggleConnectionMode = useMindMapStore((s) => s.toggleConnectionMode);

  return (
    <button
      onClick={toggleConnectionMode}
      className={connectionMode ? "active" : ""}
      aria-pressed={connectionMode}
      title={pending ? "Choose a target node" : "Connect two nodes"}
    >
      {pending ? "Choose Target" : connectionMode ? "Cancel Connect" : "Connect"}
    </button>
  );
}
