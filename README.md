
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

<p>
  <img src="https://skillicons.dev/icons?i=css,react,bootstrap," />
</p>

# AI Food Search + FoodFinder API

This workspace contains the frontend application for AI Food Search and connects to a Django REST backend named FoodFinder API.

- Frontend in this repo: React + Vite app
- Backend (separate repo/service): Django REST API with JWT auth and restaurant search

## Frontend Project Base


- React 
- CSS
- Bootstrap 


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
├── dist/                       # Production build output
│   ├── assets/
│   ├── android-chrome-512x512.png
│   ├── favicon.svg
│   ├── food.jpeg
│   ├── icons.svg
│   ├── index.html
│   └── login.json
│
├── public/                     # Static public assets
│
├── services/                   # API and authentication services
│   └── authService.js
│
├── src/                        # Application source code
│   ├── assets/                 # Images and static resources
│   │
│   ├── App.jsx                 # Main application component
│   ├── main.jsx                # Application entry point
│   │
│   ├── home.jsx                # Home page
│   ├── about.jsx               # About page
│   ├── login.jsx               # Login page
│   ├── signup.jsx              # Registration page
│   ├── search.jsx              # Food search functionality
│   ├── profile.jsx             # User profile page
│   ├── navbar.jsx              # Navigation component
│   │
│   ├── App.css
│   ├── home.module.css
│   ├── index.css
│   ├── login.css
│   ├── Profile.css
│   ├── search.css
│   └── signup.css
│
├── postman/                    # API testing collections
│
├── .gitignore                  # Git ignored files
├── eslint.config.js            # ESLint configuration
├── index.html                  # Root HTML template
├── LICENSE                     # Project license
├── package.json                # Project dependencies and scripts
├── package-lock.json           # Dependency lock file
├── README.md                   # Project documentation
├── vercel.json                 # Vercel deployment configuration
└── vite.config.js              # Vite configuration
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
=======
### Frontend Requirements

- Node.js 18+ (Node.js 20+ recommended)
- npm 9+

