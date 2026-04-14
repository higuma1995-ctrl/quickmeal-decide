import { useState } from 'react';

export default function ResultArea({ result, onAccept, onReject }) {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    const text = `今日のごはんは【${result.name}】に決まりました🍽️`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback: do nothing
    }
  }

  return (
    <div className="result-area">
      <p className="result-label">今日のごはんは</p>
      <p className="result-name">{result.name}</p>
      <button
        className={`btn-share${copied ? ' copied' : ''}`}
        onClick={handleShare}
      >
        {copied ? 'コピーしました！' : '共有'}
      </button>
      <div className="result-actions">
        <button className="btn-accept" onClick={onAccept}>
          これにする
        </button>
        <button className="btn-reject" onClick={onReject}>
          これじゃない
        </button>
      </div>
    </div>
  );
}
