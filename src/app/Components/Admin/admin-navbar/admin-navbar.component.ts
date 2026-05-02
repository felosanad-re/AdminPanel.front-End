import { Component, EventEmitter, Output } from '@angular/core';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { CommonModule } from '@angular/common';
import { RippleModule } from 'primeng/ripple';
import { PrimNgModule } from '../../../Core/shared/modules/prim-ng.module';
import { UserService } from '../../../Core/Services/AdminServices/user.service';
import { TranslateModule } from '@ngx-translate/core';
import { TranslationService } from '../../../Core/Services/translation.service';
@Component({
  selector: 'app-admin-navbar',
  standalone: true,
  imports: [
    BadgeModule,
    AvatarModule,
    RippleModule,
    CommonModule,
    PrimNgModule,
    TranslateModule,
  ],
  templateUrl: './admin-navbar.component.html',
  styleUrl: './admin-navbar.component.scss',
})
export class AdminNavbarComponent {
  @Output() toggleSidebar = new EventEmitter<void>();

  constructor(
    private readonly _userServices: UserService,
    private readonly _translationService: TranslationService,
  ) {}
  currentUser$ = this._userServices.currentUser$;

  get langLabel(): string {
    return this._translationService.isArabic() ? 'EN' : 'AR';
  }
  onToggle() {
    this.toggleSidebar.emit();
  }

  toggleLanguage() {
    this._translationService.toggleLanguage();
  }
}
