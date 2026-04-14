export default function TutorialModal({ onClose }) {
  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-label="使い方">
      <div className="modal-card">
        <h2 className="modal-title">使い方</h2>
        <p className="modal-body">
          迷ったらそのまま「決める」を押してください
        </p>
        <button className="btn-primary modal-close-btn" onClick={onClose}>
          閉じる
        </button>
      </div>
    </div>
  );
}
