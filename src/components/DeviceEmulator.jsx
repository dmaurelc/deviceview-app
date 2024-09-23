import React, { useEffect, useRef, useCallback } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { X } from 'lucide-react';

const DeviceEmulator = ({ url, device, onRemove, syncAction }) => {
  const containerRef = useRef(null);
  const iframeRef = useRef(null);

  const handleMessage = useCallback((event) => {
    if (event.origin !== window.location.origin) return;
    
    const { type, payload } = event.data;
    if (type === 'SCROLL_EVENT') {
      syncAction({ scroll: payload });
    } else if (type === 'ZOOM_EVENT') {
      syncAction({ zoom: payload });
    }
  }, [syncAction]);

  useEffect(() => {
    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [handleMessage]);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (iframe) {
      iframe.onload = () => {
        iframe.contentWindow.postMessage({ type: 'INIT_LISTENERS' }, '*');
      };
    }
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      const handleZoom = (event) => {
        if (event.ctrlKey) {
          event.preventDefault();
          const newZoom = Math.min(Math.max(0.5, containerRef.current.style.zoom * (event.deltaY > 0 ? 0.9 : 1.1)), 2);
          syncAction({ zoom: newZoom });
        }
      };
      containerRef.current.addEventListener('wheel', handleZoom);
      return () => containerRef.current.removeEventListener('wheel', handleZoom);
    }
  }, [syncAction]);

  return (
    <Card className="mb-4 flex-shrink-0">
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold">{device.name} - {device.width}x{device.height}</h3>
          <button onClick={() => onRemove(device)} className="text-red-500 hover:text-red-700">
            <X size={20} />
          </button>
        </div>
        <div
          ref={containerRef}
          className="border-4 border-primary rounded-lg overflow-hidden mx-auto"
          style={{
            width: `${device.width}px`,
            height: `${device.height}px`,
            maxWidth: '100%',
            maxHeight: '70vh',
            transform: 'scale(0.8)',
            transformOrigin: 'top center',
          }}
        >
          <iframe
            ref={iframeRef}
            src={url}
            title={`Preview on ${device.name}`}
            className="w-full h-full"
            style={{
              width: `${device.width}px`,
              height: `${device.height}px`,
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default DeviceEmulator;
