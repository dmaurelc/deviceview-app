import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const DeviceEmulator = ({ url, device }) => {
  return (
    <Card className="flex-grow">
      <CardHeader>
        <CardTitle>{device.name} - {device.width}x{device.height}</CardTitle>
      </CardHeader>
      <CardContent>
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
