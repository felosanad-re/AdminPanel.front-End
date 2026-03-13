import { Component, Input, Output, ViewChild } from '@angular/core';
import { Sidebar, SidebarModule } from 'primeng/sidebar';
import { PrimNgModule } from '../../../Core/shared/modules/prim-ng.module';
import { StyleClassModule } from 'primeng/styleclass';
import { EventEmitter } from 'stream';

@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [SidebarModule, PrimNgModule, StyleClassModule],
  templateUrl: './admin-sidebar.component.html',
  styleUrl: './admin-sidebar.component.scss',
})
export class AdminSidebarComponent {
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
