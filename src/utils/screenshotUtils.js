import { toPng, toJpeg, toCanvas } from 'html-to-image';
import { captureManager } from './captureManager';

const createCaptureContainer = (content, styles, width, height) => {
  const container = document.createElement('div');
  container.style.position = 'absolute';
  container.style.left = '-9999px';
  container.style.width = `${width}px`;
  container.style.height = `${height}px`;
  container.style.overflow = 'hidden';
  
  try {
    container.innerHTML = content;
    const styleElement = document.createElement('style');
    styleElement.textContent = styles;
    container.appendChild(styleElement);
  } catch (error) {
    console.warn('Failed to set container content:', error);
    throw new Error('No se pudo preparar el contenido para captura');
  }
  
  return container;
};

const waitForImages = async (container, timeout = 5000) => {
  const images = container.getElementsByTagName('img');
  const imagePromises = Array.from(images).map(img => {
    if (img.complete) return Promise.resolve();
    
    return new Promise((resolve) => {
      const timer = setTimeout(resolve, timeout);
      img.addEventListener('load', () => {
        clearTimeout(timer);
        resolve();
      });
      img.addEventListener('error', () => {
        clearTimeout(timer);
        resolve();
      });
    });
  });
  
  await Promise.all(imagePromises);
};

const generateDataUrl = async (container, format, width, height, options) => {
  const captureOptions = {
    quality: format === 'jpeg' ? 0.9 : 1,
    backgroundColor: '#fff',
    width,
    height,
    pixelRatio: 1,
    style: {
      transform: 'scale(1)',
      transformOrigin: 'top left',
      width: `${width}px`,
      height: `${height}px`,
    },
    ...options
  };

  try {
    let dataUrl;
    if (format === 'png') {
      dataUrl = await toPng(container, captureOptions);
    } else if (format === 'webp') {
      const canvas = await toCanvas(container, captureOptions);
      dataUrl = canvas.toDataURL('image/webp', 0.9);
    } else {
      dataUrl = await toJpeg(container, captureOptions);
    }
    return dataUrl;
  } catch (error) {
    console.error('Failed to generate image:', error);
    throw new Error(`No se pudo generar la imagen en formato ${format}`);
  }
};

export const captureIframeContent = async (iframe, format, options = {}) => {
  if (!iframe) throw new Error('No se proporcionó un iframe válido');

  const iframeWindow = iframe.contentWindow;
  if (!iframeWindow) throw new Error('No se pudo acceder al contenido del iframe');

  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      window.removeEventListener('message', handleMessage);
      reject(new Error('Tiempo de espera agotado al capturar el contenido'));
    }, 20000);

    const handleMessage = async (event) => {
      if (event.data.type === 'CAPTURED_CONTENT') {
        clearTimeout(timeout);
        window.removeEventListener('message', handleMessage);
        
        const { content, styles, width, height } = event.data.payload;
        
        try {
          const container = createCaptureContainer(content, styles, width, height);
          document.body.appendChild(container);

          await waitForImages(container);
          const dataUrl = await generateDataUrl(container, format, width, height, options);
          
          // Store in temporary storage instead of direct download
          const captureId = await captureManager.storeCapture(dataUrl, {
            type: 'full',
            format,
            width,
            height,
            timestamp: Date.now()
          });
          
          resolve({ captureId, dataUrl });
        } catch (error) {
          reject(error);
        } finally {
          const container = document.querySelector('div[style*="-9999px"]');
          if (container) {
            document.body.removeChild(container);
          }
        }
      }
    };

    window.addEventListener('message', handleMessage);
    
    try {
      iframeWindow.postMessage({ type: 'CAPTURE_CONTENT' }, '*');
    } catch (error) {
      clearTimeout(timeout);
      window.removeEventListener('message', handleMessage);
      reject(new Error('No se pudo comunicar con el iframe'));
    }
  });
};

