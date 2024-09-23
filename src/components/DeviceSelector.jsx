import React from 'react';
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

const DeviceSelector = ({ devices, selectedDevice, onSelectDevice }) => {
  return (
    <ScrollArea className="h-[300px] w-48 rounded-md border p-4">
      <div className="space-y-2">
        {devices.map((device) => (
          <Button
            key={device.name}
            variant={selectedDevice.name === device.name ? "default" : "outline"}
            className="w-full justify-start"
            onClick={() => onSelectDevice(device)}
          >
            {device.name}
          </Button>
        ))}
      </div>
    </ScrollArea>
  );
};

export default DeviceSelector;