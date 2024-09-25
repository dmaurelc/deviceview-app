import React from 'react';
import { Smartphone, ArrowRight } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

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
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Comienza tu previsualización</h2>
      <p className="text-gray-600 dark:text-gray-400 text-center mb-6 max-w-md">
        Ingresa la URL del sitio que deseas previsualizar. Luego, selecciona los dispositivos en la barra lateral para ver cómo se ve tu sitio en diferentes pantallas.
      </p>
      <div className="w-full max-w-md space-y-4">
        <div className="space-y-2">
          <Label htmlFor="url-input" className="text-sm font-medium text-gray-700 dark:text-gray-300">URL del sitio</Label>
          <div className="flex items-center space-x-2">
            <Input
              id="url-input"
              type="text"
              placeholder="Ej: www.tusitio.com"
              value={url.startsWith("https://") ? url.slice(8) : url}
              onChange={handleUrlChange}
              className="flex-grow font-outfit"
            />
            <Button type="button" disabled={!url} className="whitespace-nowrap">
              Siguiente <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Ingresa la URL y luego selecciona los dispositivos en la barra lateral para comenzar.
        </p>
      </div>
    </div>
  );
};

export default EmptyStateDevice;
