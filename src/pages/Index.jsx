import React, { useState, useMemo, useCallback } from 'react';
import { useTheme } from 'next-themes';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import DeviceEmulator from '../components/DeviceEmulator';
import useSyncedDevices from '../hooks/useSyncedDevices';
import { devices } from '../utils/devices';

const Index = () => {
  const [url, setUrl] = useState('https://tailwindcss.com');
  const [selectedDevices, setSelectedDevices] = useState([]);
  const [category, setCategory] = useState('all');
  const [brand, setBrand] = useState('all');
  const { theme, setTheme } = useTheme();
  const { syncAction } = useSyncedDevices(selectedDevices);

  const handleUrlChange = useCallback((newUrl) => {
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
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar
        url={url}
        onUrlChange={handleUrlChange}
        devices={filteredDevices}
        selectedDevices={selectedDevices}
        onSelectDevice={handleDeviceChange}
        category={category}
        onCategoryChange={setCategory}
        brand={brand}
        onBrandChange={setBrand}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header theme={theme} setTheme={setTheme} />
        <main className="flex-1 overflow-x-auto overflow-y-auto bg-gray-200 dark:bg-gray-800">
          <div className="p-6">
            <div className="flex flex-nowrap items-start overflow-x-auto pb-4">
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
        </main>
      </div>
    </div>
  );
};

export default Index;
