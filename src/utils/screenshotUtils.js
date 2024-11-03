import { toPng, toJpeg } from 'html-to-image';

export const captureIframeContent = async (iframe, format, options = {}) => {
  if (!iframe) throw new Error('No se proporcionó un iframe válido');

  const iframeWindow = iframe.contentWindow;
  if (!iframeWindow) throw new Error('No se pudo acceder al contenido del iframe');

  // Esperar a que el contenido del iframe esté completamente cargado
  await new Promise((resolve) => {
    if (iframeWindow.document.readyState === 'complete') {
      resolve();
    } else {
      iframeWindow.addEventListener('load', resolve);
    }
  });

  const content = iframeWindow.document.documentElement;
  
  // Crear un contenedor temporal para la captura
  const container = document.createElement('div');
  container.style.position = 'absolute';
  container.style.left = '-9999px';
  container.style.width = `${content.scrollWidth}px`;
  container.style.height = `${content.scrollHeight}px`;
  
  // Clonar el contenido del iframe
  const clone = content.cloneNode(true);
  container.appendChild(clone);
  document.body.appendChild(container);

  try {
    // Esperar a que las imágenes se carguen en el clon
    const images = container.getElementsByTagName('img');
    await Promise.all(Array.from(images).map(img => {
      if (img.complete) return Promise.resolve();
      return new Promise((resolve, reject) => {
        img.addEventListener('load', resolve);
        img.addEventListener('error', reject);
      });
    }));

    const captureOptions = {
      quality: 1,
      backgroundColor: '#fff',
      width: content.scrollWidth,
      height: content.scrollHeight,
      style: {
        transform: 'scale(1)',
        transformOrigin: 'top left',
        width: `${content.scrollWidth}px`,
        height: `${content.scrollHeight}px`,
      },
      ...options
    };

    let dataUrl;
    if (format === 'png') {
      dataUrl = await toPng(container, captureOptions);
    } else {
      dataUrl = await toJpeg(container, captureOptions);
    }

    return dataUrl;
  } finally {
    document.body.removeChild(container);
  }
};