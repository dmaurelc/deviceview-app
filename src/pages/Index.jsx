import React, { useState, useCallback, useEffect, lazy, Suspense } from 'react';
import { useTheme } from 'next-themes';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import EmptyStateDevice from '../components/EmptyStateDevice';
import useSyncedDevices from '../hooks/useSyncedDevices';
import { devices } from '../utils/devices';
import { useToast } from "@/components/ui/use-toast";

const DeviceEmulator = lazy(() => import('../components/DeviceEmulator'));

const Index = () => {
  const [url, setUrl] = useState('');
  const [selectedDevices, setSelectedDevices] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [openCategories, setOpenCategories] = useState([]);
  const { theme, setTheme } = useTheme();
  const { syncAction } = useSyncedDevices(selectedDevices);
  const { toast } = useToast();

  useEffect(() => {
    const handleResize = () => {
      const newIsMobile = window.innerWidth < 768;
      setIsMobile(newIsMobile);
      if (!newIsMobile) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
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

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen(prev => !prev);
  }, []);

  const closeSidebar = useCallback(() => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  }, [isMobile]);

  const handleMainContentClick = useCallback((e) => {
    if (isMobile && isSidebarOpen) {
      // Verificar si el clic no fue dentro del sidebar
      if (!e.target.closest('.sidebar')) {
        closeSidebar();
      }
    }
  }, [isMobile, isSidebarOpen, closeSidebar]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 font-outfit">
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
          onClose={closeSidebar}
        />
        <main 
          className={`flex-1 bg-gray-100 dark:bg-gray-800 overflow-x-auto transition-all duration-300 ${isSidebarOpen && !isMobile ? 'ml-64' : ''}`}
          onClick={handleMainContentClick}
        >
          <div className="p-6 h-full flex items-start space-x-6 snap-x snap-mandatory">
            {selectedDevices.length > 0 ? (
              selectedDevices.map(device => (
                <Suspense key={device.name} fallback={<div>Loading device...</div>}>
                  <DeviceEmulator 
                    url={url} 
                    device={device} 
                    onRemove={handleDeviceChange}
                    syncAction={syncAction}
                    theme={theme}
                  />
                </Suspense>
              ))
            ) : (
              <EmptyStateDevice 
                url={url} 
                onUrlChange={handleUrlChange} 
                onSelectDevice={handleDeviceChange}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;