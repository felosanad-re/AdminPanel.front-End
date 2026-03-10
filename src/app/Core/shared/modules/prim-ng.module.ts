import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';

@NgModule({
  imports: [
    CommonModule,
    MenubarModule,
    FormsModule,
    FloatLabelModule,
    InputTextModule,
    ButtonModule,
  ],
  exports: [
    CommonModule,
    MenubarModule,
    FormsModule,
    FloatLabelModule,
    InputTextModule,
    ButtonModule,
  ],
})
export class PrimNgModule {}
