import React from 'react';
import { Input } from "@/components/ui/input";
import DeviceSelector from './DeviceSelector';

const Sidebar = ({ 
  url, 
  onUrlChange, 
  devices, 
  selectedDevices, 
  onSelectDevice, 
  category, 
  onCategoryChange, 
  brand, 
  onBrandChange 
}) => {
  return (
    <div className="w-64 bg-white dark:bg-gray-800 shadow-lg overflow-y-auto">
      <div className="p-6">
        <h2 className="text-lg font-semibold mb-4">Configuration</h2>
        <div className="space-y-6">
          <div>
            <label htmlFor="url" className="block text-sm font-medium mb-2">URL Preview</label>
            <Input
              id="url"
              type="url"
              placeholder="Enter URL to preview"
              value={url}
              onChange={(e) => onUrlChange(e.target.value)}
              className="w-full"
            />
          </div>
          <DeviceSelector
            devices={devices}
            selectedDevices={selectedDevices}
            onSelectDevice={onSelectDevice}
            category={category}
            onCategoryChange={onCategoryChange}
            brand={brand}
            onBrandChange={onBrandChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;