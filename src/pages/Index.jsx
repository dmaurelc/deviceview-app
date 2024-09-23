import React, { useState, useMemo, useCallback } from 'react';
import { Input } from "@/components/ui/input";
import DeviceEmulator from '../components/DeviceEmulator';
import DeviceSelector from '../components/DeviceSelector';
import Header from '../components/Header';
import { devices } from '../utils/devices';
import { useTheme } from 'next-themes';
import useSyncedDevices from '../hooks/useSyncedDevices';

const Index = () => {
  const [url, setUrl] = useState('https://tailwindcss.com');
  const [selectedDevices, setSelectedDevices] = useState([]);
  const [category, setCategory] = useState('all');
  const [brand, setBrand] = useState('all');
  const { theme, setTheme } = useTheme();
  const { syncAction } = useSyncedDevices(selectedDevices);

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

  const filteredDevices = useMemo(() => {
    return devices.filter(device => 
      (category === 'all' || device.category === category) &&
      (brand === 'all' || device.brand === brand)
    );
  }, [category, brand]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Header theme={theme} setTheme={setTheme} />
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">URL Preview</h2>
            <Input
              type="url"
              placeholder="Enter URL to preview"
              value={url}
              onChange={handleUrlChange}
              className="w-full"
            />
          </div>
          <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Device Selection</h2>
            <DeviceSelector
              devices={filteredDevices}
              selectedDevices={selectedDevices}
              onSelectDevice={handleDeviceChange}
              category={category}
              onCategoryChange={setCategory}
              brand={brand}
              onBrandChange={setBrand}
            />
          </div>
        </div>
      </main>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
