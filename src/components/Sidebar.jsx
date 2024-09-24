import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Laptop, Smartphone, Tablet } from 'lucide-react';

const Sidebar = ({ 
  url, 
  onUrlChange, 
  devices, 
  selectedDevices, 
  onSelectDevice,
}) => {
  const categories = ['mobile', 'tablet', 'desktop'];

  return (
    <div className="w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 p-6 space-y-6">
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
        <div className="space-y-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant="outline"
              className="w-full justify-start"
              onClick={() => {
                const device = devices.find(d => d.category === category);
                if (device) onSelectDevice(device);
              }}
            >
              {category === 'mobile' && <Smartphone className="mr-2 h-4 w-4" />}
              {category === 'tablet' && <Tablet className="mr-2 h-4 w-4" />}
              {category === 'desktop' && <Laptop className="mr-2 h-4 w-4" />}
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Button>
          ))}
        </div>
      </div>
      <div>
        <h2 className="text-lg font-semibold mb-2">Selected Devices</h2>
        <div className="space-y-2">
          {selectedDevices.map((device) => (
            <div key={device.name} className="flex items-center justify-between">
              <span>{device.name}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onSelectDevice(device)}
              >
                Remove
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
