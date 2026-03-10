import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./Layouts/auth/auth.component').then((c) => c.AuthComponent),
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: 'login',
        loadComponent: () =>
          import('./Pages/Auth/login/login.component').then(
            (c) => c.LoginComponent,
          ),
      },
      {
        path: 'forgetPassword',
        loadComponent: () =>
          import('./Pages/Auth/forget-password/forget-password.component').then(
            (c) => c.ForgetPasswordComponent,
          ),
      },
      {
        path: 'resetpassword',
        loadComponent: () =>
          import('./Pages/Auth/reset-password/reset-password.component').then(
            (c) => c.ResetPasswordComponent,
          ),
      },
    ],
  },
  // { path: '', redirectTo: 'login', pathMatch: 'full' },
  // { path: '**', redirectTo: 'login' },
];
