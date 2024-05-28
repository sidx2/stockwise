import { Component, OnDestroy } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { getProductVendorsRequest, placeOrderRequest } from '../../../store/order.actions';
import { productVendorsStateSelector } from '../../../store/order.selectors';
import { Subject, takeUntil } from 'rxjs';
import { IOrderState } from '../../../models/order';
import { IPlaceOrder, OrderForm, Product } from '../../../models/order';
import { Vendor } from '../../../../vendors-module/models/vendor';
import { CartItem } from '../../../../order-history-module/models/order-history';
import { Org, User } from '../../../../../models/global';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from '../../../../../services/cookie.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent implements OnDestroy {
  dynamicForm: FormGroup;
  org!: Org;
  user!: User;
  isLoading: boolean = false;
  destroySubject = new Subject<void>();

  productVendors: Product[] = [];
  selectedProductVendors: Partial<Vendor>[][] = [];

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<{ order: IOrderState }>,
    private toastr: ToastrService,
    private cookieService: CookieService,
  ) {
    this.store.select(productVendorsStateSelector).pipe(
      takeUntil(this.destroySubject),
    ).subscribe((state) => {
      this.productVendors = state.productVendors;
      this.isLoading = state.isLoading;
    })

    this.org = JSON.parse(this.cookieService.get("org")!)
    this.user = JSON.parse(this.cookieService.get("user")!)

    this.dynamicForm = this.formBuilder.group({
      OrderFormArray: this.formBuilder.array([])
    })

    this.store.dispatch(getProductVendorsRequest())
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
    const productIndex = this.productVendors.findIndex(pv => pv.item._id === selectedProduct);
    this.selectedProductVendors[index] = this.productVendors[productIndex].vendors;
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
      this.toastr.error("Please add at least one order!")
      return;
    }
    if (!this.OrderFormArray.valid) {
      this.toastr.error("All fields are required & quantity must be between 1-999")
    }

    const cart: CartItem[] = this.OrderFormArray.value.map((orderForm: OrderForm) => {
      const cartItem: CartItem = {
        item: { _id: "", name: "", categoryId: "" },
        vendor: orderForm.vendor,
        quantity: orderForm.quantity,
      };

      cartItem.item = this.productVendors.filter((product) => {
        return product.item._id == orderForm.product
      })[0].item;
      return cartItem;
    })

    const order: IPlaceOrder = {
      org: { _id: this.org._id },
      admin: {
        _id: this.user._id,
        name: this.user.name
      },
      cart,
    }

    this.store.dispatch(placeOrderRequest({ order }))

    this.cleanForms();
  }

  cleanForms() {
    this.OrderFormArray.clear();
    this.selectedProductVendors = [];
  }

  ngOnDestroy(): void {
    this.destroySubject.next();
    this.destroySubject.complete();
  }
}
