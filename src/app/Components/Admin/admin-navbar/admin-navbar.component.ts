import { Component, EventEmitter, Output } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { CommonModule } from '@angular/common';
import { RippleModule } from 'primeng/ripple';
import { PrimNgModule } from '../../../Core/shared/modules/prim-ng.module';
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
  userName: string = 'Super Admin';
  @Output() toggleSidebar = new EventEmitter<void>();

  onToggle() {
    this.toggleSidebar.emit();
  }
  ngOnInit() {}
}
