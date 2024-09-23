import React, { useState, useMemo } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import DeviceEmulator from '../components/DeviceEmulator';
import DeviceSelector from '../components/DeviceSelector';
import { devices } from '../utils/devices';
import { useTheme } from 'next-themes';

const Index = () => {
  const [url, setUrl] = useState('https://example.com');
  const [selectedDevice, setSelectedDevice] = useState(devices[0]);
  const [category, setCategory] = useState('all');
  const { theme, setTheme } = useTheme();

  const handleUrlChange = (e) => setUrl(e.target.value);
  const handleDeviceChange = (device) => setSelectedDevice(device);
  const handleCategoryChange = (newCategory) => setCategory(newCategory);

  const filteredDevices = useMemo(() => {
    if (category === 'all') return devices;
    return devices.filter(device => device.category === category);
  }, [category]);

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
      <div className="flex gap-4 mb-8">
        <Input
          type="url"
          placeholder="Ingrese URL para previsualizar"
          value={url}
          onChange={handleUrlChange}
          className="flex-grow"
        />
        <Button onClick={() => setUrl(url)}>Cargar</Button>
      </div>
      <div className="flex flex-col lg:flex-row gap-8">
        <DeviceSelector
          devices={filteredDevices}
          selectedDevice={selectedDevice}
          onSelectDevice={handleDeviceChange}
          category={category}
          onCategoryChange={handleCategoryChange}
        />
        <DeviceEmulator url={url} device={selectedDevice} />
      </div>
    </div>
  );
};

export default Index;
