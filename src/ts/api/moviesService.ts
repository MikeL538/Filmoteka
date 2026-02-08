import { tmdbClient } from './tmdbApi.js';
import type { MovieResponse, MovieDetails } from '../../types and data/types.js';

// FETCH TRENDING
export async function fetchTrending(page: number, language: string) {
  const { data } = await tmdbClient.get<MovieResponse>('trending/movie/day', {
    params: { page, language },
  });

  return data.results;
}

// SEARCH BAR
export async function searchMovies(query: string, page: number, language: string) {
  const { data } = await tmdbClient.get<MovieResponse>('search/movie', {
    params: { query, page, language },
  });

  return data.results;
}

export async function fetchMovieById(id: string, language: string): Promise<MovieDetails> {
  const { data } = await tmdbClient.get<MovieDetails>(`movie/${id}`, {
    params: { language },
  });

  return data;
}
