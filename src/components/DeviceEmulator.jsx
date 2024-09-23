import React, { useEffect, useRef, useCallback } from 'react';
import { Card } from "@/components/ui/card";
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
      const handleLoad = () => {
        iframe.contentWindow.postMessage({ type: 'INIT_LISTENERS' }, '*');
      };
      iframe.addEventListener('load', handleLoad);
      return () => {
        iframe.removeEventListener('load', handleLoad);
      };
    }
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      const handleZoom = (event) => {
        if (event.ctrlKey) {
          event.preventDefault();
          const newZoom = Math.min(Math.max(0.5, container.style.zoom * (event.deltaY > 0 ? 0.9 : 1.1)), 2);
          syncAction({ zoom: newZoom });
        }
      };
      container.addEventListener('wheel', handleZoom);
      return () => {
        container.removeEventListener('wheel', handleZoom);
      };
    }
  }, [syncAction]);

  return (
    <Card className="relative overflow-hidden m-2" style={{ width: `${device.width * 0.5}px`, height: `${device.height * 0.5}px` }}>
      <button onClick={() => onRemove(device)} className="absolute top-1 right-1 text-gray-500 hover:text-gray-700 z-10">
        <X size={16} />
      </button>
      <div
        ref={containerRef}
        className="w-full h-full overflow-hidden"
        style={{
          transform: 'scale(0.5)',
          transformOrigin: 'top left',
        }}
      >
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
    </Card>
  );
};

export default DeviceEmulator;
