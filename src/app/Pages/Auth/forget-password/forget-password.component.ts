import { Component } from '@angular/core';
import { PrimNgModule } from '../../../Core/shared/modules/prim-ng.module';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ValidationMessageComponent } from '../../../Core/shared/validation-message/validation-message.component';
import { ValidationsService } from '../../../Core/Services/validations.service';
import { LogoComponent } from '../../../Core/shared/logo/logo.component';
import { AuthService } from '../../../Core/Services/Auth-Services/auth.service';
import { ToastService } from '../../../Core/Services/Toast.service';
import { ServiceResult } from '../../../Core/Interfaces/service-result';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [
    PrimNgModule,
    ReactiveFormsModule,
    ValidationMessageComponent,
    LogoComponent,
  ],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss',
})
export class ForgetPasswordComponent {
  forgetPasswordForm!: FormGroup;
  emailOrUserName!: FormControl;

  constructor(
    private _formBuilder: FormBuilder,
    private _validationService: ValidationsService,
    private _toastService: ToastService,
    private _authServices: AuthService,
  ) {}

  ngOnInit(): void {
    this.initiateForms();
  }

  initiateForms(): void {
    this.forgetPasswordForm = this._formBuilder.group({
      emailOrUserName: ['', Validators.required],
    });
  }
  forgetPassword(): void {
    if (this.forgetPasswordForm.valid) {
      this._authServices
        .forgetPassword(this.forgetPasswordForm.value)
        .subscribe({
          next: (res: ServiceResult) => {
            if (res.succeed) {
              this._toastService.showSuccess(res.message!, 'Success');
            } else {
              this._toastService.showError(res.message!, 'Error');
            }
            console.log(res);
          },
        });
    } else {
      this._validationService.markFormTouched(this.forgetPasswordForm);
    }
  }
}
