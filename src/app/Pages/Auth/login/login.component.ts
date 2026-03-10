import { Component } from '@angular/core';
import { PrimNgModule } from '../../../Core/shared/modules/prim-ng.module';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  RequiredValidator,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [PrimNgModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm!: FormGroup;
  emailUserName!: FormControl;
  password!: FormControl;
  value: string | undefined;
  constructor(private _formBuilder: FormBuilder) {}
  ngOnInit(): void {
    this.initiateForms();
  }
  initiateForms(): void {
    this.loginForm = this._formBuilder.group({
      emailUserName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  login(): void {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
    } else {
      Object.keys(this.loginForm.controls).forEach((key) => {
        this.loginForm.controls[key].markAsDirty();
        this.loginForm.controls[key].markAsTouched();
      });
    }
  }
}
