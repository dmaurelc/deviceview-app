import React from 'react';
import { Smartphone, ArrowRight } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const EmptyStateDevice = ({ url, onUrlChange, onUrlSubmit }) => {
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
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Comienza tu previsualización</h2>
      <p className="text-gray-600 dark:text-gray-400 text-center mb-6">
        Ingresa la URL del sitio que deseas previsualizar y selecciona un dispositivo de la barra lateral.
      </p>
      <div className="w-full max-w-md space-y-4">
        <div className="space-y-2">
          <Label htmlFor="url-input">URL del sitio</Label>
          <div className="flex space-x-2">
            <Input
              id="url-input"
              type="text"
              placeholder="https://ejemplo.com"
              value={url.startsWith("https://") ? url.slice(8) : url}
              onChange={handleUrlChange}
              className="flex-grow font-outfit"
            />
            <Button onClick={onUrlSubmit} className="whitespace-nowrap">
              Validar URL <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyStateDevice;
