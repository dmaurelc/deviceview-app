import React, { useState, useCallback } from 'react';
import { useTheme } from 'next-themes';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import DeviceEmulator from '../components/DeviceEmulator';
import EmptyStateDevice from '../components/EmptyStateDevice';
import useSyncedDevices from '../hooks/useSyncedDevices';

const Index = () => {
  const [url, setUrl] = useState('');
  const [selectedDevices, setSelectedDevices] = useState([]);
  const { theme, setTheme } = useTheme();
  const { syncAction } = useSyncedDevices(selectedDevices);

  const handleUrlChange = useCallback((newUrl) => {
    setUrl(newUrl);
  }, []);

  const handleDeviceChange = useCallback((device) => {
    setSelectedDevices(prev => {
      const isSelected = prev.some(d => d.name === device.name);
      return isSelected ? prev.filter(d => d.name !== device.name) : [device, ...prev];
    });
  }, []);

  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900">
      <Header theme={theme} setTheme={setTheme} url={url} onUrlChange={handleUrlChange} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          selectedDevices={selectedDevices}
          onSelectDevice={handleDeviceChange}
        />
        <main className="flex-1 bg-gray-100 dark:bg-gray-800 overflow-x-auto">
          <div className="p-6 h-full flex items-start space-x-6 snap-x snap-mandatory">
            {selectedDevices.length > 0 ? (
              selectedDevices.map(device => (
                <DeviceEmulator 
                  key={device.name}
                  url={url} 
                  device={device} 
                  onRemove={handleDeviceChange}
                  syncAction={syncAction}
                  theme={theme}
                />
              ))
            ) : (
              <EmptyStateDevice onSelectDevice={handleDeviceChange} />
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
