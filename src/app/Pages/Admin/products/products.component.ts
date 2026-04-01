import { provideAnimations } from '@angular/platform-browser/animations';
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
import { TagModule } from 'primeng/tag';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { BrandResponse } from '../../../Core/Interfaces/Brands/brand-response';
import { CategoryResponse } from '../../../Core/Interfaces/Categories/category-response';
import { BrandService } from '../../../Core/Services/AdminServices/brand.service';
import { CategoryService } from '../../../Core/Services/AdminServices/category.service';
import { DropdownModule } from 'primeng/dropdown';
import { ProductImageResponse } from '../../../Core/Interfaces/Products/product-image-response';
import {
  debounce,
  debounceTime,
  distinctUntilChanged,
  Observable,
  switchMap,
  tap,
} from 'rxjs';

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
    TagModule,
    RadioButtonModule,
    InputTextModule,
    FormsModule,
    InputNumberModule,
    ReactiveFormsModule,
    DropdownModule,
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
  products: ProductResponse[] = []; // for show products
  product!: ProductResponse; // For Edit and update
  createProductDTO!: CreateProductDTO;
  updateProductDTO!: UpdateProductDTO;
  imagePreview!: string | null;
  uploadImage!: File | null; // used with create & update [mainImage]
  subImages!: ProductImageResponse[];
  subImagesPreview: string[] = [];
  subImagesUploads: File[] = []; // used with create & update [subImages]
  productParams = new ProductParams();
  productDialog: boolean = false;
  selectedProducts: ProductResponse[] = []; // Ids
  totalRecords: number = 0;
  pageIndex: number = 1;
  pageSize: number = 10;
  brands!: BrandResponse[];
  categories!: CategoryResponse[];
  brandSelectedId: number | null = null;
  categorySelectedId: number | null = null;
  submitted: boolean = false;
  searchValue = new FormControl('');
  products$!: Observable<ApplicationResultService<Pagination<ProductResponse>>>;
  constructor(
    private readonly _productService: ProductService,
    private readonly _toastService: ToastService,
    private readonly confirmationService: ConfirmationService,
    private readonly _brandService: BrandService,
    private readonly _categoryService: CategoryService,
  ) {}
  ngOnInit() {
    this.getAllProduct();

    // Get All Brands
    this._brandService.getBrands().subscribe({
      next: (res: ApplicationResultService<BrandResponse[]>) => {
        this.brands = res.data;
      },
    });

    // Get All Categories
    this._categoryService.getCategories().subscribe({
      next: (res: ApplicationResultService<CategoryResponse[]>) => {
        this.categories = res.data;
      },
    });

    // search
    this.products$ = this.searchValue.valueChanges.pipe(
      debounceTime(350),
      distinctUntilChanged(),
      tap((value) => {
        this.productParams.search = (value || '').trim();
        this.productParams.pageIndex = 1;
      }),
      switchMap(() => {
        console.log('call api with params', this.productParams);
        return this._productService.getProducts(this.productParams);
      }),
    );
  }

  getAllProduct() {
    this._productService.getProducts(this.productParams).subscribe({
      next: (res: ApplicationResultService<Pagination<ProductResponse>>) => {
        this.products = res.data.data;
        this.totalRecords = res.data.count;
        if (res.succeeded) {
          if (
            res.message &&
            res.message.trim() !== 'There Is Products To Show'
          ) {
            this._toastService.showSuccess(res.message!, 'product');
          }
        }
      },
    });
  }

  openNew() {
    this.product = {} as ProductResponse;
    this.submitted = false;
    this.brandSelectedId = null;
    this.categorySelectedId = null;
    this.subImagesPreview = [];
    this.imagePreview = null;
    this.productDialog = true;
  }

  editProduct(id: number) {
    this._productService.getProductDetails(id).subscribe({
      next: (res: ApplicationResultService<ProductResponse>) => {
        this.brandSelectedId = res.data.brandId;
        this.categorySelectedId = res.data.categoryId;
        this.subImagesPreview = res.data.subImages.map((img) => img.imagesUrl);
        this.product = res.data;
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
    // Update
    if (this.product.id) {
      const dto: UpdateProductDTO = {
        id: this.product.id,
        productName: this.product.productName,
        description: this.product.description,
        price: this.product.price,
        brandId: this.brandSelectedId!,
        categoryId: this.categorySelectedId!,
        stock: this.product.stock,
        mainImage: this.uploadImage!,
        subImages: this.subImagesUploads,
      };
      this._productService.editProduct(dto).subscribe({
        next: (res) => {
          this._toastService.showSuccess(res.message!, 'Success');
          this.getAllProduct();
        },
        error: (err) => {
          this._toastService.showError(err.error.message, 'Error');
        },
      });
    } else {
      // Add New Product
      const dto: CreateProductDTO = {
        productName: this.product.productName,
        description: this.product.description,
        brandId: this.brandSelectedId!,
        categoryId: this.categorySelectedId!,
        price: this.product.price,
        stock: this.product.stock,
        mainImage: this.uploadImage!,
        subImages: this.subImagesUploads,
      };
      this._productService.addProduct(dto).subscribe({
        next: (res: ApplicationResultService<ProductResponse>) => {
          this._toastService.showSuccess(res.message!, 'Success');
          this.getAllProduct();
        },
        error: (err: ApplicationResultService<ProductResponse>) => {
          this._toastService.showError(err.message!, 'Error');
        },
      });
    }

    this.products = [...this.products];
    this.productDialog = false;
    this.product = {} as ProductResponse;
  }

  // Delete one product
  deleteProduct(product: ProductResponse) {
    this.product = { ...product };
    this.confirmationService.confirm({
      message:
        'Are you sure you want to delete' +
        this.product.productName +
        'this product?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this._productService.deleteProduct(product.id).subscribe({
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

  // Delete selected products
  deleteSelectedProducts() {
    if (!this.selectedProducts || this.selectedProducts.length === 0) return;
    const ids = this.selectedProducts.map((product) => product.id);
    this.confirmationService.confirm({
      message:
        'Are you sure you want to delete ' +
        this.selectedProducts.length +
        ' products?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this._productService.deleteBulk(ids).subscribe({
          next: (res: ApplicationResultService<ProductResponse>) => {
            console.log(this.selectedProducts);
            console.log(res);
            this._toastService.showSuccess(res.message!, 'Success');
            this.selectedProducts = []; // reset
            this.getAllProduct();
          },
          error: (err: ApplicationResultService<ProductResponse>) => {
            this._toastService.showError(err.message!, 'Error');
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
      this.uploadImage = file; // Send to API
      const reader = new FileReader(); // To Preview Image
      reader.onload = () => {
        this.imagePreview = reader.result as string; // Preview
        this._toastService.showSuccess('Image Added succeeded', 'Success');
      };
      reader.readAsDataURL(file);
    }
  }

  // Select multi photos
  OnSubImagesSelected(event: any) {
    const files: FileList = event.target.files;
    if (!files) return;
    for (let index = 0; index < files.length; index++) {
      if (this.subImagesPreview.length >= 3) break;
      const file = files[index];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.subImagesPreview.push(e.target.result); // To Preview
        this.subImagesUploads.push(file); // To API
        this._toastService.showSuccess(
          'Image Added you can add 3 images only',
          'Success',
        );
      };
      reader.readAsDataURL(file);
    }
  }

  // Replace one Image
  onReplaceImage(index: number) {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e: any) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader(); // To Preview Image
      reader.onload = (ev: any) => {
        this.subImagesPreview[index] = ev.target.result;
        this.subImagesUploads[index] = file;
      };
      reader.readAsDataURL(file);
    };
    input.click();
  }

  // delete Sub Image
  deleteSubImage(index: number) {
    this.subImagesPreview.splice(index, 1);
    this.subImagesUploads.splice(index, 1);
  }

  // Pagination
  onPageChange(event: any) {
    this.productParams.pageIndex = event.first / event.rows + 1;
    this.productParams.pageSize = event.rows;
    if (event.sortField) {
      this.productParams.sort =
        event.sortOrder === 1
          ? event.sortField + 'Asc'
          : event.sortField + 'Desc';
    }
    this.getAllProduct();
  }

  onSearch(value: string) {
    this.productParams.search = value;
    this.getAllProduct();
  }
}
