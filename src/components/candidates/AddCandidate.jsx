import { useState } from 'react';

export default function AddCandidate({ onAdd }) {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    const result = onAdd(name);
    if (result.ok) {
      setName('');
      setError('');
    } else {
      setError(result.error);
    }
  }

  return (
    <form className="add-candidate-form" onSubmit={handleSubmit} noValidate>
      <div className="add-candidate-row">
        <input
          type="text"
          className="candidate-input"
          placeholder="候補名を入力"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (error) setError('');
          }}
          aria-label="候補名"
        />
        <button
          type="submit"
          className="btn-primary add-candidate-btn"
          disabled={!name.trim()}
        >
          追加
        </button>
      </div>
      {error && <p className="input-error">{error}</p>}
    </form>
  );
}
