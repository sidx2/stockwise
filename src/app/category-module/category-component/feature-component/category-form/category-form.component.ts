import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Category, CustomField } from '../../../models/category';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {

  @Output() createCategoryEmmiter: EventEmitter<Category> = new EventEmitter();
  @Output() updateCategoryEmmiter: EventEmitter<Category> = new EventEmitter();

  @Input() selectedCategory: Category | null = null;

  categoryFormGroup: FormGroup = new FormGroup({})

  isEditMode: boolean = false;

  ngOnInit(): void {
    this.categoryFormGroup = new FormGroup({
      name: new FormControl('', Validators.required),
      identificationType: new FormControl('', Validators.required),
      customFields: new FormArray([])
    });
       
    if(this.selectedCategory !== null) {
      this.isEditMode = true;
      this.setFormValues(this.selectedCategory);
    } else {
      this.resetForm()
    }
  }

  setFormValues(category: Category): void {
    this.categoryFormGroup.patchValue({
      name: category.name,
      identificationType: category.identificationType,
    });

    while (this.customFields.length !== 0) {
      this.customFields.removeAt(0);
    }

    if (category.customFields && category.customFields.length > 0) {
      category.customFields.forEach((field: CustomField) => {
        this.customFields.push(this.createCustomField(field.label, field.type, field.required));
      });
    }
  }

  resetForm() {
    this.categoryFormGroup.reset();
  }

  get customFields() {
    return this.categoryFormGroup.get('customFields') as FormArray;
  }

  addCustomField() {
    this.customFields.push(this.createCustomField('', '', false));
  }

  removeCustomField(index: number) {
    this.customFields.removeAt(index);
  }

  createCustomField(label: string, type: string, required: boolean) {
    return new FormGroup({
      label: new FormControl(label, Validators.required),
      type: new FormControl(type, [Validators.required, Validators.pattern(/^(date|number|text)$/)]),
      required: new FormControl(required)
    });
  }


  onSubmit() {
    if (this.categoryFormGroup.valid) {

      console.log(this.categoryFormGroup.value);
      const formData = this.categoryFormGroup.value;

      if (!this.isEditMode) {
        this.createCategoryEmmiter.emit(formData);
      } else {
        this.updateCategoryEmmiter.emit({
          ...formData,
          _id: this.selectedCategory?._id,
          orgId: this.selectedCategory?.orgId,
          identificationType: this.selectedCategory?.identificationType,
          numberOfAssets: this.selectedCategory?.numberOfAssets
        });
      }

    } else {

    }
  }
}
