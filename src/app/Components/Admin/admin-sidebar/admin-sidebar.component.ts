import { Component, Input, ViewChild } from '@angular/core';
import { Sidebar, SidebarModule } from 'primeng/sidebar';
import { PrimNgModule } from '../../../Core/shared/modules/prim-ng.module';
import { StyleClassModule } from 'primeng/styleclass';
import { MenuItem } from 'primeng/api';
import { PanelMenuModule } from 'primeng/panelmenu';

@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [SidebarModule, PrimNgModule, StyleClassModule, PanelMenuModule],
  templateUrl: './admin-sidebar.component.html',
  styleUrl: './admin-sidebar.component.scss',
})
export class AdminSidebarComponent {
  items: MenuItem[] | undefined;

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
            icon: 'pi pi-star',
            routerLink: 'products',
          },
          {
            label: 'Category',
            icon: 'pi pi-star',
            routerLink: 'categories',
          },
          {
            label: 'Brands',
            icon: 'pi pi-star',
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
}
