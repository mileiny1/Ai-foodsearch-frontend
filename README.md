# AI FoodSearch

AI FoodSearch is a React + Vite frontend for discovering restaurants with AI-assisted search filters, account authentication, and profile management.

## Features

- User authentication
  - Sign up with extended profile fields
  - Log in with username or email
  - Persisted auth session in local storage
- Restaurant search
  - Keyword-based search (for example: pizza, sushi)
  - Location lookup using OpenStreetMap Nominatim
  - Auto-filled latitude/longitude from selected place
  - Filters for radius, result limit, minimum rating, open now, and price range
- Profile support
  - Fetch and update user profile from backend
- Routing
  - Pages: Home, About, Login, Signup, Search, Profile

## Tech Stack

- React 19
- Vite 8
- React Router DOM 7
- Bootstrap 5 + React Bootstrap
- ESLint 9

## Prerequisites

- Node.js 18+ (recommended)
- npm 9+
- Backend API running locally at:
  - `http://localhost:8000/api/auth/register/`
  - `http://localhost:8000/api/auth/login/`
  - `http://localhost:8000/api/auth/profile/`
  - `http://localhost:8000/api/food/search/`

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open the app in your browser (Vite will print the local URL, usually `http://localhost:5173`).

## Available Scripts

- `npm run dev` - start Vite dev server
- `npm run build` - create production build
- `npm run preview` - preview production build locally
- `npm run lint` - run ESLint

## Project Structure

```text
ai-foodsearch/
  public/
  services/
    authService.js
  src/
    App.jsx
    main.jsx
    home.jsx
    about.jsx
    login.jsx
    signup.jsx
    search.jsx
    profile.jsx
    navbar.jsx
    *.css
    *.module.css
  index.html
  package.json
  vite.config.js
  eslint.config.js
```

## Backend Integration Notes

- API calls are centralized in `services/authService.js`.
- Auth token is stored in local storage as `token` and sent as a Bearer token for protected endpoints.
- If profile requests return `401`, the current session is cleared and the user is prompted to log in again.

## Search Flow Summary

1. User enters a food query and location text.
2. Location text is geocoded using OpenStreetMap Nominatim.
3. User selects a matching place to set latitude/longitude.
4. Frontend sends a filtered search payload to `/api/food/search/`.
5. Results are normalized and rendered as restaurant cards.

## Notes

- The app expects a compatible backend response format; search results are normalized to support common field variants.
- Ensure CORS is enabled on your backend for local frontend development.

## License

This project is licensed under the terms in [LICENSE](LICENSE).
