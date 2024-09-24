import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Smartphone, Tablet, Monitor, ChevronRight, ChevronLeft } from 'lucide-react';
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
        variant="secondary"
        size="icon"
        className="fixed top-16 left-0 z-50 m-2 bg-primary text-primary-foreground"
        onClick={() => setIsCollapsed(false)}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-all duration-300 h-full flex flex-col w-64">
      <div className="p-4 flex justify-between items-center border-b border-gray-200 dark:border-gray-800">
        <h2 className="text-lg font-semibold">Devices</h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(true)}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      </div>
      <div className="p-4 space-y-4 overflow-y-auto flex-grow">
        {isMobile && (
          <Input
            type="url"
            placeholder="Enter URL to preview"
            value={url}
            onChange={(e) => onUrlChange(e.target.value)}
            className="w-full mb-4"
          />
        )}
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
      <div className="p-4 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-500 dark:text-gray-400">
        DeviceView - Created with AI
      </div>
    </div>
  );
};

export default Sidebar;
