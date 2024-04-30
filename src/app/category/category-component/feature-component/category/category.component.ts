import { Component, OnInit } from '@angular/core';
import { Category } from '../../../models/category';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getCategoryRequest } from '../../../store/category.action';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  categories$: Observable<Category[]>;
  isCategoryFormVisible: boolean = false;

  constructor(private store: Store<{ categories: Category[] }>) {
    this.categories$ = this.store.pipe(select('categories'));
  }

  ngOnInit(): void {
    this.fetchCategoryHandler();
  }

  fetchCategoryHandler(): void {
    console.log("Fetching categories...");
    this.store.dispatch(getCategoryRequest());
  }

  showCategoryForm(): void {
    this.isCategoryFormVisible = true;
  }

  hideCategoryForm(): void {
    this.isCategoryFormVisible = false;
  }
}
