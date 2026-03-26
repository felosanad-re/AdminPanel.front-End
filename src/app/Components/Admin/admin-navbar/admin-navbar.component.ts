import { Component, EventEmitter, Output } from '@angular/core';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { CommonModule } from '@angular/common';
import { RippleModule } from 'primeng/ripple';
import { PrimNgModule } from '../../../Core/shared/modules/prim-ng.module';
import { UserService } from '../../../Core/Services/AdminServices/user.service';
@Component({
  selector: 'app-admin-navbar',
  standalone: true,
  imports: [
    BadgeModule,
    AvatarModule,
    RippleModule,
    CommonModule,
    PrimNgModule,
  ],
  templateUrl: './admin-navbar.component.html',
  styleUrl: './admin-navbar.component.scss',
})
export class AdminNavbarComponent {
  @Output() toggleSidebar = new EventEmitter<void>();

  constructor(private readonly _userServices: UserService) {}
  currentUser$ = this._userServices.currentUser$;

  onToggle() {
    this.toggleSidebar.emit();
  }
}
