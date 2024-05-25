import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { CategoryService } from '../services/category.service';
import { createCategoryRequest, getCategoryRequest, deleteCategoryRequest, updateCategoryRequest, resetLoading, getCategorySuccess, createCategorySuccess, deleteCategorySuccess, updateCategorySuccess, getCategoryFailure, createCategoryFailure, deleteCategoryFailure, updateCategoryFailure } from './category.action';
import { Store } from '@ngrx/store';
import { setLoading } from './category.action';

@Injectable()
export class CategoryEffects {

    loadCategories$ = createEffect(() => this.actions$.pipe(
        ofType(getCategoryRequest),
        tap(() => this.store.dispatch(setLoading())), 
        switchMap((action) =>
            this.categoryService.getCategories(action.orgId).pipe(
                map(response => getCategorySuccess({ categories: response })),
                catchError(errorRespone => {
                    return of(getCategoryFailure({errorMessage: errorRespone.error.error}));
                })
            )
        )
    ));

    createCategory$ = createEffect(() => this.actions$.pipe(
        ofType(createCategoryRequest),
        tap(() => this.store.dispatch(setLoading())), 
        switchMap((action) =>
            this.categoryService.createCategory(action.category).pipe(
                map((createdCategory) => createCategorySuccess({ category: createdCategory })),
                catchError(errorRespone => {
                    return of(createCategoryFailure({errorMessage: errorRespone.error.error})); 
                })
            )
        )
    ));

    deleteCategory$ = createEffect(()=> this.actions$.pipe(
        ofType(deleteCategoryRequest),
        tap(() => this.store.dispatch(setLoading())), 
        switchMap(action =>
            this.categoryService.deleteCategory(action.categoryId).pipe(
                map((deletedCategory) => deleteCategorySuccess({ categoryId: deletedCategory._id })),
                catchError(errorRespone => {
                    return of(deleteCategoryFailure({errorMessage: errorRespone.error.error})); 
                })
            )
        )
    ))

    updateCategory$ = createEffect( ()=> this.actions$.pipe(
        ofType(updateCategoryRequest),
        tap(() => this.store.dispatch(setLoading())), 
        switchMap(action =>
            this.categoryService.updateCategory(action.updatedCategory).pipe(
                map((updatedCategory) => updateCategorySuccess({updatedCategory})),
                catchError(errorRespone => {
                    return of(updateCategoryFailure({errorMessage: errorRespone.error.error})); 
                })
            )
        )
    ))

    constructor(
        private actions$: Actions,
        private categoryService: CategoryService,
        private store: Store
    ) { }
}
