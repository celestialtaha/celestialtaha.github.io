// Preload critical resources
document.addEventListener('DOMContentLoaded', () => {
  // Preload important images
  const imagesToPreload = [
    '/favicon.svg',
    '/icon-192.png',
    '/icon-512.png'
  ];

  // Create preload links
  imagesToPreload.forEach(imagePath => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = imagePath;
    document.head.appendChild(link);
  });

  // Add page transition for better perceived performance
  document.querySelectorAll('a[href^="/"]:not([target="_blank"])').forEach(link => {
    link.addEventListener('click', (e) => {
      // Only apply to internal links
      if (link.hostname === window.location.hostname) {
        const currentPage = document.querySelector('main');
        if (currentPage) {
          currentPage.style.opacity = '0.5';
          currentPage.style.transition = 'opacity 0.2s ease-out';
        }
      }
    });
  });
});
