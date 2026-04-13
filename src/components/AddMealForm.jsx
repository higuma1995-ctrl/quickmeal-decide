import { useState } from 'react';
import { CATEGORY_LABELS } from '../utils/categoryLabels';

const CATEGORIES = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];

export default function AddMealForm({ onAdd }) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Lunch');
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter a meal name.');
      return;
    }
    onAdd(name, category);
    setName('');
    setError('');
  }

  return (
    <form className="add-meal-form" onSubmit={handleSubmit} noValidate>
      <h3 className="add-form-title">Add a Meal</h3>
      <div className="add-form-fields">
        <div className="input-group">
          <input
            type="text"
            className="meal-input"
            placeholder="Meal name…"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (error) setError('');
            }}
            aria-label="Meal name"
          />
          {error && <span className="input-error">{error}</span>}
        </div>
        <select
          className="category-select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          aria-label="Category"
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {CATEGORY_LABELS[cat] ?? cat}
            </option>
          ))}
        </select>
        <button type="submit" className="add-btn">
          + Add
        </button>
      </div>
    </form>
  );
}
