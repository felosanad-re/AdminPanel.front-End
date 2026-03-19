import { UpdateProductDTO } from './../../../Core/Interfaces/Products/update-product-dto';
import { CreateProductDTO } from './../../../Core/Interfaces/Products/create-product-dto';
import { ConfirmationService, Message } from 'primeng/api';
import { Component } from '@angular/core';
import { ProductService } from '../../../Core/Services/AdminServices/product.service';
import { ProductResponse } from '../../../Core/Interfaces/Products/product-response';
import { ApplicationResultService } from '../../../Core/Interfaces/application-result-service';
import { ProductParams } from '../../../Core/Interfaces/Products/product-params';
import { Pagination } from '../../../Core/Interfaces/pagination';
import { ToastService } from '../../../Core/Services/Toast.service';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CommonModule } from '@angular/common';
import { FileUploadModule } from 'primeng/fileupload';
import { DropdownModule } from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    TableModule,
    DialogModule,
    RippleModule,
    ButtonModule,
    ToastModule,
    ToolbarModule,
    ConfirmDialogModule,
    InputTextModule,
    InputTextareaModule,
    CommonModule,
    FileUploadModule,
    DropdownModule,
    TagModule,
    RadioButtonModule,
    RatingModule,
    InputTextModule,
    FormsModule,
    InputNumberModule,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  providers: [ConfirmationService],
  styles: [
    `
      :host ::ng-deep .p-dialog .product-image {
        width: 150px;
        margin: 0 auto 2rem auto;
        display: block;
      }
    `,
  ],
})
export class ProductsComponent {
  products: ProductResponse[] = [];
  product!: ProductResponse;
  createProductDTO!: CreateProductDTO;
  updateProductDTO!: UpdateProductDTO;
  imagePreview!: string | null;
  productParams = new ProductParams();
  productDialog: boolean = false;
  selectedProducts!: number[] | null; // Ids
  totalRecords: number = 0;
  pageIndex: number = 1;
  pageSize: number = 10;

  submitted: boolean = false;

  constructor(
    private readonly _productService: ProductService,
    private readonly _toastService: ToastService,
    private confirmationService: ConfirmationService,
  ) {}
  ngOnInit() {
    this.getAllProduct();
  }
  getAllProduct() {
    this._productService.getProduct(this.productParams).subscribe({
      next: (res: ApplicationResultService<Pagination<ProductResponse>>) => {
        this.products = res.data.data;
        this.totalRecords = res.data.count;
        console.log(res);
        if (res.succeeded) {
          if (
            res.message &&
            res.message.trim() !== 'There Is Products To Show'
          ) {
            this._toastService.showSuccess(res.message!, 'product');
          }
        }
      },
      error: (err) => {
        this._toastService.showError(err.error.message, 'product');
      },
    });
  }

  openNew() {
    this.product = {} as ProductResponse;
    this.submitted = false;
    this.productDialog = true;
  }

  editProduct(id: number) {
    this._productService.getProductDetails(id).subscribe({
      next: (res) => {
        this.product = res.data;
        console.log(this.product);
        this._toastService.showSuccess(res.message!, 'Success');
        this.productDialog = true;
      },
      error: (err) => {
        this._toastService.showError(err.error.message, 'Error');
      },
    });
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
    this.imagePreview = null;
  }

  saveProduct() {
    this.submitted = true;
    if (this.createProductDTO.productName?.trim()) {
      // Update
      if (this.product.id) {
        this._productService.editProduct(this.updateProductDTO).subscribe({
          next: (res) => {
            this._toastService.showSuccess(res.message!, 'Success');
          },
          error: (err) => {
            this._toastService.showError(err.error.message, 'Error');
          },
        });
      } else {
        // Add New Product
        this._productService.addProduct(this.createProductDTO).subscribe({
          next: (res) => {
            this._toastService.showSuccess(res.message!, 'Success');
          },
          error: (err) => {
            this._toastService.showError(err.error.message, 'Error');
          },
        });
      }

      this.products = [...this.products];
      this.productDialog = false;
      this.product = {} as ProductResponse;
    }
  }

  // Delete one product
  deleteProduct(id: number) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        debugger;
        this._productService.deleteProduct(id).subscribe({
          next: (res) => {
            console.log(id);
            this._toastService.showSuccess(res.message!, 'Success');
          },
          error: (err) => {
            this._toastService.showError(err.error.message, 'Error');
          },
        });
      },
    });
  }

  // Delete selected products
  deleteSelectedProducts() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected products?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this._productService.deleteBulk(this.selectedProducts!).subscribe({
          next: (res) => {
            this._toastService.showSuccess(res.message!, 'Success');
          },
          error: (err) => {
            this._toastService.showError(err.error.message, 'Error');
          },
        });
      },
    });
  }

  getSeverity(status: string) {
    switch (status) {
      case 'In Stock':
        return 'success';
      case 'Low Stock':
        return 'warning';
      case 'Out Of Stock':
        return 'danger';
    }
    return 'info';
  }

  // Select Image
  OnImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.product.mainImage = file; // Send to API
      const reader = new FileReader(); // To Preview Image
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  // Pagination
  onPageChange(event: any) {
    this.productParams.pageIndex = event.first + 1;
    this.productParams.pageSize = event.rows;
    this.getAllProduct();
  }
}
