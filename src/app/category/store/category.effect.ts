import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, delayWhen, map, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { CategoryService } from '../services/category.service';
import { createCategoryRequest, getCategoryRequest, setCategories, addCategory, deleteCategoryRequest, removeCategory, updateCategoryRequest, updateCategory } from './category.action';

@Injectable()
export class CategoryEffects {

    loadCategories$ = createEffect(() => this.actions$.pipe(
        ofType(getCategoryRequest),
        tap(() => console.log('getCategoryRequest dispatched')),
        mergeMap(() =>
            this.categoryService.getCategories().pipe(
                map(response => setCategories({ categories: response })),
                tap(action => console.log('Dispatched action setCategories')),
                catchError(error => {
                    console.error('Error in loading categories:', error);
                    return of(); // Return empty observable or handle error accordingly
                })
            )
        )
    ));

    createCategory$ = createEffect(() => this.actions$.pipe(
        ofType(createCategoryRequest),
        tap(action => console.log('Dispatched action createCategoryRequest')),
        mergeMap((action) =>
            this.categoryService.createCategory(action.category).pipe(
                map((createdCategory) => addCategory({ category: createdCategory })),
                tap(action => console.log('Dispatched action addCategory')),
                catchError(error => {
                    console.error('Error in creating category:', error);
                    return of(); // Return empty observable or handle error accordingly
                })
            )
        )
    ));

    deleteCategory$ = createEffect(()=> this.actions$.pipe(
        ofType(deleteCategoryRequest),
        tap(action => console.log('Dispatched action deleteCategoryRequest')),
        mergeMap(action =>
            this.categoryService.deleteCategory(action.categoryId).pipe(
                map((deletedCategory) => removeCategory({ categoryId: deletedCategory._id })),
                tap(action => console.log('Dispatched action remove category')),
                catchError(error => {
                    console.error('Error in deleting category:', error);
                    return of(); 
                    return of(); 
                })
            )
        )
    ))

    updateCategory$ = createEffect( ()=> this.actions$.pipe(
        ofType(updateCategoryRequest),
        tap(action => console.log('Dispatched action updateCategoryRequest')),
        mergeMap(action =>
            this.categoryService.updateCategory(action.updatedCategory).pipe(
                map((updatedCategory) => updateCategory({updatedCategory})),
                tap(action => console.log('Dispatched action update category')),
                catchError(error => {
                    console.error('Error in updating category:', error);
                    return of(); 
                })
            )
        )
    ))

    constructor(
        private actions$: Actions,
        private categoryService: CategoryService
    ) { }
}
