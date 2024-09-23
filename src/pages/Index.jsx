import React, { useState, useMemo } from 'react';
import { Input, Button, Container, Grid, Text } from "@nextui-org/react";
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
    <Container fluid className="py-8">
      <Text h1 className="text-center mb-8">Emulador de Dispositivos</Text>
      <Grid.Container gap={2} justify="center">
        <Grid xs={12} md={8}>
          <Input
            type="url"
            placeholder="Ingrese URL para previsualizar"
            value={url}
            onChange={handleUrlChange}
            width="100%"
            contentRight={
              <Button auto onClick={() => setUrl(url)}>
                Cargar
              </Button>
            }
          />
        </Grid>
      </Grid.Container>
      <Grid.Container gap={4} className="mt-8">
        <Grid xs={12} md={3}>
          <DeviceSelector
            devices={filteredDevices}
            selectedDevice={selectedDevice}
            onSelectDevice={handleDeviceChange}
            category={category}
            onCategoryChange={handleCategoryChange}
          />
        </Grid>
        <Grid xs={12} md={9}>
          <DeviceEmulator url={url} device={selectedDevice} />
        </Grid>
      </Grid.Container>
    </Container>
  );
};

export default Index;
