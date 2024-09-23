import React from 'react';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { brands, categories } from '../utils/devices';
import { getBrandIcon } from '../utils/brandIcons';

const DeviceSelector = ({ devices, selectedDevices, onSelectDevice, category, onCategoryChange, brand, onBrandChange }) => {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        <Select value={brand} onValueChange={onBrandChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Brand" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Brands</SelectItem>
            {brands.map((brand) => {
              const BrandIcon = getBrandIcon(brand);
              return (
                <SelectItem key={brand} value={brand}>
                  <div className="flex items-center">
                    <BrandIcon className="mr-2 h-4 w-4" />
                    {brand}
                  </div>
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
        <Select value={category} onValueChange={onCategoryChange}>
          <SelectTrigger className="w-[180px]">
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
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
        {devices.map((device) => {
          const DeviceIcon = getBrandIcon(device.brand);
          return (
            <Button
              key={device.name}
              variant={selectedDevices.some(d => d.name === device.name) ? "default" : "outline"}
              className="w-full justify-start text-left text-xs"
              onClick={() => onSelectDevice(device)}
            >
              <DeviceIcon className="mr-2 h-4 w-4" />
              {device.name}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default DeviceSelector;
