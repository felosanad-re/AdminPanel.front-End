import { Component } from '@angular/core';
import { BrandResponse } from '../../../Core/Interfaces/Brands/brand-response';
import { ToastService } from '../../../Core/Services/Toast.service';
import { BrandService } from '../../../Core/Services/AdminServices/brand.service';
import { ApplicationResultService } from '../../../Core/Interfaces/application-result-service';
import { ShowDataModule } from '../../../Core/shared/modules/show-data.module';
import { CreatedBrand } from '../../../Core/Interfaces/Brands/created-brand';
import { UpdatedBrand } from '../../../Core/Interfaces/Brands/updated-brand';
import { ConfirmationService } from 'primeng/api';
import { ShowDetailsComponent } from '../../shared/show-details/show-details.component';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [ShowDataModule, ShowDetailsComponent],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss',
  styles: [
    `
      :host ::ng-deep .p-dialog .product-image {
        width: 150px;
        margin: 0 auto 2rem auto;
        display: block;
      }
    `,
  ],
  providers: [ConfirmationService],
})
export class BrandsComponent {
  title = 'Brands';
  brandDialog: boolean = false;
  brands!: BrandResponse[];
  brand!: BrandResponse;
  selectedBrands: BrandResponse[] = [];
  createdBrand!: CreatedBrand;
  updatedBrand!: UpdatedBrand;
  submitted: boolean = false;
  imagePreview!: string | null;
  logoUpload!: File | null;
  constructor(
    private readonly _brandService: BrandService,
    private readonly _toastService: ToastService,
    private readonly confirmationService: ConfirmationService,
  ) {}

  ngOnInit() {
    this.getAllBrands();
  }

  getAllBrands() {
    this._brandService.getBrands().subscribe({
      next: (res: ApplicationResultService<BrandResponse[]>) => {
        this.brands = res.data;
      },
    });
  }

  // open dialog
  openNew() {
    this.brand = {} as BrandResponse;
    this.imagePreview = null;
    this.submitted = false;
    this._toastService.showSuccess('you can add new brand', 'Success');
    this.brandDialog = true;
  }

  hideDialog() {
    this.brandDialog = false;
    this.submitted = false;
    this.imagePreview = null;
  }

  // Edit brand
  editBrand(brand: BrandResponse) {
    this._brandService.getBrandDetails(brand.id).subscribe({
      next: (res: ApplicationResultService<BrandResponse>) => {
        this.brand = res.data;
        this._toastService.showSuccess(res.message!, 'Success');
        this.brandDialog = true;
      },
    });
  }

  // Delete brand
  deleteBrand(brand: BrandResponse) {
    this.brand = { ...brand };
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + this.brand.brandName + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this._brandService.deleteBrand(brand.id).subscribe({
          next: (res: ApplicationResultService<boolean>) => {
            if (res.succeeded) {
              this._toastService.showSuccess(res.message!, 'Success');
              this.getAllBrands();
            }
          },
        });
      },
    });
  }

  // save changes
  saveBrand() {
    this.submitted = true;
    // edit
    if (this.brand.id) {
      const brand: UpdatedBrand = {
        id: this.brand.id,
        brandName: this.brand.brandName,
        description: this.brand.description!,
        logo: this.logoUpload!,
      };
      this._brandService.updateBrand(brand).subscribe({
        next: (res: ApplicationResultService<BrandResponse>) => {
          this._toastService.showSuccess(res.message!, 'Success');
          this.getAllBrands();
        },
        error: (err: ApplicationResultService<BrandResponse>) => {
          this._toastService.showError(err.message!, 'Error');
        },
      });
    } else {
      const brand: CreatedBrand = {
        brandName: this.brand.brandName,
        description: this.brand.description!,
        logo: this.logoUpload!,
      };

      this._brandService.addBrand(brand).subscribe({
        next: (res: ApplicationResultService<BrandResponse>) => {
          this._toastService.showSuccess(res.message!, 'Success');
          this.getAllBrands();
        },
      });
    }
    this.brands = [...this.brands];
    this.brandDialog = false;
    this.brand = {} as BrandResponse;
  }

  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.logoUpload = file; // Send to API
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string; // to preview
      };
      reader.readAsDataURL(file);
    }
  }
}
