import { useState, useEffect } from 'react';
import { storage } from '../utils/storage';

const KEY = 'decisionLog';

export function useDecisionLog() {
  const [log, setLog] = useState(() => storage.get(KEY, []));

  useEffect(() => {
    storage.set(KEY, log);
  }, [log]);

  function addLog(name) {
    const entry = {
      id: Date.now().toString(),
      name,
      date: new Date().toISOString(),
    };
    setLog((prev) => [entry, ...prev]);
  }

  function removeLog(id) {
    setLog((prev) => prev.filter((e) => e.id !== id));
  }

  function clearLog() {
    setLog([]);
  }

  function recentNames(n) {
    return log.slice(0, n).map((e) => e.name);
  }

  return { log, addLog, removeLog, clearLog, recentNames };
}
