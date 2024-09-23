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
    <div className="w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 overflow-y-auto">
      <div className="p-6 space-y-6">
        <div>
          <label htmlFor="url" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">URL Preview</label>
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
  );
};

export default Sidebar;
