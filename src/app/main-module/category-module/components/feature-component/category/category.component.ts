import { Component, OnInit, OnDestroy } from '@angular/core';
import { Category, CategoryState } from '../../../models/category';
import { Store, select } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { getCategoryRequest, createCategoryRequest, deleteCategoryRequest, updateCategoryRequest, addCategory, updateCategory } from '../../../store/category.action';
import { categorySelector, getLoading } from '../../../store/category.selector';
import { orgSelector } from '../../../../../store/global.selectors';
import { IGlobalState } from '../../../../../models/global';

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

  private destroy$ = new Subject<void>();

  constructor(private store: Store<{ categories: CategoryState, global: IGlobalState }>, private actions$: Actions) {
    this.categories$ = this.store.pipe(select(categorySelector));
  }

  ngOnInit(): void {
    
    this.store.pipe(select(getLoading)).pipe(takeUntil(this.destroy$)).subscribe((loading) => this.isLoading = loading);
    
    this.store.pipe(select(orgSelector)).pipe(takeUntil(this.destroy$)).subscribe((org) => {
      this.orgId = org._id;
      this.fetchCategoryHandler();
    });

    this.actions$.pipe(ofType(addCategory), takeUntil(this.destroy$)).subscribe(() => {
      this.hideCategoryForm();
    });

    this.actions$.pipe(ofType(updateCategory), takeUntil(this.destroy$)).subscribe(() => {
      this.hideCategoryForm();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
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
