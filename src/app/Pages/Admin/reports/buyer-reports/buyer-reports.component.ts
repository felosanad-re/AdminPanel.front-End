import { Component } from '@angular/core';
import { BuyerInvoiceService } from '../../../../Core/Services/AdminServices/buyer-invoice.service';
import { ApplicationResultService } from '../../../../Core/Interfaces/application-result-service';
import { BuyerReportResponse } from '../../../../Core/Interfaces/BuyerReports/buyer-report-response';
import { TableRowCollapseEvent, TableRowExpandEvent } from 'primeng/table';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ToastService } from '../../../../Core/Services/Toast.service';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { InvoiceReportsShowComponent } from '../../../shared/invoice-reports-show/invoice-reports-show.component';
import { BuyerItems } from '../../../../Core/Interfaces/BuyerReports/buyer-items';
import { Router } from '@angular/router';
import { ImportResult } from '../../../../Core/Interfaces/import-result';

@Component({
  selector: 'app-buyer-reports',
  standalone: true,
  imports: [
    TableModule,
    CommonModule,
    ButtonModule,
    ConfirmDialogModule,
    InvoiceReportsShowComponent,
  ],
  templateUrl: './buyer-reports.component.html',
  styleUrl: './buyer-reports.component.scss',
  providers: [ConfirmationService],
})
export class BuyerReportsComponent {
  constructor(
    private readonly _buyerReport: BuyerInvoiceService,
    private readonly _toastService: ToastService,
    private readonly _confirmationService: ConfirmationService,
    private readonly _router: Router,
  ) {}

  ngOnInit() {
    this.getAllBuyerReport();
  }

  buyerReports!: BuyerReportResponse[];
  reports!: BuyerReportResponse;
  reportItems!: BuyerItems[];
  expandedRows = {};
  pageName: string = 'Buyer Reports';

  getAllBuyerReport() {
    this._buyerReport.getBuyerInvoices().subscribe({
      next: (res: ApplicationResultService<BuyerReportResponse[]>) => {
        this.buyerReports = res.data;
        console.log(res);
      },
    });
  }

  removeReport(report: BuyerReportResponse) {
    this._confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: 'none',
      rejectIcon: 'none',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => {
        this._buyerReport.delete(report.id).subscribe({
          next: (res) => {
            this._toastService.showSuccess(res.message!, 'Success');
            this.getAllBuyerReport();
          },
        });
      },
      reject: () => {
        this._toastService.showSuccess('Report not deleted', 'Success');
      },
    });
  }

  expandAll() {
    this.expandedRows = this.buyerReports.reduce(
      (acc, p) => (acc[p.id] = true) && acc,
      {} as Record<number, boolean>,
    );
    this._toastService.showSuccess('Reports Expanded', 'Success');
  }

  print(id: number) {
    this._buyerReport.getBuyerReport(id).subscribe({
      next: (res) => {
        this._toastService.showSuccess(res.message! + ' Details', 'Success');
        this._router.navigate(['dashboard/printBuyerReport', id], {
          queryParams: { type: 'buyer' },
        });
      },
    });
  }

  onImport(event: any) {
    const file: File | undefined =
      event?.files?.[0] ?? event?.currentFiles?.[0];
    if (!file) {
      this._toastService.showError(
        'Please select a valid Excel file.',
        'Error',
      );
      return;
    }

    this._buyerReport.importPurchase(file).subscribe({
      next: (res: ImportResult<unknown>) => {
        const errors = res.errors?.filter((error) => error?.trim());
        if (errors?.length)
          this._toastService.showError(
            errors.join(' | '),
            'Import completed Field',
          );
        else {
          this._toastService.showSuccess(res.message!, 'Import completed');
        }
        this.getAllBuyerReport();
      },
      error: (err) => {
        this._toastService.showError(
          err?.error?.message || err?.message || 'Import failed',
          'Error',
        );
      },
    });
  }

  onExport() {
    this._buyerReport.exportPurchase().subscribe({
      next: (res) => {
        const blob = res.body;

        if (!blob) {
          this._toastService.showError('Export failed', 'Error');
          return;
        }

        const fileName =
          this.getFileNameFromHeader(res.headers.get('content-disposition')) ||
          `Purchase-${new Date().toISOString().slice(0, 10)}.xlsx`;

        const downloadUrl = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = fileName;
        link.click();
        URL.revokeObjectURL(downloadUrl);
        this._toastService.showSuccess(
          'Purchase exported successfully',
          'Success',
        );
      },
    });
  }

  private getFileNameFromHeader(
    contentDisposition: string | null,
  ): string | null {
    if (!contentDisposition) return null;

    const match = contentDisposition.match(
      /filename\*?=(?:UTF-8''|\"?)([^\";]+)/i,
    );
    return match?.[1]
      ? decodeURIComponent(match[1].replace(/\"/g, '').trim())
      : null;
  }

  collapseAll() {
    this.expandedRows = {};
    this._toastService.showSuccess('Reports Collapse', 'Success');
  }

  onRowExpand(event: TableRowExpandEvent) {
    this._toastService.showSuccess('Report Expanded', 'Success');
  }

  onRowCollapse(event: TableRowCollapseEvent) {
    this._toastService.showSuccess('Report Collapse', 'Success');
  }
}
