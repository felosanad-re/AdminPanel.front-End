import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { Button } from 'primeng/button';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-print-shared',
  standalone: true,
  imports: [Button, TableModule, CommonModule],
  templateUrl: './print-shared.component.html',
  styleUrl: './print-shared.component.scss',
})
export class PrintSharedComponent {
  @Input({ required: true }) data!: any;
  @Input({ required: true }) id!: number;
  @Input({ required: true }) pageName!: string;
  @Output() onPrint = new EventEmitter<any>();
  @Output() onGetReport = new EventEmitter<any>();
}
