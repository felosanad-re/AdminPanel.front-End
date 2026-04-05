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
