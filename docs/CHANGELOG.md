# CHANGELOG.md

> 記録ルール
> - 実装前に必ず記録する
> - 形式：日付・変更内容・理由・影響範囲
> - 複数仕様の併存禁止・推測実装禁止

## [0.3.0] 2026-04-14

### 変更
- 再抽選を無制限無料に変更（擬似広告モーダルを廃止）
- 結果表示後にバナー広告エリアを追加（AdSense差し替え前提）

### 理由
- 再抽選時の広告はアプリの目的（摩擦ゼロ）と矛盾し離脱につながるため
- バナー広告は結果確認後に表示するため摩擦が少ない

### 影響範囲
- docs/CHANGELOG.md
- docs/spec.md
- docs/requirements.md
- src/components/modals/AdModal.jsx（廃止）
- src/components/decide/DecideTab.jsx
- src/components/decide/ResultArea.jsx
- src/hooks/useSession.js（freeSpins削除）

## [0.2.0] 2026-04-14

### 変更
- docs/を正式仕様に入れ替え（Claude Codeが自動生成したものを破棄）
- requirements.md・spec.md・architecture.md・CHANGELOG.mdを正式版に更新

### 理由
- 初回実装時のdocsはClaude Codeが独自生成したもので正式仕様と乖離があったため

### 影響範囲
- docs/全ファイル

## [0.1.0] 2026-04-13

### 追加
- Vite+Reactプロジェクト初期作成
- Claude Codeによる初回実装・GitHub Pages公開
- GitHub Actions（deploy-pages.yml）設定

### 影響範囲
- 全ファイル（初版のため）
