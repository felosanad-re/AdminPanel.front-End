import { Component, Input, ViewEncapsulation } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { MessagesModule } from 'primeng/messages';

@Component({
  selector: 'app-validation-message',
  standalone: true,
  imports: [MessagesModule],
  templateUrl: './validation-message.component.html',
  styleUrl: './validation-message.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ValidationMessageComponent {
  @Input({ required: true }) control!: AbstractControl;
  @Input({ required: true }) messages!: { [key: string]: string };

  getErrors(): string[] {
    if (!this.control || !this.control.errors) return [];

    return Object.keys(this.control.errors).map((key) => this.messages[key]);
  }
}
