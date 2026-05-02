import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { Sidebar, SidebarModule } from 'primeng/sidebar';
import { PrimNgModule } from '../../../Core/shared/modules/prim-ng.module';
import { StyleClassModule } from 'primeng/styleclass';
import { MenuItem } from 'primeng/api';
import { PanelMenuModule } from 'primeng/panelmenu';
import { AuthService } from '../../../Core/Services/Auth-Services/auth.service';
import { Router } from '@angular/router';
import { ToastService } from '../../../Core/Services/Toast.service';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [SidebarModule, PrimNgModule, StyleClassModule, PanelMenuModule],
  templateUrl: './admin-sidebar.component.html',
  styleUrl: './admin-sidebar.component.scss',
})
export class AdminSidebarComponent {
  items: MenuItem[] | undefined;
  langChangeSub!: Subscription;
  constructor(
    private readonly _authService: AuthService,
    private readonly _router: Router,
    private readonly _toastService: ToastService,
    private readonly _translate: TranslateService,
  ) {}
  ngOnInit() {
    this._translate.get('SIDEBAR').subscribe(() => {
      this.buildMenu();
    });
    this.langChangeSub = this._translate.onLangChange.subscribe(() =>
      this.buildMenu(),
    );
  }
  ngOnDestroy(): void {
    if (this.langChangeSub) {
      this.langChangeSub.unsubscribe();
    }
  }

  @Input() sidebarOpen: boolean = false;
  @Output() sidebarOpenChange = new EventEmitter<boolean>();
  @ViewChild('sidebarRef') sidebarRef!: Sidebar;

  buildMenu() {
    this.items = [
      {
        label: this._translate.instant('SIDEBAR.HOME'),
        icon: 'pi pi-home',
        routerLink: '/dashboard',
      },
      {
        label: this._translate.instant('SIDEBAR.FEATURES'),
        icon: 'pi pi-star',
        items: [
          {
            label: this._translate.instant('SIDEBAR.PRODUCTS'),
            icon: 'pi pi-align-justify',
            routerLink: 'products',
          },
          {
            label: this._translate.instant('SIDEBAR.CATEGORIES'),
            icon: 'pi pi-th-large',
            routerLink: 'categories',
          },
          {
            label: this._translate.instant('SIDEBAR.BRANDS'),
            icon: 'pi pi-sparkles',
            routerLink: 'brands',
          },
          {
            label: this._translate.instant('SIDEBAR.REPORTS'),
            items: [
              {
                label: this._translate.instant('SIDEBAR.BUYER_REPORTS'),
                icon: 'pi pi-star',
                routerLink: 'buyerReports',
              },
              {
                label: this._translate.instant('SIDEBAR.SALES_REPORTS'),
                icon: 'pi pi-dollar',
                routerLink: 'reports',
              },
            ],
          },
        ],
      },
      {
        label: this._translate.instant('SIDEBAR.CONTACT'),
        icon: 'pi pi-envelope',
      },
      {
        label: this._translate.instant('SIDEBAR.ADMIN'),
        icon: 'pi pi-user-plus',
        routerLink: 'createAccount',
      },
      {
        label: this._translate.instant('SIDEBAR.LOGOUT'),
        icon: 'pi pi-sign-out',
        command: () => this.logOut(),
      },
    ];
  }
  onHide() {
    this.sidebarOpen = false;
    this.sidebarOpenChange.emit(false);
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
    this.sidebarOpenChange.emit(this.sidebarOpen);
  }
  logOut() {
    this._authService.removeToken();
    this._router.navigate(['login']);
    this._toastService.showSuccess('Logout Successfully', 'Success');
  }
}
