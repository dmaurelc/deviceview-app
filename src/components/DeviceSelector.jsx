import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, ChevronDown, Smartphone, Tablet, Laptop } from 'lucide-react';
import { cn } from "@/lib/utils";
import { devices } from '../utils/devices';

const DeviceSelector = ({ selectedDevices, onSelectDevice }) => {
  const [open, setOpen] = useState(false);

  const getDeviceIcon = (category) => {
    switch (category) {
      case 'mobile': return <Smartphone className="mr-2 h-4 w-4" />;
      case 'tablet': return <Tablet className="mr-2 h-4 w-4" />;
      case 'laptop': return <Laptop className="mr-2 h-4 w-4" />;
      default: return <Smartphone className="mr-2 h-4 w-4" />;
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          Add Device
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <div className="max-h-[300px] overflow-auto">
          {devices.map((device) => (
            <Button
              key={device.name}
              onClick={() => {
                onSelectDevice(device);
                setOpen(false);
              }}
              className={cn(
                "w-full justify-start text-left text-sm",
                selectedDevices.some(d => d.name === device.name) ? "bg-accent" : "bg-transparent"
              )}
            >
              {getDeviceIcon(device.category)}
              {device.name}
              {selectedDevices.some(d => d.name === device.name) && (
                <Check className="ml-auto h-4 w-4" />
              )}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default DeviceSelector;
