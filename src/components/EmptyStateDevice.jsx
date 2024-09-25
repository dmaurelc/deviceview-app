import React from 'react';
import { Smartphone } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const EmptyStateDevice = ({ url, onUrlChange }) => {
  const handleUrlChange = (e) => {
    let value = e.target.value;
    if (!value.startsWith("https://") && value !== "") {
      value = "https://" + value;
    }
    onUrlChange(value);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-gray-100 dark:bg-gray-800 p-8">
      <Smartphone className="w-16 h-16 text-gray-400 mb-4" />
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No devices selected</h2>
      <p className="text-gray-600 dark:text-gray-400 text-center mb-6">
        Enter a URL below and select a device from the sidebar to start previewing your site.
      </p>
      <div className="w-full max-w-md">
        <Label htmlFor="url-input" className="sr-only">Site URL</Label>
        <Input
          id="url-input"
          type="text"
          placeholder="Enter site URL"
          value={url.startsWith("https://") ? url.slice(8) : url}
          onChange={handleUrlChange}
          className="w-full font-outfit"
        />
      </div>
    </div>
  );
};

export default EmptyStateDevice;
