import { CategoryResponse } from './../../../Core/Interfaces/Categories/category-response';
import { UpdatedCategory } from './../../../Core/Interfaces/Categories/updated-category';
import { Component } from '@angular/core';
import { CategoryService } from '../../../Core/Services/AdminServices/category.service';
import { ApplicationResultService } from '../../../Core/Interfaces/application-result-service';
import { ShowDataModule } from '../../../Core/shared/modules/show-data.module';
import { ConfirmationService } from 'primeng/api';
import { ToastService } from '../../../Core/Services/Toast.service';
import { CreatedCategory } from '../../../Core/Interfaces/Categories/created-category';
import { ShowDetailsComponent } from '../../shared/show-details/show-details.component';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [ShowDataModule, ShowDetailsComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
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
export class CategoriesComponent {
  title = 'Categories';
  categoryDialog: boolean = false;
  categories!: CategoryResponse[];
  category!: CategoryResponse;
  createdCategory!: CreatedCategory;
  updatedCategory!: UpdatedCategory;
  selectedCategory!: CategoryResponse[];
  submitted: boolean = false;
  imagePreview!: string | null;
  imageUpload!: File | null;
  constructor(
    private readonly _categoryService: CategoryService,
    private readonly _toastService: ToastService,
    private readonly confirmationService: ConfirmationService,
  ) {}

  ngOnInit() {
    this.getAllCategories();
  }

  getAllCategories() {
    this._categoryService.getCategories().subscribe({
      next: (res: ApplicationResultService<CategoryResponse[]>) => {
        this.categories = res.data;
      },
    });
  }

  // open dialog
  openNew() {
    this.category = {} as CategoryResponse;
    this.imagePreview = null;
    this.submitted = false;
    this._toastService.showSuccess('you can add new category', 'Success');
    this.categoryDialog = true;
  }

  hideDialog() {
    this.categoryDialog = false;
    this.submitted = false;
    this.imagePreview = null;
  }

  // Edit Category
  editCategory(category: CategoryResponse) {
    this._categoryService.getCategoryDetails(category.id).subscribe({
      next: (res: ApplicationResultService<CategoryResponse>) => {
        this.category = res.data;
        this._toastService.showSuccess(res.message!, 'Success');
        this.categoryDialog = true;
      },
    });
  }

  // Delete Category
  deleteCategory(category: CategoryResponse) {
    this.category = { ...category };
    this.confirmationService.confirm({
      message:
        'Are you sure you want to delete ' + this.category.categoryName + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this._categoryService.deleteCategory(category.id).subscribe({
          next: (res: ApplicationResultService<boolean>) => {
            if (res.succeeded) {
              this._toastService.showSuccess(res.message!, 'Success');
              this.getAllCategories();
            }
          },
        });
      },
    });
  }

  // save changes
  saveCategory() {
    this.submitted = true;
    // edit
    if (this.category.id) {
      const category: UpdatedCategory = {
        id: this.category.id,
        categoryName: this.category.categoryName,
        description: this.category.description!,
        image: this.imageUpload!,
      };
      this._categoryService.updateCategory(category).subscribe({
        next: (res: ApplicationResultService<CategoryResponse>) => {
          this._toastService.showSuccess(res.message!, 'Success');
          this.getAllCategories();
        },
        error: (err: ApplicationResultService<CategoryResponse>) => {
          this._toastService.showError(err.message!, 'Error');
        },
      });
    } else {
      const category: CreatedCategory = {
        categoryName: this.category.categoryName,
        description: this.category.description!,
        image: this.imageUpload!,
      };

      this._categoryService.addCategory(category).subscribe({
        next: (res: ApplicationResultService<CategoryResponse>) => {
          if (res.succeeded) {
            this._toastService.showSuccess(res.message!, 'Success');
            this.getAllCategories();
          }
        },
      });
    }
    this.categories = [...this.categories];
    this.categoryDialog = false;
    this.category = {} as CategoryResponse;
  }

  // Select Image
  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.imageUpload = file;
      const reader = new FileReader(); // To Preview Image
      reader.onload = () => {
        this.imagePreview = reader.result as string; // Preview
      };
      reader.readAsDataURL(file);
    }
  }
}
