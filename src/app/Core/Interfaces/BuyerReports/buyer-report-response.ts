import { BuyerItems } from './buyer-items';

export interface BuyerReportResponse {
  id: number;
  userName: string;
  companyName: string;
  items: BuyerItems[];
  totalReportTransaction: number;
  isDeleted: boolean;
  createdAt: Date;
  createdBy: string;
}
