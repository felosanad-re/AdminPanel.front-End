import { Component } from '@angular/core';
import { BuyerInvoiceService } from '../../../../Core/Services/AdminServices/buyer-invoice.service';
import { ActivatedRoute } from '@angular/router';
import { BuyerReportResponse } from '../../../../Core/Interfaces/BuyerReports/buyer-report-response';
import { PrintSharedComponent } from '../../../shared/print-shared/print-shared.component';

@Component({
  selector: 'app-print-sales-report',
  standalone: true,
  imports: [PrintSharedComponent],
  templateUrl: './print-buyer-report.component.html',
  styleUrl: './print-buyer-report.component.scss',
})
export class PrintSalesReportComponent {
  constructor(
    private readonly _reportService: BuyerInvoiceService,
    private readonly _activatedRoute: ActivatedRoute,
  ) {}
  reportId!: number;
  report!: BuyerReportResponse;
  pageName: string = 'Buyer';
  ngOnInit() {
    this._activatedRoute.params.subscribe((params) => {
      this.reportId = params['id'];
    });
    this.getReport();
  }

  getReport() {
    this._reportService.getBuyerReport(this.reportId).subscribe({
      next: (res) => {
        this.report = res.data;
      },
    });
  }

  print() {
    window.print();
  }
}
