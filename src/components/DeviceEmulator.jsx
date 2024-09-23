import React, { useEffect, useRef, useCallback } from 'react';
import { Card, CardContent } from "@/components/ui/card";

const DeviceEmulator = ({ url, device, onRemove, syncAction }) => {
  const containerRef = useRef(null);
  const iframeRef = useRef(null);

  const handleScroll = useCallback((event) => {
    syncAction({
      scroll: {
        x: event.target.scrollingElement.scrollLeft,
        y: event.target.scrollingElement.scrollTop,
      },
    });
  }, [syncAction]);

  const handleZoom = useCallback((event) => {
    if (event.ctrlKey) {
      event.preventDefault();
      const newZoom = Math.min(Math.max(0.5, containerRef.current.style.zoom * (event.deltaY > 0 ? 0.9 : 1.1)), 2);
      syncAction({ zoom: newZoom });
    }
  }, [syncAction]);

  const setupIframeListeners = useCallback(() => {
    const iframe = iframeRef.current;
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.addEventListener('scroll', handleScroll);
      iframe.contentWindow.addEventListener('wheel', handleZoom);
    }
  }, [handleScroll, handleZoom]);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (iframe) {
      iframe.addEventListener('load', setupIframeListeners);
    }

    return () => {
      if (iframe) {
        iframe.removeEventListener('load', setupIframeListeners);
        if (iframe.contentWindow) {
          iframe.contentWindow.removeEventListener('scroll', handleScroll);
          iframe.contentWindow.removeEventListener('wheel', handleZoom);
        }
      }
    };
  }, [setupIframeListeners, handleScroll, handleZoom]);

  useEffect(() => {
    const handleSyncState = (event) => {
      if (event.data.type === 'SYNC_STATE') {
        const { scroll, zoom } = event.data.payload;
        if (scroll && iframeRef.current && iframeRef.current.contentWindow) {
          iframeRef.current.contentWindow.scrollTo(scroll.x, scroll.y);
        }
        if (zoom && containerRef.current) {
          containerRef.current.style.zoom = zoom;
        }
      }
    };

    window.addEventListener('message', handleSyncState);
    return () => window.removeEventListener('message', handleSyncState);
  }, []);

  return (
    <Card className="mb-4 flex-shrink-0">
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold">{device.name} - {device.width}x{device.height}</h3>
          <button onClick={() => onRemove(device)} className="text-red-500 hover:text-red-700">
            Quitar
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
            transformOrigin: 'top left',
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
