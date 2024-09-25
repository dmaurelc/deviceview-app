import React, { useState, useCallback, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { toast } from 'sonner';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import DeviceEmulator from '../components/DeviceEmulator';
import EmptyStateDevice from '../components/EmptyStateDevice';
import useSyncedDevices from '../hooks/useSyncedDevices';
import { validateUrl } from '../utils/urlValidator';

const Index = () => {
  const [url, setUrl] = useState('');
  const [selectedDevices, setSelectedDevices] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isUrlValid, setIsUrlValid] = useState(true);
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
    setIsUrlValid(true); // Reset validation state when URL changes
  }, []);

  const handleUrlSubmit = useCallback(async () => {
    const isValid = await validateUrl(url);
    setIsUrlValid(isValid);
    if (!isValid) {
      toast.error('La URL ingresada no es válida o no está accesible. Por favor, verifica e intenta nuevamente.');
    }
  }, [url]);

  const handleDeviceChange = useCallback((device) => {
    if (isUrlValid) {
      setSelectedDevices(prev => {
        const isSelected = prev.some(d => d.name === device.name);
        return isSelected ? prev.filter(d => d.name !== device.name) : [...prev, device];
      });
    } else {
      toast.error('Por favor, ingresa una URL válida antes de seleccionar un dispositivo.');
    }
  }, [isUrlValid]);

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

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
                  isUrlValid={isUrlValid}
                />
              ))
            ) : (
              <EmptyStateDevice 
                url={url} 
                onUrlChange={handleUrlChange} 
                onUrlSubmit={handleUrlSubmit}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
