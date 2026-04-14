import { useState } from 'react';

const TAG_OPTIONS = {
  budget: ['節約', '定番', 'ご馳走'],
  time: ['ランチ', 'ディナー'],
  scene: ['カフェ', '食事メイン', '飲み会', '二次会'],
};

const AXIS_LABELS = { budget: '予算', time: '時間帯', scene: 'シーン' };


export default function CandidateItem({ candidate, onRemove, onUpdate, onToggleExclude }) {
  const [editOpen, setEditOpen] = useState(false);

  const allTags = [
    ...candidate.tags.budget,
    ...candidate.tags.time,
    ...candidate.tags.scene,
  ];

  function toggleTag(axis, value) {
    const current = candidate.tags[axis];
    const next = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    onUpdate(candidate.id, { tags: { ...candidate.tags, [axis]: next } });
  }

  return (
    <li className={`candidate-item${candidate.isExcluded ? ' excluded' : ''}`}>
      <div className="candidate-main">
        <div className="candidate-info">
          <span className="candidate-name">{candidate.name}</span>
          <div className="candidate-tags">
            {allTags.map((tag) => (
              <span key={tag} className="tag-badge">{tag}</span>
            ))}
            {candidate.isExcluded && (
              <span className="tag-badge excluded-badge">除外中</span>
            )}
          </div>
        </div>
        <div className="candidate-actions">
          <button
            className="btn-icon"
            onClick={() => setEditOpen((o) => !o)}
            aria-label="タグ編集"
            title="タグ編集"
          >
            🏷️
          </button>
          <button
            className={`btn-icon${candidate.isExcluded ? ' active-exclude' : ''}`}
            onClick={() => onToggleExclude(candidate.id)}
            aria-label={candidate.isExcluded ? '除外を解除' : '除外する'}
            title={candidate.isExcluded ? '除外を解除' : '除外する'}
          >
            {candidate.isExcluded ? '✅' : '🚫'}
          </button>
          {!candidate.isPreset && (
            <button
              className="btn-icon btn-delete"
              onClick={() => onRemove(candidate.id)}
              aria-label="削除"
              title="削除"
            >
              🗑️
            </button>
          )}
        </div>
      </div>

      {editOpen && (
        <div className="tag-editor">
          {Object.entries(TAG_OPTIONS).map(([axis, options]) => (
            <div key={axis} className="tag-editor-axis">
              <span className="tag-editor-label">{AXIS_LABELS[axis]}</span>
              <div className="tag-editor-options">
                {options.map((opt) => (
                  <label key={opt} className="tag-checkbox-label">
                    <input
                      type="checkbox"
                      checked={candidate.tags[axis].includes(opt)}
                      onChange={() => toggleTag(axis, opt)}
                    />
                    {opt}
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </li>
  );
}
