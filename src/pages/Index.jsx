import React, { useState, useMemo } from 'react';
import { Input, Button } from "@nextui-org/react";
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
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Emulador de Dispositivos</h1>
      <div className="flex flex-col items-center mb-8">
        <div className="w-full max-w-2xl">
          <Input
            type="url"
            placeholder="Ingrese URL para previsualizar"
            value={url}
            onChange={handleUrlChange}
            className="w-full"
            contentRight={
              <Button auto onClick={() => setUrl(url)}>
                Cargar
              </Button>
            }
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/4">
          <DeviceSelector
            devices={filteredDevices}
            selectedDevice={selectedDevice}
            onSelectDevice={handleDeviceChange}
            category={category}
            onCategoryChange={handleCategoryChange}
          />
        </div>
        <div className="w-full md:w-3/4">
          <DeviceEmulator url={url} device={selectedDevice} />
        </div>
      </div>
    </div>
  );
};

export default Index;
