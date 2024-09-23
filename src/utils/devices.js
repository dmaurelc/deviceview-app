export const devices = [
  // Mobile
  { name: 'iPhone SE', width: 375, height: 667, category: 'mobile', brand: 'Apple' },
  { name: 'iPhone 12 Pro', width: 390, height: 844, category: 'mobile', brand: 'Apple' },
  { name: 'iPhone 13 Pro Max', width: 428, height: 926, category: 'mobile', brand: 'Apple' },
  { name: 'Google Pixel 6', width: 393, height: 851, category: 'mobile', brand: 'Google' },
  { name: 'Samsung Galaxy S22 Ultra', width: 384, height: 854, category: 'mobile', brand: 'Samsung' },

  // Tablets
  { name: 'iPad Mini', width: 768, height: 1024, category: 'tablet', brand: 'Apple' },
  { name: 'iPad Air', width: 820, height: 1180, category: 'tablet', brand: 'Apple' },
  { name: 'iPad Pro 11"', width: 834, height: 1194, category: 'tablet', brand: 'Apple' },
  { name: 'iPad Pro 12.9"', width: 1024, height: 1366, category: 'tablet', brand: 'Apple' },
  { name: 'Galaxy Tab S7', width: 800, height: 1280, category: 'tablet', brand: 'Samsung' },

  // Laptops
  { name: 'MacBook Air 13"', width: 1280, height: 800, category: 'laptop', brand: 'Apple' },
  { name: 'MacBook Pro 14"', width: 1512, height: 982, category: 'laptop', brand: 'Apple' },
  { name: 'MacBook Pro 16"', width: 1728, height: 1117, category: 'laptop', brand: 'Apple' },
];

export const brands = [...new Set(devices.map(device => device.brand))];
export const categories = ['mobile', 'tablet', 'laptop'];
