import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApplicationResultService } from '../../Interfaces/application-result-service';
import { CategoryResponse } from '../../Interfaces/Categories/category-response';
import { environment } from '../../../environments/environment';
import { CreatedCategory } from '../../Interfaces/Categories/created-category';
import { UpdatedCategory } from '../../Interfaces/Categories/updated-category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private readonly _http: HttpClient) {}

  buildForm(obj: any, includesId: boolean = true) {
    let formData = new FormData();
    if (includesId && obj.id !== null && obj.id !== undefined)
      formData.append('id', obj.id.toString());
    formData.append('categoryName', obj.categoryName);
    formData.append('description', obj.description);
    if (obj.image instanceof File) formData.append('image', obj.image);
    return formData;
  }
  // Get Categories
  getCategories(): Observable<ApplicationResultService<CategoryResponse[]>> {
    return this._http.get<ApplicationResultService<CategoryResponse[]>>(
      `${environment.apiUrl}/category/categories`,
    );
  }

  // get category details
  getCategoryDetails(
    id: number,
  ): Observable<ApplicationResultService<CategoryResponse>> {
    return this._http.get<ApplicationResultService<CategoryResponse>>(
      `${environment.apiUrl}/Category/CategoryDetails/${id}`,
    );
  }

  // add Category
  addCategory(
    data: CreatedCategory,
  ): Observable<ApplicationResultService<CategoryResponse>> {
    const formData = this.buildForm(data, false);
    return this._http.post<ApplicationResultService<CategoryResponse>>(
      `${environment.apiUrl}/Category/AddCategory`,
      formData,
    );
  }

  // update Category
  updateCategory(
    data: UpdatedCategory,
  ): Observable<ApplicationResultService<CategoryResponse>> {
    const formData = this.buildForm(data);
    return this._http.put<ApplicationResultService<CategoryResponse>>(
      `${environment.apiUrl}/Category/EditCategory`,
      formData,
    );
  }

  // deleted category
  deleteCategory(id: number): Observable<ApplicationResultService<boolean>> {
    return this._http.delete<ApplicationResultService<boolean>>(
      `${environment.apiUrl}/Category/DeletedCategory/${id}`,
    );
  }
}
