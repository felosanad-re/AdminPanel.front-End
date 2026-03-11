import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
@NgModule({
  imports: [
    CommonModule,
    MenubarModule,
    FormsModule,
    FloatLabelModule,
    InputTextModule,
    ButtonModule,
    MessagesModule,
    InputGroupAddonModule,
    InputGroupModule,
  ],
  exports: [
    CommonModule,
    MenubarModule,
    FormsModule,
    FloatLabelModule,
    InputTextModule,
    ButtonModule,
    MessagesModule,
    InputGroupAddonModule,
    InputGroupModule,
  ],
})
export class PrimNgModule {}
