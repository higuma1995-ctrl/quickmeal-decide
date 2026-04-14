/**
 * フィルタ条件に合う候補を返す。
 * - isExcluded === true の候補は除外
 * - tempExcluded に含まれる候補は除外
 * - タグが1つも設定されていない候補はフィルタに関わらず常に含める
 * - フィルタが全て空の場合は全候補を返す
 * - 軸内：OR、軸間：AND
 */
export function filterCandidates(candidates, filters, tempExcluded) {
  const excludedSet = new Set(tempExcluded);
  const noFilterActive =
    filters.budget.length === 0 &&
    filters.time.length === 0 &&
    filters.scene.length === 0;

  return candidates.filter((c) => {
    if (c.isExcluded) return false;
    if (excludedSet.has(c.id)) return false;

    if (noFilterActive) return true;

    const hasNoTags =
      c.tags.budget.length === 0 &&
      c.tags.time.length === 0 &&
      c.tags.scene.length === 0;
    if (hasNoTags) return true;

    const budgetMatch =
      filters.budget.length === 0 ||
      filters.budget.some((f) => c.tags.budget.includes(f));
    const timeMatch =
      filters.time.length === 0 ||
      filters.time.some((f) => c.tags.time.includes(f));
    const sceneMatch =
      filters.scene.length === 0 ||
      filters.scene.some((f) => c.tags.scene.includes(f));

    return budgetMatch && timeMatch && sceneMatch;
  });
}

/**
 * 重み付きランダム抽選。recentNamesに含まれる候補の重みは0.3。
 */
export function weightedPick(candidates, recentNames) {
  if (candidates.length === 0) return null;
  const recentSet = new Set(recentNames);
  const weighted = candidates.map((c) => ({
    candidate: c,
    weight: recentSet.has(c.name) ? 0.3 : 1.0,
  }));
  const total = weighted.reduce((s, w) => s + w.weight, 0);
  let rand = Math.random() * total;
  for (const { candidate, weight } of weighted) {
    rand -= weight;
    if (rand <= 0) return candidate;
  }
  return weighted[weighted.length - 1].candidate;
}
