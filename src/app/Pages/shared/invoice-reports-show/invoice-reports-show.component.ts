import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TableRowExpandEvent, TableModule } from 'primeng/table';
import { Button } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FileUploadModule } from 'primeng/fileupload';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-invoice-reports-show',
  standalone: true,
  imports: [
    TableModule,
    Button,
    CommonModule,
    ConfirmDialogModule,
    FileUploadModule,
    TranslateModule,
  ],
  templateUrl: './invoice-reports-show.component.html',
  styleUrl: './invoice-reports-show.component.scss',
})
export class InvoiceReportsShowComponent {
  @Input({ required: true }) allData: any[] = [];
  @Input({ required: true }) data!: any;
  @Input({ required: true }) onReportItems: any[] = [];
  @Input({ required: true }) onExpandedRows: Record<number, boolean> = {};
  @Input({ required: true }) onPageName!: string;
  @Output() onExpandAll = new EventEmitter<void>();
  @Output() onCollapseAll = new EventEmitter<void>();
  @Output() onRowExpand = new EventEmitter<TableRowExpandEvent>();
  @Output() onRowCollapse = new EventEmitter<TableRowExpandEvent>();
  @Output() onDelete = new EventEmitter<any>();
  @Output() onPrint = new EventEmitter<any>();
  @Output() onImportHandler = new EventEmitter<any>();
  @Output() onExportHandler = new EventEmitter<any>();

  getReportUserName(report: any): string {
    return report?.userName || report?.adminName || report?.createdBy || 'N/A';
  }

  getReportGrandTotal(report: any): number {
    return (
      report?.totalReportTransactionPrice ?? report?.totalReportTransaction ?? 0
    );
  }
}
