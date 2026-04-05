import { get } from 'http';
import { Component } from '@angular/core';
import { BuyerInvoiceService } from '../../../../Core/Services/AdminServices/buyer-invoice.service';
import { ProductService } from '../../../../Core/Services/AdminServices/product.service';
import { ToastService } from '../../../../Core/Services/Toast.service';
import { ProductResponse } from '../../../../Core/Interfaces/Products/product-response';
import { ProductParams } from '../../../../Core/Interfaces/Products/product-params';
import { ApplicationResultService } from '../../../../Core/Interfaces/application-result-service';
import { Pagination } from '../../../../Core/Interfaces/pagination';
import { BuyerItems } from '../../../../Core/Interfaces/BuyerReports/buyer-items';
import { CreateBuyerReport } from '../../../../Core/Interfaces/BuyerReports/create-buyer-report';
import { FormsModule } from '@angular/forms';
import { InvoiceReportComponent } from '../../../shared/invoice-report/invoice-report.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-buyer-report',
  standalone: true,
  imports: [FormsModule, InvoiceReportComponent],
  templateUrl: './create-buyer-report.component.html',
  styleUrl: './create-buyer-report.component.scss',
})
export class CreateBuyerReportComponent {
  constructor(
    private readonly _buyerReportService: BuyerInvoiceService,
    private readonly _productService: ProductService,
    private readonly _toastService: ToastService,
  ) {}

  products!: ProductResponse[];
  productParams = new ProductParams();
  productInItems: BuyerItems[] = [];
  createReportReq!: CreateBuyerReport;
  reportName!: string;
  route: string = '../buyerReports';
  totalProductCount!: number;
  first: number = 0;
  page: string = 'Purchase';
  ngOnInit() {
    this.getAllProducts();
  }

  getAllProducts() {
    this._productService.getProducts(this.productParams).subscribe({
      next: (res: ApplicationResultService<Pagination<ProductResponse>>) => {
        this.products = res.data.data;
        this.totalProductCount = res.data.count;
      },
    });
  }

  addProductToItems(event: {
    product: ProductResponse;
    quantity: number | null | undefined;
    price: number | null | undefined;
  }) {
    const { product, quantity, price } = event;
    const buyerPrice = price ?? 0;
    const buyerQty = quantity ?? 0;
    if (buyerQty <= 0 || buyerPrice <= 0) return;
    const existsItem = this.productInItems.find(
      (i) => i.productId === product.id,
    );
    if (existsItem) {
      existsItem.quantity = buyerQty;
    } else {
      this.productInItems.push({
        productId: product.id,
        productName: product.productName,
        price: buyerPrice,
        quantity: buyerQty,
        mainImage: product.mainImage,
        totalPrice: buyerPrice * buyerQty,
      });
    }
    this.productInItems = [...this.productInItems];
  }

  createReport() {
    const data: CreateBuyerReport = {
      items: this.productInItems,
      companyName: this.reportName,
    };
    console.log(data);
    this._buyerReportService.createBuyerReport(data).subscribe({
      next: (res) => {
        this._toastService.showSuccess(res.message!, 'Success');
        this.productInItems = [];
      },
    });
  }

  onSearch(value: string) {
    this.productParams.search = value;
    this.productParams.pageIndex = 1;
    this.productParams.pageSize = 5;
    this.first = 0;
    this.getAllProducts();
  }

  onPageChange(e: any) {
    this.productParams.pageIndex = e.first / e.rows + 1;
    this.productParams.pageSize = e.rows;
    this.getAllProducts();
  }

  get totalPrice() {
    return this.productInItems.reduce(
      (sum, item) => sum + item.price! * item.quantity!,
      0,
    );
  }
}
