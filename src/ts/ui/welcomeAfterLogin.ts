import { gsap } from 'gsap';

export function showWelcomeAfterLogin() {
  const login = sessionStorage.getItem('welcomeUserLogin');
  if (!login) return;

  sessionStorage.removeItem('welcomeUserLogin');

  const banner = document.createElement('div');
  banner.className = 'welcome-banner';
  banner.textContent = `Welcome ${login}`;
  document.body.appendChild(banner);
  document.body.style.overflow = 'hidden';

  gsap.fromTo(
    banner,
    { autoAlpha: 0, y: 0, scale: 0.96 },
    {
      autoAlpha: 1,
      y: 0,
      scale: 1,
      duration: 0.5,
      ease: 'power2.out',
      onComplete: () => {
        gsap.to(banner, {
          autoAlpha: 0,
          y: 0,
          duration: 0.5,
          delay: 0.5,
          onComplete: () => {
            banner.remove();
            document.body.style.overflow = 'auto';
          },
        });
      },
    },
  );
}
