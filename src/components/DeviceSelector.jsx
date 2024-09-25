import React from 'react';
import { Button } from "@/components/ui/button";
import { getBrandIcon } from '../utils/brandIcons';

const DeviceSelector = ({ devices, selectedDevices, onSelectDevice, category }) => {
  return (
    <div className="space-y-2">
      {devices.map((device) => {
        const DeviceIcon = getBrandIcon(device.brand);
        const isSelected = selectedDevices.some(d => d.name === device.name);
        return (
          <Button
            key={device.name}
            variant={isSelected ? "default" : "outline"}
            className={`w-full justify-start text-left text-sm ${
              isSelected 
                ? 'bg-primary text-primary-foreground dark:bg-primary dark:text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground dark:hover:bg-primary/90 dark:hover:text-primary-foreground' 
                : 'dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
            }`}
            onClick={() => onSelectDevice(device)}
          >
            <DeviceIcon className="mr-2 h-4 w-4" />
            <span className="truncate">{device.name}</span>
          </Button>
        );
      })}
    </div>
  );
};

export default DeviceSelector;
