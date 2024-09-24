export const devices = [
  // Móviles
  { name: 'iPhone 12 Pro', width: 390, height: 844, category: 'mobile', brand: 'Apple' },
  { name: 'iPhone SE', width: 375, height: 667, category: 'mobile', brand: 'Apple' },
  { name: 'iPhone 13 Mini', width: 375, height: 812, category: 'mobile', brand: 'Apple' },
  { name: 'iPhone 13 Pro Max', width: 428, height: 926, category: 'mobile', brand: 'Apple' },
  { name: 'Samsung Galaxy S20', width: 360, height: 800, category: 'mobile', brand: 'Samsung' },
  { name: 'Samsung Galaxy S21 Ultra', width: 384, height: 854, category: 'mobile', brand: 'Samsung' },
  { name: 'Google Pixel 5', width: 393, height: 851, category: 'mobile', brand: 'Google' },
  { name: 'OnePlus 9 Pro', width: 412, height: 919, category: 'mobile', brand: 'OnePlus' },
  { name: 'Xiaomi Mi 11', width: 393, height: 873, category: 'mobile', brand: 'Xiaomi' },

  // Tablets
  { name: 'iPad Air', width: 820, height: 1180, category: 'tablet', brand: 'Apple' },
  { name: 'iPad Mini', width: 768, height: 1024, category: 'tablet', brand: 'Apple' },
  { name: 'iPad Pro 11"', width: 834, height: 1194, category: 'tablet', brand: 'Apple' },
  { name: 'iPad Pro 12.9"', width: 1024, height: 1366, category: 'tablet', brand: 'Apple' },
  { name: 'Samsung Galaxy Tab S7', width: 800, height: 1280, category: 'tablet', brand: 'Samsung' },
  { name: 'Google Nexus 9', width: 1024, height: 768, category: 'tablet', brand: 'Google' },
  { name: 'Microsoft Surface Pro 7', width: 912, height: 1368, category: 'tablet', brand: 'Microsoft' },
  { name: 'Amazon Fire HD 10', width: 800, height: 1280, category: 'tablet', brand: 'Amazon' },

  // Desktops
  { name: 'Full HD', width: 1920, height: 1080, category: 'desktop', brand: 'Generic' },
  { name: '4K UHD', width: 3840, height: 2160, category: 'desktop', brand: 'Generic' },
  { name: 'MacBook Air', width: 1440, height: 900, category: 'desktop', brand: 'Apple' },
  { name: 'MacBook Pro 16"', width: 1920, height: 1200, category: 'desktop', brand: 'Apple' },
  { name: 'Dell XPS 15', width: 1920, height: 1080, category: 'desktop', brand: 'Dell' },
  { name: 'ThinkPad X1 Carbon', width: 1920, height: 1080, category: 'desktop', brand: 'Lenovo' },
];

export const categories = ['mobile', 'tablet', 'desktop'];
export const brands = [...new Set(devices.map(device => device.brand))];
