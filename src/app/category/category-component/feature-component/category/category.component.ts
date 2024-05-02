import { Component, OnInit } from '@angular/core';
import { Category } from '../../../models/category';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getCategoryRequest, createCategoryRequest, deleteCategoryRequest, updateCategory, updateCategoryRequest } from '../../../store/category.action';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  categories$: Observable<Category[]>;
  
  isCategoryFormVisible: boolean = false;
  selectedCategory: Category | null = null;
  isEditMode: boolean = false;
  showDeleteConfirmation: boolean = false;
  categoryIdToDelete: string | null = null; 

  constructor(private store: Store<{ categories: Category[] }>) {
    this.categories$ = this.store.select('categories');
  }

  ngOnInit(): void {
    this.fetchCategoryHandler();
  }

  fetchCategoryHandler(): void {
    console.log("Fetching categories...");
    this.store.dispatch(getCategoryRequest());
  }

  createCategoryHandler(category: Category){
    console.log("data received inside category", category);

    const orgId = '660e20d70b44fcba1ea33139'; 
    // Add orgId to the category object
    category.orgId = orgId;

    this.store.dispatch(createCategoryRequest({ category: category }));
    this.isCategoryFormVisible = false;
  }

  updateCategoryHandler(updatedCategory: Category){
    this.store.dispatch(updateCategoryRequest({updatedCategory}));
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
