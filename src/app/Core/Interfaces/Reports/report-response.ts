import { ReportItems } from './report-items';

export interface ReportResponse {
  id: number;
  userName: string;
  userId: string;
  Items: ReportItems[];
  totalReportTransactionPrice: number;
  isDeleted: boolean;
  createdAt: Date;
  modifiedAt: Date;
  createdBy: string;
  modifiedBy: string;
}
