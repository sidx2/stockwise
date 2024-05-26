import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category';
import { BASE_URL } from '../../../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${BASE_URL}/category/categories`);
  }

  createCategory(category: Category): Observable<Category> {
    return this.http.post<any>(`${BASE_URL}/category/create`, category);
  }

  deleteCategory(categoryId: string): Observable<Category> {
    return this.http.delete<Category>(`${BASE_URL}/category/delete/${categoryId}`);
  }

  updateCategory(updatedCategory: Category){
    return this.http.put<Category>(`${BASE_URL}/category/update`, {...updatedCategory, categoryId: updatedCategory._id});
  }
  
}
