(function() {
  let lastScrollPosition = { x: 0, y: 0 };
  let scrollTimeout;
  let currentTheme = 'light';

  function throttle(func, delay) {
    let lastCall = 0;
    return function(...args) {
      const now = new Date().getTime();
      if (now - lastCall < delay) {
        return;
      }
      lastCall = now;
      return func(...args);
    }
  }

  function handleScroll() {
    const newPosition = { x: window.scrollX, y: window.scrollY };
    if (newPosition.x !== lastScrollPosition.x || newPosition.y !== lastScrollPosition.y) {
      lastScrollPosition = newPosition;
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        window.parent.postMessage({
          type: 'DEVICE_ACTION',
          payload: { scroll: newPosition }
        }, '*');
      }, 100);
    }
  }

  function handleZoom(e) {
    if (e.ctrlKey) {
      e.preventDefault();
      window.parent.postMessage({
        type: 'DEVICE_ACTION',
        payload: { zoom: e.deltaY > 0 ? 'zoom-out' : 'zoom-in' }
      }, '*');
    }
  }

  function handleClick(e) {
    window.parent.postMessage({
      type: 'DEVICE_ACTION',
      payload: { click: { x: e.clientX, y: e.clientY } }
    }, '*');
  }

  function applyTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    currentTheme = theme;

    const meta = document.createElement('meta');
    meta.name = 'color-scheme';
    meta.content = theme;
    document.head.appendChild(meta);

    window.dispatchEvent(new CustomEvent('themechange', { detail: { theme } }));
  }

  function extractStyles() {
    let styles = '';
    
    // Extract external stylesheets with CORS handling
    const externalStyles = Array.from(document.styleSheets).map(sheet => {
      try {
        if (sheet.href && !sheet.href.startsWith(window.location.origin)) {
          // Skip cross-origin stylesheets that can't be accessed
          return `/* Cross-origin stylesheet: ${sheet.href} */`;
        }
        return Array.from(sheet.cssRules).map(rule => rule.cssText).join('\n');
      } catch (e) {
        // Fallback for CORS issues
        return `/* Stylesheet access blocked: ${sheet.href || 'inline'} */`;
      }
    }).join('\n');

    // Extract inline styles
    const inlineStyles = Array.from(document.querySelectorAll('style')).map(
      style => style.textContent
    ).join('\n');

    return externalStyles + '\n' + inlineStyles;
  }

  function captureContent() {
    const content = document.documentElement.outerHTML;
    const styles = extractStyles();

    return {
      content,
      styles,
      width: document.documentElement.scrollWidth,
      height: document.documentElement.scrollHeight
    };
  }

  function captureVisibleArea() {
    const content = document.documentElement.outerHTML;
    const styles = extractStyles();

    return {
      content,
      styles,
      width: window.innerWidth,
      height: window.innerHeight,
      scrollX: window.scrollX,
      scrollY: window.scrollY
    };
  }

  async function captureFullPage() {
    const originalScrollX = window.scrollX;
    const originalScrollY = window.scrollY;
    
    // Scroll to top-left
    window.scrollTo(0, 0);
    
    // Wait for scroll to complete
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const content = document.documentElement.outerHTML;
    const styles = extractStyles();

    const result = {
      content,
      styles,
      width: document.documentElement.scrollWidth,
      height: document.documentElement.scrollHeight,
      viewportWidth: window.innerWidth,
      viewportHeight: window.innerHeight
    };

    // Restore original scroll position
    window.scrollTo(originalScrollX, originalScrollY);
    
    return result;
  }

  window.addEventListener('message', function(event) {
    if (event.data.type === 'INIT_LISTENERS') {
      window.addEventListener('scroll', throttle(handleScroll, 100));
      window.addEventListener('wheel', handleZoom);
      window.addEventListener('click', handleClick);
      applyTheme(event.data.theme);
    } else if (event.data.type === 'SYNC_ACTION') {
      const { scroll, zoom } = event.data.payload;
      if (scroll) {
        window.scrollTo(scroll.x, scroll.y);
      }
      if (zoom) {
        // Implementar lógica de zoom si es necesario
      }
    } else if (event.data.type === 'THEME_CHANGE') {
      applyTheme(event.data.theme);
    } else if (event.data.type === 'CAPTURE_CONTENT') {
      const captured = captureContent();
      window.parent.postMessage({
        type: 'CAPTURED_CONTENT',
        payload: captured
      }, '*');
    } else if (event.data.type === 'CAPTURE_VISIBLE') {
      const captured = captureVisibleArea();
      window.parent.postMessage({
        type: 'CAPTURED_VISIBLE',
        payload: captured
      }, '*');
    } else if (event.data.type === 'CAPTURE_FULL_PAGE') {
      captureFullPage().then(captured => {
        window.parent.postMessage({
          type: 'CAPTURED_FULL_PAGE',
          payload: captured
        }, '*');
      });
    }
  });
})();