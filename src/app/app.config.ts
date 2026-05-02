import { ApplicationConfig, APP_INITIALIZER, inject } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import {
  provideHttpClient,
  withInterceptors,
  HttpClient,
} from '@angular/common/http';
import { apiErrorInterceptor } from './Core/Services/Interceptors/api-error.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';
import { loadingInterceptor } from './Core/Services/Interceptors/loading.interceptor';
import { handlerTokenInterceptor } from './Core/Services/Interceptors/handler-token.interceptor';
import { languageInterceptor } from './Core/Services/Interceptors/language.interceptor';
import { provideTranslateService, TranslateLoader } from '@ngx-translate/core';
import { MergedTranslateLoader } from './Core/Services/merged-translate-loader';
import { TranslationService } from './Core/Services/translation.service';
import { Observable } from 'rxjs';

/** Factory that creates the custom MergedTranslateLoader (local JSON + backend API) */
export function translateLoaderFactory(http: HttpClient): TranslateLoader {
  return new MergedTranslateLoader(http);
}

/** APP_INITIALIZER factory — ensures translations are loaded before the app starts */
export function initializeApp(): () => Observable<any> {
  const translationService = inject(TranslationService);
  return () => translationService.initLanguage();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    MessageService,
    provideHttpClient(
      withInterceptors([
        languageInterceptor,
        handlerTokenInterceptor,
        apiErrorInterceptor,
        loadingInterceptor,
      ]),
    ),
    provideAnimations(),
    provideTranslateService({
      loader: {
        provide: TranslateLoader,
        useFactory: translateLoaderFactory,
        deps: [HttpClient],
      },
    }),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      multi: true,
    },
  ],
};
