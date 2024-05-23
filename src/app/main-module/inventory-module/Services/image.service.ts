import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, of, tap } from 'rxjs';
import { response } from 'express';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient) { }

  uploadImage(file: File) {
    
    const formData = new FormData();
    formData.append('file', file);
    
    return this.http.post<{ key: string }>('http://localhost:9999/service/upload', formData).pipe(
      tap( response => console.log(response)),
      catchError(error => {
        console.error('Error uploading image:', error);
        return of('');
      })
    );
  }
}
