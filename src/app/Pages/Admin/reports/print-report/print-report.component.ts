import { Component, ViewEncapsulation } from '@angular/core';
import { ReportService } from '../../../../Core/Services/AdminServices/report.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ReportResponse } from '../../../../Core/Interfaces/Reports/report-response';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ReportItems } from '../../../../Core/Interfaces/Reports/report-items';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-print-report',
  standalone: true,
  imports: [TableModule, CommonModule, Button],
  templateUrl: './print-report.component.html',
  styleUrl: './print-report.component.scss',
  // encapsulation: ViewEncapsulation.None,
})
export class PrintReportComponent {
  constructor(
    private readonly _reportService: ReportService,
    private readonly _activatedRoute: ActivatedRoute,
  ) {}
  reportId!: number;
  report!: ReportResponse;

  ngOnInit() {
    this._activatedRoute.params.subscribe((params) => {
      this.reportId = params['id'];
    });
    this.getReport();
  }

  getReport() {
    this._reportService.getReportDetails(this.reportId).subscribe({
      next: (res) => {
        this.report = res.data;
      },
    });
  }

  print() {
    window.print();
  }
}
