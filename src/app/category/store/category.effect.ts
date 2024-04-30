import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { CategoryService } from '../services/category.service';
import { getCategoryRequest, setCategories } from './category.action';


@Injectable()
export class CategoryEffects {

    loadCategories$ = createEffect(() => this.actions$.pipe(
        ofType(getCategoryRequest),
        tap(() => console.log('getCategoryRequest dispatched')),
        mergeMap(() =>
            this.categoryService.getCategories().pipe(
                map(response => setCategories({ categories: response })),
                tap(action => console.log('Dispatched action:', action)),
                catchError(error => {
                    console.error('Error:', error);
                    return of();
                })
            )
        )
    ));

    constructor(
        private actions$: Actions,
        private categoryService: CategoryService
    ) { }
}
