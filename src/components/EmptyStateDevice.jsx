import React from 'react';
import { Smartphone } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { firstMobileDevice } from '../utils/devices';

const EmptyStateDevice = ({ url, onUrlChange, onAddRandomDevice }) => {
  const { toast } = useToast();

  const handleUrlChange = (e) => {
    const value = e.target.value;
    onUrlChange(value.startsWith('http') ? value : `https://${value}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (url) {
      onAddRandomDevice(firstMobileDevice);
    } else {
      toast({
        title: "URL Inválida",
        description: "Por favor, ingrese una URL",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-gray-100 dark:bg-gray-800 p-8">
      <Smartphone className="w-16 h-16 text-gray-400 mb-4" />
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 text-center">Inicia tu previsualización</h2>
      <p className="text-gray-600 dark:text-gray-400 text-center mb-6 text-sm sm:text-base">
        Ingresa la URL del sitio que deseas previsualizar y agregaremos el primer dispositivo móvil automáticamente.
      </p>
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <Label htmlFor="url-input" className="sr-only">URL del sitio</Label>
        <div className="flex gap-2">
          <Input
            id="url-input"
            type="text"
            placeholder="Ingresa la URL del sitio"
            value={url.startsWith("https://") ? url.slice(8) : url}
            onChange={handleUrlChange}
            className="flex-grow font-outfit"
          />
          <Button type="submit">Previsualizar</Button>
        </div>
      </form>
    </div>
  );
};

export default EmptyStateDevice;