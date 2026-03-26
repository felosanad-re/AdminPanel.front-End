import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxSpinnerComponent } from 'ngx-spinner';
import { ToastModule } from 'primeng/toast';
import { UserService } from './Core/Services/AdminServices/user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToastModule, NgxSpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'AdminPanel.front-End';
  constructor(private readonly _userService: UserService) {}

  ngOnInit() {
    this._userService.LoadUserIfTokenIsExist();
  }
}
