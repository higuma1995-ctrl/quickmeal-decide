const CATEGORIES = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Snack'];

export default function CategoryTabs({ activeCategory, onSelect }) {
  return (
    <div className="category-tabs" role="tablist" aria-label="Meal categories">
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          role="tab"
          aria-selected={activeCategory === cat}
          className={`category-tab${activeCategory === cat ? ' active' : ''}`}
          onClick={() => onSelect(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
