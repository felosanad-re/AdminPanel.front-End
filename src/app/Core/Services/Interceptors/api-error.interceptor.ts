import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastService } from '../Toast.service';
import { catchError, throwError } from 'rxjs';

export const apiErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const _toast = inject(ToastService);
  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      // Ignore Refresh and navigation status code [0]
      if (err.status === 0) {
        return throwError(() => err);
      }
      console.error(err);
      // Other Errors
      if (err.status !== 200) {
        const message = err.message
          ? err.message
          : 'Something went wrong, please try again later.';
        _toast.showError(message, 'Error');
      }
      return throwError(() => err);
    }),
  );
};
