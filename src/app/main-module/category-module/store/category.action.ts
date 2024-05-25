import { createAction, props } from '@ngrx/store';
import { Category } from '../models/category';

// Actions triggering backend requests
export const getCategoryRequest = createAction('[Category] Get Categories Request', props<{orgId: string}>());
export const createCategoryRequest = createAction('[Category] Create Category Request', props<{ category: Category }>());
export const deleteCategoryRequest = createAction('[Category] Delete Category Request', props<{ categoryId: string }>());
export const updateCategoryRequest = createAction('[Category] Update Category Request', props<{ updatedCategory: Category }>());

// Actions updating state
export const setCategories = createAction('[Category] Set Categories', props<{ categories: Category[] }>());
export const addCategory = createAction('[Category] Add Category', props<{ category: Category }>());
export const removeCategory = createAction('[Category] Remove Category', props<{ categoryId: string }>());
export const updateCategory = createAction('[Category] Update Category', props<{ updatedCategory: Category }>());

// loading
export const setLoading = createAction('[Category] set loading')
export const resetLoading = createAction('[Category] reset loading')
