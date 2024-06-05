import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Category } from '../../../models/category';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-category-table',
  templateUrl: './category-table.component.html',
  styleUrls: ['./category-table.component.scss']
})
export class CategoryTableComponent {

  @Input() categories: Category[] | null = null;
  @Output() deleteCategoryEmitter: EventEmitter<string> = new EventEmitter(); 
  @Output() updateCategoryEmitter: EventEmitter<Category> = new EventEmitter(); 

  constructor(private toastr: ToastrService){}

  deleteCategoryHandler(categoryId: string, numberOfAssets: number){
    if(numberOfAssets === 0){
      this.deleteCategoryEmitter.emit(categoryId); 
    }else{
      this.toastr.error("This category cannot be deleted as it contains items")
    }
  }

  updateCategoryHandler(selectedCategory: Category){
    console.log("Inside table update", selectedCategory);
    this.updateCategoryEmitter.emit(selectedCategory); 
  }
}
