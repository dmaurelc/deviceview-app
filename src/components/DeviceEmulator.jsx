import React, { useEffect, useRef, useState } from 'react';
import { X, RotateCcw, AlertCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import TemporaryUrlPlaceholder from './TemporaryUrlPlaceholder';

const DeviceEmulator = ({ url, device, onRemove, syncAction, theme, isUrlValid }) => {
  const iframeRef = useRef(null);
  const [isRotated, setIsRotated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (iframe) {
      const handleLoad = () => {
        iframe.contentWindow.postMessage({ type: 'INIT_LISTENERS', theme }, '*');
        setIsLoading(false);
        setHasError(false);
      };
      const handleError = () => {
        setIsLoading(false);
        setHasError(true);
      };
      iframe.addEventListener('load', handleLoad);
      iframe.addEventListener('error', handleError);
      return () => {
        iframe.removeEventListener('load', handleLoad);
        iframe.removeEventListener('error', handleError);
      };
    }
  }, [theme, url]);

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

  const canRotate = device.category === 'mobile' || device.category === 'tablet';

  return (
    <div className="flex flex-col gap-2 flex-shrink-0">
      <div className="rounded-t-lg">
        <div className="flex justify-between items-center text-sm font-medium">
          <span className="font-outfit">{device.name}</span>
          <span className="font-outfit">{deviceWidth}x{deviceHeight}</span>
        </div>
      </div>
      <div className="flex flex-col bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden flex-shrink-0 snap-center" style={{ width: `${deviceWidth}px` }}>
        <div className="bg-gray-200 dark:bg-gray-700 h-7 flex items-center justify-between px-2 text-xs font-medium">
          <div className="flex items-center space-x-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
          </div>
          <span className="truncate max-w-[150px] font-outfit">{url}</span>
          <div className="flex items-center space-x-2">
            {canRotate && (
              <Button variant="ghost" size="icon" className="h-5 w-5 p-0 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200" onClick={handleRotate}>
                <RotateCcw size={14} />
              </Button>
            )}
            <Button variant="ghost" size="icon" className="h-5 w-5 p-0 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200" onClick={() => onRemove(device)}>
              <X size={14} />
            </Button>
          </div>
        </div>
        <div style={{ height: `${deviceHeight}px`, width: `${deviceWidth}px`, overflow: 'hidden' }}>
          {isUrlValid ? (
            isLoading ? (
              <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white"></div>
              </div>
            ) : hasError ? (
              <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800 p-4">
                <AlertCircle className="w-12 h-12 text-red-500 mb-2" />
                <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                  No se pudo cargar la página. Por favor, verifica la URL e intenta nuevamente.
                </p>
              </div>
            ) : (
              <iframe
                ref={iframeRef}
                src={url}
                title={`Preview on ${device.name}`}
                className="w-full h-full border-0"
                style={{ width: '100%', height: '100%' }}
              />
            )
          ) : (
            <TemporaryUrlPlaceholder />
          )}
        </div>
      </div>
    </div>
  );
};

export default DeviceEmulator;