export const captureVisibleScreen = async (iframe, format, options = {}) => {
  if (!iframe) throw new Error('No se proporcionó un iframe válido');

  const iframeWindow = iframe.contentWindow;
  if (!iframeWindow) throw new Error('No se pudo acceder al contenido del iframe');

  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      window.removeEventListener('message', handleMessage);
      reject(new Error('Tiempo de espera agotado al capturar el área visible'));
    }, 15000);

    const handleMessage = async (event) => {
      if (event.data.type === 'CAPTURED_VISIBLE') {
        clearTimeout(timeout);
        window.removeEventListener('message', handleMessage);
        
        const { content, styles, width, height, scrollX, scrollY } = event.data.payload;
        
        try {
          const container = createCaptureContainer(content, styles, width, height);
          
          // Apply scroll position for visible area
          const contentWrapper = container.firstElementChild;
          if (contentWrapper) {
            contentWrapper.style.transform = `translate(-${scrollX}px, -${scrollY}px)`;
          }
          
          document.body.appendChild(container);

          await new Promise(resolve => setTimeout(resolve, 200));
          const dataUrl = await generateDataUrl(container, format, width, height, options);
          
          // Store in temporary storage
          const captureId = await captureManager.storeCapture(dataUrl, {
            type: 'visible',
            format,
            width,
            height,
            scrollX,
            scrollY,
            timestamp: Date.now()
          });

          resolve({ captureId, dataUrl });
        } catch (error) {
          reject(error);
        } finally {
          const container = document.querySelector('div[style*="-9999px"]');
          if (container) {
            document.body.removeChild(container);
          }
        }
      }
    };

    window.addEventListener('message', handleMessage);
    
    try {
      iframeWindow.postMessage({ type: 'CAPTURE_VISIBLE' }, '*');
    } catch (error) {
      clearTimeout(timeout);
      window.removeEventListener('message', handleMessage);
      reject(new Error('No se pudo comunicar con el iframe'));
    }
  });
};

export const captureFullScreen = async (iframe, format, options = {}) => {
  if (!iframe) throw new Error('No se proporcionó un iframe válido');

  const iframeWindow = iframe.contentWindow;
  if (!iframeWindow) throw new Error('No se pudo acceder al contenido del iframe');

  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      window.removeEventListener('message', handleMessage);
      reject(new Error('Tiempo de espera agotado al capturar la página completa'));
    }, 25000);

    const handleMessage = async (event) => {
      if (event.data.type === 'CAPTURED_FULL_PAGE') {
        clearTimeout(timeout);
        window.removeEventListener('message', handleMessage);
        
        const { content, styles, width, height } = event.data.payload;
        
        try {
          const container = createCaptureContainer(content, styles, width, height);
          document.body.appendChild(container);

          await waitForImages(container, 5000);
          const dataUrl = await generateDataUrl(container, format, width, height, options);
          
          // Store in temporary storage
          const captureId = await captureManager.storeCapture(dataUrl, {
            type: 'full',
            format,
            width,
            height,
            timestamp: Date.now()
          });

          resolve({ captureId, dataUrl });
        } catch (error) {
          reject(error);
        } finally {
          const container = document.querySelector('div[style*="-9999px"]');
          if (container) {
            document.body.removeChild(container);
          }
        }
      }
    };

    window.addEventListener('message', handleMessage);
    
    try {
      iframeWindow.postMessage({ type: 'CAPTURE_FULL_PAGE' }, '*');
    } catch (error) {
      clearTimeout(timeout);
      window.removeEventListener('message', handleMessage);
      reject(new Error('No se pudo comunicar con el iframe'));
    }
  });
};

export const downloadImage = async (dataUrl, filename) => {
  try {
    // Convert data URL to blob for better memory management
    const response = await fetch(dataUrl);
    const blob = await response.blob();
    
    // Create object URL
    const objectUrl = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.download = filename;
    link.href = objectUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Clean up object URL
    setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
  } catch (error) {
    // Fallback to direct data URL
    const link = document.createElement('a');
    link.download = filename;
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};