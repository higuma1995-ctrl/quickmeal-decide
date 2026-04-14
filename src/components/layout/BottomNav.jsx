const TABS = [
  { id: 'decide', label: '決める', icon: '🎯' },
  { id: 'candidates', label: '候補', icon: '📋' },
  { id: 'log', label: 'ログ', icon: '📜' },
];

export default function BottomNav({ activeTab, onSelect }) {
  return (
    <nav className="bottom-nav" role="tablist" aria-label="メインナビゲーション">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          role="tab"
          aria-selected={activeTab === tab.id}
          className={`bottom-nav-item${activeTab === tab.id ? ' active' : ''}`}
          onClick={() => onSelect(tab.id)}
        >
          <span className="bottom-nav-icon">{tab.icon}</span>
          <span className="bottom-nav-label">{tab.label}</span>
        </button>
      ))}
    </nav>
  );
}
