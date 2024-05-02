import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take, filter } from 'rxjs/operators';
import { createItemRequest, deleteItemRequest, getItemRequest, updateItemRequest } from '../../../store/inventory.action';
import { Category } from '../../../../category/models/category';
import { getCategoryRequest } from '../../../../category/store/category.action';
import { Item } from '../../../models/inventory';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {

  items$: Observable<Item[]>; 
  categories$: Observable<Category[]>;
  filteredItems$: Observable<Item[]> | undefined;

  selectedCategory: Category | null = null;
  updateItemCategory: Category | null = null;

  isInventoryFormVisible: boolean = false;
  showDeleteConfirmation: boolean = false;
  itemIdToDelete: string ='';
  selectedItem: Item | null = null;
  isEditMode: boolean = false;

  constructor(private store: Store<{ inventory: Item[], categories: Category[] }>) {
    this.items$ = this.store.select('inventory');
    this.categories$ = this.store.select('categories');
  }

  ngOnInit(): void {
    this.store.dispatch(getCategoryRequest());
    this.store.dispatch(getItemRequest());

    // Select the first category by default
    this.categories$.pipe(
      take(1) 
    ).subscribe(categories => {
      if (categories.length > 0) {
        this.selectedCategory = categories[0];
        this.onCategoryChange(); 
      }
    });
  }

  onCategoryChange(): void {
    this.filteredItems$ = this.items$.pipe(
      map(items => {
        const selectedCategoryId = this.selectedCategory?._id;
        return selectedCategoryId ? items.filter(item => item.categoryId === selectedCategoryId) : items;
      })
    );
  }

  createItemHandler(item: Item){
    // adding orgId
    item.orgId = "660e20d70b44fcba1ea33139";
    this.store.dispatch(createItemRequest({item}));
    this.isInventoryFormVisible = false;
  }

  updateItemHandler(updatedItem: Item){
    // adding orgId
    updatedItem.orgId = "660e20d70b44fcba1ea33139";
    this.isInventoryFormVisible = false;
    this.store.dispatch(updateItemRequest({updatedItem}));
  }

  deleteItemHandler(itemId: string){
    this.itemIdToDelete = itemId;
    this.showDeleteConfirmation = true;
  }

  showInventoryForm(): void {
    if(!this.isEditMode){
      this.selectedItem = null;
    }
    this.isInventoryFormVisible = true;
  }

  hideInventoryForm(): void {
    this.isEditMode = false;
    this.isInventoryFormVisible = false;
  }

  showUpdateItemForm(selectedItem: Item){
    this.isEditMode = true;
    this.showInventoryForm();
  
    // Find the category details of the selected item
    this.categories$.subscribe((categories: Category[]) => {

      const updateItemCategory = categories.find(category => category._id === selectedItem.categoryId);

      if(updateItemCategory) {
        this.updateItemCategory = updateItemCategory;
      }
    });

    this.selectedItem = selectedItem;
  }

   // Modal events
   closeModal(){
    this.showDeleteConfirmation = false;
  }

  cancelDelete(){
    this.showDeleteConfirmation = false;
  }

  confirmDelete(){
    if (this.itemIdToDelete) { 
      this.store.dispatch(deleteItemRequest({itemId : this.itemIdToDelete}));
      this.showDeleteConfirmation = false;
    }
  }
}
