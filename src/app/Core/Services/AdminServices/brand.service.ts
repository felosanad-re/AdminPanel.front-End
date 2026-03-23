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
    return this._http.post<ApplicationResultService<BrandResponse>>(
      `${environment.apiUrl}/brand/AddBrand`,
      data,
    );
  }

  // Update Brand
  updateBrand(
    data: UpdatedBrand,
  ): Observable<ApplicationResultService<BrandResponse>> {
    return this._http.put<ApplicationResultService<BrandResponse>>(
      `${environment.apiUrl}/brand/EditBrand`,
      data,
    );
  }

  // delete brand
  deleteBrand(id: number): Observable<ApplicationResultService<boolean>> {
    return this._http.delete<ApplicationResultService<boolean>>(
      `${environment.apiUrl}/brand/DeletedBrand/${id}`,
    );
  }
}
