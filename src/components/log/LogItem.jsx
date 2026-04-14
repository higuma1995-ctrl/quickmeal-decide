function formatDate(isoString) {
  const d = new Date(isoString);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  const hh = String(d.getHours()).padStart(2, '0');
  const min = String(d.getMinutes()).padStart(2, '0');
  return `${yyyy}/${mm}/${dd} ${hh}:${min}`;
}

export default function LogItem({ entry, onRemove }) {
  return (
    <li className="log-item">
      <div className="log-item-info">
        <span className="log-item-date">{formatDate(entry.date)}</span>
        <span className="log-item-name">{entry.name}</span>
      </div>
      <button
        className="btn-icon btn-delete"
        onClick={() => onRemove(entry.id)}
        aria-label="削除"
        title="削除"
      >
        🗑️
      </button>
    </li>
  );
}
