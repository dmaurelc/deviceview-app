import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import DeviceEmulator from '../components/DeviceEmulator';
import DeviceSelector from '../components/DeviceSelector';
import { devices } from '../utils/devices';
import { useTheme } from 'next-themes';
import useSyncedDevices from '../hooks/useSyncedDevices';

const Index = () => {
  const [url, setUrl] = useState('https://tailwindcss.com');
  const [selectedDevices, setSelectedDevices] = useState([]);
  const [category, setCategory] = useState('all');
  const [brand, setBrand] = useState('all');
  const { theme, setTheme } = useTheme();
  const { syncedState, syncAction, iframeRefs } = useSyncedDevices(selectedDevices);

  const handleUrlChange = useCallback((e) => setUrl(e.target.value), []);
  const handleDeviceChange = useCallback((device) => {
    setSelectedDevices(prev => {
      const isSelected = prev.some(d => d.name === device.name);
      return isSelected ? prev.filter(d => d.name !== device.name) : [...prev, device];
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
    // Forzar la recarga de los iframes cuando cambia la URL
    selectedDevices.forEach(device => {
      const iframe = iframeRefs.current[device.name];
      if (iframe) {
        iframe.src = url;
      }
    });
  }, [url, selectedDevices, iframeRefs]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="py-10">
        <header>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold leading-tight text-gray-900 dark:text-white">Emulador de Dispositivos</h1>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="px-4 py-8 sm:px-0">
              <div className="border-4 border-dashed border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex-grow mr-4">
                    <Input
                      type="url"
                      placeholder="Ingrese URL para previsualizar"
                      value={url}
                      onChange={handleUrlChange}
                      className="w-full"
                    />
                  </div>
                  <Button onClick={() => setUrl(url)}>Cargar</Button>
                  <div className="flex items-center ml-4">
                    <Switch
                      id="dark-mode"
                      checked={theme === 'dark'}
                      onCheckedChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    />
                    <Label htmlFor="dark-mode" className="ml-2">Modo Oscuro</Label>
                  </div>
                </div>
                <DeviceSelector
                  devices={filteredDevices}
                  selectedDevices={selectedDevices}
                  onSelectDevice={handleDeviceChange}
                  category={category}
                  onCategoryChange={handleCategoryChange}
                  brand={brand}
                  onBrandChange={handleBrandChange}
                />
                <div className="mt-8 overflow-x-auto">
                  <div className="flex flex-wrap justify-center">
                    {selectedDevices.map(device => (
                      <DeviceEmulator 
                        key={device.name} 
                        url={url} 
                        device={device} 
                        onRemove={handleDeviceChange}
                        syncAction={syncAction}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
