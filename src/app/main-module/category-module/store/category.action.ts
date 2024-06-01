import { createAction, props } from '@ngrx/store';
import { Category } from '../models/category';

// Actions triggering backend requests
export const getCategoryRequest = createAction('[Category] Get Categories Request');
export const createCategoryRequest = createAction('[Category] Create Category Request', props<{ category: Category }>());
export const deleteCategoryRequest = createAction('[Category] Delete Category Request', props<{ categoryId: string }>());
export const updateCategoryRequest = createAction('[Category] Update Category Request', props<{ updatedCategory: Category }>());

// Success actions
export const getCategorySuccess = createAction('[Category] Get Categories Success', props<{ categories: Category[] }>());
export const createCategorySuccess = createAction('[Category] Create Category Success', props<{ category: Category }>());
export const deleteCategorySuccess = createAction('[Category] Delete Category Success', props<{ categoryId: string }>());
export const updateCategorySuccess = createAction('[Category] Update Category Success', props<{ updatedCategory: Category }>());

// Failure actions
export const getCategoryFailure = createAction('[Category] Get Categories Failure', props<{ errorMessage: string }>());
export const createCategoryFailure = createAction('[Category] Create Category Failure', props<{ errorMessage: string }>());
export const deleteCategoryFailure = createAction('[Category] Delete Category Failure', props<{ errorMessage: string }>());
export const updateCategoryFailure = createAction('[Category] Update Category Failure', props<{ errorMessage: string }>());

// loading
export const setLoading = createAction('[Category] set loading')

// clear error message
export const clearErrorMessage = createAction('[Category] clear error message');
