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

  const isAppleDevice = device.brand === 'Apple';
  const headerStyle = isAppleDevice
    ? 'bg-gray-100 dark:bg-gray-800'
    : 'bg-gray-200 dark:bg-gray-700';
  const buttonStyle = isAppleDevice
    ? 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
    : 'text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100';

  const canRotate = device.category === 'mobile' || device.category === 'tablet';

  return (
    <div className="flex flex-col bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden flex-shrink-0 snap-center" style={{ width: `${deviceWidth + 20}px` }}>
      <div className="p-2 mb-2 bg-gray-50 dark:bg-gray-900 rounded-t-lg">
        <div className="flex justify-between items-center text-sm font-medium">
          <span className="font-outfit">{device.name}</span>
          <span className="font-outfit">{deviceWidth}x{deviceHeight}</span>
        </div>
      </div>
      <div className={`${headerStyle} h-7 flex items-center justify-between px-2 text-xs font-medium`}>
        <div className="flex items-center space-x-1.5">
          {isAppleDevice ? (
            <>
              <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
            </>
          ) : (
            <div className="w-2.5 h-2.5 rounded-full bg-gray-400"></div>
          )}
        </div>
        <span className="truncate max-w-[150px] font-outfit">{url}</span>
        <div className="flex items-center space-x-2">
          {canRotate && (
            <Button variant="ghost" size="icon" className={`h-5 w-5 p-0 ${buttonStyle}`} onClick={handleRotate}>
              <RotateCcw size={14} />
            </Button>
          )}
          <Button variant="ghost" size="icon" className={`h-5 w-5 p-0 ${buttonStyle}`} onClick={() => onRemove(device)}>
            <X size={14} />
          </Button>
        </div>
      </div>
      <div style={{ height: `${deviceHeight}px`, width: `${deviceWidth}px`, overflow: 'hidden' }}>
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
