import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent {
  dynamicForm: FormGroup;
  products = [
    { name: 'Product A', vendors: ['Vendor A1', 'Vendor A2'] },
    { name: 'Product B', vendors: ['Vendor B1', 'Vendor B2', 'Vendor B3'] },
  ];
  selectedProductVendors: string[][] = [];

  constructor(private formBuilder: FormBuilder) {
    this.dynamicForm = this.formBuilder.group({
      formDataArray: this.formBuilder.array([this.createFormGroup()])
    });
 
    this.selectedProductVendors.push(this.products[0].vendors);

   }

  ngOnInit() {
  }

  get formDataArray() {
    return this.dynamicForm.get('formDataArray') as FormArray;
  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      product: this.products[0].name,
      vendor: ''
    });
  }

  addFormData() {
    this.formDataArray.push(this.createFormGroup());
    this.selectedProductVendors.push(this.products[0].vendors);
  }

  onProductChange(index: number) {
    const selectedProduct = this.dynamicForm.get(`formDataArray.${index}.product`)?.value;
    const productIndex = this.products.findIndex(product => product.name === selectedProduct);
    this.selectedProductVendors[index] = this.products[productIndex].vendors;
  }
}
