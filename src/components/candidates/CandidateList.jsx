import CandidateItem from './CandidateItem';

export default function CandidateList({ candidates, onRemove, onUpdate, onToggleExclude }) {
  if (candidates.length === 0) {
    return <p className="empty-message">候補がありません</p>;
  }

  return (
    <ul className="candidate-list">
      {candidates.map((c) => (
        <CandidateItem
          key={c.id}
          candidate={c}
          onRemove={onRemove}
          onUpdate={onUpdate}
          onToggleExclude={onToggleExclude}
        />
      ))}
    </ul>
  );
}
