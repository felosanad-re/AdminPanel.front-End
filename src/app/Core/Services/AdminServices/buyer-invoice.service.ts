import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApplicationResultService } from '../../Interfaces/application-result-service';
import { BuyerReportResponse } from '../../Interfaces/BuyerReports/buyer-report-response';
import { environment } from '../../../environments/environment';
import { CreateBuyerReport } from '../../Interfaces/BuyerReports/create-buyer-report';
import { ImportResult } from '../../Interfaces/import-result';

@Injectable({
  providedIn: 'root',
})
export class BuyerInvoiceService {
  constructor(private readonly _http: HttpClient) {}

  // Build import Form Data
  buildImportFormData(file: File): FormData {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('config.sheetName', 'Purchase');
    formData.append('config.startRow', '2');
    formData.append('config.hasHeader', 'true');
    return formData;
  }
  // get All Reports
  getBuyerInvoices(): Observable<
    ApplicationResultService<BuyerReportResponse[]>
  > {
    return this._http.get<ApplicationResultService<BuyerReportResponse[]>>(
      `${environment.apiUrl}/Purchase/Purchases`,
    );
  }

  getBuyerReport(
    id: number,
  ): Observable<ApplicationResultService<BuyerReportResponse>> {
    return this._http.get<ApplicationResultService<BuyerReportResponse>>(
      `${environment.apiUrl}/Purchase/${id}`,
    );
  }

  createBuyerReport(
    data: CreateBuyerReport,
  ): Observable<ApplicationResultService<BuyerReportResponse>> {
    return this._http.post<ApplicationResultService<BuyerReportResponse>>(
      `${environment.apiUrl}/Purchase/AddPurchase`,
      data,
    );
  }

  delete(id: number): Observable<ApplicationResultService<boolean>> {
    return this._http.delete<ApplicationResultService<boolean>>(
      `${environment.apiUrl}/Purchase/DeletePurchase/${id}`,
    );
  }

  getTotal(): Observable<number[]> {
    return this._http.get<number[]>(
      `${environment.apiUrl}/Purchase/TotalPurchase`,
    );
  }

  exportPurchase(): Observable<HttpResponse<Blob>> {
    return this._http.get(`${environment.apiUrl}/Export/Purchase`, {
      observe: 'response',
      responseType: 'blob',
    });
  }

  importPurchase(file: File): Observable<ImportResult<unknown>> {
    const formData = this.buildImportFormData(file);

    return this._http.post<ImportResult<unknown>>(
      `${environment.apiUrl}/Import/Purchase`,
      formData,
    );
  }
}
