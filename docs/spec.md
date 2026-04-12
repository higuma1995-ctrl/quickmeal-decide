# QuickMeal Decide — Product Specification

## Overview

QuickMeal Decide is a lightweight web app that helps users instantly decide what to eat. The user registers their go-to quick meals, then taps a button to get a random pick with a spin animation.

## Target User

Someone who wastes time standing in front of the fridge thinking "what should I eat?" — they want a fast, fun decision without overthinking.

## Core Features

### 1. Meal List Management
- Display a list of registered meals with name and optional category tag
- Add a new meal (name + category)
- Delete an existing meal
- Pre-populated with a set of default meals so the app is useful on first launch
- Data persists in `localStorage`; no backend required

### 2. Spin & Decide
- Large, prominent "Decide!" button on the main screen
- Clicking it triggers a visual roulette-style spin animation cycling through meal names
- After ~2 seconds the animation slows and lands on one meal
- The chosen meal is displayed prominently with a brief "You should eat: X" message
- User can re-spin as many times as they like

### 3. Category Filter
- Categories: **All**, **Breakfast**, **Lunch**, **Dinner**, **Snack**
- Filtering limits which meals can be picked during a spin
- At least one meal must be available in the filtered set before spinning is allowed

### 4. Responsive & Mobile-First UI
- Works well on both mobile (primary) and desktop
- Clean, minimal design with a warm food-friendly color palette

## Out of Scope (v1)
- User accounts / cloud sync
- Nutritional information
- Recipe links
- Social sharing

## Default Meal Dataset

| Name | Category |
|---|---|
| Fried Rice | Lunch |
| Instant Ramen | Dinner |
| Avocado Toast | Breakfast |
| Caesar Salad | Lunch |
| Omelette | Breakfast |
| BLT Sandwich | Lunch |
| Granola & Yogurt | Breakfast |
| Pasta Aglio e Olio | Dinner |
| Veggie Stir-fry | Dinner |
| Hummus & Crackers | Snack |

## UX Flow

```
[Home Screen]
  ├── Category tabs (All / Breakfast / Lunch / Dinner / Snack)
  ├── Meal list (cards with name + tag + delete button)
  ├── [+ Add Meal] form (inline at bottom)
  └── [Decide!] button (sticky bottom or center)
       └── → Spin animation overlay
               └── → Result display ("You should eat: X")
                       └── [Spin Again] or [Dismiss]
```
