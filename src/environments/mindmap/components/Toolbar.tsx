import ConnectButton from "./ConnectButton";

export default function Toolbar() {
  return (
    <div className="toolbar">
      <ConnectButton />
      <button className="reset-btn">Reset</button>
      <button className="calm-btn">Calm</button>
      <button className="season-btn">Season</button>
    </div>
  );
}
