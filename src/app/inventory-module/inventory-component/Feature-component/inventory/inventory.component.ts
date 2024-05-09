import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map, take, filter } from 'rxjs/operators';
import { addItem, checkinItemRequest, checkoutItemRequest, createItemRequest, deleteItemRequest, getItemRequest, updateItem, updateItemRequest } from '../../../store/inventory.action';
import { Category } from '../../../../category-module/models/category';
import { CheckoutDetails, Item } from '../../../models/inventory';
import { InventoryState } from '../../../store/inventory.reducer';
import { Employee } from '../../../../employees-module/store/employees.reducers';
import { CheckinDetails } from '../../../models/inventory';
import { getCategoryRequest } from '../../../../category-module/store/category.action';
import { fetchEmployees } from '../../../../employees-module/store/employees.actions';
import { employeesSelector } from '../../../../employees-module/store/employees.selectors';
import { Actions, ofType } from '@ngrx/effects';

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
  private orgSubscription: Subscription | undefined;

  selectedCategory: Category | null = null;
  updateItemCategory: Category | null = null;

  isInventoryFormVisible: boolean = false;
  showDeleteConfirmation: boolean = false;
  itemIdToDelete: string = '';
  selectedItem: Item | null = null;

  // conditional rendering
  isEditMode: boolean = false;
  showDetailedView: boolean = false;
  showCheckout: boolean = false;
  showCheckin: boolean = false;
  showLifecycle: boolean = false;

  searchText: string = ''
  orgId: string = '';

  constructor(private store: Store<{ global: any, inventory: InventoryState, categories: Category[], employees: Employee[] }>, private actions$: Actions) {

    this.items$ = this.store.select(state => state.inventory.items);
    this.categories$ = this.store.select('categories');
    this.employees$ = this.store.select(employeesSelector)
  }

  ngOnInit(): void {

    this.orgSubscription = this.store.select('global').subscribe((global) => {
      this.orgId = global.org._id;
    })

    this.store.dispatch(getCategoryRequest({orgId: this.orgId}));
    this.store.dispatch(getItemRequest({orgId: this.orgId}));
    this.store.dispatch(fetchEmployees());

    this.categories$.pipe(
      filter(categories => categories.length > 0),
      take(1),
    ).subscribe(categories => {
      this.selectedCategory = categories[0];
      this.onCategoryChange();
    });

    // item created successfully
    this.actions$.pipe(
      ofType(addItem)
    ).subscribe( ()=> {
      this.hideInventoryForm();
    })

    // item updated successfully
    this.actions$.pipe(
      ofType(updateItem)
    ).subscribe( ()=> {
      this.hideInventoryForm();
    })
    
  }

  ngOnDestroy(): void {
    if (this.orgSubscription) {
      this.orgSubscription.unsubscribe();
    }
  }

  onCategoryChange(): void {
    this.searchText = '';
    this.filteredItems$ = this.items$.pipe(
      map(items => {
        const selectedCategoryId = this.selectedCategory?._id;
        return selectedCategoryId ? items.filter(item => item.categoryId === selectedCategoryId) : items;
      }),
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

    // Find the category details of the selected item
    this.categories$.subscribe((categories: Category[]) => {

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

  checkoutItemHandler(assignedToDetails: CheckoutDetails){
    this.store.dispatch(checkoutItemRequest({assignedToDetails}));
    this.hideCheckoutItemHandler();
  }

  // checkin
  showCheckinItemHandler(selectedItem: Item) {
    console.log("checkin", selectedItem);
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
