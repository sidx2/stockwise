import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, delayWhen, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { CategoryService } from '../services/category.service';
import { createCategoryRequest, getCategoryRequest, setCategories, addCategory, deleteCategoryRequest, removeCategory, updateCategoryRequest, updateCategory } from './category.action';
import { Store } from '@ngrx/store';
import { setLoading } from './category.action';

@Injectable()
export class CategoryEffects {

    loadCategories$ = createEffect(() => this.actions$.pipe(
        ofType(getCategoryRequest),
        tap(() => this.store.dispatch(setLoading())), 
        switchMap((action) =>
            this.categoryService.getCategories(action.orgId).pipe(
                map(response => setCategories({ categories: response })),
                catchError(error => {
                    console.error('Error in loading categories:', error);
                    return of();
                })
            )
        )
    ));

    createCategory$ = createEffect(() => this.actions$.pipe(
        ofType(createCategoryRequest),
        tap(() => this.store.dispatch(setLoading())), 
        switchMap((action) =>
            this.categoryService.createCategory(action.category).pipe(
                map((createdCategory) => addCategory({ category: createdCategory })),
                catchError(error => {
                    console.error('Error in creating category:', error);
                    return of(); 
                })
            )
        )
    ));

    deleteCategory$ = createEffect(()=> this.actions$.pipe(
        ofType(deleteCategoryRequest),
        tap(() => this.store.dispatch(setLoading())), 
        switchMap(action =>
            this.categoryService.deleteCategory(action.categoryId).pipe(
                map((deletedCategory) => removeCategory({ categoryId: deletedCategory._id })),
                catchError(error => {
                    console.error('Error in deleting category:', error);
                    return of(); 
                })
            )
        )
    ))

    updateCategory$ = createEffect( ()=> this.actions$.pipe(
        ofType(updateCategoryRequest),
        tap(() => this.store.dispatch(setLoading())), 
        switchMap(action =>
            this.categoryService.updateCategory(action.updatedCategory).pipe(
                map((updatedCategory) => updateCategory({updatedCategory})),
                catchError(error => {
                    console.error('Error in updating category:', error);
                    return of(); 
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
