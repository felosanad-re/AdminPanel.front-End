import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ShowDataModule } from '../../../Core/shared/modules/show-data.module';

@Component({
  selector: 'app-show-details',
  standalone: true,
  imports: [ShowDataModule],
  templateUrl: './show-details.component.html',
  styleUrl: './show-details.component.scss',
})
export class ShowDetailsComponent {
  @Input({ required: true }) config!: {
    type: string; // brand - category
    fieldName: string; // categoryName - brandName
    imageFieldName: string; // image - logo
    descriptionFieldName: string; // description
  };
  @Input({ required: true }) title!: string;
  @Input({ required: true }) data!: any; // Data type [Category - brand]
  @Input({ required: true }) allData!: any[];
  @Input({ required: true }) imagePreview!: string | null;
  @Input({ required: true }) submitted!: boolean;
  @Input({ required: true }) selectedData!: any[];
  @Input({ required: true }) dataDialog: boolean = false;
  @Output() openNew = new EventEmitter();
  @Output() hideDialog = new EventEmitter();
  @Output() editData = new EventEmitter();
  @Output() deleteData = new EventEmitter();
  @Output() onImageSelected = new EventEmitter();
  @Output() saveData = new EventEmitter();
}
