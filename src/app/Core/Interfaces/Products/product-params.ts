export class ProductParams {
  pageSize: number = 10;
  pageIndex: number = 1;
  search?: string;
  brandId?: number;
  categoryId?: number;
  sort?: string;
}
