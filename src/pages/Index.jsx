import React, { useState, useMemo } from 'react';
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
  const [url, setUrl] = useState('https://example.com');
  const [selectedDevices, setSelectedDevices] = useState([]);
  const [category, setCategory] = useState('all');
  const [brand, setBrand] = useState('all');
  const { theme, setTheme } = useTheme();
  const { syncedState, syncAction, iframeRefs } = useSyncedDevices(selectedDevices);

  const handleUrlChange = (e) => setUrl(e.target.value);
  const handleDeviceChange = (device) => {
    setSelectedDevices(prev => {
      const isSelected = prev.some(d => d.name === device.name);
      if (isSelected) {
        return prev.filter(d => d.name !== device.name);
      } else {
        return [...prev, device];
      }
    });
  };
  const handleCategoryChange = (newCategory) => setCategory(newCategory);
  const handleBrandChange = (newBrand) => setBrand(newBrand);

  const filteredDevices = useMemo(() => {
    return devices.filter(device => 
      (category === 'all' || device.category === category) &&
      (brand === 'all' || device.brand === brand)
    );
  }, [category, brand]);

  return (
    <div className="container mx-auto p-4 min-h-screen bg-background text-foreground">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Emulador de Dispositivos</h1>
        <div className="flex items-center space-x-2">
          <Switch
            id="dark-mode"
            checked={theme === 'dark'}
            onCheckedChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          />
          <Label htmlFor="dark-mode">Modo Oscuro</Label>
        </div>
      </div>
      <div className="flex gap-4 mb-4">
        <Input
          type="url"
          placeholder="Ingrese URL para previsualizar"
          value={url}
          onChange={handleUrlChange}
          className="flex-grow"
        />
        <Button onClick={() => setUrl(url)}>Cargar</Button>
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
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {selectedDevices.map(device => (
          <DeviceEmulator 
            key={device.name} 
            url={url} 
            device={device} 
            onRemove={handleDeviceChange}
            iframeRef={(el) => iframeRefs.current[device.name] = el}
            syncAction={syncAction}
          />
        ))}
      </div>
    </div>
  );
};

export default Index;
