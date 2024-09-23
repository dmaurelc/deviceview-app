import React from 'react';

const DeviceEmulator = ({ url, device }) => {
  return (
    <div className="flex-grow">
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
      <p className="text-center mt-2 text-sm text-gray-600">
        {device.name} - {device.width}x{device.height}
      </p>
    </div>
  );
};

export default DeviceEmulator;