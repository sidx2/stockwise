import { Component, OnInit, OnDestroy } from '@angular/core';
import { Category } from '../../../models/category';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { getCategoryRequest, createCategoryRequest, deleteCategoryRequest, updateCategoryRequest } from '../../../store/category.action';
import { LoaderService } from '../../../../share-module/services/loader.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit, OnDestroy {

  categories$: Observable<Category[]>;
  isCategoryFormVisible: boolean = false;
  selectedCategory: Category | null = null;
  isEditMode: boolean = false;
  showDeleteConfirmation: boolean = false;
  categoryIdToDelete: string | null = null; 
  orgId: string = '';
  
  private orgSubscription: Subscription | undefined;

  constructor(private store: Store<{ categories: Category[], global: any}>, public loaderService:LoaderService) {
    this.categories$ = this.store.select('categories');
  }

  ngOnInit(): void {
    this.orgSubscription = this.store.select('global').subscribe((global) => {
      this.orgId = global.org._id;
    })
    this.fetchCategoryHandler();
  }

  ngOnDestroy(): void {
    if (this.orgSubscription) {
      this.orgSubscription.unsubscribe();
    }
  }

  fetchCategoryHandler(): void {
    console.log("Fetching categories...");
    this.store.dispatch(getCategoryRequest());
  }

  createCategoryHandler(category: Category){
    category.orgId = this.orgId;
    this.store.dispatch(createCategoryRequest({ category: category }));
    this.isCategoryFormVisible = false;
  }

  updateCategoryHandler(updatedCategory: Category){
    this.store.dispatch(updateCategoryRequest({updatedCategory}));
    this.fetchCategoryHandler();
    this.isCategoryFormVisible = false;
  }

  deleteCategoryHandler(categoryId: string){
    this.categoryIdToDelete = categoryId; 
    this.showDeleteConfirmation = true;
  }

  showCategoryForm(): void {
    if(!this.isEditMode){
      this.selectedCategory = null;
    }
    this.isCategoryFormVisible = true;
  }

  hideCategoryForm(): void {
    this.isEditMode = false;
    this.isCategoryFormVisible = false;
  }

  showUpdateCategoryForm(selectedCategory: Category){
    this.isEditMode = true;
    this.showCategoryForm();
    this.selectedCategory = selectedCategory;
  }

  // Modal events
  closeModal(){
    this.showDeleteConfirmation = false;
  }

  cancelDelete(){
    this.showDeleteConfirmation = false;
  }

  confirmDelete(){
    if (this.categoryIdToDelete) { 
      this.store.dispatch(deleteCategoryRequest({ categoryId: this.categoryIdToDelete }));
      this.showDeleteConfirmation = false;
    }
  }
}