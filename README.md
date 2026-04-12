# QuickMeal Decide

A lightweight React app that helps you instantly decide what to eat. Register your go-to meals, then tap **Decide!** to get a random pick with a fun spin animation.

**Live site:** https://higuma1995-ctrl.github.io/quickmeal-decide/

## Features

- **Spin & Decide** — large "Decide!" button triggers a roulette-style animation that lands on a random meal
- **Meal management** — add or delete meals; each has a name and category (Breakfast / Lunch / Dinner / Snack)
- **Category filter tabs** — filter the pool before spinning so you only pick from the right meal type
- **Persistent data** — meals are saved in `localStorage`, so your list survives page refreshes
- **Pre-loaded defaults** — 10 default meals across all categories so the app is useful on first launch
- **Mobile-first** — responsive layout with a warm, food-friendly color palette; no external CSS library

## Tech stack

- React 19 + Vite 8
- Plain CSS (CSS variables, no Tailwind or CSS-in-JS)
- GitHub Actions → GitHub Pages for CI/CD

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview   # preview the production build locally
```

## Deployment

Pushes to `main` automatically trigger the GitHub Actions workflow (`.github/workflows/deploy.yml`) which builds the app and deploys it to GitHub Pages.
