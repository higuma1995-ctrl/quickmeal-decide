# QuickMeal Decide — Architecture

## Tech Stack

| Layer | Choice | Reason |
|---|---|---|
| Framework | React 19 + Vite 8 | Already scaffolded; fast HMR for development |
| Styling | Plain CSS (CSS variables) | No build-time dependency; easy theming |
| State | React `useState` + `useReducer` | App state is simple enough; no external store needed |
| Persistence | `localStorage` via custom hook | Zero-backend; works offline |
| Hosting | GitHub Pages | Free static hosting; CI via GitHub Actions |

## Directory Structure

```
src/
├── main.jsx              # React root mount
├── App.jsx               # Root component: layout + routing of views
├── App.css               # Global styles, CSS variables, layout
├── index.css             # CSS reset + base typography
├── hooks/
│   └── useMeals.js       # Custom hook: meal CRUD + localStorage sync
├── components/
│   ├── CategoryTabs.jsx  # Filter tab bar (All / Breakfast / …)
│   ├── MealList.jsx      # Scrollable list of MealCard components
│   ├── MealCard.jsx      # Single meal row with delete button
│   ├── AddMealForm.jsx   # Inline form: name input + category select + submit
│   ├── DecideButton.jsx  # Big "Decide!" CTA button
│   └── SpinOverlay.jsx   # Full-screen overlay with spin animation + result
└── data/
    └── defaultMeals.js   # Seed dataset (imported once into localStorage)
```

## State Shape

```js
// Managed by useMeals hook
{
  meals: [
    { id: string, name: string, category: 'Breakfast'|'Lunch'|'Dinner'|'Snack' }
  ]
}

// Local UI state in App.jsx
{
  activeCategory: 'All' | 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack',
  isSpinning: boolean,
  pickedMeal: meal | null
}
```

## Component Responsibilities

### `App.jsx`
- Owns `activeCategory`, `isSpinning`, `pickedMeal` state
- Calls `useMeals` for meal CRUD
- Computes `filteredMeals` from `meals` + `activeCategory`
- Passes handlers down as props (no context needed at this scale)

### `useMeals.js`
- Initialises `meals` from `localStorage`; seeds defaults if empty
- Exposes: `meals`, `addMeal(name, category)`, `deleteMeal(id)`
- Writes to `localStorage` on every change via `useEffect`

### `SpinOverlay.jsx`
- Receives `meals` (filtered), `onClose` callback
- Runs a `setInterval` cycling through random meal names (fast → slow)
- After animation ends, calls `onClose(pickedMeal)` so `App` can record the result
- Pure presentational animation — no business logic

## Data Flow

```
localStorage
    │  initialise
    ▼
useMeals ──── meals ────► App ──── filteredMeals ──► MealList
                          │                          CategoryTabs
                          │
                          ├── addMeal ◄── AddMealForm
                          ├── deleteMeal ◄── MealCard
                          │
                          └── isSpinning / pickedMeal
                                │
                                ▼
                          SpinOverlay (modal)
```

## Build & Deploy

### Local development
```bash
npm run dev        # Vite dev server at localhost:5173
npm run build      # Production build → dist/
npm run preview    # Preview production build locally
```

### GitHub Pages deployment
- `vite.config.js` sets `base: '/quickmeal-decide/'` for correct asset paths
- GitHub Actions workflow (`.github/workflows/deploy.yml`) triggers on push to `main`:
  1. `npm ci`
  2. `npm run build`
  3. Deploy `dist/` to the `gh-pages` branch using `actions/deploy-pages`
- Repository → Settings → Pages → Source: GitHub Actions

## Performance Notes
- All state lives in memory + localStorage; no network requests
- Bundle is tiny (React + app code only); no UI library dependency
- Spin animation uses `setInterval` + React state updates — no CSS animation library needed
