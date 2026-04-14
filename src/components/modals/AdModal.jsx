import { useState, useEffect } from 'react';

const AD_SECONDS = 5;

export default function AdModal({ onSkip }) {
  const [remaining, setRemaining] = useState(AD_SECONDS);

  useEffect(() => {
    if (remaining <= 0) return;
    const timer = setTimeout(() => setRemaining((n) => n - 1), 1000);
    return () => clearTimeout(timer);
  }, [remaining]);

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-label="広告">
      <div className="modal-card">
        {/* 将来のAdSense差し替え対象エリア */}
        <div className="ad-area">
          <p className="ad-placeholder-text">広告エリア</p>
        </div>

        <p className="ad-message">広告を視聴すると再抽選できます</p>
        <p className="ad-countdown" aria-live="polite">
          {remaining > 0 ? `${remaining}秒` : '視聴完了'}
        </p>

        <button
          className="btn-primary"
          onClick={onSkip}
          disabled={remaining > 0}
        >
          スキップ
        </button>
      </div>
    </div>
  );
}
