# AI FoodSearch

> A React + Vite web app for discovering restaurants with AI-assisted search, JWT authenticated accounts, and full profile management.

[![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=flat&logo=bootstrap&logoColor=white)](https://getbootstrap.com/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Routes](#routes)
- [Backend Integration](#backend-integration)
- [Search Flow](#search-flow)

---

## Overview

AI FoodSearch is the React frontend for a fullstack restaurant discovery platform. It connects to the [FoodFinder API](https://github.com/your-username/foodfinder-backend)  a Django REST backend to provide AI powered restaurant recommendations filtered by location, rating, price, and availability.

Users can create an account, search for food nearby, and manage their profile  all through a responsive, Bootstrap styled interface.

---

## Features

**Authentication**
- Sign up with extended profile fields (name, address, birthday, phone, gender, preferred language)
- Log in with username or email
- Session persisted in `localStorage` with JWT bearer tokens

**Restaurant Search**
- Keyword based search (e.g. pizza, sushi, tacos)
- Location lookup powered by OpenStreetMap Nominatim
- Auto filled latitude/longitude from selected place
- Filters: search radius, result limit, minimum rating, open now, price range

**Profile Management**
- View and update user profile via authenticated API calls
- Automatic session clear and re login prompt on `401` responses

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 |
| Build Tool | Vite |
| Styling | CSS Modules + Bootstrap |
| Routing | React Router |
| HTTP / Auth | Fetch API + JWT (Bearer token) |
| Geocoding | OpenStreetMap Nominatim |
| Deployment | Vercel |

---

## Project Structure

```
ai-foodsearch/
│
├── dist/                         # Production build output (auto-generated)
│   ├── assets/
│   ├── android-chrome-512x512.png
│   ├── favicon.svg
│   ├── food.jpeg
│   ├── icons.svg
│   ├── index.html
│   └── login.json
│
├── postman/                      # API test collections for backend endpoints
│
├── public/                       # Static assets served at root
│
├── services/                     # Centralized API communication layer
│   └── authService.js            # Auth + search + profile API calls
│
├── src/                          # Application source
│   ├── assets/                   # Images and static resources
│   │
│   ├── App.jsx                   # Root component with route definitions
│   ├── main.jsx                  # React entry point
│   │
│   ├── home.jsx                  # Landing/home page
│   ├── about.jsx                 # About page
│   ├── login.jsx                 # Login page
│   ├── signup.jsx                # Registration page
│   ├── search.jsx                # Restaurant search with filters
│   ├── profile.jsx               # Authenticated user profile page
│   ├── navbar.jsx                # Global navigation bar
│   │
│   ├── App.css                   # Global app styles
│   ├── home.module.css           # Home page CSS module
│   ├── index.css                 # Root-level styles
│   ├── login.css                 # Login page styles
│   ├── Profile.css               # Profile page styles
│   ├── search.css                # Search page styles
│   └── signup.css                # Signup page styles
│
├── .gitignore
├── eslint.config.js              # ESLint configuration
├── index.html                    # Root HTML template (Vite entry)
├── LICENSE
├── package.json
├── package-lock.json
├── README.md
├── vercel.json                   # Vercel deployment config
└── vite.config.js                # Vite build configuration
```

### Key Directories at a Glance

| Directory / File | Purpose |
|---|---|
| `src/` | All React components and page views |
| `services/authService.js` | Single file for all API calls — auth, search, and profile |
| `postman/` | Pre-built request collections to test the backend API |
| `dist/` | Production build artifacts (do not edit manually) |
| `vercel.json` | Configures SPA routing on Vercel deployment |

---

## Getting Started

### Prerequisites

- Node.js 18+ (Node.js 20+ recommended)
- npm 9+
- [FoodFinder API](https://github.com/your-username/foodfinder-backend) running locally on port `8000`

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/your-username/ai-foodsearch.git
cd ai-foodsearch
```

**2. Install dependencies**

```bash
npm install
```

**3. Start the development server**

```bash
npm run dev
```

The app will be available at `http://localhost:5173` (Vite will print the exact URL).

> Make sure the FoodFinder API backend is running on `http://localhost:8000` before using auth or search features.

---

## Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start Vite development server with hot reload |
| `npm run build` | Create optimized production build in `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint across the project |

---

## Routes

| Route | Component | Access |
|---|---|---|
| `/` | `home.jsx` | Public |
| `/home` | `home.jsx` | Public |
| `/about` | `about.jsx` | Public |
| `/login` | `login.jsx` | Public |
| `/signup` | `signup.jsx` | Public |
| `/search` | `search.jsx` | Authenticated |
| `/profile` | `profile.jsx` | Authenticated |

---

## Backend Integration

All API communication is centralized in `services/authService.js`. The file contains the following base URLs  update these if the backend host or port changes:

| Constant | Endpoint |
|---|---|
| `REGISTER_API_URL` | `http://localhost:8000/api/auth/register/` |
| `LOGIN_API_URL` | `http://localhost:8000/api/auth/login/` |
| `SEARCH_API_URL` | `http://localhost:8000/api/food/search/` |
| Profile endpoints | `http://localhost:8000/api/auth/profile/` |

**Auth behavior:**
- JWT access token stored in `localStorage` as `token`
- All protected requests send `Authorization: Bearer <token>`
- On `401` response from profile endpoint, session is cleared and user is redirected to login

---

## Search Flow

```
1. User types a food keyword (e.g. "sushi") and a location (e.g. "Brooklyn, NY")
        ↓
2. Location is geocoded via OpenStreetMap Nominatim → returns lat/lng candidates
        ↓
3. User selects a place → latitude and longitude are auto-filled into the form
        ↓
4. Frontend sends search payload to POST /api/food/search/ with all active filters
        ↓
5. Results are normalized to handle field variants and rendered as restaurant cards
```

---

## Troubleshooting

### Backend Not Running

If search, login, or profile features return network errors, ensure the FoodFinder API is running on `http://localhost:8000` before starting the frontend. See the [FoodFinder API](https://github.com/your-username/foodfinder-backend) repo for setup instructions.

### 401 Unauthorized Errors

If the app silently logs you out or redirects to login:

- Your access token has likely expired log in again to receive a fresh token.
- Verify the backend is running and reachable at the expected URL.
- Check that `token` exists in `localStorage` (DevTools → Application → Local Storage).

### Location Search Returns No Results

If the location input finds no matching places:

- Ensure the search term is specific enough (e.g. `Brooklyn, NY` rather than `Brooklyn`).
- OpenStreetMap Nominatim may rate-limit rapid requests — wait a moment and try again.
- Confirm your network connection allows requests to `nominatim.openstreetmap.org`.

### Search Results Not Appearing

If restaurant cards don't render after a successful search:

- Open DevTools → Network and confirm `POST /api/food/search/` returns a `200` response.
- Verify the backend has `ENABLE_MOCK_SEARCH_FALLBACK=1` set if no OpenAI key is configured.
- Ensure CORS is enabled on the backend for `http://localhost:5173`.

### App Works Locally but Fails After Deployment

#### Problem

The application functioned correctly in the local development environment but encountered errors after deployment. Certain features became unavailable due to differences between local and production configurations.

#### Root Cause

API base URLs in `services/authService.js` were hardcoded to `localhost:8000`, causing all requests to fail in the production environment where the backend runs on a different host.

#### Resolution

- Updated all API base URLs in `authService.js` to point to the production backend URL.
- Verified `vercel.json` was correctly configured to handle client side SPA routing (prevent 404s on page refresh).
- Confirmed the production backend had CORS enabled for the deployed frontend domain.
- Redeployed the frontend after applying the configuration updates.

#### Outcome

The application was successfully restored in the production environment, with authentication, search, and profile features functioning as expected.

---

## License

This project is licensed under the terms in [LICENSE](LICENSE).


