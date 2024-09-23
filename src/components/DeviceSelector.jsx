import React from 'react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";

const DeviceSelector = ({ devices, selectedDevice, onSelectDevice, category, onCategoryChange }) => {
  return (
    <div className="w-full md:w-48 space-y-4">
      <Dropdown>
        <DropdownTrigger>
          <Button variant="bordered" className="w-full">
            {category === 'all' ? 'Todos' : category === 'mobile' ? 'Móvil' : 'Tablet'}
          </Button>
        </DropdownTrigger>
        <DropdownMenu 
          aria-label="Categoría de dispositivo"
          onAction={(key) => onCategoryChange(key)}
        >
          <DropdownItem key="all">Todos</DropdownItem>
          <DropdownItem key="mobile">Móvil</DropdownItem>
          <DropdownItem key="tablet">Tablet</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <div className="h-[300px] w-full overflow-y-auto">
        {devices.map((device) => (
          <Button
            key={device.name}
            color={selectedDevice.name === device.name ? "primary" : "default"}
            className="w-full justify-start mb-2"
            onClick={() => onSelectDevice(device)}
          >
            {device.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default DeviceSelector;
