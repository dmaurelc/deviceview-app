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

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar
        url={url}
        onUrlChange={handleUrlChange}
        devices={devices}
        selectedDevices={selectedDevices}
        onSelectDevice={handleDeviceChange}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header theme={theme} setTheme={setTheme} />
        <main className="flex-1 bg-gray-100 dark:bg-gray-800 overflow-x-auto">
          <div className="p-6 h-full flex items-start space-x-6 snap-x snap-mandatory">
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
        </main>
      </div>
    </div>
  );
};

export default Index;
