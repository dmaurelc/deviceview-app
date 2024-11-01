import React, { useEffect, useRef } from 'react';
import { X, RotateCcw, Download } from 'lucide-react';
import { Button } from "@/components/ui/button";
import TemporaryUrlPlaceholder from './TemporaryUrlPlaceholder';
import { toPng, toJpeg } from 'html-to-image';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";

const DeviceEmulator = ({ url, device, onRemove, syncAction, theme, onIframeClick, iframeRef }) => {
  const [isRotated, setIsRotated] = React.useState(false);
  const [isValidUrl, setIsValidUrl] = React.useState(true);
  const localIframeRef = useRef(null);
  const { toast } = useToast();

  useEffect(() => {
    const iframe = localIframeRef.current;
    if (iframe) {
      const handleLoad = () => {
        iframe.contentWindow.postMessage({ type: 'INIT_LISTENERS', theme }, '*');
        setIsValidUrl(true);
      };
      const handleError = () => {
        setIsValidUrl(false);
      };
      iframe.addEventListener('load', handleLoad);
      iframe.addEventListener('error', handleError);
      return () => {
        iframe.removeEventListener('load', handleLoad);
        iframe.removeEventListener('error', handleError);
      };
    }
  }, [theme, url]);

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data.type === 'DEVICE_ACTION') {
        syncAction(event.data.payload, device.name);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [syncAction, device.name]);

  useEffect(() => {
    if (localIframeRef.current) {
      localIframeRef.current.contentWindow.postMessage({ type: 'THEME_CHANGE', theme }, '*');
    }
  }, [theme]);

  const handleRotate = () => {
    setIsRotated(!isRotated);
  };

  const downloadImage = async (format) => {
    if (!localIframeRef.current) return;

    try {
      const iframe = localIframeRef.current;
      const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
      const iframeContent = iframeDocument.documentElement;
      
      let imageData;
      const fileName = `${device.name}-screenshot.${format}`;

      switch (format) {
        case 'png':
          imageData = await toPng(iframeContent);
          break;
        case 'jpeg':
          imageData = await toJpeg(iframeContent);
          break;
        default:
          return;
      }

      const link = document.createElement('a');
      link.download = fileName;
      link.href = imageData;
      link.click();

      toast({
        title: "Captura guardada",
        description: `La captura se ha guardado como ${fileName}`,
      });
    } catch (err) {
      toast({
        title: "Error al guardar la captura",
        description: "No se pudo guardar la captura de pantalla",
        variant: "destructive",
      });
    }
  };

  const deviceWidth = isRotated ? device.height : device.width;
  const deviceHeight = isRotated ? device.width : device.height;

  const canRotate = device.category === 'mobile' || device.category === 'tablet';

  const isValidURL = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  return (
    <div className="flex flex-col gap-2 flex-shrink-0">
      <div className="rounded-t-lg">
        <div className="flex justify-between items-center text-sm font-medium">
          <span className="font-outfit">{device.name}</span>
          <span className="font-outfit">{deviceWidth}x{deviceHeight}</span>
        </div>
      </div>
      <div className="flex flex-col bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden flex-shrink-0 snap-center" style={{ width: `${deviceWidth}px` }}>
        <div className="bg-gray-100 dark:bg-gray-700 h-7 flex items-center justify-between px-2 text-xs font-medium">
          <div className="flex items-center space-x-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
          </div>
          <span className="truncate max-w-[150px] font-outfit">{url}</span>
          <div className="flex items-center space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-5 w-5 p-0 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                  <Download size={14} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => downloadImage('png')}>
                  Descargar PNG
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => downloadImage('jpeg')}>
                  Descargar JPEG
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            {canRotate && (
              <Button variant="ghost" size="icon" className="h-5 w-5 p-0 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200" onClick={handleRotate}>
                <RotateCcw size={14} />
              </Button>
            )}
            <Button variant="ghost" size="icon" className="h-5 w-5 p-0 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200" onClick={() => onRemove(device)}>
              <X size={14} />
            </Button>
          </div>
        </div>
        <div style={{ height: `${deviceHeight}px`, width: `${deviceWidth}px`, overflow: 'hidden' }} onClick={onIframeClick}>
          {isValidURL(url) && isValidUrl ? (
            <iframe
              ref={(el) => {
                localIframeRef.current = el;
                if (iframeRef) {
                  iframeRef.current[device.name] = el;
                }
              }}
              src={url}
              title={`Preview on ${device.name}`}
              className="w-full h-full border-0"
              style={{ width: '100%', height: '100%' }}
            />
          ) : (
            <TemporaryUrlPlaceholder />
          )}
        </div>
      </div>
    </div>
  );
};

export default DeviceEmulator;
