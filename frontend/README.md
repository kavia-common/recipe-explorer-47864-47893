# Recipe Explorer Frontend

A modern React app to browse, search, and view recipes. Styled with the Ocean Professional theme (blue primary with amber accents), responsive layout, and graceful API fallback to mock data.

## Features

- Ocean Professional theme with subtle gradients, rounded corners, and soft shadows
- Header with search and theme toggle (light/dark)
- Sidebar with category filters
- Recipe list view with modern cards
- Recipe detail view with ingredients and steps
- Basic router with routes: `/recipes`, `/recipes/:id`
- Environment-driven API base URL with mock fallback if not configured

## Quick Start

1. Install dependencies:
   - npm install

2. Configure environment (optional for live API):
   - Copy `.env.example` to `.env` and set `REACT_APP_API_BASE` or `REACT_APP_BACKEND_URL`.
   - If not set, the app uses mock data by default.

3. Run:
   - npm start
   - Open http://localhost:3000

## Environment Variables

See `.env.example` in this folder. Key entries:
- REACT_APP_API_BASE or REACT_APP_BACKEND_URL: Base URL for the backend API (e.g., https://api.example.com)
- Other optional settings (logging, feature flags, etc.) are provided for convenience.

When neither `REACT_APP_API_BASE` nor `REACT_APP_BACKEND_URL` is set, the app displays “Mock mode” in the header and serves a small curated dataset from the browser.

## Project Structure

- src/
  - App.js: App shell with routing
  - styles/theme.css: Theme variables
  - components/: Header, Sidebar, RecipeCard
  - pages/: RecipeList, RecipeDetail
  - context/RecipesContext.js: Global state for search and category
  - services/api.js: API client with mock fallback

## Styling

The app follows the Ocean Professional style guide:
- Primary: #2563EB
- Secondary (accent): #F59E0B
- Background: #f9fafb
- Surface: #ffffff
- Text: #111827

Rounded corners and shadows are used across surfaces, with soft transitions and gradient touches in headers and badges.

## Switching to Live API

1. Set `REACT_APP_API_BASE` or `REACT_APP_BACKEND_URL` in `.env`.
2. Restart the dev server if it’s running.
3. The app will automatically switch from mock data to live API calls.

## Testing

- npm test

## Build

- npm run build

This project is based on a lightweight React template and uses only React and minimal CSS for a fast, clean experience.
