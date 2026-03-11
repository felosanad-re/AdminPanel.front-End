import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse } from '../../Interfaces/Login-interfaces/login-response';
import { LoginRequest } from '../../Interfaces/Login-interfaces/login-request';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ForgetPasswordRequest } from '../../Interfaces/Forget-Password-Interfaces/forget-password-request';
import { ServiceResult } from '../../Interfaces/service-result';
import { ResetPassword } from '../../Interfaces/Forget-Password-Interfaces/reset-password';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  // Log In Services

  logIn(data: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${environment.apiUrl}/Account/LogIn`,
      data,
    );
  }

  forgetPassword(data: ForgetPasswordRequest): Observable<ServiceResult> {
    return this.http.post<ServiceResult>(
      `${environment.apiUrl}/Account/ForgetPassword`,
      data,
    );
  }

  resetPassword(data: ResetPassword): Observable<ServiceResult> {
    return this.http.post<ServiceResult>(
      `${environment.apiUrl}/Account/ResetPassword`,
      data,
    );
  }
}
