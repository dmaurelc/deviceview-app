import React, { useState } from 'react';
import { Smartphone } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { isValidUrl } from '../utils/urlValidator';
import { useToast } from "@/components/ui/use-toast";

const EmptyStateDevice = ({ url, onUrlChange, onAddRandomDevice }) => {
  const [isUrlValid, setIsUrlValid] = useState(true);
  const { toast } = useToast();

  const handleUrlChange = (e) => {
    const value = e.target.value;
    const isValid = isValidUrl(value);
    setIsUrlValid(isValid);
    if (isValid) {
      onUrlChange(value.startsWith('http') ? value : `https://${value}`);
    } else {
      onUrlChange(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isUrlValid && url) {
      try {
        await onAddRandomDevice();
      } catch (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "URL Inválida",
        description: "Por favor, ingrese una URL válida",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-gray-100 dark:bg-gray-800 p-8">
      <Smartphone className="w-16 h-16 text-gray-400 mb-4" />
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Comienza tu previsualización</h2>
      <p className="text-gray-600 dark:text-gray-400 text-center mb-6">
        Ingresa la URL del sitio que deseas previsualizar y agregaremos automáticamente un dispositivo para ti.
      </p>
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <Label htmlFor="url-input" className="sr-only">URL del sitio</Label>
        <div className="flex gap-2">
          <Input
            id="url-input"
            type="text"
            placeholder="Ingresa la URL del sitio"
            value={url}
            onChange={handleUrlChange}
            className={`flex-grow font-outfit ${!isUrlValid ? 'border-red-500' : ''}`}
          />
          <Button type="submit" disabled={!isUrlValid || !url}>Previsualizar</Button>
        </div>
        {!isUrlValid && (
          <p className="text-red-500 text-sm mt-1">Por favor, ingrese una URL válida</p>
        )}
      </form>
    </div>
  );
};

export default EmptyStateDevice;
