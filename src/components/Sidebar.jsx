import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Smartphone, Tablet, Monitor, ChevronRight } from 'lucide-react';
import { devices, categories } from '../utils/devices';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Sidebar = ({ 
  url, 
  onUrlChange, 
  selectedDevices, 
  onSelectDevice,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'mobile': return <Smartphone className="h-4 w-4" />;
      case 'tablet': return <Tablet className="h-4 w-4" />;
      case 'desktop': return <Monitor className="h-4 w-4" />;
      default: return null;
    }
  };

  if (isCollapsed) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-16 left-0 z-50 m-2"
        onClick={() => setIsCollapsed(false)}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-all duration-300 h-full flex flex-col w-64">
      <Button
        variant="ghost"
        size="icon"
        className="self-end m-2"
        onClick={() => setIsCollapsed(true)}
      >
        <ChevronRight className="h-4 w-4 rotate-180" />
      </Button>
      <div className="p-6 space-y-6 overflow-y-auto flex-grow">
        <div>
          <h2 className="text-lg font-semibold mb-2">Devices</h2>
          <Accordion type="single" collapsible className="w-full">
            {categories.map((category) => (
              <AccordionItem key={category} value={category}>
                <AccordionTrigger className="text-md font-medium">
                  <div className="flex items-center w-full">
                    <span className="mr-2">{getCategoryIcon(category)}</span>
                    <span className="flex-grow text-left">
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    {devices
                      .filter(device => device.category === category)
                      .map((device) => (
                        <Button
                          key={device.name}
                          variant={selectedDevices.some(d => d.name === device.name) ? "default" : "outline"}
                          className="w-full justify-start text-left text-sm"
                          onClick={() => onSelectDevice(device)}
                        >
                          {device.name}
                        </Button>
                      ))
                    }
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
