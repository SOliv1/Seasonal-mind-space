import { useMindMapStore } from "../state/mindmapStore";

export default function ConnectButton() {
  const pending = useMindMapStore((s) => s.pendingConnectionStart);
  const cancelConnection = useMindMapStore((s) => s.cancelConnection);

  return (
    <button
      onClick={() => {
        if (pending) {
          cancelConnection();
        } else {
          alert("Click a node to start a connection");
        }
      }}
      className={pending ? "active" : ""}
    >
      {pending ? "Cancel Connect" : "Connect"}
    </button>
  );
}
