import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

const DeviceEmulator = ({ url, device, onRemove, syncAction, theme }) => {
  const iframeRef = useRef(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (iframe) {
      const handleLoad = () => {
        iframe.contentWindow.postMessage({ type: 'INIT_LISTENERS', theme }, '*');
      };
      iframe.addEventListener('load', handleLoad);
      return () => {
        iframe.removeEventListener('load', handleLoad);
      };
    }
  }, [theme]);

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data.type === 'DEVICE_ACTION') {
        syncAction(event.data.payload, device.name);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [syncAction, device.name]);

  useEffect(() => {
    if (iframeRef.current) {
      iframeRef.current.contentWindow.postMessage({ type: 'THEME_CHANGE', theme }, '*');
    }
  }, [theme]);

  return (
    <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden flex-shrink-0 m-2" style={{ width: `${device.width}px` }}>
      <div className="bg-gray-100 dark:bg-gray-600 p-2 text-sm font-medium flex justify-between items-center">
        <span>{device.name}</span>
        <button onClick={() => onRemove(device)} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
          <X size={18} />
        </button>
      </div>
      <div style={{ height: `${device.height}px` }}>
        <iframe
          ref={iframeRef}
          src={url}
          title={`Preview on ${device.name}`}
          className="w-full h-full border-0"
        />
      </div>
    </div>
  );
};

export default DeviceEmulator;
