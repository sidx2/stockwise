import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Category, CustomField } from '../../../models/category';
import { Store } from '@ngrx/store';
import { fetchVendorsRequest } from '../../../../vendors-module/store/vendor.actions';
import { Subject } from 'rxjs';
import { vendorsStateSelector } from '../../../../vendors-module/store/vendor.selectors';
import { IVendorsState, Vendor } from '../../../../vendors-module/models/vendor';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit, OnDestroy {

  @Output() createCategoryEmmiter: EventEmitter<Category> = new EventEmitter();
  @Output() updateCategoryEmmiter: EventEmitter<{updatedCategory: Category, dataChanged: boolean}> = new EventEmitter();

  @Input() selectedCategory: Category | null = null;
  private destroy$ = new Subject<void>();

  categoryFormGroup: FormGroup = new FormGroup({});
  isEditMode: boolean = false;

  vendors!: Vendor[];

  constructor(private store: Store<{ vendors: IVendorsState }>) {
    this.store.dispatch(fetchVendorsRequest());
    this.store.select(vendorsStateSelector).subscribe(state => [
      this.vendors = state.vendors
    ]);
  }

  ngOnInit(): void {
    this.categoryFormGroup = new FormGroup({
      name: new FormControl('', Validators.required),
      identificationType: new FormControl(null, Validators.required),
      customFields: new FormArray([]),
      selectedVendors: new FormControl([])
    });

    if (this.selectedCategory !== null) {
      this.isEditMode = true;
      console.log("selectedCategory ", this.selectedCategory);
      this.setFormValues(this.selectedCategory);
    } else {
      this.resetForm()
    }
  }

  dropdownSettings = {
    singleSelection: false,
    idField: '_id',
    textField: 'name',
    allowSearchFilter: true
  };

  setFormValues(category: Category): void {
    this.categoryFormGroup.patchValue({
      name: category.name,
      identificationType: category.identificationType,
      selectedVendors: category.vendors
    });

    while (this.customFields.length !== 0) {
      this.customFields.removeAt(0);
    }

    if (category.customFields && category.customFields.length > 0) {
      category.customFields.forEach((field: CustomField) => {
        this.customFields.push(this.createCustomField(field.label, field.type, field.required));
      });
    }

    const selectedVendors = category.vendors?.map((vendorId: string) => {
      const vendor = this.vendors.find((vendor: any) => vendor?._id === vendorId);
      return { _id: vendor?._id, name: vendor?.name };
    });
    this.categoryFormGroup.patchValue({
      selectedVendors: selectedVendors
    });
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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSubmit() {
    if (this.categoryFormGroup.valid) {

      console.log(this.categoryFormGroup.value);
      const formData = this.categoryFormGroup.value;

      const selectedVendorsId = this.categoryFormGroup.get('selectedVendors')?.value?.map((vendor: Vendor) => vendor._id);

      if (!this.isEditMode) {
        this.createCategoryEmmiter.emit({ ...formData, vendors: selectedVendorsId });
      } else {
        this.updateCategoryEmmiter.emit({updatedCategory:{
          ...formData,
          _id: this.selectedCategory?._id,
          orgId: this.selectedCategory?.orgId,
          vendors: selectedVendorsId,
        }, dataChanged: this.categoryFormGroup.dirty});
      }
    }
  }
}
