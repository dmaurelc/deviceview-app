import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
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
  const { syncedState, syncAction } = useSyncedDevices(selectedDevices);
  const scrollContainerRef = useRef(null);

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

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = 0;
    }
  }, [selectedDevices]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Header theme={theme} setTheme={setTheme} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
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
              onCategoryChange={handleCategoryChange}
              brand={brand}
              onBrandChange={handleBrandChange}
            />
          </div>
        </div>
      </main>
      <div className="w-full overflow-x-auto scrollbar-hide bg-gray-100 dark:bg-gray-800 py-6" ref={scrollContainerRef}>
        <div className="flex space-x-6 px-4 sm:px-6 lg:px-8 min-w-max max-w-full">
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
