import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ProductResponse } from '../../../Core/Interfaces/Products/product-response';
import { ReportItems } from '../../../Core/Interfaces/Reports/report-items';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
@Component({
  selector: 'app-invoice-report',
  standalone: true,
  imports: [
    ButtonModule,
    CommonModule,
    TableModule,
    FormsModule,
    MenubarModule,
    InputNumberModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
  ],
  templateUrl: './invoice-report.component.html',
  styleUrl: './invoice-report.component.scss',
})
export class InvoiceReportComponent {
  @Input({ required: true }) products!: ProductResponse[];
  @Input({ required: true }) productInItems!: ReportItems[];
  @Input({ required: true }) totalReportTransactionPrice!: number;
  @Input({ required: true }) routes!: string;
  @Input({ required: true }) itemCount!: number;
  @Input({ required: true }) onFirst!: number;
  @Input({ required: true }) pageName!: string;
  @Input({ required: true }) reportName!: string;
  @Output() reportNameChange = new EventEmitter<string>();
  @Output() onSearch = new EventEmitter<string>();
  @Output() addToItems = new EventEmitter<{
    product: ProductResponse;
    quantity: number | null | undefined;
    price: number | null | undefined;
  }>();
  @Output() removeFromItems = new EventEmitter<ProductResponse>();
  @Output() createReport = new EventEmitter<void>();
  @Output() onPageChangeHelper = new EventEmitter<any>();

  removeItem(product: ProductResponse) {
    this.removeFromItems.emit(product);
  }

  trackByProductId(index: number, product: ProductResponse) {
    return product.id;
  }
}
