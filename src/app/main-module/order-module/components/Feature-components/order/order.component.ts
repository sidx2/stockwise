import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { getProductVendorsRequest, placeOrderRequest, placeOrderSuccess } from '../../../store/order.actions';
import { productVendorsSelector } from '../../../store/order.selectors';
import { orgSelector } from '../../../../../store/global.selectors';
import { userSelector } from '../../../../../store/global.selectors';
import { tap } from 'rxjs';
import { Actions, ofType } from '@ngrx/effects';
import { IOrderState } from '../../../store/order.reducers';
import { IGlobalState, Org, User } from '../../../../../store/global.reducers';
import { Vendor } from '../../../../vendors-module/store/vendor.reducers';


export interface Product {
  _id: string,
  item: any,
  vendors: Vendor[]
}

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent {
  dynamicForm: FormGroup;
  store = inject(Store<{ order: IOrderState, global: IGlobalState }>);
  org!: Org
  user!: User
  items!: any[]
  action$ = inject(Actions)

  products: Product[] = [];
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
      })
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
    // this.selectedProductVendors.push(this.products[0].vendors);
  }

  onProductChange(index: number) {
    const selectedProduct = this.dynamicForm.get(`formDataArray.${index}.product`)?.value;
    const productIndex = this.products.findIndex(product => product.item._id === selectedProduct);
    this.selectedProductVendors[index] = this.products[productIndex].vendors;
  }

  removeProduct(index: number) {
    if (confirm("Are you sure want to remove this order?")) {
      this.formDataArray.removeAt(index);
      this.selectedProductVendors.splice(index, 1);
    }
  }

  removeAll() {
    if (confirm("Are you sure want to remove all orders?")) {
      this.formDataArray.clear();
      this.selectedProductVendors = [];
    }
  }


  placeOrder() {
    if (!this.formDataArray.valid) {
      alert("All fields are required!");
      return;
    }
    const objectifiedVendors = this.formDataArray.value.map((formDataElement: any) => {
      const newFormDataElement = formDataElement;
      newFormDataElement.vendor = JSON.parse(newFormDataElement.vendor);
      newFormDataElement.item = this.products.filter((product) => {
        return product.item._id == newFormDataElement.product
      })[0].item;
      delete newFormDataElement.product
      return newFormDataElement;
    })


    const order = {
      org: this.org,
      admin: this.user,
      cart: objectifiedVendors
    }

    console.log("order: ", order);

    this.store.dispatch(placeOrderRequest(order))

    this.cleanForms();
    alert("Your Order was placed! You can check them in history")
  }

  cleanForms() {
    this.formDataArray.clear();
    this.selectedProductVendors = [];
  }

  JSONStringify(obj: Object) {
    return JSON.stringify(obj);
  }

  onQuantityChange(e: any, i: number) {
    const newValue = e.target.value;
    const formGroup = this.formDataArray.at(i) as FormGroup;
    formGroup.get('quantity')?.setValue(newValue);
    this.removeAll();
  }
}
