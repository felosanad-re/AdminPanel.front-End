import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ProductResponse } from '../../Interfaces/Products/product-response';
import { ApplicationResultService } from '../../Interfaces/application-result-service';
import { ProductParams } from '../../Interfaces/Products/product-params';
import { Pagination } from '../../Interfaces/pagination';
import { UpdateProductDTO } from '../../Interfaces/Products/update-product-dto';
import { CreateProductDTO } from '../../Interfaces/Products/create-product-dto';
import { ImportResult } from '../../Interfaces/import-result';

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

  // Build Import Form Data
  buildImportFormData(file: File): FormData {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('config.sheetName', 'Products');
    formData.append('config.startRow', '2');
    formData.append('config.hasHeader', 'true');
    return formData;
  }

  // Get All Product
  getProducts(
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
      `${environment.apiUrl}/Product/editProduct`,
      dataForm,
    );
  }

  // Add Product
  addProduct(
    data: CreateProductDTO,
  ): Observable<ApplicationResultService<ProductResponse>> {
    const dataForm = this.buildFormData(data, false);

    return this._http.post<ApplicationResultService<ProductResponse>>(
      `${environment.apiUrl}/Product/AddProduct`,
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

  // Delete Multiple Product
  deleteBulk(
    ids: number[],
  ): Observable<ApplicationResultService<ProductResponse>> {
    return this._http.post<ApplicationResultService<ProductResponse>>(
      `${environment.apiUrl}/product/bulk`,
      ids,
    );
  }

  // Import Product Excel
  importProducts(file: File): Observable<ImportResult<unknown>> {
    const formData = this.buildImportFormData(file);

    return this._http.post<ImportResult<unknown>>(
      `${environment.apiUrl}/Import/Products`,
      formData,
    );
  }

  // Export Product Excel
  exportProducts(): Observable<HttpResponse<Blob>> {
    return this._http.get(`${environment.apiUrl}/Export/Products`, {
      observe: 'response',
      responseType: 'blob',
    });
  }
}
