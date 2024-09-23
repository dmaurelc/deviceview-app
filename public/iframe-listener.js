(function() {
  let lastScrollPosition = { x: 0, y: 0 };
  let scrollTimeout;
  let syncOptions = {
    scrolling: true,
    navigation: true,
    clicks: false,
    inputs: false,
  };

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
    if (!syncOptions.scrolling) return;
    const newPosition = { x: window.scrollX, y: window.scrollY };
    if (newPosition.x !== lastScrollPosition.x || newPosition.y !== lastScrollPosition.y) {
      lastScrollPosition = newPosition;
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        window.parent.postMessage({
          type: 'DEVICE_ACTION',
          payload: { type: 'scrolling', payload: { scroll: newPosition } }
        }, '*');
      }, 100);
    }
  }

  function handleNavigation() {
    if (!syncOptions.navigation) return;
    window.parent.postMessage({
      type: 'DEVICE_ACTION',
      payload: { type: 'navigation', payload: { url: window.location.href } }
    }, '*');
  }

  function handleClick(e) {
    if (!syncOptions.clicks) return;
    window.parent.postMessage({
      type: 'DEVICE_ACTION',
      payload: { type: 'clicks', payload: { click: { x: e.clientX, y: e.clientY } } }
    }, '*');
  }

  function handleInput(e) {
    if (!syncOptions.inputs) return;
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
      window.parent.postMessage({
        type: 'DEVICE_ACTION',
        payload: { type: 'inputs', payload: { input: { id: e.target.id, value: e.target.value } } }
      }, '*');
    }
  }

  window.addEventListener('message', function(event) {
    if (event.data.type === 'INIT_LISTENERS') {
      syncOptions = event.data.syncOptions;
      window.addEventListener('scroll', throttle(handleScroll, 100));
      window.addEventListener('click', handleClick);
      window.addEventListener('input', handleInput);
      window.addEventListener('popstate', handleNavigation);
    } else if (event.data.type === 'SYNC_ACTION') {
      const { type, payload } = event.data.payload;
      switch (type) {
        case 'scrolling':
          window.scrollTo(payload.scroll.x, payload.scroll.y);
          break;
        case 'navigation':
          if (window.location.href !== payload.url) {
            window.location.href = payload.url;
          }
          break;
        case 'clicks':
          // Implementar lógica de clicks si es necesario
          break;
        case 'inputs':
          const inputElement = document.getElementById(payload.input.id);
          if (inputElement) {
            inputElement.value = payload.input.value;
          }
          break;
      }
    }
  });
})();
