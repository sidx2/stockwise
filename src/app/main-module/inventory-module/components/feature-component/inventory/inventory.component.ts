import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { map, take, takeUntil } from 'rxjs/operators';
import {
  checkinItemRequest, checkoutItemRequest, createItemRequest, deleteItemRequest, getItemRequest, updateItemRequest,
  checkoutMailRequest, createItemSuccess, updateItemSuccess, checkoutItemSuccess, clearErrorMessage, deleteItemSuccess,
  checkintItemSuccess, createMultipleItemRequest, createMultipleItemSuccess
} from '../../../store/inventory.action';
import { Category, CategoryState } from '../../../../category-module/models/category';
import { CheckoutDetails, CheckoutEventData, CheckoutMailDetails, Item } from '../../../models/inventory';
import { InventoryState, CheckinDetails } from '../../../models/inventory';
import { getCategoryRequest } from '../../../../category-module/store/category.action';
import { Actions, ofType } from '@ngrx/effects';
import { Employee } from '../../../../employees-module/models/employee';
import { employeesStateSelector } from '../../../../employees-module/store/employees.selectors';
import { fetchEmployeesRequest } from '../../../../employees-module/store/employees.actions';
import { getErrorMessage, getLoading, inventorySelector, totalItemsSelector } from '../../../store/inventory.selector';
import { categorySelector } from '../../../../category-module/store/category.selector';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit, OnDestroy {

  items$: Observable<Item[]>;
  categories$!: Observable<Category[]>;
  employees!: Employee[];
  filteredCategories$!: Observable<Category[]>;
  destroy$: Subject<void> = new Subject();

  selectedCategoryId: string = '';
  selectedIdentificationType: string = 'unique';
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
  orgName: string = '';
  checkoutMailDetails: CheckoutMailDetails | null = null;

  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 0;
  
  constructor(private store: Store<{ inventory: InventoryState, categories: CategoryState, employees: Employee[] }>, private actions$: Actions, private toastr: ToastrService) {

    this.items$ = this.store.pipe(select(inventorySelector));
    this.categories$ = this.store.pipe(select(categorySelector));

    this.store.pipe(select(totalItemsSelector), takeUntil(this.destroy$)).subscribe((totalItems) => {
      this.totalPages = Math.ceil(totalItems/this.itemsPerPage);
    });

    this.store.select(employeesStateSelector).pipe(
      takeUntil(this.destroy$),
    ).subscribe((state) => {
      this.employees = state.employees;
    });

    this.store.pipe(select(getLoading), takeUntil(this.destroy$)).subscribe((loading: boolean) => {
      this.isLoading = loading;
    });

    this.store.pipe(select(getErrorMessage), takeUntil(this.destroy$)).subscribe((errorMessage) => {
      if (errorMessage) {
        this.toastr.error(errorMessage);
        this.store.dispatch(clearErrorMessage())
      }
    })
  }

  ngOnInit(): void {

    this.store.dispatch(getCategoryRequest());
    this.store.dispatch(fetchEmployeesRequest());

    this.fetchItems(this.selectedIdentificationType, this.selectedCategoryId, this.itemsPerPage, 0, this.searchText);

    this.actions$.pipe(
      ofType(createItemSuccess),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.toastr.success('Item added successfully');
      this.hideInventoryForm();
    })

    this.actions$.pipe(
      ofType(createMultipleItemSuccess),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.toastr.success('Items added successfully');
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
    })

    this.actions$.pipe(
      ofType(checkintItemSuccess),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.toastr.success('Item checkin successfully');
      this.hideCheckinItemHandler()
    })

    this.actions$.pipe(
      ofType(checkoutItemSuccess),
      take(1),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.toastr.success('Item Checkout successfully');

      if (this.checkoutMailDetails) {
        this.store.dispatch(checkoutMailRequest({ checkoutMailDetails: this.checkoutMailDetails }));
        this.checkoutMailDetails = null;
      }
    });

    this.onIdentificationTypeChange();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  fetchItems(identificationType: string, categoryId: string, limit: number, skip: number, searchText: string) {

    console.log("skip", skip);
    console.log("limit", limit);

    this.store.dispatch(getItemRequest({
      identificationType,
      categoryId,
      limit,
      skip,
      searchText,
      assetId: ''
    }));
  }

  onIdentificationTypeChange(): void {
    this.currentPage = 1
    this.searchText = '';
    this.selectedCategoryId = '';

    this.fetchItems(this.selectedIdentificationType, this.selectedCategoryId, this.itemsPerPage, 0, this.searchText);

    this.filteredCategories$ = this.categories$.pipe(
      map(categories => categories.filter(category => category.identificationType === this.selectedIdentificationType)),
      takeUntil(this.destroy$)
    );
  }

  onCategoryChange(): void {
    this.currentPage = 1
    this.searchText = ''
    this.fetchItems(this.selectedIdentificationType, this.selectedCategoryId, this.itemsPerPage, 0, this.searchText);
  }

  onSearchTextChange(): void {
    this.currentPage = 1
    this.fetchItems(this.selectedIdentificationType, this.selectedCategoryId, this.itemsPerPage, 0, this.searchText);
  }

  onPageChange(page: number) {
    console.log("page number", page)
    this.currentPage = page;
    const skip = this.getSkipCount();
  
    this.fetchItems(this.selectedIdentificationType, this.selectedCategoryId, this.itemsPerPage, skip, this.searchText);
  }
  
  getSkipCount(): number {
    return (this.currentPage - 1) * this.itemsPerPage;
  }
  
  createItemHandler(item: Item) {
    this.store.dispatch(createItemRequest({ item }));
  }

  createMultipleItemHandler(item: Item) {
    this.store.dispatch(createMultipleItemRequest({ item }));
  }

  updateItemHandler(updatedItemresponse: { updatedItem: Item, dataChanged: boolean }) {
    if (updatedItemresponse.dataChanged) {
      this.store.dispatch(updateItemRequest({ updatedItem: updatedItemresponse.updatedItem }));
    } else {
      this.hideInventoryForm();
    }
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
    this.showCheckout = true;
  }

  hideCheckoutItemHandler() {
    this.selectedItem = null;
    this.showCheckout = false;
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
    this.showCheckin = true;
  }

  hideCheckinItemHandler() {
    this.selectedItem = null;
    this.showCheckin = false;
  }

  checkinItemHandler(checkinDetails: CheckinDetails) {
    this.store.dispatch(checkinItemRequest({ checkinDetails }));
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
