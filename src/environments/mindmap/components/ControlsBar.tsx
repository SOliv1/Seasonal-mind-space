import { useMindMapStore } from "../state/mindmapStore";
import ConnectButton from "./ConnectButton";

export default function ControlsBar() {
  const reset = useMindMapStore((s) => s.reset);
  const calm = useMindMapStore((s) => s.calm);
  const toggleSeason = useMindMapStore((s) => s.toggleSeason);

  return (
    <div className="controls-bar">
      <ConnectButton />
      <button onClick={reset}>Reset</button>
      <button onClick={calm}>Calm</button>
      <button onClick={toggleSeason}>Season</button>
    </div>
  );
}
