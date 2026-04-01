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
  ],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss',
})
export class ReportsComponent {
  constructor(
    private readonly _reportService: ReportService,
    private readonly _toastService: ToastService,
  ) {}

  // Properties
  reports!: ReportResponse[];
  report!: ReportResponse;
  reportItems!: ReportItems[];
  expandedRows: Record<number, boolean> = {};
  visible: boolean = false;
  submitted: boolean = false;
  ngOnInit() {
    this.getAllReports();
  }
  // Get All Reports
  getAllReports() {
    this._reportService.getReports().subscribe({
      next: (res: ApplicationResultService<ReportResponse[]>) => {
        this.reports = res.data;
      },
    });
  }

  // Edit Report
  printReport(id: number) {
    this._reportService.getReportDetails(id).subscribe({
      next: (res) => {
        this._toastService.showSuccess(res.message!, 'Success');
        this.report = res.data;
        this.reportItems = res.data.Items;
        this.visible = true;
      },
    });
  }

  // Save Changes
  print() {}
  hideDialog() {
    this.visible = false;
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
