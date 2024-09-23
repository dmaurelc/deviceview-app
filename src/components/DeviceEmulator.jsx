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
    <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden" style={{ width: `${device.width}px`, height: `${device.height + 30}px` }}>
      <div className="bg-gray-100 dark:bg-gray-700 p-1 text-center text-sm font-semibold">
        {device.name}
      </div>
      <button onClick={() => onRemove(device)} className="absolute top-1 right-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 z-10">
        <X size={16} />
      </button>
      <iframe
        ref={iframeRef}
        src={url}
        title={`Preview on ${device.name}`}
        className="w-full h-full border-0"
        style={{
          width: `${device.width}px`,
          height: `${device.height}px`,
        }}
      />
    </div>
  );
};

export default DeviceEmulator;
