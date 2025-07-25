import React, { useEffect, useRef, useState } from 'react';
import { X, RefreshCw, Camera, ChevronDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { captureVisibleScreen, captureFullScreen, downloadImage } from '@/utils/screenshotUtils';
import { downloadFromStorage } from '@/utils/captureManager';
import TemporaryUrlPlaceholder from './TemporaryUrlPlaceholder';

const DeviceEmulator = ({ url, device, onRemove, syncAction, theme, onIframeClick, iframeRef }) => {
  const [isRotated, setIsRotated] = useState(false);
  const [isValidUrl, setIsValidUrl] = useState(true);
  const [isCapturing, setIsCapturing] = useState(false);
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

  const handleRefresh = () => {
    if (localIframeRef.current) {
      localIframeRef.current.src = localIframeRef.current.src;
    }
  };

  const handleScreenshot = async (type, format) => {
    if (!localIframeRef.current || isCapturing) return;

    setIsCapturing(true);
    
    try {
      toast({
        title: type === 'visible' ? 'Iniciando captura visible...' : 'Iniciando captura completa...',
        description: 'Preparando la captura de pantalla...'
      });

      const captureFunction = type === 'visible' ? captureVisibleScreen : captureFullScreen;
      
      // Show processing message for longer captures
      const processingToast = setTimeout(() => {
        toast({
          title: 'Procesando captura...',
          description: 'Esto puede tomar unos segundos para páginas grandes.'
        });
      }, 2000);

      const result = await captureFunction(localIframeRef.current, format);
      clearTimeout(processingToast);
      
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
      const filename = `${device.name.toLowerCase().replace(/\s+/g, '-')}-${type}-${timestamp}.${format}`;
      
      // Download from temporary storage
      await downloadFromStorage(result.captureId, filename);
      
      toast({
        title: '¡Captura completada!',
        description: `Screenshot descargado como ${filename}`,
        duration: 3000
      });
    } catch (error) {
      console.error('Error al capturar screenshot:', error);
      
      let errorMessage = 'No se pudo completar la captura de pantalla.';
      if (error.message.includes('CORS')) {
        errorMessage = 'Error de CORS. La página tiene restricciones de seguridad.';
      } else if (error.message.includes('timeout') || error.message.includes('Tiempo de espera')) {
        errorMessage = 'La captura tardó demasiado. Intenta con una página más pequeña.';
      } else if (error.message.includes('comunicar')) {
        errorMessage = 'No se pudo acceder al contenido de la página.';
      }
      
      toast({
        title: 'Error en la captura',
        description: errorMessage,
        variant: 'destructive',
        duration: 5000
      });
    } finally {
      setIsCapturing(false);
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

  const RotateIcon = () => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="14" 
      height="14" 
      viewBox="0 0 256 256"
      className="text-current"
    >
      <path 
        fill="currentColor" 
        d="m205.66 221.66l-24 24a8 8 0 0 1-11.32-11.32L180.69 224H80a24 24 0 0 1-24-24v-96a8 8 0 0 1 16 0v96a8 8 0 0 0 8 8h100.69l-10.35-10.34a8 8 0 0 1 11.32-11.32l24 24a8 8 0 0 1 0 11.32M80 72a8 8 0 0 0 5.66-13.66L75.31 48H176a8 8 0 0 1 8 8v96a8 8 0 0 0 16 0V56a24 24 0 0 0-24-24H75.31l10.35-10.34a8 8 0 1 0-11.32-11.32l-24 24a8 8 0 0 0 0 11.32l24 24A8 8 0 0 0 80 72"
      />
    </svg>
  );

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
            {canRotate && (
              <Button variant="ghost" size="icon" className="h-5 w-5 p-0 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200" onClick={handleRotate}>
                <RotateIcon />
              </Button>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-5 w-5 p-0 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  disabled={isCapturing}
                >
                  <Camera size={14} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger className="text-xs">
                    <Camera className="mr-2 h-3 w-3" />
                    Captura visible
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem onClick={() => handleScreenshot('visible', 'png')} className="text-xs">
                      PNG
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleScreenshot('visible', 'jpeg')} className="text-xs">
                      JPEG
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleScreenshot('visible', 'webp')} className="text-xs">
                      WebP
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger className="text-xs">
                    <Camera className="mr-2 h-3 w-3" />
                    Captura completa
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem onClick={() => handleScreenshot('full', 'png')} className="text-xs">
                      PNG
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleScreenshot('full', 'jpeg')} className="text-xs">
                      JPEG
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleScreenshot('full', 'webp')} className="text-xs">
                      WebP
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="ghost" size="icon" className="h-5 w-5 p-0 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200" onClick={handleRefresh}>
              <RefreshCw size={14} />
            </Button>
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