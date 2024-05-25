import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription, Subject } from 'rxjs';
import { map, takeUntil, filter, take } from 'rxjs/operators';
import { addItem, checkinItemRequest, checkoutItemRequest, createItemRequest, deleteItemRequest, getItemRequest, updateItem, updateItemRequest, checkoutMailRequest } from '../../../store/inventory.action';
import { Category, CategoryState} from '../../../../category-module/models/category';
import { CheckoutDetails, CheckoutEventData, CheckoutMailDetails, Item } from '../../../models/inventory';
import { InventoryState, CheckinDetails } from '../../../models/inventory';
import { getCategoryRequest } from '../../../../category-module/store/category.action';
import { Actions, ofType } from '@ngrx/effects';
import { IGlobalState } from '../../../../../models/global';
import { Employee } from '../../../../employees-module/models/employee';
import { employeesSelector } from '../../../../employees-module/store/employees.selectors';
import { fetchEmployees } from '../../../../employees-module/store/employees.actions';
import { getLoading, inventorySelector } from '../../../store/inventory.selector';
import { orgSelector } from '../../../../../store/global.selectors';
import { categorySelector } from '../../../../category-module/store/category.selector';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit, OnDestroy {

  items$: Observable<Item[]>;
  categories$: Observable<Category[]>;
  employees$: Observable<Employee[]>;
  filteredItems$: Observable<Item[]> | null = null;
  orgSubscription: Subscription;
  loadingSubscription: Subscription;
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

  constructor(private store: Store<{ global: IGlobalState, inventory: InventoryState, categories: CategoryState, employees: Employee[] }>, private actions$: Actions) {

    this.items$ = this.store.pipe(select(inventorySelector));
    this.categories$ = this.store.pipe(select(categorySelector));
    this.employees$ = this.store.select(employeesSelector);
    
    this.loadingSubscription = this.store.pipe(select(getLoading)).subscribe((loading: boolean) => {
      this.isLoading = loading;
    });

    this.orgSubscription = this.store.pipe(select(orgSelector)).subscribe((org) => {
      this.orgId = org._id;
    })
  }

  ngOnInit(): void {

    this.store.dispatch(getCategoryRequest({orgId: this.orgId}));
    this.store.dispatch(getItemRequest({orgId: this.orgId}));
    this.store.dispatch(fetchEmployees());

    this.categories$.pipe(
      filter(categories => categories.length > 0),
      takeUntil(this.destroy$),
    ).subscribe(categories => {
      this.selectedCategory = categories[0];
      this.onCategoryChange();
    });

    this.actions$.pipe(
      ofType(addItem),
      takeUntil(this.destroy$)
    ).subscribe( ()=> {
      this.hideInventoryForm();
    })

    this.actions$.pipe(
      ofType(updateItem),
      takeUntil(this.destroy$)
    ).subscribe( ()=> {
      this.hideInventoryForm();
    })

    this.actions$.pipe(
      ofType(checkoutItemRequest),  
      take(1),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      if (this.checkoutMailDetails) {
        this.store.dispatch(checkoutMailRequest({ checkoutMailDetails: this.checkoutMailDetails }));
      }
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

  checkoutItemHandler(event:CheckoutEventData) {
    const assignedToDetails: CheckoutDetails = event.assignedToDetails;
    const checkoutMailDetails: CheckoutMailDetails = event.checkoutMailDetails;
    checkoutMailDetails.orgName = this.orgName;
    this.checkoutMailDetails = checkoutMailDetails;
    this.store.dispatch(checkoutItemRequest({assignedToDetails}));
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

  checkinItemHandler(checkinDetails: CheckinDetails){
    this.store.dispatch(checkinItemRequest({checkinDetails}))
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

  showLifecycleHandler(selectedItem: Item){
    this.selectedItem = selectedItem;
    this.showLifecycle = true;
  }

  hideLifecycleHandler(){
    this.selectedItem = null;
    this.showLifecycle = false;
  }
}
