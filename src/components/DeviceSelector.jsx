import React from 'react';
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const DeviceSelector = ({ devices, selectedDevice, onSelectDevice, category, onCategoryChange }) => {
  return (
    <div className="w-48 space-y-4">
      <Select value={category} onValueChange={onCategoryChange}>
        <SelectTrigger>
          <SelectValue placeholder="Categoría" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos</SelectItem>
          <SelectItem value="mobile">Móvil</SelectItem>
          <SelectItem value="tablet">Tablet</SelectItem>
        </SelectContent>
      </Select>
      <ScrollArea className="h-[300px] rounded-md border p-4">
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
    </div>
  );
};

export default DeviceSelector;
