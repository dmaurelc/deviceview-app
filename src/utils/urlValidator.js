export const isValidUrl = (string) => {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
};

export const checkUrlValidity = async (url) => {
  if (!isValidUrl(url)) {
    throw new Error('URL inválida');
  }

  try {
    const response = await fetch(url, { method: 'HEAD' });
    if (!response.ok) {
      throw new Error('La URL no funciona');
    }
    return true;
  } catch (error) {
    throw new Error('La URL no funciona');
  }
};
