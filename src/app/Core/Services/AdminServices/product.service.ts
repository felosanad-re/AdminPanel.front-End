import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ProductResponse } from '../../Interfaces/Products/product-response';
import { ApplicationResultService } from '../../Interfaces/application-result-service';
import { ProductParams } from '../../Interfaces/Products/product-params';
import { Pagination } from '../../Interfaces/pagination';
import { UpdateProductDTO } from '../../Interfaces/Products/update-product-dto';
import { CreateProductDTO } from '../../Interfaces/Products/create-product-dto';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private _http: HttpClient) {}

  // Build Product Params
  buildParams(obj: any): HttpParams {
    let params = new HttpParams();
    Object.keys(obj).forEach((key) => {
      const value = obj[key];
      if (value !== null && value !== undefined) {
        params = params.append(key, value);
      }
    });
    return params;
  }

  // Build Form Data
  buildFormData(obj: any, includesId: boolean = true): FormData {
    const formData = new FormData();
    formData.append('productName', obj.productName);
    formData.append('description', obj.description);
    if (includesId && obj.id !== null && obj.id !== undefined)
      formData.append('id', obj.id.toString());
    if (obj.brandId !== null && obj.brandId !== undefined)
      formData.append('brandId', obj.brandId.toString());
    if (obj.categoryId !== null && obj.categoryId !== undefined)
      formData.append('categoryId', obj.categoryId.toString());
    formData.append('price', obj.price.toString());
    formData.append('stock', obj.stock.toString());
    if (obj.mainImage instanceof File)
      formData.append('mainImage', obj.mainImage);

    if (obj.subImages && obj.subImages.length > 0) {
      obj.subImages.forEach((file: File) => {
        formData.append('subImages', file);
      });
    }
    return formData;
  }

  // Get All Product
  getProduct(
    productParams: ProductParams,
  ): Observable<ApplicationResultService<Pagination<ProductResponse>>> {
    const params = this.buildParams(productParams);

    return this._http.get<
      ApplicationResultService<Pagination<ProductResponse>>
    >(`${environment.apiUrl}/Product/Products`, { params });
  }

  // Get product Details
  getProductDetails(
    id: number,
  ): Observable<ApplicationResultService<ProductResponse>> {
    return this._http.get<ApplicationResultService<ProductResponse>>(
      `${environment.apiUrl}/product/productDetails/${id}`,
    );
  }

  // Edit Product
  editProduct(
    data: UpdateProductDTO,
  ): Observable<ApplicationResultService<ProductResponse>> {
    const dataForm = this.buildFormData(data, true);

    return this._http.put<ApplicationResultService<ProductResponse>>(
      `${environment.apiUrl}/Product/UpdateProduct`,
      dataForm,
    );
  }

  // Add Product
  addProduct(
    data: CreateProductDTO,
  ): Observable<ApplicationResultService<ProductResponse>> {
    const dataForm = this.buildFormData(data, false);

    return this._http.post<ApplicationResultService<ProductResponse>>(
      `${environment.apiUrl}/Product/CreateProduct`,
      dataForm,
    );
  }

  // Delete Product
  deleteProduct(
    id: number,
  ): Observable<ApplicationResultService<ProductResponse>> {
    return this._http.delete<ApplicationResultService<ProductResponse>>(
      `${environment.apiUrl}/Product/DeleteProduct/${id}`,
    );
  }

  deleteBulk(
    ids: number[],
  ): Observable<ApplicationResultService<ProductResponse>> {
    return this._http.post<ApplicationResultService<ProductResponse>>(
      `${environment.apiUrl}/Product/bulk`,
      { ids },
    );
  }
}
