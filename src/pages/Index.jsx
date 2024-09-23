import React, { useState, useMemo } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import DeviceEmulator from '../components/DeviceEmulator';
import DeviceSelector from '../components/DeviceSelector';
import { devices } from '../utils/devices';

const Index = () => {
  const [url, setUrl] = useState('https://example.com');
  const [selectedDevice, setSelectedDevice] = useState(devices[0]);
  const [category, setCategory] = useState('all');

  const handleUrlChange = (e) => setUrl(e.target.value);
  const handleDeviceChange = (device) => setSelectedDevice(device);
  const handleCategoryChange = (newCategory) => setCategory(newCategory);

  const filteredDevices = useMemo(() => {
    if (category === 'all') return devices;
    return devices.filter(device => device.category === category);
  }, [category]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Emulador de Dispositivos</h1>
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
      <div className="flex flex-col md:flex-row gap-4">
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
