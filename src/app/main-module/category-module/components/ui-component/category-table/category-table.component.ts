import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Category } from '../../../models/category';

@Component({
  selector: 'app-category-table',
  templateUrl: './category-table.component.html',
  styleUrls: ['./category-table.component.scss']
})
export class CategoryTableComponent {

  @Input() categories: Category[] | null = null;

  @Output() deleteCategoryEmitter: EventEmitter<string> = new EventEmitter(); 
  @Output() updateCategoryEmitter: EventEmitter<Category> = new EventEmitter(); 

  deleteCategoryHandler(categoryId: string){
    console.log("Inside table delete", categoryId);
    this.deleteCategoryEmitter.emit(categoryId); 
  }

  updateCategoryHandler(selectedCategory: Category){
    console.log("Inside table update", selectedCategory);
    this.updateCategoryEmitter.emit(selectedCategory); 
  }
}
