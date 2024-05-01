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
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjBlMjBkNzBiNDRmY2JhMWVhMzMxMzUiLCJpYXQiOjE3MTQ0NjE5MzIsImV4cCI6MTcxNDcyMTEzMn0.vXTUF-VA9D8ajxJcIeIxDyVVgRZsl4o7spKjYDGdP-U';

    const headers = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };

    return this.http.get<Category[]>(`https://stockwise-r9k0.onrender.com/category/${orgId}`, headers);
  }

  createCategory(category: Category): Observable<Category> {
    const orgId = '660e20d70b44fcba1ea33139';
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjBlMjBkNzBiNDRmY2JhMWVhMzMxMzUiLCJpYXQiOjE3MTQ0NjE5MzIsImV4cCI6MTcxNDcyMTEzMn0.vXTUF-VA9D8ajxJcIeIxDyVVgRZsl4o7spKjYDGdP-U';
  
    const headers = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };
  
    return this.http.post<any>(`https://stockwise-r9k0.onrender.com/category/create`, category, headers);
  }

  deleteCategory(categoryId: string): Observable<Category> {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjBlMjBkNzBiNDRmY2JhMWVhMzMxMzUiLCJpYXQiOjE3MTQ0NjE5MzIsImV4cCI6MTcxNDcyMTEzMn0.vXTUF-VA9D8ajxJcIeIxDyVVgRZsl4o7spKjYDGdP-U';
  
    const headers = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };

    return this.http.delete<Category>(`http://localhost:9999/category/delete/${categoryId}`, headers);
  }

  updateCategory(updatedCategory: Category){
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjBlMjBkNzBiNDRmY2JhMWVhMzMxMzUiLCJpYXQiOjE3MTQ0NjE5MzIsImV4cCI6MTcxNDcyMTEzMn0.vXTUF-VA9D8ajxJcIeIxDyVVgRZsl4o7spKjYDGdP-U';
  
    const headers = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };

    return this.http.put<Category>(`https://stockwise-r9k0.onrender.com/category/update`, {...updatedCategory, categoryId: updatedCategory._id}, headers);
  }
  
}
