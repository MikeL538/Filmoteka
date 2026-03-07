export interface Movie {
  id: number;
  // imagePath: string;
  title: string;
  backdrop_path: string | null;
  poster_path: string | null;
  release_date: string;
  genre_ids: number[];
  vote_average: number;
}

export interface MovieDetails {
  id: number;
  title: string;
  backdrop_path: string | null;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  original_title: string;
  overview: string;
  genres: { id: number; name: string }[];
}

export interface MovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
}

export interface MovieTrailer {
  id: string;
  key: string;
  site: string;
  type: string;
}

export interface MovieTrailerResponse {
  id: number;
  results: MovieTrailer[];
}
