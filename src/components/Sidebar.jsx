import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Smartphone, Tablet, Monitor } from "lucide-react";
import { devices, categories } from "../utils/devices";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Sidebar = ({
  isOpen,
  selectedDevices,
  onSelectDevice,
  isMobile,
  url,
  onUrlChange,
}) => {
  const handleUrlChange = (e) => {
    let value = e.target.value;
    if (!value.startsWith("https://") && value !== "") {
      value = "https://" + value;
    }
    onUrlChange(value);
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case "mobile":
        return <Smartphone className="h-4 w-4" />;
      case "tablet":
        return <Tablet className="h-4 w-4" />;
      case "desktop":
        return <Monitor className="h-4 w-4" />;
      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className={`sidebar fixed top-16 left-0 z-50 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-all duration-300 h-[calc(100vh-4rem)] flex flex-col w-64 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex flex-col h-full">
        <div className="pt-6 p-4 flex justify-between items-center border-b border-gray-200 dark:border-gray-800">
          <h2 className="text-lg font-semibold font-outfit">Devices</h2>
        </div>
        {isMobile && (
          <div className="p-4 border-b border-gray-200 dark:border-gray-800">
            <Input
              type="text"
              placeholder="Enter site URL"
              value={url.startsWith("https://") ? url.slice(8) : url}
              onChange={handleUrlChange}
              className="w-full font-outfit"
            />
          </div>
        )}
        <div className="p-4 space-y-4 overflow-y-auto flex-grow">
          <Accordion type="single" collapsible className="w-full">
            {categories.map((category) => (
              <AccordionItem key={category} value={category}>
                <AccordionTrigger className="text-md font-medium font-outfit">
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
                      .filter((device) => device.category === category)
                      .map((device) => (
                        <Button
                          key={device.name}
                          variant={
                            selectedDevices.some((d) => d.name === device.name)
                              ? "default"
                              : "outline"
                          }
                          className="w-full justify-start text-left text-sm font-outfit"
                          onClick={() => onSelectDevice(device)}
                        >
                          {device.name}
                        </Button>
                      ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        <div className="p-4 border-t border-gray-200 dark:border-gray-800 mt-auto">
          <p className="text-left text-sm text-gray-500 dark:text-gray-400 font-outfit">
            DeviceView - Created with AI
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
