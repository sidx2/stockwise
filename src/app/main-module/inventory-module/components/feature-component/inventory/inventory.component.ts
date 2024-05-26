import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription, Subject, pipe } from 'rxjs';
import { map, takeUntil, filter, take } from 'rxjs/operators';
import { checkinItemRequest, checkoutItemRequest, createItemRequest, deleteItemRequest, getItemRequest, updateItemRequest, checkoutMailRequest, createItemSuccess, updateItemSuccess, checkoutItemSuccess, clearErrorMessage, deleteItemSuccess, checkintItemSuccess } from '../../../store/inventory.action';
import { Category, CategoryState } from '../../../../category-module/models/category';
import { CheckoutDetails, CheckoutEventData, CheckoutMailDetails, Item } from '../../../models/inventory';
import { InventoryState, CheckinDetails } from '../../../models/inventory';
import { getCategoryRequest } from '../../../../category-module/store/category.action';
import { Actions, ofType } from '@ngrx/effects';
import { IGlobalState } from '../../../../../models/global';
import { Employee } from '../../../../employees-module/models/employee';
import { employeesStateSelector } from '../../../../employees-module/store/employees.selectors';
import { fetchEmployees } from '../../../../employees-module/store/employees.actions';
import { getErrorMessage, getLoading, inventorySelector } from '../../../store/inventory.selector';
import { orgSelector } from '../../../../../store/global.selectors';
import { categorySelector } from '../../../../category-module/store/category.selector';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit, OnDestroy {

  items$: Observable<Item[]>;
  categories$: Observable<Category[]>;
  employees!: Employee[];
  filteredItems$: Observable<Item[]> | null = null;
  destroy$: Subject<void> = new Subject();

  selectedCategory: Category | null = null;
  updateItemCategory: Category | null = null;

  isInventoryFormVisible: boolean = false;
  showDeleteConfirmation: boolean = false;
  itemIdToDelete: string = '';
  selectedItem: Item | null = null;

  isLoading: boolean = false;
  isEditMode: boolean = false;
  showDetailedView: boolean = false;
  showCheckout: boolean = false;
  showCheckin: boolean = false;
  showLifecycle: boolean = false;

  searchText: string = ''
  orgId: string = '';
  orgName: string = '';
  checkoutMailDetails: CheckoutMailDetails | null = null;

  constructor(private store: Store<{ global: IGlobalState, inventory: InventoryState, categories: CategoryState, employees: Employee[] }>, private actions$: Actions, private toastr: ToastrService) {

    this.items$ = this.store.pipe(select(inventorySelector));
    this.categories$ = this.store.pipe(select(categorySelector));
    this.store.select(employeesStateSelector).pipe(
      takeUntil(this.destroy$),
    ).subscribe((state) => {
      this.employees = state.employees;
    });
    
    this.store.pipe(select(getLoading), takeUntil(this.destroy$)).subscribe((loading: boolean) => {
      this.isLoading = loading;
    });

    this.store.pipe(select(orgSelector), takeUntil(this.destroy$)).subscribe((org) => {
      this.orgId = org._id;
    })

    this.store.pipe(select(getErrorMessage), takeUntil(this.destroy$)).subscribe((errorMessage) => {
      if (errorMessage) {
        toastr.error(errorMessage);
        this.store.dispatch(clearErrorMessage())
      }
    })
  }

  ngOnInit(): void {

    this.store.dispatch(getCategoryRequest({ orgId: this.orgId }));
    this.store.dispatch(getItemRequest({ orgId: this.orgId }));
    this.store.dispatch(fetchEmployees());

    this.categories$.pipe(
      filter(categories => categories.length > 0),
      takeUntil(this.destroy$),
    ).subscribe(categories => {
      this.selectedCategory = categories[0];
      this.onCategoryChange();
    });

    this.actions$.pipe(
      ofType(createItemSuccess),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.toastr.success('Item added successfully');
      this.store.dispatch(clearErrorMessage());
      this.hideInventoryForm();
    })

    this.actions$.pipe(
      ofType(updateItemSuccess),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.toastr.success('Item updated successfully');
      this.store.dispatch(clearErrorMessage());
      this.hideInventoryForm();
    })

    this.actions$.pipe(
      ofType(deleteItemSuccess),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.toastr.success('Item deleted successfully');
      this.store.dispatch(clearErrorMessage());
    })

    this.actions$.pipe(
      ofType(checkintItemSuccess),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.toastr.success('Item checkin successfully');
      this.store.dispatch(clearErrorMessage());
    })

    this.actions$.pipe(
      ofType(checkoutItemSuccess),
      take(1),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.toastr.success('Item Checkout successfully');
      this.store.dispatch(clearErrorMessage());

      // if (this.checkoutMailDetails) {
      //   this.store.dispatch(checkoutMailRequest({ checkoutMailDetails: this.checkoutMailDetails }));
      //   this.checkoutMailDetails = null;
      // }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onCategoryChange(): void {
    this.searchText = '';
    this.filteredItems$ = this.items$.pipe(
      map(items => {
        const selectedCategoryId = this.selectedCategory?._id;
        return selectedCategoryId ? items.filter(item => item.categoryId === selectedCategoryId) : items;
      }),
      takeUntil(this.destroy$)
    );
  }

  createItemHandler(item: Item) {
    item.orgId = this.orgId;
    this.store.dispatch(createItemRequest({ item }));
  }

  updateItemHandler(updatedItem: Item) {
    updatedItem.orgId = this.orgId;
    this.store.dispatch(updateItemRequest({ updatedItem }));
  }

  deleteItemHandler(itemId: string) {
    this.itemIdToDelete = itemId;
    this.showDeleteConfirmation = true;
  }

  cancelDelete() {
    this.showDeleteConfirmation = false;
  }

  confirmDelete() {
    if (this.itemIdToDelete) {
      this.store.dispatch(deleteItemRequest({ itemId: this.itemIdToDelete }));
      this.showDeleteConfirmation = false;
    }
  }

  showInventoryForm(): void {
    if (!this.isEditMode) {
      this.selectedItem = null;
    }
    this.isInventoryFormVisible = true;
  }

  hideInventoryForm(): void {
    this.isEditMode = false;
    this.isInventoryFormVisible = false;
  }

  showUpdateItemForm(selectedItem: Item) {
    this.isEditMode = true;
    this.showInventoryForm();

    this.categories$.pipe(
      takeUntil(this.destroy$)
    ).subscribe((categories: Category[]) => {
      const updateItemCategory = categories.find(category => category._id === selectedItem.categoryId);
      if (updateItemCategory) {
        this.updateItemCategory = updateItemCategory;
      }
    });

    this.selectedItem = selectedItem;
  }

  // checkout
  showCheckoutItemHandler(selectedItem: Item) {
    this.selectedItem = selectedItem;
    this.showCheckout = true
  }

  hideCheckoutItemHandler() {
    this.selectedItem = null;
    this.showCheckout = false
  }

  checkoutItemHandler(event: CheckoutEventData) {
    const assignedToDetails: CheckoutDetails = event.assignedToDetails;
    const checkoutMailDetails: CheckoutMailDetails = event.checkoutMailDetails;

    checkoutMailDetails.orgName = this.orgName;
    this.checkoutMailDetails = checkoutMailDetails;

    this.store.dispatch(checkoutItemRequest({ assignedToDetails, checkoutMailDetails }));
    this.hideCheckoutItemHandler();
  }

  // checkin
  showCheckinItemHandler(selectedItem: Item) {
    this.selectedItem = selectedItem;
    this.showCheckin = true
  }

  hideCheckinItemHandler() {
    this.selectedItem = null;
    this.showCheckin = false
  }

  checkinItemHandler(checkinDetails: CheckinDetails) {
    this.store.dispatch(checkinItemRequest({ checkinDetails }))
    this.hideCheckinItemHandler()
  }

  // detailed view
  showDetailedViewHandler(selectedItem: Item) {
    this.selectedItem = selectedItem;
    this.showDetailedView = true;
  }

  hideDetailedViewHandler() {
    this.selectedItem = null;
    this.showDetailedView = false;
  }

  // lifecycle
  showLifecycleHandler(selectedItem: Item) {
    this.selectedItem = selectedItem;
    this.showLifecycle = true;
  }

  hideLifecycleHandler() {
    this.selectedItem = null;
    this.showLifecycle = false;
  }
}
