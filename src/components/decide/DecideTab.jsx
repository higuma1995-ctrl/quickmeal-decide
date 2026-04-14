import { useState } from 'react';
import FilterArea from './FilterArea';
import DecideButton from './DecideButton';
import ResultArea from './ResultArea';
import AdModal from '../modals/AdModal';
import { filterCandidates, weightedPick } from '../../utils/lottery';

const EMPTY_FILTERS = { budget: [], time: [], scene: [] };

export default function DecideTab({ candidates, freeSpins, consumeSpin, tempExcluded, addTempExcluded, resetTempExcluded, currentResult, setCurrentResult, addLog, recentNames }) {
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [showAd, setShowAd] = useState(false);
  const [pendingRejectId, setPendingRejectId] = useState(null);

  // 候補プール（tempExcludedなし）：ボタン活性判定用
  const basePool = filterCandidates(candidates, filters, []);
  const isEmpty = basePool.length === 0;

  function doSpin(rejectId) {
    const excluded = rejectId ? [...tempExcluded, rejectId] : [...tempExcluded];
    let pool = filterCandidates(candidates, filters, excluded);

    if (pool.length === 0) {
      // 候補枯渇：一時除外をリセットして再試行
      resetTempExcluded();
      pool = filterCandidates(candidates, filters, []);
    } else if (rejectId) {
      addTempExcluded(rejectId);
    }

    if (pool.length === 0) return;

    const winner = weightedPick(pool, recentNames(5));
    setCurrentResult(winner);
    addLog(winner.name);
  }

  function handleDecide() {
    if (isEmpty) return;
    if (freeSpins > 0) {
      consumeSpin();
      doSpin(null);
    } else {
      setPendingRejectId(null);
      setShowAd(true);
    }
  }

  function handleReject() {
    const rejectId = currentResult?.id;
    if (freeSpins > 0) {
      consumeSpin();
      doSpin(rejectId);
    } else {
      setPendingRejectId(rejectId);
      setShowAd(true);
    }
  }

  function handleAccept() {
    // ログは既に保存済み。表示のみリセット
    setCurrentResult(null);
  }

  function handleAdSkip() {
    setShowAd(false);
    doSpin(pendingRejectId);
    setPendingRejectId(null);
  }

  return (
    <div className="tab-content">
      <FilterArea filters={filters} onChange={setFilters} />

      {isEmpty && (
        <p className="empty-message">
          条件に合う候補がありません。フィルタを変えてみてください。
        </p>
      )}

      <DecideButton onClick={handleDecide} disabled={isEmpty} />

      {currentResult && (
        <ResultArea
          result={currentResult}
          onAccept={handleAccept}
          onReject={handleReject}
        />
      )}

      {showAd && <AdModal onSkip={handleAdSkip} />}
    </div>
  );
}
