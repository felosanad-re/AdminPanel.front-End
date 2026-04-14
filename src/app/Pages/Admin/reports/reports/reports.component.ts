import { Component } from '@angular/core';
import { ReportService } from '../../../../Core/Services/AdminServices/report.service';
import { ToastService } from '../../../../Core/Services/Toast.service';
import { ReportResponse } from '../../../../Core/Interfaces/Reports/report-response';
import { ApplicationResultService } from '../../../../Core/Interfaces/application-result-service';
import { TableRowCollapseEvent, TableRowExpandEvent } from 'primeng/table';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { ReportItems } from '../../../../Core/Interfaces/Reports/report-items';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Router } from '@angular/router';
import { InvoiceReportsShowComponent } from '../../../shared/invoice-reports-show/invoice-reports-show.component';
import { ImportResult } from '../../../../Core/Interfaces/import-result';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [
    TableModule,
    ButtonModule,
    CommonModule,
    ToastModule,
    DialogModule,
    InputTextModule,
    FormsModule,
    ConfirmDialogModule,
    InvoiceReportsShowComponent,
  ],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss',
  providers: [ConfirmationService],
})
export class ReportsComponent {
  constructor(
    private readonly _reportService: ReportService,
    private readonly _toastService: ToastService,
    private readonly _confirmationService: ConfirmationService,
    private readonly _router: Router,
  ) {}

  // Properties
  reports!: ReportResponse[];
  report!: ReportResponse;
  reportItems!: ReportItems[];
  expandedRows: Record<number, boolean> = {};
  pageName: string = 'Sales Reports';
  ngOnInit() {
    this.getAllReports();
  }
  // Get All Reports
  getAllReports() {
    this._reportService.getReports().subscribe({
      next: (res: ApplicationResultService<ReportResponse[]>) => {
        this.reports = res.data;
        console.log(this.reports);
      },
    });
  }

  // print Report
  printReport(id: number) {
    this._reportService.getReportDetails(id).subscribe({
      next: (res) => {
        this._toastService.showSuccess(res.message! + ' Details', 'Success');
        this._router.navigate(['dashboard/printReport', id], {
          queryParams: { type: 'sales' },
        });
      },
    });
  }

  deleteReport(id: number) {
    this._confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: 'none',
      rejectIcon: 'none',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => {
        this._reportService.deleteReport(id).subscribe({
          next: (res) => {
            this._toastService.showSuccess(res.message!, 'Success');
          },
        });
      },
      reject: () => {
        this._toastService.showSuccess('Report not deleted', 'Success');
      },
    });
  }

  onImportReports(event: any) {
    const file: File | undefined =
      event?.files?.[0] ?? event?.currentFiles?.[0];
    if (!file) {
      this._toastService.showError(
        'Please select a valid Excel file.',
        'Error',
      );
      return;
    }

    this._reportService.importSales(file).subscribe({
      next: (res: ImportResult<unknown>) => {
        const errors = res.errors?.filter((error) => error?.trim());
        if (errors?.length) {
          this._toastService.showError(
            errors.join(' | '),
            'Import completed Field',
          );
        } else {
          this._toastService.showSuccess(res.message, 'Import completed');
        }

        this.getAllReports();
      },
      error: (err) => {
        this._toastService.showError(
          err?.error?.message || err?.message || 'Import failed',
          'Error',
        );
      },
    });
  }

  onExportReports() {
    this._reportService.exportSales().subscribe({
      next: (res) => {
        const blob = res.body;

        if (!blob) {
          this._toastService.showError('Export failed', 'Error');
          return;
        }

        const fileName =
          this.getFileNameFromHeader(res.headers.get('content-disposition')) ||
          `Sales-${new Date().toISOString().slice(0, 10)}.xlsx`;

        const downloadUrl = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = fileName;
        link.click();
        URL.revokeObjectURL(downloadUrl);
        this._toastService.showSuccess(
          'Sales exported successfully',
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

  // expandAll
  expandAll() {
    this.expandedRows = Object.fromEntries(
      this.reports.map((r) => [r.id, true]),
    );
  }

  // collapseAll
  collapseAll() {
    this.expandedRows = {};
    this.report = {} as ReportResponse;
  }

  onRowExpand(event: TableRowExpandEvent) {
    this._toastService.showSuccess('Product Expanded', 'Success');
  }

  onRowCollapse(event: TableRowCollapseEvent) {
    this._toastService.showSuccess('Product Collapse', 'Success');
  }
}
