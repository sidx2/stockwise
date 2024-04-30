import { createAction, props } from '@ngrx/store';
import { Category } from '../models/category';

// Actions triggering backend requests
export const getCategoryRequest = createAction('[Category] Get Categories Request');
export const createCategoryRequest = createAction('[Category] Create Category Request');
export const deleteCategoryRequest = createAction('[Category] Delete Category Request');
export const updateCategoryRequest = createAction('[Category] Update Category Request');

// Actions updating state
export const setCategories = createAction('[Category] Set Categories', props<{ categories: Category[] }>());
export const addCategory = createAction('[Category] Add Category', props<{ category: Category }>());
export const removeCategory = createAction('[Category] Remove Category', props<{ categoryId: string }>());
export const updateCategory = createAction('[Category] Update Category', props<{ updatedCategory: Category }>());