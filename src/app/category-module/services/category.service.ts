import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {

    const orgId = '660e20d70b44fcba1ea33139';
    // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjBlMjBkNzBiNDRmY2JhMWVhMzMxMzUiLCJpYXQiOjE3MTQ3Mjc3NDIsImV4cCI6MTcxNDk4Njk0Mn0.XXwhK0hVaFl7vM71jUzsR54-q0fzeenieq5W_Jic1R4';

    // const headers = {
    //   headers: {
    //     'Authorization': `Bearer ${token}`
    //   }
    // };

    return this.http.get<Category[]>(`http://localhost:9999/category/${orgId}`);
  }

  createCategory(category: Category): Observable<Category> {
    return this.http.post<any>(`http://localhost:9999/category/create`, category);
  }

  deleteCategory(categoryId: string): Observable<Category> {
    return this.http.delete<Category>(`http://localhost:9999/category/delete/${categoryId}`);
  }

  updateCategory(updatedCategory: Category){
    return this.http.put<Category>(`http://localhost:9999/category/update`, {...updatedCategory, categoryId: updatedCategory._id});
  }
  
}
