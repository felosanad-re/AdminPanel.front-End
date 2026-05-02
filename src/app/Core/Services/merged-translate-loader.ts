import { TranslateLoader } from '@ngx-translate/core';
import { Observable, forkJoin, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

/**
 * Custom TranslateLoader that:
 * 1. Loads local JSON translation files from assets/i18n/
 * 2. Fetches backend .resx translations from the API
 * 3. Merges them — backend keys are nested under "BACKEND" namespace
 *
 * Usage in template: {{ 'BACKEND.ProductName' | translate }}
 * Usage in TS: this._translate.instant('BACKEND.Success')
 */
export class MergedTranslateLoader implements TranslateLoader {
  constructor(private readonly http: HttpClient) {}

  getTranslation(lang: string): Observable<any> {
    // 1) Load local JSON file
    const local$ = this.http
      .get(`./assets/i18n/${lang}.json`)
      .pipe(catchError(() => of({})));

    // 2) Load backend .resx translations via API
    const backend$ = this.http
      .get(`${environment.apiUrl}/Localization?culture=${lang}`)
      .pipe(catchError(() => of({})));

    // 3) Merge: local JSON + backend under "BACKEND" namespace
    return forkJoin([local$, backend$]).pipe(
      map(([local, backend]) => ({
        ...local,
        BACKEND: backend,
      })),
    );
  }
}
