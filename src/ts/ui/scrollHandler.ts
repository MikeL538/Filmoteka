interface InfiniteScrollOptions {
  fetchCallback: (page: number, query?: string) => void;
  currentPage: number;
  searchQuery?: string;
  isLoading?: boolean;
  noMoreMovies?: boolean;
}

export function attachInfiniteScroll(options: InfiniteScrollOptions) {
  let {
    fetchCallback,
    currentPage,
    searchQuery = '',
    isLoading = false,
    noMoreMovies = false,
  } = options;

  window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (noMoreMovies) return;

    if (scrollTop + clientHeight >= scrollHeight - 700 && !isLoading) {
      isLoading = true;
      currentPage++;
      fetchCallback(currentPage, searchQuery);
      isLoading = false;
    }
  });
}
