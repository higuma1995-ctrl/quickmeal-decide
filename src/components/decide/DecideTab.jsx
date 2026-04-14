import { useState, useRef, useEffect } from 'react';
import FilterArea from './FilterArea';
import DecideButton from './DecideButton';
import ResultArea from './ResultArea';
import { filterCandidates, weightedPick } from '../../utils/lottery';

const EMPTY_FILTERS = { budget: [], time: [], scene: [] };

// 合計0.8秒になるよう均等配分（10ステップ × 平均80ms）
const SPIN_STEPS = 10;
const SPIN_START_DELAY = 40;  // ms（最初は速い）
const SPIN_END_DELAY = 120;   // ms（最後は遅い）

export default function DecideTab({ candidates, tempExcluded, addTempExcluded, resetTempExcluded, currentResult, setCurrentResult, addLog, recentNames }) {
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinDisplay, setSpinDisplay] = useState('');
  const timerRef = useRef(null);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const basePool = filterCandidates(candidates, filters, []);
  const isEmpty = basePool.length === 0;

  function startSpin(rejectId) {
    const excluded = rejectId ? [...tempExcluded, rejectId] : [...tempExcluded];
    let pool = filterCandidates(candidates, filters, excluded);

    if (pool.length === 0) {
      resetTempExcluded();
      pool = filterCandidates(candidates, filters, []);
    } else if (rejectId) {
      addTempExcluded(rejectId);
    }

    if (pool.length === 0) return;

    const winner = weightedPick(pool, recentNames(5));

    setCurrentResult(null);
    setIsSpinning(true);

    let step = 0;

    function tick() {
      if (step < SPIN_STEPS) {
        const idx = Math.floor(Math.random() * pool.length);
        setSpinDisplay(pool[idx].name);
        const delay =
          SPIN_START_DELAY +
          (step / (SPIN_STEPS - 1)) * (SPIN_END_DELAY - SPIN_START_DELAY);
        step++;
        timerRef.current = setTimeout(tick, delay);
      } else {
        setIsSpinning(false);
        setCurrentResult(winner);
        addLog(winner.name);
      }
    }

    tick();
  }

  function handleDecide() {
    if (isEmpty || isSpinning) return;
    startSpin(null);
  }

  function handleReject() {
    if (isSpinning) return;
    startSpin(currentResult?.id);
  }

  function handleAccept() {
    setCurrentResult(null);
  }

  return (
    <div className="tab-content">
      <FilterArea filters={filters} onChange={setFilters} />

      {isEmpty && (
        <p className="empty-message">
          条件に合う候補がありません。フィルタを変えてみてください。
        </p>
      )}

      <DecideButton onClick={handleDecide} disabled={isEmpty || isSpinning} />

      {isSpinning && (
        <div className="shuffle-display">
          <p className="shuffle-label">抽選中…</p>
          <p key={spinDisplay} className="shuffle-name">{spinDisplay}</p>
        </div>
      )}

      {!isSpinning && currentResult && (
        <ResultArea
          result={currentResult}
          onAccept={handleAccept}
          onReject={handleReject}
        />
      )}
    </div>
  );
}
