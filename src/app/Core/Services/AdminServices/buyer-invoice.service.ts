import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApplicationResultService } from '../../Interfaces/application-result-service';
import { BuyerReportResponse } from '../../Interfaces/BuyerReports/buyer-report-response';
import { environment } from '../../../environments/environment';
import { CreateBuyerReport } from '../../Interfaces/BuyerReports/create-buyer-report';

@Injectable({
  providedIn: 'root',
})
export class BuyerInvoiceService {
  constructor(private readonly _http: HttpClient) {}

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
}
