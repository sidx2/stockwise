import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, of, tap } from 'rxjs';
import { response } from 'express';
import { BASE_URL } from '../../../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient) { }

  uploadImage(file: File) {
    
    const formData = new FormData();
    formData.append('file', file);
    
    return this.http.post<{ key: string }>(`${BASE_URL}/service/upload`, formData).pipe(
      tap( response => console.log(response)),
      catchError(error => {
        console.error('Error uploading image:', error);
        return of('');
      })
    );
  }
}
