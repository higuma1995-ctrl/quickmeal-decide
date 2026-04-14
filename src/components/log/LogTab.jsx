import LogItem from './LogItem';

export default function LogTab({ log, onRemove, onClear }) {
  function handleClear() {
    if (window.confirm('ログを全て削除しますか？')) {
      onClear();
    }
  }

  return (
    <div className="tab-content">
      <div className="log-header">
        <h2 className="tab-section-title">決定ログ</h2>
        {log.length > 0 && (
          <button className="btn-clear" onClick={handleClear}>
            全消去
          </button>
        )}
      </div>

      {log.length === 0 ? (
        <p className="empty-message">まだ記録がありません</p>
      ) : (
        <ul className="log-list">
          {log.map((entry) => (
            <LogItem key={entry.id} entry={entry} onRemove={onRemove} />
          ))}
        </ul>
      )}
    </div>
  );
}
