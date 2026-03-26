import { ReportItems } from './report-items';

export interface ReportResponse {
  userName: string;
  userId: string;
  Items: ReportItems[];
  totalReportTransactionPrice: number;
  isDeleted: boolean;
  createdAt: Date;
  lastModifiedAt: Date;
  createdBy: string;
  lastModifiedBy: string;
}
