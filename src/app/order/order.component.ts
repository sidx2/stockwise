import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { getProductVendorsRequest, placeOrderRequest, placeOrderSuccess } from './store/order.actions';
import { productVendorsSelector } from './store/order.selectors';
import { orgSelector, userSelector } from '../store/global.selectors';
import { map, switchMap, tap } from 'rxjs';
import { Actions, ofType } from '@ngrx/effects';


export interface Vendor {
  _id: string,
  item: any,
  vendors: any
}

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent {
  dynamicForm: FormGroup;
  store = inject(Store<{ order: any, global: any }>);
  org: any
  user: any
  items: any
  action$ = inject(Actions)

  products: Vendor[] = [];
  selectedProductVendors: any[][] = [];

  constructor(private formBuilder: FormBuilder) {
    this.store.select(orgSelector).subscribe((org) => { this.org = org; })
    this.store.select(userSelector).subscribe((user) => { this.user = user; })

    this.dynamicForm = this.formBuilder.group({
      formDataArray: this.formBuilder.array([])
    })

    this.store.dispatch(getProductVendorsRequest())
    this.store.select(productVendorsSelector).subscribe((pv) => {
      this.products = pv;
    })

    this.action$.pipe(
      ofType(placeOrderSuccess),
      tap((order) => {
        alert("Order placed successfully!")
      }
      )
    )
  }

  get formDataArray() {
    return this.dynamicForm.get('formDataArray') as FormArray;
  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      product: '',
      vendor: '',
      quantity: 0
    });
  }

  addFormData() {
    this.formDataArray.push(this.createFormGroup());
    this.selectedProductVendors.push(this.products[0].vendors);
  }

  onProductChange(index: number) {
    const selectedProduct = this.dynamicForm.get(`formDataArray.${index}.product`)?.value;
    const productIndex = this.products.findIndex(product => product.item._id === selectedProduct);
    this.selectedProductVendors[index] = this.products[productIndex].vendors;
  }

  removeProduct(index: number) {
    this.formDataArray.removeAt(index);
    this.selectedProductVendors.splice(index, 1);
  }

  removeAll() {
    this.formDataArray.clear();
    this.selectedProductVendors = [];
  }

  placeOrder() {
    const objectifiedVendors = this.formDataArray.value.map((a: any) => {
      const o = a;
      o.vendor = JSON.parse(o.vendor);
      o.item = this.products.filter((p) => {
        return p.item._id == o.product
      })[0].item;
      delete o.product
      return o;
    })


    const order = {
      org: this.org,
      admin: this.user,
      cart: objectifiedVendors
    }

    console.log("order: ", order);

    this.store.dispatch(placeOrderRequest(order))
  }

  JSONStringify(obj: Object) {
    return JSON.stringify(obj);
  }

  onQuantityChange(e: any, i: any) {
    const newValue = e.target.value;
    const formGroup = this.formDataArray.at(i) as FormGroup;
    formGroup.get('quantity')?.setValue(newValue);
    this.removeAll();
  }
}
