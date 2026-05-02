import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Button } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { BuyerItems } from '../../../Core/Interfaces/BuyerReports/buyer-items';
import { BuyerReportResponse } from '../../../Core/Interfaces/BuyerReports/buyer-report-response';
import { ReportItems } from '../../../Core/Interfaces/Reports/report-items';
import { ReportResponse } from '../../../Core/Interfaces/Reports/report-response';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-print-shared',
  standalone: true,
  imports: [Button, TableModule, CommonModule, TranslateModule],
  templateUrl: './print-shared.component.html',
  styleUrl: './print-shared.component.scss',
})
export class PrintSharedComponent {
  @Input({ required: true }) data!: ReportResponse | BuyerReportResponse;
  @Input({ required: true }) id!: number;
  @Input({ required: true }) pageName!: string;
  @Output() onPrint = new EventEmitter<void>();
  @Output() onGetReport = new EventEmitter<void>();

  constructor(private readonly _translate: TranslateService) {}

  get reportTitle(): string {
    return this.pageName?.trim()
      ? this._translate.instant('PRINT_SHARED.PAGE_NAME_REPORT', {
          pageName: this.pageName,
        })
      : this._translate.instant('PRINT_SHARED.REPORT_DETAILS');
  }

  get companyName(): string {
    return (
      this.data?.companyName?.trim() ||
      this._translate.instant('PRINT_SHARED.NOT_PROVIDED')
    );
  }

  get items(): Array<ReportItems | BuyerItems> {
    return this.data?.items ?? [];
  }

  get itemsCount(): number {
    return this.items.length;
  }

  get createdByName(): string {
    return (
      (this.data as ReportResponse)?.createdBy ||
      (this.data as ReportResponse)?.userName ||
      (this.data as BuyerReportResponse)?.userName ||
      this._translate.instant('PRINT_SHARED.NOT_PROVIDED')
    );
  }

  get grandTotal(): number {
    return (
      (this.data as ReportResponse)?.totalReportTransactionPrice ??
      (this.data as BuyerReportResponse)?.totalReportTransaction ??
      0
    );
  }
}
