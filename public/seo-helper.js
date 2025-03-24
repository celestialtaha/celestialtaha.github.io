// SEO Helper Script - Improves search engine visibility
document.addEventListener('DOMContentLoaded', () => {
  // Add proper alt text to images without alt attributes
  document.querySelectorAll('img:not([alt])').forEach(img => {
    // Try to extract a meaningful alt text from parent elements or filename
    let altText = '';
    
    // Check if image is inside a figure with figcaption
    const figure = img.closest('figure');
    if (figure) {
      const figcaption = figure.querySelector('figcaption');
      if (figcaption && figcaption.textContent) {
        altText = figcaption.textContent.trim();
      }
    }
    
    // If no figcaption, try to use image filename
    if (!altText && img.src) {
      const filename = img.src.split('/').pop().split('?')[0];
      if (filename) {
        // Convert filename to readable text (remove extension, replace dashes/underscores with spaces)
        altText = filename
          .replace(/\.[^/.]+$/, '') // Remove extension
          .replace(/[-_]/g, ' ')    // Replace dashes and underscores with spaces
          .replace(/([A-Z])/g, ' $1') // Add space before capital letters
          .trim();
        
        // Capitalize first letter
        altText = altText.charAt(0).toUpperCase() + altText.slice(1);
      }
    }
    
    // If still no alt text, use a generic one
    if (!altText) {
      altText = 'Image';
    }
    
    img.setAttribute('alt', altText);
  });
  
  // Add proper title attributes to links without them
  document.querySelectorAll('a:not([title])').forEach(link => {
    if (link.textContent && link.textContent.trim()) {
      link.setAttribute('title', link.textContent.trim());
    }
  });
  
  // Add rel="noopener" to external links for security and performance
  document.querySelectorAll('a[href^="http"]:not([rel*="noopener"])').forEach(link => {
    const currentRel = link.getAttribute('rel') || '';
    if (!currentRel.includes('noopener')) {
      link.setAttribute('rel', currentRel ? `${currentRel} noopener` : 'noopener');
    }
  });
  
  // Add proper heading structure if missing
  const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
  if (headings.length > 0) {
    // Check if there's at least one h1
    const hasH1 = headings.some(h => h.tagName === 'H1');
    if (!hasH1) {
      // Try to find the page title
      const title = document.title || document.querySelector('title')?.textContent;
      if (title && document.body.firstElementChild) {
        // Create an h1 with the page title and add it at the beginning of the body
        // but make it visually hidden for screen readers only
        const h1 = document.createElement('h1');
        h1.textContent = title;
        h1.style.position = 'absolute';
        h1.style.width = '1px';
        h1.style.height = '1px';
        h1.style.padding = '0';
        h1.style.margin = '-1px';
        h1.style.overflow = 'hidden';
        h1.style.clip = 'rect(0, 0, 0, 0)';
        h1.style.whiteSpace = 'nowrap';
        h1.style.border = '0';
        document.body.insertBefore(h1, document.body.firstElementChild);
      }
    }
  }
});
