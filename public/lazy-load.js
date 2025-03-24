// Lazy loading and image optimization script
document.addEventListener('DOMContentLoaded', () => {
  // Lazy load images with data-src attribute
  const lazyImages = document.querySelectorAll('img[data-src]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          
          // Add a fade-in effect
          img.style.opacity = '0';
          img.onload = () => {
            img.style.transition = 'opacity 0.5s ease-in-out';
            img.style.opacity = '1';
          };
          
          imageObserver.unobserve(img);
        }
      });
    }, {
      rootMargin: '50px 0px',
      threshold: 0.01
    });
    
    lazyImages.forEach(img => {
      imageObserver.observe(img);
    });
  } else {
    // Fallback for browsers that don't support IntersectionObserver
    lazyImages.forEach(img => {
      img.src = img.dataset.src;
    });
  }
  
  // Add loading="lazy" to all images that don't have it
  document.querySelectorAll('img:not([loading])').forEach(img => {
    img.setAttribute('loading', 'lazy');
  });
  
  // Add decoding="async" to all images that don't have it
  document.querySelectorAll('img:not([decoding])').forEach(img => {
    img.setAttribute('decoding', 'async');
  });
});
