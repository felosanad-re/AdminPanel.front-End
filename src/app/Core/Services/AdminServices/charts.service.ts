import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Chart } from '../../Interfaces/Charts/chart';
import { Observable } from 'rxjs';
import { ChartResponse } from '../../Interfaces/Charts/chart-response';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ChartsService {
  constructor(private readonly _http: HttpClient) {}

  getCharts(data: Chart): Observable<ChartResponse> {
    let params = new HttpParams();
    if (data.fromDate)
      params = params.set('fromDate', data.fromDate.toISOString());
    if (data.toDate) params = params.set('toDate', data.toDate.toISOString());
    return this._http.get<ChartResponse>(`${environment.apiUrl}/Chart/Charts`, {
      params,
    });
  }
}
