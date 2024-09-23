import React from 'react';
import { Card, CardBody, CardFooter, Text } from "@nextui-org/react";

const DeviceEmulator = ({ url, device }) => {
  return (
    <Card className="w-full max-w-full">
      <CardBody className="p-0 overflow-hidden">
        <div
          className="border-4 border-gray-300 rounded-lg overflow-hidden mx-auto"
          style={{
            width: `${device.width}px`,
            height: `${device.height}px`,
            maxWidth: '100%',
            maxHeight: '80vh',
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
      </CardBody>
      <CardFooter className="justify-center">
        <Text size="sm" color="secondary">
          {device.name} - {device.width}x{device.height}
        </Text>
      </CardFooter>
    </Card>
  );
};

export default DeviceEmulator;