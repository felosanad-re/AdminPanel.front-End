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
        console.warn(
          `[CORS/Network Warning] Status 0 for: ${req.url} (${req.method})`,
        );
        return throwError(() => err);
      }
      console.error('Full HTTP Error Object:', err); // Other Errors
      let errorMessage = 'Something went wrong, please try again later';
      const errorBody = err.error;
      if (errorBody) {
        // Error message is string
        if (typeof errorBody === 'string') {
          errorMessage = errorBody;
        }
        // Error message is object
        else if (errorBody.message) {
          errorMessage = errorBody.message;
        }
      }
      _toast.showError(errorMessage, 'Error');
      return throwError(() => err);
    }),
  );
};
