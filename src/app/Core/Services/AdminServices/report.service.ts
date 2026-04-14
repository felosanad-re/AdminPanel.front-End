import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApplicationResultService } from '../../Interfaces/application-result-service';
import { ReportResponse } from '../../Interfaces/Reports/report-response';
import { environment } from '../../../environments/environment';
import { CreatedReport } from '../../Interfaces/Reports/created-report';
import { ImportResult } from '../../Interfaces/import-result';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  constructor(private readonly _http: HttpClient) {}

  // Build import Form
  buildImportFormData(file: File): FormData {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('config.sheetName', 'Buyer');
    formData.append('config.startRow', '2');
    formData.append('config.hasHeader', 'true');
    return formData;
  }
  // get All Reports
  getReports(): Observable<ApplicationResultService<ReportResponse[]>> {
    return this._http.get<ApplicationResultService<ReportResponse[]>>(
      `${environment.apiUrl}/report/reports`,
    );
  }

  // Get report Id
  getReportDetails(
    id: number,
  ): Observable<ApplicationResultService<ReportResponse>> {
    return this._http.get<ApplicationResultService<ReportResponse>>(
      `${environment.apiUrl}/report/reportDetails/${id}`,
    );
  }

  //Add Report
  addReport(
    data: CreatedReport,
  ): Observable<ApplicationResultService<ReportResponse>> {
    return this._http.post<ApplicationResultService<ReportResponse>>(
      `${environment.apiUrl}/report/AddReport`,
      data,
    );
  }

  // delete report
  deleteReport(id: number): Observable<ApplicationResultService<boolean>> {
    return this._http.delete<ApplicationResultService<boolean>>(
      `${environment.apiUrl}/report/deleteReport/${id}`,
    );
  }

  getTotalPrice(): Observable<number[]> {
    return this._http.get<number[]>(`${environment.apiUrl}/report/totalPrice`);
  }

  // Export Report
  exportSales(): Observable<HttpResponse<Blob>> {
    return this._http.get(`${environment.apiUrl}/Export/Buyer`, {
      observe: 'response',
      responseType: 'blob',
    });
  }

  // Import Report
  importSales(file: File): Observable<ImportResult<unknown>> {
    const formData = this.buildImportFormData(file);

    return this._http.post<ImportResult<unknown>>(
      `${environment.apiUrl}/Import/Buyer`,
      formData,
    );
  }
}
