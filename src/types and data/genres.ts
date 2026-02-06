export const genresMap = new Map<number, { en: string; pl: string }>([
  [28, { en: 'Action', pl: 'Akcja' }],
  [12, { en: 'Adventure', pl: 'Przygoda' }],
  [16, { en: 'Animation', pl: 'Animacja' }],
  [35, { en: 'Comedy', pl: 'Komedia' }],
  [80, { en: 'Crime', pl: 'Kryminał' }],
  [99, { en: 'Documentary', pl: 'Dokument' }],
  [18, { en: 'Drama', pl: 'Dramat' }],
  [10751, { en: 'Family', pl: 'Familijny' }],
  [14, { en: 'Fantasy', pl: 'Fantasy' }],
  [36, { en: 'History', pl: 'Historyczny' }],
  [27, { en: 'Horror', pl: 'Horror' }],
  [10402, { en: 'Music', pl: 'Muzyczny' }],
  [9648, { en: 'Mystery', pl: 'Tajemniczy' }],
  [10749, { en: 'Romance', pl: 'Romans' }],
  [878, { en: 'Science Fiction', pl: 'Science Fiction' }],
  [10770, { en: 'TV Movie', pl: 'Film telewizyjny' }],
  [53, { en: 'Thriller', pl: 'Romans' }],
  [10752, { en: 'War', pl: 'Wojenny' }],
  [37, { en: 'Western', pl: 'Western' }],
]);

export function getGenreName(id: number, language: 'en-US' | 'pl-PL') {
  const genreId = genresMap.get(id);

  return language === 'pl-PL' ? (genreId?.pl ?? 'Nieznany') : (genreId?.en ?? 'Unknown');
}
