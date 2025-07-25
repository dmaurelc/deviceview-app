import React from 'react';

const useSyncedDevices = (selectedDevices) => {
  const [syncedState, setSyncedState] = React.useState({
    scroll: { x: 0, y: 0 },
    zoom: 1,
  });
  const iframeRefs = React.useRef({});

  const syncAction = React.useCallback((action, sourceDevice) => {
    setSyncedState(prevState => ({ ...prevState, ...action }));
    selectedDevices.forEach(device => {
      if (device.name !== sourceDevice && iframeRefs.current[device.name]) {
        iframeRefs.current[device.name].contentWindow.postMessage({
          type: 'SYNC_ACTION',
          payload: action
        }, '*');
      }
    });
  }, [selectedDevices]);

  React.useEffect(() => {
    const handleMessage = (event) => {
      if (event.data.type === 'DEVICE_ACTION') {
        syncAction(event.data.payload, event.data.sourceDevice);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [syncAction]);

  return { syncedState, syncAction, iframeRefs };
};

export default useSyncedDevices;