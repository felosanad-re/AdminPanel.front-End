import { Component } from '@angular/core';
import { PrimNgModule } from '../../../Core/shared/modules/prim-ng.module';
import { ValidationMessageComponent } from '../../../Core/shared/validation-message/validation-message.component';
import { LogoComponent } from '../../../Core/shared/logo/logo.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ValidationsService } from '../../../Core/Services/validations.service';
import { ToastService } from '../../../Core/Services/Toast.service';
import { AuthService } from '../../../Core/Services/Auth-Services/auth.service';
import { PasswordModule } from 'primeng/password';
import { ActivatedRoute } from '@angular/router';
import { ResetPassword } from '../../../Core/Interfaces/Forget-Password-Interfaces/reset-password';
import { ServiceResult } from '../../../Core/Interfaces/service-result';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    PrimNgModule,
    ValidationMessageComponent,
    LogoComponent,
    ReactiveFormsModule,
    PasswordModule,
  ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
})
export class ResetPasswordComponent {
  resetPasswordForm!: FormGroup;
  password!: FormControl;
  confirmPassword!: FormControl;
  userId!: string;
  token!: string;
  constructor(
    private _formBuilder: FormBuilder,
    private _validationService: ValidationsService,
    private _toastService: ToastService,
    private _authServices: AuthService,
    private _activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.initiateForms();
    this._activatedRoute.queryParamMap.subscribe((params) => {
      this.userId = params.get('userId')!;
      this.token = params.get('token')!;
    });
  }

  initiateForms() {
    this.resetPasswordForm = this._formBuilder.group({
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
    });
  }
  resetPassword() {
    if (this.resetPasswordForm.valid) {
      const data: ResetPassword = {
        userId: this.userId!,
        token: this.token!,
        password: this.resetPasswordForm.value.password,
        confirmPassword: this.resetPasswordForm.value.confirmPassword,
      };
      this._authServices.resetPassword(data).subscribe({
        next: (res: ServiceResult) => {
          if (res.succeed) {
            this._toastService.showSuccess(res.message!, 'Success');
          } else {
            this._toastService.showError(res.message!, 'Error');
          }
          console.log(res);
        },
      });
    }
  }
}
