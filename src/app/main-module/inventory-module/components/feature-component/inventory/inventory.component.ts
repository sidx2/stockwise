import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { Actions, ofType } from '@ngrx/effects';
import { ToastrService } from 'ngx-toastr';

import {
  checkinItemRequest,
  checkoutItemRequest,
  createItemRequest,
  deleteItemRequest,
  getItemRequest,
  updateItemRequest,
  checkoutMailRequest,
  createItemSuccess,
  checkoutItemSuccess,
  clearErrorMessage,
  createMultipleItemRequest,
  createMultipleItemSuccess
} from '../../../store/inventory.action';

import { getCategoryRequest } from '../../../../category-module/store/category.action';
import { fetchEmployeesRequest } from '../../../../employees-module/store/employees.actions';

import { Category, CategoryState } from '../../../../category-module/models/category';
import { CheckoutDetails, CheckoutEventData, CheckoutMailDetails, Item, InventoryState, CheckinDetails } from '../../../models/inventory';
import { Employee } from '../../../../employees-module/models/employee';

import { employeesStateSelector } from '../../../../employees-module/store/employees.selectors';
import { getErrorMessage, getLoading, inventorySelector, totalItemsSelector } from '../../../store/inventory.selector';
import { categorySelector } from '../../../../category-module/store/category.selector';

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
  selectedIdentificationType: string = 'Single';
  selectedAssignedStatus: string = '';
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
      this.totalPages = totalItems === 0 ? 1 : Math.ceil(totalItems / this.itemsPerPage);
      if(this.totalPages === 0) {
        this.currentPage = 0;
      }
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

    this.fetchItems(this.selectedIdentificationType, this.selectedCategoryId, this.selectedAssignedStatus, this.itemsPerPage, 0, this.searchText);

    this.actions$.pipe(
      ofType(createItemSuccess),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.hideInventoryForm();
      this.onPageChange(1)
    })

    this.actions$.pipe(
      ofType(createMultipleItemSuccess),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.hideInventoryForm();
      this.onPageChange(1)
    })

    this.actions$.pipe(
      ofType(checkoutItemSuccess),
      take(1),
      takeUntil(this.destroy$)
    ).subscribe(() => {

      if (this.checkoutMailDetails) {
        this.store.dispatch(checkoutMailRequest({ checkoutMailDetails: this.checkoutMailDetails }));
        this.checkoutMailDetails = null;
      }
    });

  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  fetchItems(identificationType: string, categoryId: string, assignedStatus: string, limit: number, skip: number, searchText: string) {

    this.store.dispatch(getItemRequest({
      identificationType,
      categoryId,
      assignedStatus,
      limit,
      skip,
      searchText,
      assetId: ''
    }));
  }

  onIdentificationTypeChange(): void {
    this.selectedCategoryId = '';
    this.searchText = '';
    this.onPageChange(1)
  }

  onCategoryChange(): void {
    this.searchText = ''
    this.onPageChange(1)
  }

  onAssignedStatusChange(): void {
    this.searchText = ''
    this.onPageChange(1)
  }

  onSearchTextChange(): void {
    this.onPageChange(1)
  }

  onPageChange(page: number) {
    this.currentPage = page;
    const skip = this.getSkipCount();
    this.fetchItems(this.selectedIdentificationType, this.selectedCategoryId, this.selectedAssignedStatus, this.itemsPerPage, skip, this.searchText.trim());
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
      this.hideInventoryForm();
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
    this.selectedItem = selectedItem;
    this.showInventoryForm();
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

    this.store.dispatch(checkoutItemRequest({ assignedToDetails }));
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
