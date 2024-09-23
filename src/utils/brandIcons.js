import { Smartphone, Tablet, Apple, Tv } from 'lucide-react';

export const getBrandIcon = (brand) => {
  switch (brand.toLowerCase()) {
    case 'apple':
      return Apple;
    case 'samsung':
      return Tv;
    case 'google':
      return Smartphone;
    default:
      return Tablet;
  }
};