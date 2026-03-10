import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private _message: MessageService) {}

  showSuccess(message: string, summary: string) {
    this._message.add({
      severity: 'success',
      summary: summary,
      detail: message,
    });
  }

  showError(message: string, summary: string) {
    this._message.add({ severity: 'error', summary: summary, detail: message });
  }

  showWarning(message: string, summary: string) {
    this._message.add({
      severity: 'warn',
      summary: summary,
      detail: message,
    });
  }
}
