import { Component } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { AdminNavbarComponent } from '../../Components/Admin/admin-navbar/admin-navbar.component';
import { AdminSidebarComponent } from '../../Components/Admin/admin-sidebar/admin-sidebar.component';
import { AdminFooterComponent } from '../../Components/Admin/admin-footer/admin-footer.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MenubarModule,
    AdminNavbarComponent,
    AdminSidebarComponent,
    AdminFooterComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  sidebarOpen = true;

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }
}
