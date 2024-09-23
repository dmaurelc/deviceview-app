import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

const DeviceEmulator = ({ url, device, onRemove }) => {
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
