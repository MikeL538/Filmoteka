type Theme = 'light' | 'dark';

const THEME_STORAGE_KEY = 'theme';
const themeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

function getSystemTheme(): Theme {
  return themeMediaQuery.matches ? 'dark' : 'light';
}

function getInitialTheme(): Theme {
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  return savedTheme === 'dark' || savedTheme === 'light' ? savedTheme : getSystemTheme();
}

function updateThemeButtons(theme: Theme) {
  const nextTheme = theme === 'dark' ? 'light' : 'dark';

  document.querySelectorAll<HTMLButtonElement>('[data-theme-toggle]').forEach(button => {
    // button.textContent = theme === 'dark' ? 'Dark' : 'Light';
    button.setAttribute('aria-label', `Current theme ${theme}. Switch to ${nextTheme} theme.`);
    button.setAttribute('title', `Switch to ${nextTheme} theme`);
  });
}

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
  updateThemeButtons(theme);
}

export function themeHandler() {
  const themeButtons = document.querySelectorAll<HTMLButtonElement>('[data-theme-toggle]');
  if (!themeButtons.length) return;

  let currentTheme = getInitialTheme();
  applyTheme(currentTheme);

  themeButtons.forEach(button => {
    button.addEventListener('click', () => {
      currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
      localStorage.setItem(THEME_STORAGE_KEY, currentTheme);
      applyTheme(currentTheme);
    });
  });

  themeMediaQuery.addEventListener('change', event => {
    if (localStorage.getItem(THEME_STORAGE_KEY)) return;

    currentTheme = event.matches ? 'dark' : 'light';
    applyTheme(currentTheme);
  });
}
