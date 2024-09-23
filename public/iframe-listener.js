(function() {
  let lastScrollPosition = { x: 0, y: 0 };
  let scrollTimeout;

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

  window.addEventListener('message', function(event) {
    if (event.data.type === 'INIT_LISTENERS') {
      window.addEventListener('scroll', throttle(handleScroll, 100));
      window.addEventListener('wheel', handleZoom);
      window.addEventListener('click', handleClick);
    } else if (event.data.type === 'SYNC_ACTION') {
      const { scroll, zoom } = event.data.payload;
      if (scroll) {
        window.scrollTo(scroll.x, scroll.y);
      }
      if (zoom) {
        // Implementar lógica de zoom si es necesario
      }
    }
  });
})();
