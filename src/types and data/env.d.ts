/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_TMDB_TOKEN: string; // <- tu nazwa Twojej zmiennej środowiskowej
  // inne zmienne jeśli masz
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
