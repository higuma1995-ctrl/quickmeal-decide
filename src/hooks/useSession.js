import { useState } from 'react';

export function useSession() {
  const [tempExcluded, setTempExcluded] = useState([]);
  const [currentResult, setCurrentResult] = useState(null);

  function addTempExcluded(id) {
    setTempExcluded((prev) => [...prev, id]);
  }

  function resetTempExcluded() {
    setTempExcluded([]);
  }

  return {
    tempExcluded,
    addTempExcluded,
    resetTempExcluded,
    currentResult,
    setCurrentResult,
  };
}
