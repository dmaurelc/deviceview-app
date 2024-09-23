import React from 'react';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { brands, categories } from '../utils/devices';

const DeviceSelector = ({ devices, selectedDevices, onSelectDevice, category, onCategoryChange, brand, onBrandChange }) => {
  return (
    <Card className="w-full mb-4">
      <CardHeader>
        <CardTitle>Seleccionar Dispositivos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-4">
          <Select value={category} onValueChange={onCategoryChange}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Categoría" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={brand} onValueChange={onBrandChange}>
            <SelectTrigger className="w-[150px]">
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
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
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
