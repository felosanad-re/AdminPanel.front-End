export interface ProductResponse {
  id: number;
  productName: string;
  brandId: number;
  brandName: string;
  categoryId: number;
  categoryName: string;
  description: string;
  mainImage: string;
  price: number;
  stock: number;
  type?: string;
  subImages: string[];
}
