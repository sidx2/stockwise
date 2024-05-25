import { createSelector, createFeatureSelector } from '@ngrx/store';
import { CategoryState } from '../models/category';

export const selectCategoryState = createFeatureSelector<CategoryState>('categories');

export const categorySelector = createSelector(
    selectCategoryState,
    (state: CategoryState) => state.categories
);

export const getLoading = createSelector(
    selectCategoryState,
    (state: CategoryState) => state.loading
);
