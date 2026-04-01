import { Component } from '@angular/core';
import { ReportService } from '../../../../Core/Services/AdminServices/report.service';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastService } from '../../../../Core/Services/Toast.service';
import { ProductService } from '../../../../Core/Services/AdminServices/product.service';
import { ProductResponse } from '../../../../Core/Interfaces/Products/product-response';
import { ProductParams } from '../../../../Core/Interfaces/Products/product-params';
import { Pagination } from '../../../../Core/Interfaces/pagination';
import { ApplicationResultService } from '../../../../Core/Interfaces/application-result-service';
import { ReportItems } from '../../../../Core/Interfaces/Reports/report-items';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { CreatedReport } from '../../../../Core/Interfaces/Reports/created-report';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-create-report',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    CommonModule,
    TableModule,
    FormsModule,
    InputNumberModule,
    MenubarModule,
  ],
  templateUrl: './create-report.component.html',
  styleUrl: './create-report.component.scss',
})
export class CreateReportComponent {
  constructor(
    private readonly _reportService: ReportService,
    private readonly _productService: ProductService,
    private readonly _toastService: ToastService,
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
  addToItems(
    product: ProductResponse,
    quantity: number | null | undefined,
    price: number | null | undefined,
  ) {
    const unitPrice = price ?? 0;
    const qty = quantity ?? 0;
    if (qty <= 0) return;
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
  }

  // Create report
  createReport() {
    const data: CreatedReport = {
      items: this.productInItems.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
      })),
    };
    debugger;
    this._reportService.addReport(data).subscribe({
      next: (res) => {
        console.log(res);
        this._toastService.showSuccess(res.message!, 'Success');
        this.productInItems = [];
      },
    });
  }

  onSearch(value: string) {
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
