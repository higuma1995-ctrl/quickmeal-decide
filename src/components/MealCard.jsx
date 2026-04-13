import { CATEGORY_LABELS } from '../utils/categoryLabels';

export default function MealCard({ meal, onDelete }) {
  return (
    <div className={`meal-card category-${meal.category.toLowerCase()}`}>
      <div className="meal-card-info">
        <span className="meal-name">{meal.name}</span>
        <span className={`meal-tag tag-${meal.category.toLowerCase()}`}>
          {CATEGORY_LABELS[meal.category] ?? meal.category}
        </span>
      </div>
      <button
        className="delete-btn"
        aria-label={`Delete ${meal.name}`}
        onClick={() => onDelete(meal.id)}
      >
        &times;
      </button>
    </div>
  );
}
