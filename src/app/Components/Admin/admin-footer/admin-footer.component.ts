import { Component } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-admin-footer',
  standalone: true,
  imports: [MenubarModule],
  templateUrl: './admin-footer.component.html',
  styleUrl: './admin-footer.component.scss',
})
export class AdminFooterComponent {}
