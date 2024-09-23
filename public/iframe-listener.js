(function() {
  window.addEventListener('message', function(event) {
    if (event.data.type === 'INIT_LISTENERS') {
      window.addEventListener('scroll', function() {
        window.parent.postMessage({
          type: 'SCROLL_EVENT',
          payload: {
            x: window.scrollX,
            y: window.scrollY
          }
        }, '*');
      });

      window.addEventListener('wheel', function(e) {
        if (e.ctrlKey) {
          e.preventDefault();
          window.parent.postMessage({
            type: 'ZOOM_EVENT',
            payload: e.deltaY > 0 ? 'zoom-out' : 'zoom-in'
          }, '*');
        }
      });
    }
  });
})();