import axios from 'axios';

const TMDB_TOKEN = process.env.TMDB_API_TOKEN;

export const tmdbClient = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
    Authorization: `Bearer ${TMDB_TOKEN}`,
  },
});
