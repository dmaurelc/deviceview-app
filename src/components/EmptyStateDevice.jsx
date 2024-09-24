import React from 'react';
import { Button } from "@/components/ui/button";
import { Smartphone } from 'lucide-react';
import { devices } from '../utils/devices';

const EmptyStateDevice = ({ onSelectDevice }) => {
  const defaultDevice = devices.find(device => device.name === 'iPhone 12 Pro');

  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-gray-100 dark:bg-gray-800 p-8">
      <Smartphone className="w-16 h-16 text-gray-400 mb-4" />
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No devices selected</h2>
      <p className="text-gray-600 dark:text-gray-400 text-center mb-6">
        Select a device from the sidebar to start previewing your site on different screen sizes.
      </p>
      <Button onClick={() => onSelectDevice(defaultDevice)}>
        Add iPhone 12 Pro
      </Button>
    </div>
  );
};

export default EmptyStateDevice;
