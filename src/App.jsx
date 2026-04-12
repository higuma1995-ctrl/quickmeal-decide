import { useState, useCallback } from 'react';
import './App.css';
import { useMeals } from './hooks/useMeals';
import CategoryTabs from './components/CategoryTabs';
import MealList from './components/MealList';
import AddMealForm from './components/AddMealForm';
import DecideButton from './components/DecideButton';
import SpinOverlay from './components/SpinOverlay';

export default function App() {
  const { meals, addMeal, deleteMeal } = useMeals();
  const [activeCategory, setActiveCategory] = useState('All');
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinKey, setSpinKey] = useState(0); // increment to force SpinOverlay remount

  const filteredMeals =
    activeCategory === 'All'
      ? meals
      : meals.filter((m) => m.category === activeCategory);

  function handleDecide() {
    if (filteredMeals.length === 0) return;
    setIsSpinning(true);
    setSpinKey((k) => k + 1);
  }

  const handleResult = useCallback((meal) => {
    if (meal === null) {
      // "Spin Again" — remount the overlay with a fresh key
      setSpinKey((k) => k + 1);
    }
  }, []);

  function handleDismiss() {
    setIsSpinning(false);
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">
          <span className="title-icon">🍽️</span> QuickMeal Decide
        </h1>
        <p className="app-subtitle">Can't decide what to eat? Let us choose!</p>
      </header>

      <main className="app-main">
        <CategoryTabs activeCategory={activeCategory} onSelect={setActiveCategory} />

        <section className="meal-section">
          <MealList meals={filteredMeals} onDelete={deleteMeal} />
        </section>

        <section className="add-section">
          <AddMealForm onAdd={addMeal} />
        </section>
      </main>

      <div className="decide-area">
        <DecideButton onClick={handleDecide} disabled={filteredMeals.length === 0} />
      </div>

      {isSpinning && (
        <SpinOverlay
          key={spinKey}
          meals={filteredMeals}
          onResult={handleResult}
          onDismiss={handleDismiss}
        />
      )}
    </div>
  );
}
