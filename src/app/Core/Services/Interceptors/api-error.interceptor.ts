import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastService } from '../Toast.service';
import { catchError, throwError } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

export const apiErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const _toast = inject(ToastService);
  const _translate = inject(TranslateService);

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

      // Use localized fallback message from BACKEND namespace
      const defaultErrorMessage =
        _translate.instant('BACKEND.Error') !== 'BACKEND.Error'
          ? _translate.instant('BACKEND.Error')
          : 'Something went wrong, please try again later';

      const errorTitle =
        _translate.instant('BACKEND.Error') !== 'BACKEND.Error'
          ? _translate.instant('BACKEND.Error')
          : 'Error';

      let errorMessage = defaultErrorMessage;
      const errorBody = err.error;
      if (errorBody) {
        // Error message is string
        if (typeof errorBody === 'string') {
          errorMessage = errorBody;
        }
        // Error message is object
        else if (errorBody.message) {
          errorMessage = Array.isArray(errorBody.message)
            ? errorBody.message.join(', ')
            : errorBody.message;
        }
        // Error message from ErrorResponse (errors array)
        else if (errorBody.errors && Array.isArray(errorBody.errors)) {
          errorMessage = errorBody.errors.join(', ');
        }
      }
      _toast.showError(errorMessage, errorTitle);
      return throwError(() => err);
    }),
  );
};
