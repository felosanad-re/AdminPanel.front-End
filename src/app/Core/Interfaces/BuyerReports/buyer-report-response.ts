import { BuyerItems } from './buyer-items';

export interface BuyerReportResponse {
  id: number;
  adminName: string;
  companyName: string;
  items: BuyerItems[];
  totalReportTransactionPrice: number;
  isDeleted: boolean;
  createdAt: Date;
  createdBy: string;
}
