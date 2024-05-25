import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { getProductVendorsRequest, placeOrderRequest, placeOrderSuccess } from '../../../store/order.actions';
import { productVendorsSelector } from '../../../store/order.selectors';
import { orgSelector } from '../../../../../store/global.selectors';
import { userSelector } from '../../../../../store/global.selectors';
import { tap } from 'rxjs';
import { Actions, ofType } from '@ngrx/effects';
import { IOrderState } from '../../../store/order.reducers';
import { IPlaceOrder, OrderForm, Product } from '../../../models/order';
import { Vendor } from '../../../../vendors-module/store/vendor.reducers';
import { CartItem } from '../../../../order-history-module/models/order-history';
import { IGlobalState, Org, User } from '../../../../../models/global';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent {
  dynamicForm: FormGroup;
  org!: Org
  user!: User

  products: Product[] = [];
  selectedProductVendors: Vendor[][] = [];

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<{ order: IOrderState, global: IGlobalState }>,
    private actions$: Actions,
  ) {
    this.store.select(orgSelector).subscribe((org) => { this.org = org; })
    this.store.select(userSelector).subscribe((user) => { this.user = user; })

    this.dynamicForm = this.formBuilder.group({
      OrderFormArray: this.formBuilder.array([])
    })

    this.store.dispatch(getProductVendorsRequest())
    this.store.select(productVendorsSelector).subscribe((pv) => {
      this.products = pv;
    })

    this.actions$.pipe(
      ofType(placeOrderSuccess),
      tap((order) => {
        alert("Order placed successfully!");
      })
    )
  }

  get OrderFormArray() {
    return this.dynamicForm.get('OrderFormArray') as FormArray;
  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      product: ['', Validators.required],
      vendor: ['', Validators.required],
      quantity: [0, [Validators.required, Validators.min(1), Validators.max(999)]],
    });
  }

  addFormData() {
    this.OrderFormArray.push(this.createFormGroup());
  }

  onProductChange(index: number) {
    const selectedProduct = this.dynamicForm.get(`OrderFormArray.${index}.product`)?.value;
    const productIndex = this.products.findIndex(product => product.item._id === selectedProduct);
    this.selectedProductVendors[index] = this.products[productIndex].vendors;

    console.log("selectedProductVendors:", this.selectedProductVendors);
  }

  removeProduct(index: number) {
    if (confirm("Are you sure want to remove this order?")) {
      this.OrderFormArray.removeAt(index);
      this.selectedProductVendors.splice(index, 1);
    }
  }

  removeAll() {
    if (confirm("Are you sure want to remove all orders?")) {
      this.OrderFormArray.clear();
      this.selectedProductVendors = [];
    }
  }

  placeOrder() {
    if (!this.OrderFormArray.length) {
      alert("Please add at least one order!");
      return;
    }
    if (!this.OrderFormArray.valid) {
      alert("All fields are required! and quantity should be between 1 and 999");
      return;
    }

    const cart: CartItem[] = this.OrderFormArray.value.map((orderForm: OrderForm) => {
      const cartItem: CartItem = { 
        item: { _id: "", name: "", categoryId: "" },
        vendor: orderForm.vendor,
        quantity: orderForm.quantity,
      };

      cartItem.item = this.products.filter((product) => {
        return product.item._id == orderForm.product
      })[0].item;
      return cartItem;
    })

    const order: IPlaceOrder = {
      org: { _id: this.org._id },
      admin: { 
        _id: this.user._id, 
        name: this.user.name },
      cart,
    }

    this.store.dispatch(placeOrderRequest({ order }))

    this.cleanForms();
    alert("Your Order was placed! You can check them in history")
  }

  cleanForms() {
    this.OrderFormArray.clear();
    this.selectedProductVendors = [];
  }
}
