import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApplicationResultService } from '../../Interfaces/application-result-service';
import { ReportResponse } from '../../Interfaces/Reports/report-response';
import { environment } from '../../../environments/environment';
import { CreatedReport } from '../../Interfaces/Reports/created-report';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  constructor(private readonly _http: HttpClient) {}

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
}
