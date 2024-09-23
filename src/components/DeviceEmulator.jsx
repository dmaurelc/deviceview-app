import React, { useEffect, useRef } from 'react';
import { Card, CardContent } from "@/components/ui/card";

const DeviceEmulator = ({ url, device, onRemove, iframeRef, syncAction }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (iframe) {
      const handleIframeLoad = () => {
        iframe.contentWindow.addEventListener('scroll', handleScroll);
        iframe.contentWindow.addEventListener('wheel', handleZoom);
      };

      iframe.addEventListener('load', handleIframeLoad);

      return () => {
        iframe.removeEventListener('load', handleIframeLoad);
        if (iframe.contentWindow) {
          iframe.contentWindow.removeEventListener('scroll', handleScroll);
          iframe.contentWindow.removeEventListener('wheel', handleZoom);
        }
      };
    }
  }, [iframeRef, syncAction]);

  const handleScroll = (event) => {
    syncAction({
      scroll: {
        x: event.target.scrollingElement.scrollLeft,
        y: event.target.scrollingElement.scrollTop,
      },
    });
  };

  const handleZoom = (event) => {
    if (event.ctrlKey) {
      event.preventDefault();
      syncAction({
        zoom: Math.min(Math.max(0.5, containerRef.current.style.zoom * (event.deltaY > 0 ? 0.9 : 1.1)), 2),
      });
    }
  };

  return (
    <Card className="mb-4">
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
