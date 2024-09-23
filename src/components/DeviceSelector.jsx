import React from 'react';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const DeviceSelector = ({ devices, selectedDevice, onSelectDevice, category, onCategoryChange }) => {
  return (
    <Card className="w-full lg:w-64">
      <CardHeader>
        <CardTitle>Seleccionar Dispositivo</CardTitle>
      </CardHeader>
      <CardContent>
        <Select value={category} onValueChange={onCategoryChange} className="mb-4">
          <SelectTrigger>
            <SelectValue placeholder="Categoría" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="mobile">Móvil</SelectItem>
            <SelectItem value="tablet">Tablet</SelectItem>
            <SelectItem value="desktop">Desktop</SelectItem>
          </SelectContent>
        </Select>
        <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-2">
          {devices.map((device) => (
            <Button
              key={device.name}
              variant={selectedDevice.name === device.name ? "default" : "outline"}
              className="w-full justify-start text-left"
              onClick={() => onSelectDevice(device)}
            >
              {device.name}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DeviceSelector;
