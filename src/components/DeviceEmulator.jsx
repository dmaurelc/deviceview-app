import React, { useEffect, useRef, useState } from 'react';
import { X, RotateCcw } from 'lucide-react';
import { Button } from "@/components/ui/button";

const DeviceEmulator = ({ url, device, onRemove, syncAction, theme }) => {
  const iframeRef = useRef(null);
  const [isRotated, setIsRotated] = useState(false);

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

  const handleRotate = () => {
    setIsRotated(!isRotated);
  };

  const deviceWidth = isRotated ? device.height : device.width;
  const deviceHeight = isRotated ? device.width : device.height;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden flex-shrink-0 snap-center" style={{ width: `${deviceWidth}px`, height: `${deviceHeight + 28}px` }}>
      <div className="bg-gray-200 dark:bg-gray-700 h-7 flex items-center justify-between px-2 text-xs font-medium text-gray-600 dark:text-gray-300">
        <div className="flex items-center space-x-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
        </div>
        <span className="truncate max-w-[150px]">{url}</span>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="h-5 w-5 p-0" onClick={handleRotate}>
            <RotateCcw size={14} />
          </Button>
          <Button variant="ghost" size="icon" className="h-5 w-5 p-0" onClick={() => onRemove(device)}>
            <X size={14} />
          </Button>
        </div>
      </div>
      <div style={{ height: `${deviceHeight - 28}px`, width: `${deviceWidth}px`, overflow: 'hidden' }}>
        <iframe
          ref={iframeRef}
          src={url}
          title={`Preview on ${device.name}`}
          className="w-full h-full border-0"
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    </div>
  );
};

export default DeviceEmulator;
