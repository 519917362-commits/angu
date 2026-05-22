export interface ProductSpecifications {
  dimensions?: string;
  wireDiameter?: string;
  meshAperture?: string;
  surfaceTreatment?: string;
  material?: string;
  weight?: string;
  tensileStrength?: string;
  coating?: string;
  width?: string;
  length?: string;
  height?: string;
  rollLength?: string;
}

export interface Product {
  id: string;
  sku: string;
  slug: string;
  categorySlug: string;
  names: Record<string, string>; // {en: "...", ar: "...", ja: "...", ...}
  shortDescriptions: Record<string, string>;
  fullDescriptions: Record<string, string>;
  specifications: ProductSpecifications;
  applications: string[];
  images: string[];
  moq: number;
  priceUsd?: number;
  priceRemark?: string;
  isFeatured: boolean;
  createdAt: string;
}

export interface Category {
  id: string;
  slug: string;
  parentSlug?: string;
  names: Record<string, string>;
  descriptions: Record<string, string>;
  image?: string;
  productCount?: number;
  children?: Category[];
}
