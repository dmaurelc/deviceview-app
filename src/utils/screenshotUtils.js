import { toPng, toJpeg } from 'html-to-image';

export const captureIframeContent = async (iframe, format, options = {}) => {
  if (!iframe) throw new Error('No se proporcionó un iframe válido');

  const iframeWindow = iframe.contentWindow;
  if (!iframeWindow) throw new Error('No se pudo acceder al contenido del iframe');

  // Solicitar el contenido al iframe
  return new Promise((resolve, reject) => {
    const handleMessage = async (event) => {
      if (event.data.type === 'CAPTURED_CONTENT') {
        window.removeEventListener('message', handleMessage);
        
        const { content, styles, width, height } = event.data.payload;
        
        // Crear un contenedor temporal
        const container = document.createElement('div');
        container.style.position = 'absolute';
        container.style.left = '-9999px';
        container.style.width = `${width}px`;
        container.style.height = `${height}px`;
        
        // Agregar el contenido y los estilos
        container.innerHTML = content;
        const styleElement = document.createElement('style');
        styleElement.textContent = styles;
        container.appendChild(styleElement);
        
        document.body.appendChild(container);

        try {
          // Esperar a que las imágenes se carguen
          const images = container.getElementsByTagName('img');
          await Promise.all(Array.from(images).map(img => {
            if (img.complete) return Promise.resolve();
            return new Promise((imgResolve, imgReject) => {
              img.addEventListener('load', imgResolve);
              img.addEventListener('error', imgReject);
            });
          }));

          const captureOptions = {
            quality: 1,
            backgroundColor: '#fff',
            width,
            height,
            style: {
              transform: 'scale(1)',
              transformOrigin: 'top left',
              width: `${width}px`,
              height: `${height}px`,
            },
            ...options
          };

          // Capturar el contenido
          const dataUrl = format === 'png' 
            ? await toPng(container, captureOptions)
            : await toJpeg(container, captureOptions);

          resolve(dataUrl);
        } catch (error) {
          reject(error);
        } finally {
          document.body.removeChild(container);
        }
      }
    };

    window.addEventListener('message', handleMessage);
    iframeWindow.postMessage({ type: 'CAPTURE_CONTENT' }, '*');

    // Timeout para evitar que se quede esperando indefinidamente
    setTimeout(() => {
      window.removeEventListener('message', handleMessage);
      reject(new Error('Tiempo de espera agotado al capturar el contenido'));
    }, 10000);
  });
};