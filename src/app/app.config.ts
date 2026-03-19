import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { apiErrorInterceptor } from './Core/Services/Interceptors/api-error.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';
import { loadingInterceptor } from './Core/Services/Interceptors/loading.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    MessageService,
    provideHttpClient(
      withInterceptors([apiErrorInterceptor, loadingInterceptor]),
    ),
    provideAnimations(),
  ],
};
