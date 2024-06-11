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

  showModal: boolean = false;
  modalMessage: string = ""
  orderToRemove: null | number = -1;

  productAndVendors: Product[] = [];
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
      this.productAndVendors = state.productVendors;
      this.isLoading = state.isLoading;
    })

    this.org = this.cookieService.getOrg();
    this.user = this.cookieService.getUser();

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
    console.log(index);
    const selectedProduct = this.dynamicForm.get(`OrderFormArray.${index}.product`)?.value;
    if (selectedProduct) {
      const productIndex = this.productAndVendors.findIndex(pv => pv.item._id === selectedProduct);
      this.selectedProductVendors[index] = this.productAndVendors[productIndex].vendors;
    } else {
      this.dynamicForm.get(`OrderFormArray.${index}.vendor`)?.setValue("");
      this.selectedProductVendors[index] = [];
      this.dynamicForm.get(`OrderFormArray.${index}.quantity`)?.setValue(0);
    }
  }

  removeProduct(index: number) {
    if (!this.OrderFormArray.at(index).dirty) {
      this.OrderFormArray.removeAt(index);
      return;
    }
    this.modalMessage = "Are you sure you want to delete this order? This action cannot be undone."
    this.orderToRemove = index;
    this.toggleModal();
  }

  removeAll() {
    this.modalMessage = "Are you sure you want to delete all of the orders? This action cannot be undone."
    this.orderToRemove = -1;
    this.toggleModal();
  }

  onConfirmDelete() {
    if (this.orderToRemove === -1) {
      if (this.OrderFormArray.length) {
        this.OrderFormArray.clear();
        this.selectedProductVendors = [];
      }
    }
    if (this.orderToRemove !== null) {
      this.OrderFormArray.removeAt(this.orderToRemove);
      this.selectedProductVendors.splice(this.orderToRemove, 1);
    }
    this.orderToRemove = -2;

    this.toggleModal();
  }

  placeOrder() {
    if (!this.OrderFormArray.length) {
      this.toastr.error("Please add at least one order!")
      return;
    }
    if (!this.OrderFormArray.valid) {
      this.toastr.error("All fields are required & quantity must be between 1-999");
      return;
    }

    const cart: CartItem[] = this.OrderFormArray.value.map((orderForm: OrderForm) => {
      const cartItem: CartItem = {
        item: { _id: "", name: "", categoryId: "" },
        vendor: orderForm.vendor,
        quantity: orderForm.quantity,
      };

      cartItem.item = this.productAndVendors.filter((product) => {
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

  toggleModal() {
    this.showModal = !this.showModal;
  }

  ngOnDestroy(): void {
    this.destroySubject.next();
    this.destroySubject.complete();
  }
}
