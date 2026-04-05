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
