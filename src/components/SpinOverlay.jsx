import { useState, useEffect, useRef } from 'react';
import { CATEGORY_LABELS } from '../utils/categoryLabels';

export default function SpinOverlay({ meals, onResult, onDismiss }) {
  const [displayName, setDisplayName] = useState('');
  const [phase, setPhase] = useState('spinning'); // 'spinning' | 'result'
  const [pickedMeal, setPickedMeal] = useState(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (meals.length === 0) return;

    // Pick the final winner upfront
    const winner = meals[Math.floor(Math.random() * meals.length)];

    let delay = 40;         // start fast (ms)
    const maxDelay = 150;   // slow down to this
    const increment = 15;   // how much to increase each step
    let steps = 0;
    const totalSteps = 14;  // roughly 0.8 seconds total

    function tick() {
      // Show a random meal name while spinning
      const randomMeal = meals[Math.floor(Math.random() * meals.length)];
      setDisplayName(randomMeal.name);
      steps++;

      if (steps >= totalSteps) {
        clearInterval(intervalRef.current);
        // Land on winner
        setDisplayName(winner.name);
        setPickedMeal(winner);
        setPhase('result');
        return;
      }

      // Increase delay each step (slow down)
      delay = Math.min(delay + increment, maxDelay);
      clearInterval(intervalRef.current);
      intervalRef.current = setTimeout(tick, delay);
    }

    intervalRef.current = setTimeout(tick, delay);

    return () => {
      clearTimeout(intervalRef.current);
      clearInterval(intervalRef.current);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function handleSpinAgain() {
    onResult(null); // signal parent to start a new spin
  }

  return (
    <div className="overlay" role="dialog" aria-modal="true" aria-label="Spin result">
      <div className="overlay-card">
        {phase === 'spinning' && (
          <>
            <p className="spin-label">Deciding…</p>
            <div className="spin-display" aria-live="polite" aria-atomic="true">
              {displayName}
            </div>
            <div className="spin-dots">
              <span />
              <span />
              <span />
            </div>
          </>
        )}

        {phase === 'result' && pickedMeal && (
          <>
            <p className="result-label">今日のごはんは：</p>
            <div className="result-name">{pickedMeal.name}</div>
            <span className={`result-tag tag-${pickedMeal.category.toLowerCase()}`}>
              {CATEGORY_LABELS[pickedMeal.category] ?? pickedMeal.category}
            </span>
            <div className="result-actions">
              <button className="btn-spin-again" onClick={handleSpinAgain}>
                もう一度
              </button>
              <button className="btn-dismiss" onClick={onDismiss}>
                閉じる
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
