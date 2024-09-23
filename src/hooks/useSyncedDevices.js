import { useState, useEffect, useRef } from 'react';

const useSyncedDevices = (selectedDevices) => {
  const [syncedState, setSyncedState] = useState({
    scroll: { x: 0, y: 0 },
    zoom: 1,
  });
  const iframeRefs = useRef({});

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data.type === 'SYNC_ACTION') {
        setSyncedState(event.data.payload);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  useEffect(() => {
    Object.values(iframeRefs.current).forEach(iframe => {
      if (iframe && iframe.contentWindow) {
        iframe.contentWindow.postMessage({
          type: 'SYNC_STATE',
          payload: syncedState
        }, '*');
      }
    });
  }, [syncedState]);

  const syncAction = (action) => {
    setSyncedState(prevState => ({ ...prevState, ...action }));
  };

  return { syncedState, syncAction, iframeRefs };
};

export default useSyncedDevices;