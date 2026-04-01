import { Component } from '@angular/core';
import { UserService } from '../../../Core/Services/AdminServices/user.service';
import { ToastService } from '../../../Core/Services/Toast.service';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ValidationsService } from '../../../Core/Services/validations.service';
import { ValidationMessageComponent } from '../../../Core/shared/validation-message/validation-message.component';

@Component({
  selector: 'app-create-account',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    ValidationMessageComponent,
  ],
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.scss',
})
export class CreateAccountComponent {
  constructor(
    private readonly _userService: UserService,
    private readonly _toastService: ToastService,
    private readonly _router: Router,
    private readonly _formBuilder: FormBuilder,
    private readonly _validationService: ValidationsService,
  ) {}
  ngOnInit(): void {
    this.createAdminAccountForm = this._formBuilder.group({
      firstName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      userName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
      address: [''],
    });
  }
  createAdminAccountForm!: FormGroup;

  createAdminAccount(): void {
    if (!this.createAdminAccountForm.valid) {
      this._validationService.markFormTouched(this.createAdminAccountForm);
      return;
    }
    this._userService.createUser(this.createAdminAccountForm.value).subscribe({
      next: (res) => {
        this._toastService.showSuccess(res.message!, 'Success');
        this.createAdminAccountForm.reset();
      },
    });
  }
}
