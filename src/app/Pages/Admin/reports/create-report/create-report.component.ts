import { ChangeDetectorRef, Component } from '@angular/core';
import { ReportService } from '../../../../Core/Services/AdminServices/report.service';
import { ToastService } from '../../../../Core/Services/Toast.service';
import { ProductService } from '../../../../Core/Services/AdminServices/product.service';
import { ProductResponse } from '../../../../Core/Interfaces/Products/product-response';
import { ProductParams } from '../../../../Core/Interfaces/Products/product-params';
import { Pagination } from '../../../../Core/Interfaces/pagination';
import { ApplicationResultService } from '../../../../Core/Interfaces/application-result-service';
import { ReportItems } from '../../../../Core/Interfaces/Reports/report-items';

import { CreatedReport } from '../../../../Core/Interfaces/Reports/created-report';
import { InvoiceReportComponent } from '../../../shared/invoice-report/invoice-report.component';

@Component({
  selector: 'app-create-report',
  standalone: true,
  imports: [InvoiceReportComponent],
  templateUrl: './create-report.component.html',
  styleUrl: './create-report.component.scss',
})
export class CreateReportComponent {
  constructor(
    private readonly _reportService: ReportService,
    private readonly _productService: ProductService,
    private readonly _toastService: ToastService,
    private readonly cdr: ChangeDetectorRef,
  ) {}
  ngOnInit(): void {
    this.getProducts();
  }

  products!: ProductResponse[];
  product!: ProductResponse;
  productParams = new ProductParams();
  totalPrice!: number; // price * count
  productInItems: ReportItems[] = []; // Send To Back End id | count and preview
  createReportData!: CreatedReport;

  // get Products
  getProducts() {
    this._productService.getProducts(this.productParams).subscribe({
      next: (res: ApplicationResultService<Pagination<ProductResponse>>) => {
        this.products = res.data.data;
      },
    });
  }

  // Add Item To Report
  addToItems(event: {
    product: ProductResponse;
    quantity: number | null | undefined;
    price: number | null | undefined;
  }) {
    const { product, quantity, price } = event;
    const unitPrice = price ?? 0;
    const qty = quantity ?? 0;
    if (qty <= 0) return;
    if (unitPrice <= 0) return;
    const existItem = this.productInItems.find(
      (i) => i.productId === product.id,
    );
    if (existItem) {
      existItem.quantity = qty;
    } else {
      this.productInItems.push({
        productId: product.id,
        quantity: qty,
        productName: product.productName,
        mainImage: product.mainImage,
        price: unitPrice,
      });
    }
    this.productInItems = [...this.productInItems];
  }

  removeFromItems(product: ProductResponse) {
    console.log('Removing product:', product);
    this.productInItems = this.productInItems.filter(
      (item) => item.productId !== product.id,
    );
    this.productInItems = [...this.productInItems];
    this.cdr.detectChanges();
    setTimeout(() => this.cdr.detectChanges(), 10);
  }

  // Create report
  onCreateReport() {
    const data: CreatedReport = {
      items: this.productInItems.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
      })),
    };
    this._reportService.addReport(data).subscribe({
      next: (res) => {
        console.log(res);
        this._toastService.showSuccess(res.message!, 'Success');
        this.productInItems = [];
      },
    });
  }

  onSearchHandler(value: string) {
    this.productParams.search = value;
    this.getProducts();
  }

  // Get total report transaction
  get totalReportTransactionPrice(): number {
    return this.productInItems.reduce(
      (sum, item) => sum + item.price! * item.quantity!,
      0,
    );
  }
}
