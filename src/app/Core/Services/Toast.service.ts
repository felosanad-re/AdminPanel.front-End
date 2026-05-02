import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(
    private _message: MessageService,
    private _translate: TranslateService,
  ) {}

  /**
   * Tries to resolve a localized summary from the BACKEND namespace.
   * Falls back to the raw summary string if no translation is found.
   */
  private resolveSummary(summary: string): string {
    const key = `BACKEND.${summary}`;
    const translated = this._translate.instant(key);
    // If the translation key doesn't exist, instant() returns the key itself
    return translated !== key ? translated : summary;
  }

  showSuccess(message: string, summary: string) {
    this._message.add({
      severity: 'success',
      summary: this.resolveSummary(summary),
      detail: message,
    });
  }

  showError(message: string, summary: string) {
    this._message.add({
      severity: 'error',
      summary: this.resolveSummary(summary),
      detail: message,
    });
  }

  showWarning(message: string, summary: string) {
    this._message.add({
      severity: 'warn',
      summary: this.resolveSummary(summary),
      detail: message,
    });
  }
}
