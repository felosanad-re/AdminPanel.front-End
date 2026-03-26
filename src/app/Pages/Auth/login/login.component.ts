import { ValidationsService } from './../../../Core/Services/validations.service';
import { Component } from '@angular/core';
import { PrimNgModule } from '../../../Core/shared/modules/prim-ng.module';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Message } from 'primeng/api';
import { get } from 'http';
import { ValidationMessageComponent } from '../../../Core/shared/validation-message/validation-message.component';
import { LogoComponent } from '../../../Core/shared/logo/logo.component';
import { AuthService } from '../../../Core/Services/Auth-Services/auth.service';
import { ToastService } from '../../../Core/Services/Toast.service';
import { CheckboxModule } from 'primeng/checkbox';
import { LoginResponse } from '../../../Core/Interfaces/Login-interfaces/login-response';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    PrimNgModule,
    ReactiveFormsModule,
    ValidationMessageComponent,
    LogoComponent,
    CheckboxModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm!: FormGroup;
  emailOrUserName!: FormControl;
  password!: FormControl;
  rememberMe!: FormControl;
  messages!: Message[];
  constructor(
    private _formBuilder: FormBuilder,
    private _authServices: AuthService,
    public _validationService: ValidationsService,
    private _toastService: ToastService,
    private _router: Router,
  ) {}
  ngOnInit(): void {
    this.initiateForms();
  }
  initiateForms(): void {
    this.loginForm = this._formBuilder.group({
      emailOrUserName: ['', Validators.required],
      password: ['', Validators.required],
      rememberMe: [false],
    });
  }

  login(): void {
    if (this.loginForm.valid) {
      this._authServices.logIn(this.loginForm.value).subscribe({
        next: (res: LoginResponse) => {
          if (res.token) {
            this._toastService.showSuccess(res.message, 'Success');
            localStorage.setItem('token', res.token);
            console.log(res.userName);
            this._router.navigate(['/dashboard']);
          } else {
            this._toastService.showError(res.message, 'Error');
          }
        },
        error: (err) => {
          this._toastService.showError(err.error.message, 'Error');
        },
      });
    } else {
      this._validationService.markFormTouched(this.loginForm);
    }
  }
}
