import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Smartphone, Tablet } from 'lucide-react';

const Sidebar = ({ 
  url, 
  onUrlChange, 
  devices, 
  selectedDevices, 
  onSelectDevice, 
  filter, 
  onFilterChange 
}) => {
  return (
    <div className="w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 overflow-y-auto p-6 space-y-6">
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
      <div className="space-y-2">
        <div className="flex space-x-2">
          <Button
            variant={filter === 'all' ? "default" : "outline"}
            size="sm"
            onClick={() => onFilterChange('all')}
            className="flex-1"
          >
            All
          </Button>
          <Button
            variant={filter === 'mobile' ? "default" : "outline"}
            size="sm"
            onClick={() => onFilterChange('mobile')}
            className="flex-1"
          >
            <Smartphone className="mr-2 h-4 w-4" />
            Mobile
          </Button>
          <Button
            variant={filter === 'tablet' ? "default" : "outline"}
            size="sm"
            onClick={() => onFilterChange('tablet')}
            className="flex-1"
          >
            <Tablet className="mr-2 h-4 w-4" />
            Tablet
          </Button>
        </div>
        {devices.map((device) => (
          <Button
            key={device.name}
            variant={selectedDevices.some(d => d.name === device.name) ? "default" : "outline"}
            className="w-full justify-start text-left text-sm"
            onClick={() => onSelectDevice(device)}
          >
            <span className="truncate">{device.name}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
