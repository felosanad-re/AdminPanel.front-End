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
  {
    path: 'dashboard',
    loadComponent: () =>
      import(`./Layouts/dashboard/dashboard.component`).then(
        (c) => c.DashboardComponent,
      ),
    children: [
      {
        path: '',
        loadComponent: () =>
          import(`./Pages/Admin/home/home.component`).then(
            (c) => c.HomeComponent,
          ),
      },
      {
        path: 'products',
        loadComponent: () =>
          import(`./Pages/Admin/products/products.component`).then(
            (c) => c.ProductsComponent,
          ),
      },
      {
        path: 'brands',
        loadComponent: () =>
          import(`./Pages/Admin/brands/brands.component`).then(
            (c) => c.BrandsComponent,
          ),
      },
      {
        path: 'categories',
        loadComponent: () =>
          import(`./Pages/Admin/categories/categories.component`).then(
            (c) => c.CategoriesComponent,
          ),
      },
      {
        path: 'createReport',
        loadComponent: () =>
          import(
            `./Pages/Admin/reports/create-report/create-report.component`
          ).then((c) => c.CreateReportComponent),
      },
      {
        path: 'reports',
        loadComponent: () =>
          import(`./Pages/Admin/reports/reports/reports.component`).then(
            (c) => c.ReportsComponent,
          ),
      },
      {
        path: 'printReport/:id',
        loadComponent: () =>
          import(
            `./Pages/Admin/reports/print-report/print-report.component`
          ).then((c) => c.PrintReportComponent),
      },
      {
        path: 'createAccount',
        loadComponent: () =>
          import(`./Pages/Admin/create-account/create-account.component`).then(
            (c) => c.CreateAccountComponent,
          ),
      },
      {
        path: 'setPassword',
        loadComponent: () =>
          import(`./Pages/Admin/set-password/set-password.component`).then(
            (c) => c.SetPasswordComponent,
          ),
      },
    ],
  },
  // { path: '', redirectTo: 'login', pathMatch: 'full' },
  // { path: '**', redirectTo: 'login' },
];