### Frontend Setup

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open the app (usually http://localhost:5173).

### Frontend Scripts

| Script | Description |
| --- | --- |
| npm run dev | Start Vite development server |
| npm run build | Build production assets |
| npm run preview | Preview production build locally |
| npm run lint | Run ESLint |

### Frontend Routes

| Route | Purpose |
| --- | --- |
| / and /home | Landing/home page |
| /about | About page |
| /login | Login page |
| /signup | Registration page |
| /search | Food and restaurant search |
| /profile | User profile |

## Backend Project Base (FoodFinder API)

FoodFinder is a Django REST API for user accounts and location-based restaurant search. It supports JWT authentication, profile management, and food search powered by OpenAI (with a mock fallback mode for local development).

### Backend Tech Stack

- Python 3.11
- Django
- Django REST Framework
- SimpleJWT (JWT auth)
- PostgreSQL
- Pipenv

### Backend Features

- User registration with extended profile fields
- JWT login and refresh
- Authenticated profile read/update
- Authenticated food search by:
  - query
  - latitude/longitude
  - radius
  - min rating
  - open now
  - price range
- Search history per user
- Cached search results
- OpenAI-backed restaurant results with optional mock fallback

### Backend Project Notes

The backend repository contains a nested foodfinder/ directory that appears to duplicate parts of the project. For normal development, use the root project where manage.py is in the repository root.

### Backend Prerequisites

- Python 3.11
- Pipenv
- PostgreSQL running locally (or reachable over network)

### Backend Environment Variables

Create a .env file in the backend repository root (same directory as manage.py):

```env
DJANGO_SECRET_KEY=dev-secret-change-me
DEBUG=1

DB_NAME=foodfinder
DB_USER=foodfinder
DB_PASSWORD=foodfinder
DB_HOST=127.0.0.1
DB_PORT=5432

# OpenAI
OPENAI_API_KEY=
OPENAI_MODEL=gpt-4.1-mini

# If true, API can return mock restaurant data when OpenAI is unavailable
ENABLE_MOCK_SEARCH_FALLBACK=1

# Optional cache backend (if unset, local in-memory cache is used)
# REDIS_URL=redis://127.0.0.1:6379/1

# Provider switch (current router path uses OpenAI)
PLACES_PROVIDER=yelp
```

### Backend Local Setup

1. Install dependencies:

```bash
pipenv install
```

2. Activate virtual environment:

```bash
pipenv shell
```

3. Create PostgreSQL database and user (example):

```sql
CREATE DATABASE foodfinder;
CREATE USER foodfinder WITH PASSWORD 'foodfinder';
GRANT ALL PRIVILEGES ON DATABASE foodfinder TO foodfinder;
```

4. Run migrations:

```bash
python manage.py migrate
```

5. Start development server:

```bash
python manage.py runserver
```

API base URL (default):

```text
http://127.0.0.1:8000/api/
```

### Running Backend Tests

```bash
python manage.py test
```

### API Endpoints

#### Public

- GET /api/health/
- POST /api/auth/register/
- GET /api/auth/register/options/
- POST /api/auth/login/
- POST /api/auth/refresh/

#### Authenticated (Bearer token required)

- GET /api/auth/profile/
- PATCH /api/auth/profile/
- POST /api/food/search/
- GET /api/my-search-history/?limit=20

### Auth Flow (Quick Start)

1. Register user
2. Login to receive tokens
3. Send Authorization: Bearer <access_token> for protected endpoints
4. Refresh token via /api/auth/refresh/ when needed

### Example Requests

#### Register

```bash
curl -X POST http://127.0.0.1:8000/api/auth/register/ \
  -H "Content-Type: application/json" \
  -d '{
    "email": "newuser@example.com",
    "password": "securepass123",
    "confirm_password": "securepass123",
    "name": "New User",
    "home_address": "123 Main St",
    "birthday": "1996-07-20",
    "phone_number": "+1 555 101 2020",
    "gender": "female",
    "preferred_language": "es"
  }'
```

#### Login

```bash
curl -X POST http://127.0.0.1:8000/api/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{
    "username": "newuser@example.com",
    "password": "securepass123"
  }'
```

#### Food Search (Authenticated)

```bash
curl -X POST http://127.0.0.1:8000/api/food/search/ \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <access_token>" \
  -d '{
    "query": "pizza",
    "lat": 37.7749,
    "lng": -122.4194,
    "radius_m": 3000,
    "limit": 10,
    "min_rating": 4.0,
    "open_now": true,
    "price_range": [1, 2]
  }'
```

#### Get Search History

```bash
curl "http://127.0.0.1:8000/api/my-search-history/?limit=20" \
  -H "Authorization: Bearer <access_token>"
```

## Troubleshooting

### Missing OpenAI API Key
If the application cannot connect to the OpenAI API, verify that the `OPENAI_API_KEY` environment variable is properly configured. For local development and testing, `ENABLE_MOCK_SEARCH_FALLBACK=1` can be used to enable mock search results.

### Database Connection Issues
If the application is unable to connect to PostgreSQL:
- Verify that the database credentials in the `.env` file are correct.
- Ensure the PostgreSQL service is running and accessible.
- Confirm that the database URL and connection settings match the target environment.
- Run any pending database migrations.

### 401 Unauthorized Errors
If protected endpoints return a `401 Unauthorized` response:
- Ensure the `Authorization: Bearer <access_token>` header is included in the request.
- Verify that the access token is valid and has not expired.
- Confirm that authentication-related environment variables are correctly configured.

### System Integration Issue: Application Works Locally but Fails After Deployment

#### Problem
The application functioned correctly in the local development environment but encountered errors after deployment. Certain features became unavailable due to differences between local and production configurations.

#### Root Cause
The issue was traced to missing environment variables and configuration settings in the production environment. Additionally, required database migrations had not been applied to the production database.

#### Resolution
- Reviewed deployment and application logs to identify the source of the issue.
- Validated all production environment variables and application settings.
- Verified database connectivity and configuration.
- Applied pending database migrations.
- Tested API endpoints and external service integrations independently to isolate failures.
- Redeployed the application after implementing the necessary configuration updates.

#### Outcome
The application was successfully restored in the production environment, with all services, database connections, and integrated components functioning as expected.

## Frontend-Backend Integration

This frontend currently calls backend endpoints from [services/authService.js](services/authService.js), using base URLs on http://localhost:8000.

If backend host/port changes, update:

- REGISTER_API_URL
- LOGIN_API_URL
- SEARCH_API_URL
- profile endpoint URLs in fetchUserProfile and updateUserProfile

## Local Full-Stack Run Order

1. Start FoodFinder API backend on port 8000.
2. Start frontend with npm run dev.
3. Validate flow: Signup -> Login -> Search -> Profile.

## Project Structure (Backend)
 
```
foodfinder/                       # Project root
│
├── api/                          # Core Django application
│   ├── migrations/               # Database migrations
│   │   ├── __init__.py
│   │   └── 0001_initial.py
│   │
│   ├── services/                 # External service integrations
│   │   ├── __init__.py
│   │   ├── ai_openai.py          # OpenAI recommendation engine
│   │   ├── geo.py                # Geolocation utilities
│   │   ├── places_google.py      # Google Places integration
│   │   ├── places_router.py      # Provider routing logic
│   │   └── places_yelp.py        # Yelp integration
│   │
│   ├── __init__.py
│   ├── admin.py
│   ├── apps.py
│   ├── models.py
│   ├── serializers.py
│   ├── tests.py
│   ├── urls.py
│   └── views.py
│
├── foodfinder/                   # Django project configuration
│   ├── __init__.py
│   ├── asgi.py
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
│
├── .env                          # Environment variables (not committed)
├── .gitignore
├── LICENSE
├── manage.py
├── Pipfile
├── Procfile
├── requirements.txt
└── README.md
```


## Session and Security Notes

- Token and user info are stored in localStorage.
- Protected requests include Bearer token headers.
- On profile 401, frontend clears auth session and asks user to log in again.

## License

See [LICENSE](LICENSE).


