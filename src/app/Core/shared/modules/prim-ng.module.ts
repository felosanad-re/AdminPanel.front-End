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
import { RippleModule } from 'primeng/ripple';

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
    RippleModule,
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
    RippleModule,
  ],
})
export class PrimNgModule {}
