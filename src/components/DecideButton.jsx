export default function DecideButton({ onClick, disabled }) {
  return (
    <div className="decide-wrapper">
      <button
        className="decide-btn"
        onClick={onClick}
        disabled={disabled}
        aria-label="Decide what to eat"
      >
        🎲 Decide!
      </button>
      {disabled && (
        <p className="decide-hint">Add at least one meal to spin!</p>
      )}
    </div>
  );
}
