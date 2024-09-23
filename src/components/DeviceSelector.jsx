import React from 'react';
import { Button } from "@/components/ui/button";
import { getBrandIcon } from '../utils/brandIcons';

const DeviceSelector = ({ devices, selectedDevices, onSelectDevice, category, onCategoryChange, brand, onBrandChange }) => {
  const categories = ['all', 'mobile', 'tablet'];
  const brands = ['all', 'Apple', 'Samsung', 'Google'];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <Button
            key={cat}
            variant={category === cat ? "default" : "outline"}
            size="sm"
            onClick={() => onCategoryChange(cat)}
            className="text-xs"
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </Button>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {brands.map((b) => {
          const BrandIcon = getBrandIcon(b);
          return (
            <Button
              key={b}
              variant={brand === b ? "default" : "outline"}
              size="sm"
              onClick={() => onBrandChange(b)}
              className="text-xs"
            >
              <BrandIcon className="mr-1 h-3 w-3" />
              {b}
            </Button>
          );
        })}
      </div>
      <div className="space-y-2">
        {devices.map((device) => {
          const DeviceIcon = getBrandIcon(device.brand);
          const isSelected = selectedDevices.some(d => d.name === device.name);
          return (
            <Button
              key={device.name}
              variant={isSelected ? "default" : "outline"}
              className="w-full justify-start text-left text-sm"
              onClick={() => onSelectDevice(device)}
            >
              <DeviceIcon className="mr-2 h-4 w-4" />
              <span className="truncate">{device.name}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default DeviceSelector;
