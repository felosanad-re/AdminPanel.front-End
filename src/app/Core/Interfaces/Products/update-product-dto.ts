export interface UpdateProductDTO {
  id: number;
  productName: string;
  brandId: number;
  categoryId: number;
  description: string;
  mainImage: File | null;
  price: number;
  stock: number;
  subImages: File[] | null;
}
