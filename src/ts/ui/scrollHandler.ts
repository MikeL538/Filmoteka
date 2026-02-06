interface InfiniteScrollOptions {
  fetchCallback: (page: number, query?: string) => void;
  currentPage: number;
  searchQuery?: string;
  isLoading?: boolean;
  noMoreMovies?: boolean;
}

export function attachInfiniteScroll(fetchCallback: () => Promise<void>): void {
  let isLoading = false;

  window.addEventListener('scroll', async () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 700 && !isLoading) {
      isLoading = true;

      await fetchCallback();

      isLoading = false;
    }
  });
}
