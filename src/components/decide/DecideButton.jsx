export default function DecideButton({ onClick, disabled }) {
  return (
    <div className="decide-button-wrap">
      <button
        className="decide-btn"
        onClick={onClick}
        disabled={disabled}
        aria-label="決める"
      >
        🎲 決める
      </button>
    </div>
  );
}
