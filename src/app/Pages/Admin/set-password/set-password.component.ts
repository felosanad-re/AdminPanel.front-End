import { resolve } from 'node:path';
import { Component, ViewEncapsulation } from '@angular/core';
import { UserService } from '../../../Core/Services/AdminServices/user.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { SetPassword } from '../../../Core/Interfaces/Users/set-password';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ValidationsService } from '../../../Core/Services/validations.service';
import { Button } from 'primeng/button';
import { ValidationMessageComponent } from '../../../Core/shared/validation-message/validation-message.component';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../../Core/Services/Toast.service';

@Component({
  selector: 'app-set-password',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    Button,
    ValidationMessageComponent,
    InputTextModule,
    PasswordModule,
    FormsModule,
  ],
  templateUrl: './set-password.component.html',
  styleUrl: './set-password.component.scss',
})
export class SetPasswordComponent {
  constructor(
    private readonly _userService: UserService,
    private readonly _router: Router,
    private readonly _activeRouter: ActivatedRoute,
    private readonly _formBuilder: FormBuilder,
    private readonly _validationService: ValidationsService,
    private readonly _toastService: ToastService,
  ) {}
  setPasswordData: SetPassword = {} as SetPassword;
  setPasswordForm!: FormGroup;
  token!: string;
  userId!: string;
  ngOnInit() {
    this._activeRouter.queryParams.subscribe((params) => {
      this.token = params['token'];
      this.userId = params['userId'];
    });

    this.setPasswordForm = this._formBuilder.group({
      password: ['', Validators.required],
      confirmPassword: ['', [Validators.required, this.passwordMatchValidator]],
    });
  }

  // custom confirm password validator
  passwordMatchValidator(control: AbstractControl) {
    const password = control.parent?.get('password')?.value;
    const confirmPassword = control?.value;
    return password === confirmPassword ? null : { notSame: true };
  }

  setPassword() {
    if (!this.setPasswordForm.valid) {
      this._validationService.markFormTouched(this.setPasswordForm);
      return;
    }
    const data: SetPassword = {
      token: this.token,
      userId: this.userId,
      password: this.setPasswordForm.value.password,
      confirmPassword: this.setPasswordForm.value.confirmPassword,
    };
    this._userService.setPassword(data).subscribe((res) => {
      this._toastService.showSuccess(res.message!, 'Success');
      this._router.navigate(['login']);
    });
  }
}
