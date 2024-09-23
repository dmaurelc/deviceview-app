import React from 'react';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { brands, categories } from '../utils/devices';
import { getBrandIcon } from '../utils/brandIcons';

const DeviceSelector = ({ devices, selectedDevices, onSelectDevice, category, onCategoryChange, brand, onBrandChange }) => {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Select value={brand} onValueChange={onBrandChange}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Brand" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Brands</SelectItem>
            {brands.map((brand) => {
              const BrandIcon = getBrandIcon(brand);
              return (
                <SelectItem key={brand} value={brand}>
                  <div className="flex items-center">
                    <BrandIcon className="mr-2 h-3 w-3" />
                    {brand}
                  </div>
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
        <Select value={category} onValueChange={onCategoryChange}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-1">
        {devices.map((device) => {
          const DeviceIcon = getBrandIcon(device.brand);
          return (
            <Button
              key={device.name}
              variant={selectedDevices.some(d => d.name === device.name) ? "default" : "outline"}
              className="w-full h-auto py-1 px-2 justify-start text-left text-xs"
              onClick={() => onSelectDevice(device)}
            >
              <DeviceIcon className="mr-1 h-3 w-3" />
              <span className="truncate">{device.name}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default DeviceSelector;
