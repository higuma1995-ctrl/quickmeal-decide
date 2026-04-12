import { useState, useEffect } from 'react';
import { defaultMeals } from '../data/defaultMeals';

const STORAGE_KEY = 'quickmeal-decide-meals';

function loadMeals() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch {
    // ignore parse errors
  }
  return defaultMeals;
}

export function useMeals() {
  const [meals, setMeals] = useState(loadMeals);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(meals));
  }, [meals]);

  function addMeal(name, category) {
    const trimmed = name.trim();
    if (!trimmed) return;
    const newMeal = {
      id: Date.now().toString(),
      name: trimmed,
      category,
    };
    setMeals((prev) => [...prev, newMeal]);
  }

  function deleteMeal(id) {
    setMeals((prev) => prev.filter((m) => m.id !== id));
  }

  return { meals, addMeal, deleteMeal };
}
