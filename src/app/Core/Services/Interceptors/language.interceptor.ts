import { HttpInterceptorFn } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';

/**
 * Interceptor that attaches the current UI language (ar/en)
 * as an Accept-Language header on every outgoing API request.
 * This allows the backend RequestLocalizationMiddleware to return
 * localized validation errors, messages, and .resx lookups.
 *
 * NOTE: We read directly from localStorage instead of injecting
 * TranslationService to avoid a circular dependency:
 * HttpClient → interceptor → TranslationService → TranslateService
 * → MergedTranslateLoader → HttpClient (cycle!)
 */
export const languageInterceptor: HttpInterceptorFn = (req, next) => {
  const platformId = inject(PLATFORM_ID);
  let currentLang = 'en';

  if (isPlatformBrowser(platformId)) {
    currentLang = localStorage.getItem('app-language') || 'en';
  }

  const clonedReq = req.clone({
    setHeaders: { 'Accept-Language': currentLang },
  });

  return next(clonedReq);
};
