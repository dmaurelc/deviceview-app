import React, { useState, useMemo, useCallback } from 'react';
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import DeviceEmulator from '../components/DeviceEmulator';
import DeviceSelector from '../components/DeviceSelector';
import { devices } from '../utils/devices';
import { useTheme } from 'next-themes';
import useSyncedDevices from '../hooks/useSyncedDevices';

const Index = () => {
  const [url, setUrl] = useState('https://tailwindcss.com');
  const [selectedDevices, setSelectedDevices] = useState([]);
  const [category, setCategory] = useState('all');
  const [brand, setBrand] = useState('all');
  const { theme, setTheme } = useTheme();
  const { syncedState, syncAction } = useSyncedDevices(selectedDevices);

  const handleUrlChange = useCallback((e) => {
    const newUrl = e.target.value.trim();
    setUrl(newUrl || 'https://tailwindcss.com');
  }, []);

  const handleDeviceChange = useCallback((device) => {
    setSelectedDevices(prev => {
      const isSelected = prev.some(d => d.name === device.name);
      return isSelected ? prev.filter(d => d.name !== device.name) : [device, ...prev];
    });
  }, []);

  const handleCategoryChange = useCallback((newCategory) => setCategory(newCategory), []);
  const handleBrandChange = useCallback((newBrand) => setBrand(newBrand), []);

  const filteredDevices = useMemo(() => {
    return devices.filter(device => 
      (category === 'all' || device.category === category) &&
      (brand === 'all' || device.brand === brand)
    );
  }, [category, brand]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-bold mb-8">Device Previewer</h1>
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <Input
              type="url"
              placeholder="Enter URL to preview"
              value={url}
              onChange={handleUrlChange}
              className="flex-grow"
            />
            <div className="flex items-center space-x-2">
              <Switch
                id="dark-mode"
                checked={theme === 'dark'}
                onCheckedChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              />
              <Label htmlFor="dark-mode">Dark Mode</Label>
            </div>
          </div>
          <DeviceSelector
            devices={filteredDevices}
            selectedDevices={selectedDevices}
            onSelectDevice={handleDeviceChange}
            category={category}
            onCategoryChange={handleCategoryChange}
            brand={brand}
            onBrandChange={handleBrandChange}
          />
        </div>
      </div>
      <div className="w-full overflow-x-auto">
        <div className="flex space-x-4 pb-4 px-4 sm:px-6 lg:px-8 min-w-max">
          {selectedDevices.map(device => (
            <DeviceEmulator 
              key={device.name} 
              url={url} 
              device={device} 
              onRemove={handleDeviceChange}
              syncAction={syncAction}
              theme={theme}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
