import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApplicationResultService } from '../../Interfaces/application-result-service';
import { environment } from '../../../environments/environment';
import { BrandResponse } from '../../Interfaces/Brands/brand-response';
import { CreatedBrand } from '../../Interfaces/Brands/created-brand';
import { UpdatedBrand } from '../../Interfaces/Brands/updated-brand';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  constructor(private _http: HttpClient) {}

  buildForm(obj: any, includesId: boolean = true) {
    const formData = new FormData();
    if (includesId && obj.id != null && obj.id != undefined)
      formData.append('id', obj.id.toString());
    if (obj.logo instanceof File) formData.append('logo', obj.logo);
    formData.append('brandName', obj.brandName);
    formData.append('description', obj.description);
    return formData;
  }
  // Get all brands
  getBrands(): Observable<ApplicationResultService<BrandResponse[]>> {
    return this._http.get<ApplicationResultService<BrandResponse[]>>(
      `${environment.apiUrl}/brand/brands`,
    );
  }

  // Get brand details
  getBrandDetails(
    id: number,
  ): Observable<ApplicationResultService<BrandResponse>> {
    return this._http.get<ApplicationResultService<BrandResponse>>(
      `${environment.apiUrl}/brand/BrandDetails/${id}`,
    );
  }

  //Add brand
  addBrand(
    data: CreatedBrand,
  ): Observable<ApplicationResultService<BrandResponse>> {
    const formData = this.buildForm(data, false);
    return this._http.post<ApplicationResultService<BrandResponse>>(
      `${environment.apiUrl}/brand/AddBrand`,
      formData,
    );
  }

  // Update Brand
  updateBrand(
    data: UpdatedBrand,
  ): Observable<ApplicationResultService<BrandResponse>> {
    const formData = this.buildForm(data);
    return this._http.put<ApplicationResultService<BrandResponse>>(
      `${environment.apiUrl}/brand/EditBrand`,
      formData,
    );
  }

  // delete brand
  deleteBrand(id: number): Observable<ApplicationResultService<boolean>> {
    return this._http.delete<ApplicationResultService<boolean>>(
      `${environment.apiUrl}/brand/DeletedBrand/${id}`,
    );
  }
}
