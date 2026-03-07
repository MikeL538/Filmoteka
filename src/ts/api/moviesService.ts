import { tmdbClient } from './tmdbApi.js';
import type {
  MovieResponse,
  MovieDetails,
  MovieTrailerResponse,
} from '../../types and data/types.js';

// FETCH TRENDING
export async function fetchTrending(page: number, language: string): Promise<MovieResponse> {
  const { data } = await tmdbClient.get<MovieResponse>('trending/movie/day', {
    params: { page, language },
  });

  return data;
}

// SEARCH
export async function searchMovies(
  query: string,
  page: number,
  language: string,
): Promise<MovieResponse> {
  const { data } = await tmdbClient.get<MovieResponse>('search/movie', {
    params: { query, page, language },
  });

  return data;
}

// By ID (For stored lists)
export async function fetchMovieById(id: string, language: string): Promise<MovieDetails> {
  const { data } = await tmdbClient.get<MovieDetails>(`movie/${id}`, {
    params: { language },
  });

  return data;
}

// TRAILER BY ID
export async function fetchMovieTrailer(id: number) {
  const { data } = await tmdbClient.get<MovieTrailerResponse>(`/movie/${id}/videos`);

  return data.results.find(v => v.type === 'Trailer' && v.site === 'YouTube');
}
