import { Component, OnInit, OnDestroy } from '@angular/core';
import { Category } from '../../../models/category';
import { CategoryState } from '../../../store/category.reducer';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { getCategoryRequest, createCategoryRequest, deleteCategoryRequest, updateCategoryRequest, addCategory, updateCategory } from '../../../store/category.action';
import { Actions, ofType } from '@ngrx/effects';

import { IGlobalState } from '../../../../../store/global.reducers';
import { getLoading } from '../../../store/category.selector';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit, OnDestroy {

  categories$: Observable<Category[]>;
  selectedCategory: Category | null = null;
  categoryIdToDelete: string | null = null;

  isCategoryFormVisible: boolean = false;
  isLoading: boolean = false;
  isEditMode: boolean = false;
  showDeleteConfirmation: boolean = false;
  orgId: string = '';

  private orgSubscription: Subscription | undefined;
  loadingSubscription: Subscription | undefined;

  constructor(private store: Store<{ categories: CategoryState, global: IGlobalState }>, private actions$: Actions) {
    this.categories$ = this.store.select(state => state.categories.categories);
    this.loadingSubscription = this.store.pipe(select(getLoading)).subscribe((loading)=> this.isLoading = loading);
    this.orgSubscription = this.store.select('global').subscribe((global) => {
      this.orgId = global.org._id;
    })
  }

  ngOnInit(): void {
    
    this.fetchCategoryHandler();

    // catgory created successfully
    this.actions$.pipe(
      ofType(addCategory)
    ).subscribe(() => {
      this.hideCategoryForm();
    })

    // category updated successfully
    this.actions$.pipe(
      ofType(updateCategory)
    ).subscribe(() => {
      this.hideCategoryForm();
    })
  }

  ngOnDestroy(): void {
    if (this.orgSubscription) {
      this.orgSubscription.unsubscribe();
    }
    if(this.loadingSubscription){
      this.loadingSubscription.unsubscribe();
    }
  }

  fetchCategoryHandler(): void {
    console.log("Fetching categories...");
    this.store.dispatch(getCategoryRequest({ orgId: this.orgId }));
  }

  createCategoryHandler(category: Category) {
    category.orgId = this.orgId;
    this.store.dispatch(createCategoryRequest({ category: category }));
  }

  updateCategoryHandler(updatedCategory: Category) {
    this.store.dispatch(updateCategoryRequest({ updatedCategory }));
    this.fetchCategoryHandler();
  }

  deleteCategoryHandler(categoryId: string) {
    this.categoryIdToDelete = categoryId;
    this.showDeleteConfirmation = true;
  }

  showCategoryForm(): void {
    if (!this.isEditMode) {
      this.selectedCategory = null;
    }
    this.isCategoryFormVisible = true;
  }

  hideCategoryForm(): void {
    this.isEditMode = false;
    this.isCategoryFormVisible = false;
  }

  showUpdateCategoryForm(selectedCategory: Category) {
    this.isEditMode = true;
    this.showCategoryForm();
    this.selectedCategory = selectedCategory;
  }

  // Modal events
  closeModal() {
    this.showDeleteConfirmation = false;
  }

  cancelDelete() {
    this.showDeleteConfirmation = false;
  }

  confirmDelete() {
    if (this.categoryIdToDelete) {
      this.store.dispatch(deleteCategoryRequest({ categoryId: this.categoryIdToDelete }));
      this.showDeleteConfirmation = false;
    }
  }
}
