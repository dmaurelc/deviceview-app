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
  const sidebarRef = useRef(null);
  const mainRef = useRef(null);

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobile && isSidebarOpen && sidebarRef.current && !sidebarRef.current.contains(event.target) && mainRef.current && mainRef.current.contains(event.target)) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobile, isSidebarOpen]);

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

  const addIPhone12Pro = useCallback(() => {
    const iPhone12Pro = devices.find(device => device.name === "iPhone 12 Pro");
    if (iPhone12Pro && !selectedDevices.some(d => d.name === "iPhone 12 Pro")) {
      handleDeviceChange(iPhone12Pro);
    }
  }, [handleDeviceChange, selectedDevices]);

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  const handleMainClick = useCallback(() => {
    if (isMobile && isSidebarOpen) {
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
        <div ref={sidebarRef}>
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
        </div>
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
                  onIframeClick={handleMainClick}
                />
              ))
            ) : (
              <EmptyStateDevice 
                url={url} 
                onUrlChange={handleUrlChange} 
                onAddRandomDevice={addIPhone12Pro}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;