import { Component, Input, ViewChild } from '@angular/core';
import { Sidebar, SidebarModule } from 'primeng/sidebar';
import { PrimNgModule } from '../../../Core/shared/modules/prim-ng.module';
import { StyleClassModule } from 'primeng/styleclass';
import { MenuItem } from 'primeng/api';
import { PanelMenuModule } from 'primeng/panelmenu';
import { AuthService } from '../../../Core/Services/Auth-Services/auth.service';
import { Router } from '@angular/router';
import { ToastService } from '../../../Core/Services/Toast.service';

@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [SidebarModule, PrimNgModule, StyleClassModule, PanelMenuModule],
  templateUrl: './admin-sidebar.component.html',
  styleUrl: './admin-sidebar.component.scss',
})
export class AdminSidebarComponent {
  items: MenuItem[] | undefined;
  constructor(
    private readonly _authService: AuthService,
    private readonly _router: Router,
    private readonly _toastService: ToastService,
  ) {}
  ngOnInit() {
    this.items = [
      {
        label: 'Dashboard',
        icon: 'pi pi-home',
        routerLink: '/dashboard',
      },
      {
        label: 'Features',
        icon: 'pi pi-star',
        items: [
          {
            label: 'Products',
            icon: 'pi pi-align-justify',
            routerLink: 'products',
          },
          {
            label: 'Category',
            icon: 'pi pi-th-large',
            routerLink: 'categories',
          },
          {
            label: 'Brands',
            icon: 'pi pi-sparkles',
            routerLink: 'brands',
          },
          {
            label: 'Orders',
            icon: 'pi pi-star',
            routerLink: 'orders',
          },
        ],
      },
      {
        label: 'Contact',
        icon: 'pi pi-envelope',
      },
      {
        label: 'Create New Admin',
        icon: 'pi pi-user-plus',
        routerLink: 'createAccount',
      },
      {
        label: 'Logout',
        icon: 'pi pi-sign-out',
        command: () => this.logOut(),
      },
    ];
  }
  @Input({ required: true }) sidebarOpen: boolean = false;
  // @Output() sidebarOpenChange = new EventEmitter<boolean>();

  @ViewChild('sidebarRef') sidebarRef!: Sidebar;
  onHide() {
    // this.sidebarOpenChange.emit(false);
  }
  closeCallback(e: Event): void {
    this.sidebarRef.close(e);
    // this.sidebarOpenChange.emit(false);
  }

  logOut() {
    this._authService.removeToken();
    this._router.navigate(['login']);
    this._toastService.showSuccess('Logout Successfully', 'Success');
  }
}
