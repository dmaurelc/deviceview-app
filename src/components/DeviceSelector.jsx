import React from 'react';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { brands } from '../utils/devices';

const DeviceSelector = ({ devices, selectedDevices, onSelectDevice, category, onCategoryChange, brand, onBrandChange }) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Seleccionar Dispositivos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4 mb-4">
          <Select value={category} onValueChange={onCategoryChange}>
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
          <Select value={brand} onValueChange={onBrandChange}>
            <SelectTrigger>
              <SelectValue placeholder="Marca" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              {brands.map((brand) => (
                <SelectItem key={brand} value={brand}>{brand}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {devices.map((device) => (
            <Button
              key={device.name}
              variant={selectedDevices.some(d => d.name === device.name) ? "default" : "outline"}
              className="w-full justify-start text-left text-xs"
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
