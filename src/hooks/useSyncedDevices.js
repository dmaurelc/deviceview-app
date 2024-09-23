import { useState, useEffect, useRef, useCallback } from 'react';

const useSyncedDevices = (selectedDevices) => {
  const [syncedState, setSyncedState] = useState({
    scroll: { x: 0, y: 0 },
    zoom: 1,
  });
  const iframeRefs = useRef({});

  const syncAction = useCallback((action) => {
    setSyncedState(prevState => ({ ...prevState, ...action }));
    window.postMessage({ type: 'SYNC_ACTION', payload: action }, '*');
  }, []);

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data.type === 'SYNC_ACTION') {
        setSyncedState(event.data.payload);
        Object.values(iframeRefs.current).forEach(iframe => {
          if (iframe && iframe.contentWindow) {
            iframe.contentWindow.postMessage({
              type: 'SYNC_STATE',
              payload: event.data.payload
            }, '*');
          }
        });
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return { syncedState, syncAction, iframeRefs };
};

export default useSyncedDevices;
