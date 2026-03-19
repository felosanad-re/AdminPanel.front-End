export interface CreateProductDTO {
  productName: string;
  brandId: number;
  brandName: string;
  categoryId: number;
  categoryName: string;
  description: string;
  mainImage?: File | null;
  price: number;
  stock: number;
  subImages?: File[];
}
