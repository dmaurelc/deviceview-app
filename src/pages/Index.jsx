import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import DeviceEmulator from '../components/DeviceEmulator';
import EmptyStateDevice from '../components/EmptyStateDevice';
import useSyncedDevices from '../hooks/useSyncedDevices';
import { devices } from '../utils/devices';
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [url, setUrl] = useState('');
  const [selectedDevices, setSelectedDevices] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [openCategories, setOpenCategories] = useState([]);
  const { theme, setTheme } = useTheme();
  const { syncAction } = useSyncedDevices(selectedDevices);
  const { toast } = useToast();
  const mainRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      const isMobileView = window.innerWidth < 768;
      setIsMobile(isMobileView);
      if (!isMobileView) {
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
    if (!openCategories.includes(device.category)) {
      setOpenCategories(prev => [...prev, device.category]);
    }
  }, [openCategories]);

  const toggleCategory = useCallback((newOpenCategories) => {
    setOpenCategories(newOpenCategories);
  }, []);

  const addRandomDevice = useCallback(() => {
    const randomDevice = devices[Math.floor(Math.random() * devices.length)];
    handleDeviceChange(randomDevice);
  }, [handleDeviceChange]);

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen(prev => !prev);
  }, []);

  const handleMainClick = useCallback((e) => {
    if (isMobile && isSidebarOpen && !e.target.closest('.sidebar')) {
      setIsSidebarOpen(false);
    }
  }, [isMobile, isSidebarOpen]);

  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900 font-outfit">
      <div className="z-50 relative">
        <Header 
          theme={theme} 
          setTheme={setTheme} 
          url={url} 
          onUrlChange={handleUrlChange} 
          toggleSidebar={toggleSidebar}
          isMobile={isMobile}
          hasSelectedDevices={selectedDevices.length > 0}
        />
      </div>
      <div className="flex flex-1 overflow-hidden relative z-10">
        <Sidebar
          isOpen={isSidebarOpen}
          selectedDevices={selectedDevices}
          onSelectDevice={handleDeviceChange}
          isMobile={isMobile}
          url={url}
          onUrlChange={handleUrlChange}
          openCategories={openCategories}
          toggleCategory={toggleCategory}
        />
        <main 
          ref={mainRef}
          className={`flex-1 bg-gray-100 dark:bg-gray-800 overflow-x-auto transition-all duration-300 ${isSidebarOpen && !isMobile ? 'ml-64' : ''}`}
          onClick={handleMainClick}
        >
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
              <EmptyStateDevice 
                url={url} 
                onUrlChange={handleUrlChange} 
                onAddRandomDevice={addRandomDevice}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;