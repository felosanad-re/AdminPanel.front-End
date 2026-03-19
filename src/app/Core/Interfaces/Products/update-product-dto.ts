export interface UpdateProductDTO {
  id: number;
  productName: string;
  brandId: number;
  categoryId: number;
  description: string;
  mainImage: File;
  price: number;
  stock: number;
  subImages: File[];
}
