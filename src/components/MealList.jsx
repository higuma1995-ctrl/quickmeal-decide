import MealCard from './MealCard';

export default function MealList({ meals, onDelete }) {
  if (meals.length === 0) {
    return (
      <div className="meal-list-empty">
        <p>No meals in this category yet.</p>
        <p>Add one below!</p>
      </div>
    );
  }

  return (
    <ul className="meal-list" aria-label="Meal list">
      {meals.map((meal) => (
        <li key={meal.id}>
          <MealCard meal={meal} onDelete={onDelete} />
        </li>
      ))}
    </ul>
  );
}
