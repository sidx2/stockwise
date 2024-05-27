import { Component, Input, Output, OnInit, OnDestroy, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ImageService } from '../../../Services/image.service';
import { Category } from '../../../../category-module/models/category';
import { Item } from '../../../models/inventory';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-inventory-form',
  templateUrl: './inventory-form.component.html',
  styleUrls: ['./inventory-form.component.scss']
})
export class InventoryFormComponent implements OnInit, OnDestroy {

  @Input() categories: Category[] | null = null;
  @Input() updateItemCategory: Category | null = null;
  @Input() selectedItem: Item | null = null;

  @Output() createItemEmmiter: EventEmitter<Item> = new EventEmitter();
  @Output() createMultipleItemEmmiter: EventEmitter<Item> = new EventEmitter();
  @Output() updateItemEmmiter: EventEmitter<Item> = new EventEmitter();

  selectedCategory: Category | null = null;
  isEditMode: boolean = false;

  itemFormGroup: FormGroup = new FormGroup({});
  imageS3Key: string = '';

  private destroy$ = new Subject<void>();

  constructor(private imageService: ImageService, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.itemFormGroup = new FormGroup({
      name: new FormControl('', Validators.required),
      customFields: new FormArray([]),
    });

    if (this.selectedItem !== null) {
      this.isEditMode = true;
      this.selectedCategory = this.updateItemCategory;
      this.setFormValues(this.selectedItem);
    } else {
      this.itemFormGroup.addControl('category', new FormControl(null, Validators.required));
      this.itemFormGroup.addControl('itemImage', new FormControl(null));
      this.itemFormGroup.reset();
    }

    this.itemFormGroup.get('category')?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((value: Category) => {
        this.selectedCategory = value;
        this.onCategoryChange();
      });

  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  setFormValues(item: Item): void {
    this.itemFormGroup.patchValue({
      name: item.name,
      itemImage: item.itemImage,
    });

    if (this.selectedCategory?.identificationType === 'unique') {
      this.itemFormGroup.addControl('serialNumber', new FormControl(item?.serialNumber, Validators.required));
    } else if (this.selectedCategory?.identificationType === 'non-unique') {
      this.itemFormGroup.addControl('quantity', new FormControl(item?.quantity, Validators.required));
    }

    const customFieldsArray = this.itemFormGroup.get('customFields') as FormArray;
    customFieldsArray.clear();

    for (let customField of this.selectedCategory?.customFields || []) {
      const initialValue = item.customFieldsData?.[customField.label] || '';
      const control = new FormControl(initialValue, customField.required ? Validators.required : null);
      customFieldsArray.push(control);
    }
  }

  onCategoryChange(): void {
    if (this.selectedCategory) {
      const customFieldsArray = this.itemFormGroup.get('customFields') as FormArray;
      customFieldsArray.clear();

      for (let customField of this.selectedCategory.customFields) {
        const control = new FormControl('', customField.required ? Validators.required : null);
        customFieldsArray.push(control);
      }
      this.addAdditionalFields();

      if (this.selectedCategory.identificationType === 'unique') {
        this.itemFormGroup.addControl('operationType', new FormControl('single', Validators.required));
      } else {
        this.itemFormGroup.removeControl('operationType');
      }
    }
  }

  addAdditionalFields(): void {
    if (this.selectedCategory?.identificationType === 'unique') {
      this.itemFormGroup.addControl('serialNumber', new FormControl('', Validators.required));
    } else if (this.selectedCategory?.identificationType === 'non-unique') {
      this.itemFormGroup.addControl('quantity', new FormControl('', Validators.required));
    }
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    this.itemFormGroup.patchValue({
      itemImage: file
    });
  }

  onSubmit(): void {
    if (this.itemFormGroup.valid) {
      const fileInput = this.itemFormGroup.get('itemImage');
      if (fileInput && fileInput.value) {
        const file: File = fileInput.value;
        this.uploadAndSubmitForm(file);
      } else {
        this.submitForm();
      }
    }
  }

  uploadAndSubmitForm(file: File): void {
    this.imageService.uploadImage(file).subscribe(
      (result) => {
        this.imageS3Key = typeof result === 'string' ? result : result.key;
        this.submitForm();
      },
      (error) => {
        console.error("Image upload error:", error);
      }
    );
  }

  submitForm(): void {
    const formData = this.itemFormGroup.value;

    const customFieldsData: Record<string, any> = {};
    formData.customFields.forEach((value: any, index: number) => {
      const customField = this.selectedCategory?.customFields[index];
      if (customField) {
        customFieldsData[customField.label] = value;
      }
    });

    let newItem: Item = {
      name: formData.name,
      identificationType: this.selectedCategory?.identificationType || 'unique',
      categoryId: this.selectedCategory?._id || '',
      orgId: '',
      customFieldsData: customFieldsData,
      quantity: formData.quantity || 1,
      serialNumber: formData.serialNumber || '',
      assignedTo: [],
      checkedOutQuantity: this.selectedItem?.checkedOutQuantity || 0,
    };

    if (this.isEditMode) {
      newItem._id = this.selectedItem?._id;
      this.updateItemEmmiter.emit(newItem);

    } else {
      newItem.itemImage = this.imageS3Key;

      if (this.itemFormGroup.get('operationType')) {
        const operationTypeValue = this.itemFormGroup.get('operationType')?.value;

        if (operationTypeValue === 'single') {
          this.createItemEmmiter.emit(newItem);
        }else{
          this.createMultipleItemEmmiter.emit(newItem);
        }
      } else {
        this.createItemEmmiter.emit(newItem);
      }
    }
  }
}