import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ValidationsService {
  // Validations Errors Types
  private errors: any = {
    required: 'this field is required',
  };

  getError(control: AbstractControl | null): string {
    // check if controls is valid
    if (!control || !control.errors || !control.touched) {
      return '';
    }
    // controls not valid
    const firstError = Object.keys(control.errors)[0];
    const error = control.errors[firstError];
    const message = this.errors[firstError];
    return typeof message === 'function' ? message(error) : message;
  }
  markFormTouched(form: FormGroup) {
    Object.values(form.controls).forEach((control) => {
      control.markAllAsTouched();
      control.markAsDirty();
    });
  }
}
