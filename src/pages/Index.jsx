import React, { useState, useCallback, useEffect } from 'react';
import { useTheme } from 'next-themes';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import DeviceEmulator from '../components/DeviceEmulator';
import EmptyStateDevice from '../components/EmptyStateDevice';
import useSyncedDevices from '../hooks/useSyncedDevices';

const Index = () => {
  const [url, setUrl] = useState('');
  const [selectedDevices, setSelectedDevices] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const { theme, setTheme } = useTheme();
  const { syncAction } = useSyncedDevices(selectedDevices);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(true);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleUrlChange = useCallback((newUrl) => {
    setUrl(newUrl);
  }, []);

  const handleDeviceChange = useCallback((device) => {
    setSelectedDevices(prev => {
      const isSelected = prev.some(d => d.name === device.name);
      return isSelected ? prev.filter(d => d.name !== device.name) : [...prev, device];
    });
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900 font-outfit">
      <Header 
        theme={theme} 
        setTheme={setTheme} 
        url={url} 
        onUrlChange={handleUrlChange} 
        toggleSidebar={toggleSidebar}
        isMobile={isMobile}
      />
      <div className="flex flex-1 overflow-hidden relative">
        <Sidebar
          isOpen={isSidebarOpen}
          selectedDevices={selectedDevices}
          onSelectDevice={handleDeviceChange}
          isMobile={isMobile}
          url={url}
          onUrlChange={handleUrlChange}
        />
        <main className={`flex-1 bg-gray-100 dark:bg-gray-800 overflow-x-auto transition-all duration-300 ${isSidebarOpen && !isMobile ? 'ml-64' : ''}`}>
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
