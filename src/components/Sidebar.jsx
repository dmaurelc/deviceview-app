import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Smartphone, Tablet, Monitor } from 'lucide-react';
import { devices, categories } from '../utils/devices';

const Sidebar = ({ 
  url, 
  onUrlChange, 
  selectedDevices, 
  onSelectDevice,
}) => {
  const getCategoryIcon = (category) => {
    switch (category) {
      case 'mobile': return <Smartphone className="mr-2 h-4 w-4" />;
      case 'tablet': return <Tablet className="mr-2 h-4 w-4" />;
      case 'desktop': return <Monitor className="mr-2 h-4 w-4" />;
      default: return null;
    }
  };

  return (
    <div className="w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 p-6 space-y-6 overflow-y-auto h-full">
      <div>
        <h2 className="text-lg font-semibold mb-2">URL Preview</h2>
        <Input
          type="url"
          placeholder="Enter URL to preview"
          value={url}
          onChange={(e) => onUrlChange(e.target.value)}
          className="w-full"
        />
      </div>
      <div>
        <h2 className="text-lg font-semibold mb-2">Devices</h2>
        {categories.map((category) => (
          <div key={category} className="mb-4">
            <h3 className="text-md font-medium mb-2 flex items-center">
              {getCategoryIcon(category)}
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </h3>
            <div className="space-y-2">
              {devices
                .filter(device => device.category === category)
                .map((device) => (
                  <Button
                    key={device.name}
                    variant={selectedDevices.some(d => d.name === device.name) ? "default" : "outline"}
                    className="w-full justify-start text-left text-sm"
                    onClick={() => onSelectDevice(device)}
                  >
                    {device.name}
                  </Button>
                ))
              }
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
