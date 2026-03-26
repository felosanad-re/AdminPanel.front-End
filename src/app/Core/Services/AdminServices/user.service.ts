import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateUser } from '../../Interfaces/Users/create-user';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ApplicationResultService } from '../../Interfaces/application-result-service';
import { ApplicationUserResponse } from '../../Interfaces/Users/application-user-response';
import { environment } from '../../../environments/environment';
import { SetPassword } from '../../Interfaces/Users/set-password';
import { CreateUserResponse } from '../../Interfaces/Users/create-user-response';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private readonly _http: HttpClient) {}
  private currentUser = new BehaviorSubject<ApplicationUserResponse | null>(
    null,
  );
  currentUser$ = this.currentUser.asObservable();
  //Create user
  createUser(
    data: CreateUser,
  ): Observable<ApplicationResultService<CreateUserResponse>> {
    return this._http.post<ApplicationResultService<CreateUserResponse>>(
      `${environment.apiUrl}/user/CreateUser`,
      data,
    );
  }

  // set Password
  setPassword(
    data: SetPassword,
  ): Observable<ApplicationResultService<ApplicationUserResponse>> {
    return this._http.post<ApplicationResultService<ApplicationUserResponse>>(
      `${environment.apiUrl}/user/SetPassword`,
      data,
    );
  }

  // get Current User
  getCurrentUser(): Observable<
    ApplicationResultService<ApplicationUserResponse>
  > {
    return this._http
      .get<
        ApplicationResultService<ApplicationUserResponse>
      >(`${environment.apiUrl}/user/currentUser`)
      .pipe(tap((user) => this.currentUser.next(user.data)));
  }

  // Load Current User if token is exist
  LoadUserIfTokenIsExist() {
    const token = localStorage.getItem('token');
    if (!token) return;
    this.getCurrentUser().subscribe();
  }
}
