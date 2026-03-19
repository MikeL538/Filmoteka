export function themeHandler() {
  const themeButton = document.querySelector('#themeButton');

  //   const savedTheme = localStorage.getItem('theme');

  themeButton?.addEventListener('click', () => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    //   if ()
  });
}
