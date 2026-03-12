# Filmovie

Filmovie is a TypeScript movie discovery web app for browsing trending titles, searching TMDB, and
managing personal movie lists. The project started as an independent continuation of the original
course project known as "Filmoteka" and has since grown into a frontend application with working
backend integration for authentication and list synchronization.

## Live Demo

Frontend: https://mikel538.github.io/Filmovie/

Backend API Repo: https://github.com/MikeL538/Filmoteka-Server

Backend API: https://filmoteka-server-oso6.onrender.com

## Features

- Browse trending movies from TMDB
- Search movies by title
- Infinite scroll on the home page
- Movie details modal with poster, rating, popularity, genres, and overview
- Add and remove movies from `Watched` and `Queue`
- Library page with separate `Watched` and `Queue` tabs
- `EN` / `PL` language switching
- Fallback support for missing localized data
- Registration and login modals
- Account verification flow handled by the backend
- User list synchronization with the backend after login
- Local `localStorage` persistence for guest usage and session continuity
- Responsive layout for mobile, tablet, and desktop
- Notifications and loading states, including Render cold-start feedback

## Screenshots

### Desktop

![Filmovie Desktop](./src/images/FilmovieMain.webp)

### Mobile

![Filmovie Mobile](./src/images/FilmovieMobile.webp)

## Tech Stack

### Frontend

- TypeScript
- HTML partials
- SCSS
- Parcel 2
- Axios
- Notiflix
- Infinite Scroll
- TMDB API

### Backend Integration

Filmovie is integrated with a separate backend project that currently provides:

- user registration
- login
- email/account verification flow
- user movie lists: `watched` and `queued`
- list persistence and sync between sessions
- deployed API on Render

Backend repository used for integration: `Filmovie-Server` —
https://github.com/MikeL538/Filmoteka-Server

## How It Works

### Guest mode

Without logging in, users can still browse movies, search titles, open details, and manage their
library locally with `localStorage`.

### Authenticated mode

After logging in, Filmovie downloads the user's `watched` and `queued` lists from the backend and
keeps list updates synchronized through API requests.

### Verification flow

The backend supports account verification before login is allowed. In the current frontend flow,
verification support is already wired in, and when the server reports an unverified account, the app
surfaces the activation link returned by the API.

## Project Structure

```text
src/
  index.html                Home page
  library.html              Library page
  main.ts                   Global app bootstrap
  library.ts                Library page bootstrap
  ts/api/                   TMDB and backend API integration
  ts/features/              Page-level controllers
  ts/ui/                    Rendering, search, modals, notifications
  partials/                 Reusable HTML partials
  scss/                     Responsive styles
  images/                   App assets and README screenshots
```

## Requirements

- Node.js LTS
- npm

## Installation

```bash
npm install
```

## Environment Setup

Create a `.env` file in the project root:

```env
TMDB_API_TOKEN=your_tmdb_bearer_token
```

The TMDB bearer token is required because the frontend reads it from `process.env.TMDB_API_TOKEN`.

## Running The Project

### Frontend only

```bash
npm run dev
```

This starts Parcel for both HTML entry points.

### Frontend with backend

To use registration, login, verification, and list sync locally:

1. Run the Filmovie frontend.
2. Run the `Filmovie-Server` backend.
3. Make sure the API base URL in `src/ts/api/filmotekaServerApi.ts` matches the environment you want
   to use.

The frontend currently switches backend target through a hardcoded constant in code:

- local development: `http://localhost:3000`
- deployed backend: `https://filmoteka-server-oso6.onrender.com`

## Available Scripts

```bash
npm run dev
npm run build
```

- `npm run dev` starts Parcel in development mode
- `npm run build` creates a production build for GitHub Pages with `--public-url /Filmovie/`

## Important Integration Notes

- TMDB data is fetched through a bearer token stored in `.env`
- Auth state is stored in `localStorage`
- Guest movie lists are stored in `localStorage`
- After login, backend lists are loaded into local storage and kept in sync
- The deployed backend runs on Render, so cold starts can cause delayed responses on the first auth
  request
- CORS on the backend is configured for local Parcel development and GitHub Pages

## Main Code Areas

- `src/main.ts` initializes shared UI logic, language handling, modals, trailer support, auth sync,
  and global interactions
- `src/ts/features/homeMoviesController.ts` handles trending movies, searching, and infinite scroll
- `src/ts/features/libraryMoviesController.ts` renders the Library page and tab switching
- `src/ts/ui/movieListService.ts` manages watched/queue state and backend sync calls
- `src/ts/api/tmdbApi.ts` configures the TMDB client
- `src/ts/api/filmotekaServerApi.ts` contains login, register, logout, and list API calls

## Deployment

The frontend is configured for GitHub Pages deployment.

The backend is deployed separately on Render.

## Notes

- The repository does not currently include automated tests
- Backend URL selection is still handled manually in code rather than through environment variables
- The project is fully usable as a movie discovery app even without logging in
- Logging in adds persistence across sessions and devices through backend synchronization

## Background

Filmovie began as a refactor and continuation of a team course project. This repository is the
independent version used for further development and portfolio presentation.

## Author

**Michal Lipiak**

- GitHub: https://github.com/MikeL538
