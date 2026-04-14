import { useState } from 'react';

export function useSession() {
  const [freeSpins, setFreeSpins] = useState(1);
  const [tempExcluded, setTempExcluded] = useState([]);
  const [currentResult, setCurrentResult] = useState(null);

  function consumeSpin() {
    setFreeSpins((prev) => Math.max(0, prev - 1));
  }

  function addTempExcluded(id) {
    setTempExcluded((prev) => [...prev, id]);
  }

  function resetTempExcluded() {
    setTempExcluded([]);
  }

  return {
    freeSpins,
    consumeSpin,
    tempExcluded,
    addTempExcluded,
    resetTempExcluded,
    currentResult,
    setCurrentResult,
  };
}
