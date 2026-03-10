import { Component } from '@angular/core';
import { PrimNgModule } from '../../../Core/shared/modules/prim-ng.module';

@Component({
  selector: 'app-auth-nav',
  standalone: true,
  imports: [PrimNgModule],
  templateUrl: './auth-nav.component.html',
  styleUrl: './auth-nav.component.scss',
})
export class AuthNavComponent {}
