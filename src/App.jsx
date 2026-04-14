import { useState } from 'react';
import { storage } from './utils/storage';
import { useCandidates } from './hooks/useCandidates';
import { useDecisionLog } from './hooks/useDecisionLog';
import { useSession } from './hooks/useSession';
import Header from './components/layout/Header';
import BottomNav from './components/layout/BottomNav';
import TutorialModal from './components/modals/TutorialModal';
import DecideTab from './components/decide/DecideTab';
import CandidatesTab from './components/candidates/CandidatesTab';
import LogTab from './components/log/LogTab';

export default function App() {
  const [activeTab, setActiveTab] = useState('decide');
  const [showTutorial, setShowTutorial] = useState(
    () => !storage.get('tutorial_done', false)
  );

  const { candidates, addCandidate, removeCandidate, updateCandidate, toggleExclude } = useCandidates();
  const { log, addLog, removeLog, clearLog, recentNames } = useDecisionLog();
  const {
    freeSpins, consumeSpin,
    tempExcluded, addTempExcluded, resetTempExcluded,
    currentResult, setCurrentResult,
  } = useSession();

  function handleCloseTutorial() {
    storage.set('tutorial_done', true);
    setShowTutorial(false);
  }

  return (
    <div className="app">
      <Header />

      <main className="app-main">
        {activeTab === 'decide' && (
          <DecideTab
            candidates={candidates}
            freeSpins={freeSpins}
            consumeSpin={consumeSpin}
            tempExcluded={tempExcluded}
            addTempExcluded={addTempExcluded}
            resetTempExcluded={resetTempExcluded}
            currentResult={currentResult}
            setCurrentResult={setCurrentResult}
            addLog={addLog}
            recentNames={recentNames}
          />
        )}
        {activeTab === 'candidates' && (
          <CandidatesTab
            candidates={candidates}
            onAdd={addCandidate}
            onRemove={removeCandidate}
            onUpdate={updateCandidate}
            onToggleExclude={toggleExclude}
          />
        )}
        {activeTab === 'log' && (
          <LogTab log={log} onRemove={removeLog} onClear={clearLog} />
        )}
      </main>

      <BottomNav activeTab={activeTab} onSelect={setActiveTab} />

      {showTutorial && <TutorialModal onClose={handleCloseTutorial} />}
    </div>
  );
}
