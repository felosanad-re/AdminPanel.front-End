import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private readonly LANG_KEY = 'app-language';
  private readonly isBrowser: boolean;

  constructor(
    private readonly translate: TranslateService,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) platformId: object,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.translate.addLangs(['en', 'ar']);
    this.translate.setDefaultLang('en');
  }

  /** Called by APP_INITIALIZER — waits for the translation file to load */
  initLanguage(): Observable<any> {
    const savedLang = this.isBrowser
      ? localStorage.getItem(this.LANG_KEY) || 'en'
      : 'en';
    this.applyDirection(savedLang);
    return this.translate.use(savedLang);
  }

  setLanguage(lang: string): void {
    if (this.isBrowser) {
      localStorage.setItem(this.LANG_KEY, lang);
    }
    this.applyDirection(lang);
    this.translate.use(lang);
  }

  private applyDirection(lang: string): void {
    const htmlElement = this.document.documentElement;
    htmlElement.lang = lang;
    htmlElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

    if (lang === 'ar') {
      htmlElement.classList.add('rtl');
      htmlElement.classList.remove('ltr');
    } else {
      htmlElement.classList.add('ltr');
      htmlElement.classList.remove('rtl');
    }
  }

  getCurrentLanguage(): string {
    return this.translate.currentLang || 'en';
  }

  toggleLanguage(): void {
    const currentLang = this.getCurrentLanguage();
    const newLang = currentLang === 'en' ? 'ar' : 'en';
    this.setLanguage(newLang);
  }

  isArabic(): boolean {
    return this.getCurrentLanguage() === 'ar';
  }
}
