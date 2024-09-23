export const devices = [
  // Apple
  { name: 'iPhone 12 Pro', width: 390, height: 844, category: 'mobile', brand: 'Apple' },
  { name: 'iPhone SE', width: 375, height: 667, category: 'mobile', brand: 'Apple' },
  { name: 'iPhone 13 Mini', width: 375, height: 812, category: 'mobile', brand: 'Apple' },
  { name: 'iPhone 13 Pro Max', width: 428, height: 926, category: 'mobile', brand: 'Apple' },
  { name: 'iPad Air', width: 820, height: 1180, category: 'tablet', brand: 'Apple' },
  { name: 'iPad Mini', width: 768, height: 1024, category: 'tablet', brand: 'Apple' },
  { name: 'iPad Pro 11"', width: 834, height: 1194, category: 'tablet', brand: 'Apple' },
  { name: 'iPad Pro 12.9"', width: 1024, height: 1366, category: 'tablet', brand: 'Apple' },

  // Samsung
  { name: 'Samsung Galaxy S20', width: 360, height: 800, category: 'mobile', brand: 'Samsung' },
  { name: 'Samsung Galaxy S21 Ultra', width: 384, height: 854, category: 'mobile', brand: 'Samsung' },
  { name: 'Galaxy Tab S7', width: 800, height: 1280, category: 'tablet', brand: 'Samsung' },

  // Google
  { name: 'Pixel 5', width: 393, height: 851, category: 'mobile', brand: 'Google' },
  { name: 'Google Pixel 4', width: 353, height: 745, category: 'mobile', brand: 'Google' },
  { name: 'Nexus 9', width: 1024, height: 768, category: 'tablet', brand: 'Google' },

  // Microsoft
  { name: 'Surface Pro 7', width: 912, height: 1368, category: 'tablet', brand: 'Microsoft' },

  // Other
  { name: 'OnePlus 9', width: 412, height: 915, category: 'mobile', brand: 'OnePlus' },
  { name: 'Xiaomi Mi 11', width: 393, height: 873, category: 'mobile', brand: 'Xiaomi' },
  { name: 'Kindle Fire HDX', width: 800, height: 1280, category: 'tablet', brand: 'Amazon' },
];

export const brands = [...new Set(devices.map(device => device.brand))];
export const categories = ['mobile', 'tablet'];
