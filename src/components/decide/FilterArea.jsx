const FILTER_OPTIONS = {
  budget: ['節約', '定番', 'ご馳走'],
  time: ['ランチ', 'ディナー'],
  scene: ['カフェ', '食事メイン', '飲み会', '二次会'],
};

const AXIS_LABELS = {
  budget: '予算',
  time: '時間帯',
  scene: 'シーン',
};

export default function FilterArea({ filters, onChange }) {
  function toggle(axis, value) {
    const current = filters[axis];
    const next = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    onChange({ ...filters, [axis]: next });
  }

  return (
    <div className="filter-area">
      {Object.entries(FILTER_OPTIONS).map(([axis, options]) => (
        <div key={axis} className="filter-axis">
          <span className="filter-axis-label">{AXIS_LABELS[axis]}</span>
          <div className="filter-toggles">
            {options.map((opt) => (
              <button
                key={opt}
                className={`filter-toggle${filters[axis].includes(opt) ? ' active' : ''}`}
                onClick={() => toggle(axis, opt)}
                aria-pressed={filters[axis].includes(opt)}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
