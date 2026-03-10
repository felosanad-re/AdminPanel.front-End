import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastService } from './Toast.service';
import { catchError, throwError } from 'rxjs';

export const apiErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const _toast = inject(ToastService);
  return next(req).pipe(
    catchError((err) => {
      const message = err.error.message || 'Something went wrong';
      _toast.showError(message, 'Error');
      return throwError(() => err);
    }),
  );
};
