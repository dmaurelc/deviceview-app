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
  { name: 'MacBook Air', width: 1280, height: 800, category: 'desktop', brand: 'Apple' },
  { name: 'MacBook Pro 13"', width: 1440, height: 900, category: 'desktop', brand: 'Apple' },
  { name: 'MacBook Pro 16"', width: 1792, height: 1120, category: 'desktop', brand: 'Apple' },
  { name: 'iMac 27"', width: 2560, height: 1440, category: 'desktop', brand: 'Apple' },

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
  { name: 'Microsoft Surface Go', width: 1200, height: 1920, category: 'tablet', brand: 'Microsoft' },

  // Other
  { name: 'OnePlus 9', width: 412, height: 915, category: 'mobile', brand: 'OnePlus' },
  { name: 'Xiaomi Mi 11', width: 393, height: 873, category: 'mobile', brand: 'Xiaomi' },
  { name: 'Kindle Fire HDX', width: 800, height: 1280, category: 'tablet', brand: 'Amazon' },
  { name: 'Nest Hub Max', width: 1280, height: 800, category: 'tablet', brand: 'Google' },
  { name: 'Dell XPS 13', width: 1920, height: 1080, category: 'desktop', brand: 'Dell' },
  { name: '4K Display', width: 3840, height: 2160, category: 'desktop', brand: 'Generic' },
];

export const brands = [...new Set(devices.map(device => device.brand))];
