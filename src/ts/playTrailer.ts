import { Notify } from 'notiflix';
import { fetchMovieTrailer } from './api/moviesService.js';
import { notifications } from './ui/notifications.js';

const play = document.querySelector<HTMLButtonElement>('#detailsTrailerButton');
const box = document.querySelector<HTMLElement>('#trailer');
const player = document.querySelector<HTMLIFrameElement>('#trailerPlayer');

export async function handleTrailer() {
  notifications.showLoader();

  try {
    playTrailer();
  } catch (error) {
    box!.style.display = 'none';
    console.log(error);
    notifications.error;
    player!.src = '';
  }
}

function playTrailer() {
  play?.addEventListener('click', async () => {
    const playId = play.getAttribute('data-id');
    box!.style.display = 'flex';
    if (!playId) return;

    const trailer = await fetchMovieTrailer(Number(playId));

    if (!trailer) return;

    const url = `https://www.youtube.com/embed/${trailer.key}?autoplay=1`;

    player?.setAttribute('src', url);
    box?.classList.remove('hidden');
  });
}
