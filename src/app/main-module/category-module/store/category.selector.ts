import { createSelector, createFeatureSelector } from '@ngrx/store';
import { CategoryState } from './category.reducer';

export const selectCategoryState = createFeatureSelector<CategoryState>('categories');

export const selectCategories = createSelector(
    selectCategoryState,
    (state: CategoryState) => state.categories
);

export const getLoading = createSelector(
    selectCategoryState,
    (state: CategoryState) => state.loading
);
