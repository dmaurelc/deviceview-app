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
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden flex-shrink-0 snap-center" style={{ width: `${deviceWidth}px`, height: `${deviceHeight + 40}px` }}>
      <div className="bg-gray-100 dark:bg-gray-700 p-2 text-sm font-medium flex justify-between items-center">
        <span>{`${device.name} (${deviceWidth} x ${deviceHeight})`}</span>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" onClick={handleRotate}>
            <RotateCcw size={18} />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => onRemove(device)}>
            <X size={18} />
          </Button>
        </div>
      </div>
      <div style={{ height: `${deviceHeight}px`, width: `${deviceWidth}px`, overflow: 'hidden' }}>
        <iframe
          ref={iframeRef}
          src={url}
          title={`Preview on ${device.name}`}
          className="w-full h-full border-0"
          style={{ transform: isRotated ? 'rotate(90deg) scale(1, -1)' : 'none', transformOrigin: 'top left', width: isRotated ? `${deviceHeight}px` : '100%', height: isRotated ? `${deviceWidth}px` : '100%' }}
        />
      </div>
    </div>
  );
};

export default DeviceEmulator;
