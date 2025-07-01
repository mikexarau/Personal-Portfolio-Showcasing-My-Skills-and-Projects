// Performance optimization utilities based on Lighthouse report
export class PerformanceOptimizer {
  
  // 1. Lazy loading for images and videos
  static setupIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target;
          
          // Lazy load images
          if (target.dataset.src) {
            target.src = target.dataset.src;
            target.removeAttribute('data-src');
          }
          
          // Lazy load videos
          if (target.dataset.video) {
            target.src = target.dataset.video;
            target.load();
            target.removeAttribute('data-video');
          }
          
          observer.unobserve(target);
        }
      });
    }, {
      rootMargin: '50px 0px',
      threshold: 0.01
    });
    
    return observer;
  }

  // 2. Preload critical resources
  static preloadCriticalResources() {
    // Preload critical fonts
    const fontPreloads = [
      '/fonts/inter-regular.woff2',
      '/fonts/inter-medium.woff2',
      '/fonts/inter-semibold.woff2'
    ];
    
    fontPreloads.forEach(font => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = font;
      link.as = 'font';
      link.type = 'font/woff2';
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });
    
    // Preload hero image/video
    if (window.location.pathname === '/') {
      const heroVideo = document.querySelector('[data-hero-video]');
      if (heroVideo) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = heroVideo.dataset.heroVideo;
        link.as = 'video';
        document.head.appendChild(link);
      }
    }
  }

  // 3. Resource hints optimization
  static setupResourceHints() {
    // DNS prefetch for external domains
    const domains = ['fonts.googleapis.com', 'www.google-analytics.com'];
    domains.forEach(domain => {
      const link = document.createElement('link');
      link.rel = 'dns-prefetch';
      link.href = `//${domain}`;
      document.head.appendChild(link);
    });
  }

  // 4. Compress and cache management
  static setupCacheHeaders() {
    // Service Worker registration for caching
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(err => {
        console.log('SW registration failed');
      });
    }
  }

  // 5. Critical CSS inlining utility
  static inlineCriticalCSS() {
    // Move critical CSS to inline styles
    const criticalCSS = `
      /* Critical above-the-fold styles */
      .hero-section { 
        min-height: 100vh; 
        display: flex; 
        align-items: center; 
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      }
      .loading-skeleton {
        background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
        background-size: 200% 100%;
        animation: loading 1.5s infinite;
      }
      @keyframes loading {
        0% { background-position: 200% 0; }
        100% { background-position: -200% 0; }
      }
    `;
    
    const style = document.createElement('style');
    style.textContent = criticalCSS;
    document.head.insertBefore(style, document.head.firstChild);
  }

  // 6. Remove unused CSS (utility)
  static removeUnusedCSS() {
    // Mark for CSS purging in build process
    return {
      content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
      css: ['./src/**/*.css'],
      safelist: ['active', 'hover', 'focus', 'animate-*']
    };
  }

  // 7. Image optimization utility
  static optimizeImages() {
    const images = document.querySelectorAll('img[data-optimize]');
    images.forEach(img => {
      // WebP support detection
      const supportsWebP = () => {
        const canvas = document.createElement('canvas');
        return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
      };
      
      if (supportsWebP() && img.dataset.webp) {
        img.src = img.dataset.webp;
      }
      
      // Responsive images
      if (img.dataset.sizes) {
        img.sizes = img.dataset.sizes;
      }
    });
  }

  // 8. JavaScript code splitting utility
  static loadModulesDynamically() {
    return {
      // Dynamic imports for non-critical components
      loadProjectGallery: () => import('../components/ProjectGallery'),
      loadContactForm: () => import('../components/ContactForm'),
      loadBlogSection: () => import('../components/BlogSection')
    };
  }
}

// Auto-initialize performance optimizations
document.addEventListener('DOMContentLoaded', () => {
  PerformanceOptimizer.preloadCriticalResources();
  PerformanceOptimizer.setupResourceHints();
  PerformanceOptimizer.inlineCriticalCSS();
  PerformanceOptimizer.optimizeImages();
  PerformanceOptimizer.setupCacheHeaders();
  
  // Setup intersection observer for lazy loading
  const observer = PerformanceOptimizer.setupIntersectionObserver();
  document.querySelectorAll('[data-src], [data-video]').forEach(el => {
    observer.observe(el);
  });
}); 