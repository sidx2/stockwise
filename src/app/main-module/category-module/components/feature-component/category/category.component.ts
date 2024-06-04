import { Component, OnInit, OnDestroy } from '@angular/core';
import { Category, CategoryState } from '../../../models/category';
import { Store, select } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { getCategoryRequest, createCategoryRequest, deleteCategoryRequest, updateCategoryRequest, createCategorySuccess, updateCategorySuccess, clearErrorMessage } from '../../../store/category.action';
import { categorySelector, getErrorMessage, getLoading } from '../../../store/category.selector';
import { ToastrService } from 'ngx-toastr';
import { IVendorsState, Vendor } from '../../../../vendors-module/models/vendor';
import { vendorSelector, vendorsStateSelector } from '../../../../vendors-module/store/vendor.selectors';
import { fetchVendorsRequest } from '../../../../vendors-module/store/vendor.actions';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit, OnDestroy {

  categories$: Observable<Category[]>;
  vendorsState$: Observable<Vendor[]>;
  selectedCategory: Category | null = null;
  categoryIdToDelete: string | null = null;

  isCategoryFormVisible: boolean = false;
  isLoading: boolean = false;
  isEditMode: boolean = false;
  showDeleteConfirmation: boolean = false;

  private destroy$ = new Subject<void>();

  constructor(private store: Store<{ categories: CategoryState}>, private actions$: Actions, private toastr: ToastrService) {

    this.categories$ = this.store.pipe(select(categorySelector));

    this.vendorsState$ = this.store.pipe(select(vendorSelector));

    this.store.pipe(select(getLoading), takeUntil(this.destroy$)).subscribe((loading) => this.isLoading = loading);

    this.store.pipe(select(getErrorMessage), takeUntil(this.destroy$)).subscribe((errorMessage)=> {
      if(errorMessage){
        toastr.error(errorMessage);
        this.store.dispatch(clearErrorMessage())
      }
    })
  }

  ngOnInit(): void {
    
    this.store.dispatch(getCategoryRequest());
    this.store.dispatch(fetchVendorsRequest());

    this.actions$.pipe(ofType(createCategorySuccess), takeUntil(this.destroy$)).subscribe(() => {
      this.toastr.success("Category created successfully");
      this.hideCategoryForm();
    });

    this.actions$.pipe(ofType(updateCategorySuccess), takeUntil(this.destroy$)).subscribe(() => {
      this.toastr.success("Category updated successfully");
      this.hideCategoryForm();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  fetchCategoryHandler(): void {
    this.store.dispatch(getCategoryRequest());
  }

  createCategoryHandler(category: Category) {
    this.store.dispatch(createCategoryRequest({ category: category }));
  }

  updateCategoryHandler(updatedCategoryResponse: { updatedCategory: Category, dataChanged: boolean}) {
    if(updatedCategoryResponse.dataChanged){
      this.store.dispatch(updateCategoryRequest({ updatedCategory: updatedCategoryResponse.updatedCategory }));
      this.fetchCategoryHandler()
    }
    else{
      this.hideCategoryForm()
    }
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
