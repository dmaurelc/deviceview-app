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
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
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
        <main className="flex-1 overflow-x-auto">
          <div className="p-6 min-w-full inline-flex items-start space-x-6 snap-x snap-mandatory">
            {selectedDevices.map(device => (
              <div key={device.name} className="snap-start flex-shrink-0">
                <DeviceEmulator 
                  url={url} 
                  device={device} 
                  onRemove={handleDeviceChange}
                  syncAction={syncAction}
                  theme={theme}
                />
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
