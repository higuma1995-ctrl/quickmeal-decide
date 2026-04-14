# architecture.md
_最終更新：2026-04-14_

> このファイルはClaude Codeが実装時に参照するファイル・コンポーネント構成の定義。
> spec.mdと矛盾する場合はspec.mdを優先する。

## 1. ディレクトリ構成

src/
├── main.jsx
├── App.jsx
├── constants/
│   └── presets.js
├── hooks/
│   ├── useCandidates.js
│   ├── useDecisionLog.js
│   └── useSession.js
├── components/
│   ├── layout/
│   │   ├── Header.jsx
│   │   └── BottomNav.jsx
│   ├── modals/
│   │   ├── TutorialModal.jsx
│   │   └── AdModal.jsx
│   ├── decide/
│   │   ├── DecideTab.jsx
│   │   ├── FilterArea.jsx
│   │   ├── DecideButton.jsx
│   │   └── ResultArea.jsx
│   ├── candidates/
│   │   ├── CandidatesTab.jsx
│   │   ├── AddCandidate.jsx
│   │   ├── CandidateList.jsx
│   │   └── CandidateItem.jsx
│   └── log/
│       ├── LogTab.jsx
│       └── LogItem.jsx
├── utils/
│   ├── lottery.js
│   ├── storage.js
│   └── normalize.js
└── styles/
    └── index.css

## 2. コンポーネント責務

App.jsx：アクティブタブの状態管理、TutorialModal表示制御
Header.jsx：アプリ名表示のみ
BottomNav.jsx：タブ切り替えUI
TutorialModal.jsx：初回チュートリアルモーダル
AdModal.jsx：擬似広告モーダル（5秒カウント）。将来のAdSense差し替え対象。このコンポーネント内の広告エリアを置き換える。
DecideTab.jsx：フィルタ・抽選・結果の統括。useSession・useCandidates・useDecisionLogを呼び出す
FilterArea.jsx：フィルタUIのみ。ロジックは親が持つ
ResultArea.jsx：結果表示・共有・却下ボタン
CandidateItem.jsx：タグ編集の展開・折りたたみを内部管理
lottery.js：重み付き抽選の純粋関数
storage.js：localStorage読み書きラッパー
normalize.js：候補名の正規化（重複チェック用）

## 3. カスタムフック

useCandidates.js：
- candidates: Candidate[]
- addCandidate(name): void
- removeCandidate(id): void
- updateCandidate(id, patch): void
- toggleExclude(id): void
- localStorageと常に同期
- 初期化時にpresets.jsをマージ（既存データがあれば上書きしない）

useDecisionLog.js：
- log: LogEntry[]
- addLog(name): void
- removeLog(id): void
- clearLog(): void
- recentNames(n): string[]

useSession.js：
- freeSpins: number
- consumeSpin(): void
- tempExcluded: string[]
- addTempExcluded(id): void
- resetTempExcluded(): void
- localStorageに保存しない（Reactのstateのみ）

## 4. 抽選ロジック詳細（lottery.js）

1. 全候補からフィルタ条件に合うものを抽出
   - タグ未設定候補は常に含める
   - tempExcludedに含まれる候補は除外
   - isExcluded === trueの候補は除外
2. 各候補に重みを付与
   - recentNames(5)に含まれる候補：weight = 0.3
   - それ以外：weight = 1.0
3. 重み付き抽選で1件を選出
4. 候補が0件の場合はtempExcludedをリセットして再試行

## 5. GitHub Actions

トリガー：mainブランチへのpush
ジョブ：npm install → npm run build → GitHub Pages deploy
ビルド出力：dist/
base URL：vite.config.jsで /quickmeal-decide/ を設定

## 6. PWA設定

public/manifest.json：
- name: QuickMeal Decide
- short_name: 飯決め
- icons（192px・512px）
- display: standalone
Service Worker：使用しない
