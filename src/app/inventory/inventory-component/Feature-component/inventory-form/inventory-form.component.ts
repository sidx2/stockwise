import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Category, CustomField } from '../../../../category/models/category';
import { Item } from '../../../models/inventory';

@Component({
  selector: 'app-inventory-form',
  templateUrl: './inventory-form.component.html',
  styleUrls: ['./inventory-form.component.scss']
})
export class InventoryFormComponent implements OnInit {

  @Input() categories: Category[] | null = null;
  @Input() updateItemCategory: Category | null = null;
  @Input() selectedItem: Item | null = null;

  @Output() createItemEmmiter: EventEmitter<Item> = new EventEmitter();
  @Output() updateItemEmmiter: EventEmitter<Item> = new EventEmitter();

  selectedCategory: Category | null = null;
  isEditMode: boolean = false;

  itemFormGroup: FormGroup = new FormGroup({});

  constructor() {
  }

  ngOnInit(): void {
    this.itemFormGroup = new FormGroup({
      name: new FormControl('', Validators.required),
      itemImage: new FormControl('', Validators.required),
      customFields: new FormArray([])
    })

    if (this.selectedItem !== null) {
      this.isEditMode = true;
      this.selectedCategory = this.updateItemCategory;
      this.setFormValues(this.selectedItem);

    } else {
      this.itemFormGroup.reset();
    }
  }

  setFormValues(item: Item): void {
    this.itemFormGroup.patchValue({
      name: item.name,
      itemImage: item.itemImage,
    });

    // adding conditional fields
    if (this.selectedCategory?.identificationType === 'unique') {
      this.itemFormGroup.addControl('serialNumber', new FormControl(item?.serialNumber, Validators.required));

    } else if (this.selectedCategory?.identificationType === 'non-unique') {
      this.itemFormGroup.addControl('quantity', new FormControl(item?.quantity, Validators.required));
    }

    // Set custom fields values
    const customFieldsArray = this.itemFormGroup.get('customFields') as FormArray;
    customFieldsArray.clear();

    // Iterate through the selected category's custom fields
    for (let customField of this.selectedCategory?.customFields || []) {
      const initialValue = item.customFieldsData?.[customField.label] || '';
      const control = new FormControl(initialValue, customField.required ? Validators.required : null);
      customFieldsArray.push(control);
    }
    console.log("ItemformGroup on update", this.itemFormGroup)
  }

  onCategoryChange() {
    if (this.selectedCategory) {
      console.log("category selected", this.selectedCategory)
      const customFieldsArray = this.itemFormGroup.get('customFields') as FormArray;
      customFieldsArray.clear();

      for (let customField of this.selectedCategory.customFields) {
        const control = new FormControl('', customField.required ? Validators.required : null);
        customFieldsArray.push(control);
      }

      this.addAdditionalFields();

      console.log("Based on category selection", this.itemFormGroup);
    }
  }

  addAdditionalFields(): void {
    if (this.selectedCategory?.identificationType === 'unique') {

      this.itemFormGroup.addControl('serialNumber', new FormControl('', Validators.required));

    } else if (this.selectedCategory?.identificationType === 'non-unique') {
      this.itemFormGroup.addControl('quantity', new FormControl('', [Validators.required],));
    }
  }

  onSubmit(): void {

    if (this.itemFormGroup.valid) {
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
        itemImage: formData.itemImage,
        lifecycle: []
      };

      if (this.isEditMode) {
        newItem._id = this.selectedItem?._id;
        this.updateItemEmmiter.emit(newItem);
      } else {
        this.createItemEmmiter.emit(newItem);
      }
    }
  }
}
