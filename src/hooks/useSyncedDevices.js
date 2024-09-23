import { useState, useEffect, useRef, useCallback } from 'react';

const useSyncedDevices = (selectedDevices) => {
  const [syncOptions, setSyncOptions] = useState({
    scrolling: true,
    navigation: true,
    clicks: false,
    inputs: false,
  });

  const [syncedState, setSyncedState] = useState({
    scroll: { x: 0, y: 0 },
    url: '',
    inputValues: {},
  });

  const iframeRefs = useRef({});

  const syncAction = useCallback((action, sourceDevice) => {
    if (!syncOptions[action.type]) return;

    setSyncedState(prevState => ({ ...prevState, ...action.payload }));
    selectedDevices.forEach(device => {
      if (device.name !== sourceDevice && iframeRefs.current[device.name]) {
        iframeRefs.current[device.name].contentWindow.postMessage({
          type: 'SYNC_ACTION',
          payload: action
        }, '*');
      }
    });
  }, [selectedDevices, syncOptions]);

  const toggleSyncOption = useCallback((option, value) => {
    setSyncOptions(prev => {
      if (option === 'all') {
        return Object.fromEntries(Object.keys(prev).map(key => [key, value]));
      }
      return { ...prev, [option]: value };
    });
  }, []);

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data.type === 'DEVICE_ACTION') {
        syncAction(event.data.payload, event.data.sourceDevice);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [syncAction]);

  return { syncedState, syncAction, iframeRefs, syncOptions, toggleSyncOption };
};

export default useSyncedDevices;
