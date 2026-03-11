import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Message } from 'primeng/api';
import { observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ValidationsService {
  // Validations Errors Types
  private errors: any = {
    required: 'this field is required',
  };

  getFirstError(control: AbstractControl | null): string | null {
    if (!control?.errors || !control.touched) return '';
    const firstKey = Object.keys(control.errors)[0];
    const error = control.errors[firstKey];
    const message = this.errors[firstKey];
    return typeof message === 'function' ? message(error) : message;
  }
  getError(control: AbstractControl | null): Message[] {
    // check if controls is valid
    if (!control || !control.errors || !control.touched) {
      return [];
    }
    // controls not valid
    return Object.keys(control.errors).map((key) => {
      const error = control.errors![key];
      const message = this.errors[key];
      const text =
        typeof message === 'function'
          ? message(error)
          : message || `error${key}`;

      return {
        severity: 'error',
        detail: text,
      };
    });
  }

  markFormTouched(form: FormGroup) {
    Object.values(form.controls).forEach((control) => {
      control.markAllAsTouched();
      control.markAsDirty();
    });
  }
}
