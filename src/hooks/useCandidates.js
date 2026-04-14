import { useState, useEffect } from 'react';
import { storage } from '../utils/storage';
import { normalizeName } from '../utils/normalize';
import { PRESETS } from '../constants/presets';

const KEY = 'candidates';

function initCandidates() {
  const stored = storage.get(KEY, null);
  if (stored && Array.isArray(stored) && stored.length > 0) {
    const storedIds = new Set(stored.map((c) => c.id));
    const missingPresets = PRESETS.filter((p) => !storedIds.has(p.id));
    return [...stored, ...missingPresets];
  }
  return PRESETS.map((p) => ({ ...p }));
}

export function useCandidates() {
  const [candidates, setCandidates] = useState(initCandidates);

  useEffect(() => {
    storage.set(KEY, candidates);
  }, [candidates]);

  function addCandidate(name) {
    const trimmed = name.trim();
    if (!trimmed) return { ok: false, error: '' };
    const normalized = normalizeName(trimmed);
    const duplicate = candidates.some(
      (c) => normalizeName(c.name) === normalized
    );
    if (duplicate) return { ok: false, error: '同じ名前の候補がすでにあります' };
    const newCandidate = {
      id: Date.now().toString(),
      name: trimmed,
      isPreset: false,
      isExcluded: false,
      tags: { budget: [], time: [], scene: [] },
    };
    setCandidates((prev) => [...prev, newCandidate]);
    return { ok: true };
  }

  function removeCandidate(id) {
    setCandidates((prev) =>
      prev.filter((c) => !(c.id === id && !c.isPreset))
    );
  }

  function updateCandidate(id, patch) {
    setCandidates((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...patch } : c))
    );
  }

  function toggleExclude(id) {
    setCandidates((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, isExcluded: !c.isExcluded } : c
      )
    );
  }

  return { candidates, addCandidate, removeCandidate, updateCandidate, toggleExclude };
}
