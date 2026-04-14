import AddCandidate from './AddCandidate';
import CandidateList from './CandidateList';

export default function CandidatesTab({ candidates, onAdd, onRemove, onUpdate, onToggleExclude }) {
  return (
    <div className="tab-content">
      <AddCandidate onAdd={onAdd} />
      <CandidateList
        candidates={candidates}
        onRemove={onRemove}
        onUpdate={onUpdate}
        onToggleExclude={onToggleExclude}
      />
    </div>
  );
}
