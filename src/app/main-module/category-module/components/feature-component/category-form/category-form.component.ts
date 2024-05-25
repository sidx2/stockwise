import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Category, CustomField } from '../../../models/category';
import { Store } from '@ngrx/store';
import { fetchVendorsRequest } from '../../../../vendors-module/store/vendor.actions';
import { Observable } from 'rxjs';
import { vendorsSelector } from '../../../../vendors-module/store/vendor.selectors';
import { IVendorsState } from '../../../../vendors-module/store/vendor.reducers';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {

  @Output() createCategoryEmmiter: EventEmitter<Category> = new EventEmitter();
  @Output() updateCategoryEmmiter: EventEmitter<Category> = new EventEmitter();

  @Input() selectedCategory: Category | null = null;

  categoryFormGroup: FormGroup = new FormGroup({});
  isEditMode: boolean = false;

  vendors$!: Observable<any[]>; 

  constructor(private store: Store<{ vendors: IVendorsState }>) {
    this.store.dispatch(fetchVendorsRequest());
    this.vendors$ = this.store.select(vendorsSelector);
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

    this.vendors$.subscribe((vendors: any) => {
      const selectedVendors = category.vendors?.map((vendorId: any) => {
        const vendor = vendors.find((vendor: any) => vendor?._id === vendorId);
        return { _id: vendor?._id, name: vendor?.name }; 
      });
      this.categoryFormGroup.patchValue({
        selectedVendors: selectedVendors
      });
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


  onSubmit() {
    if (this.categoryFormGroup.valid) {

      console.log(this.categoryFormGroup.value);
      const formData = this.categoryFormGroup.value;

      const selectedVendorsId =  this.categoryFormGroup.get('selectedVendors')?.value?.map((vendor: any) => vendor._id);

      if (!this.isEditMode) {
        this.createCategoryEmmiter.emit({...formData, vendors: selectedVendorsId});
      } else {
        this.updateCategoryEmmiter.emit({
          ...formData,
          _id: this.selectedCategory?._id,
          orgId: this.selectedCategory?.orgId,
          vendors: selectedVendorsId,
        });
      }
    } 
  }
}
