import { createReducer, on } from '@ngrx/store';
import { setLoading, getCategorySuccess, createCategorySuccess, deleteCategorySuccess, updateCategorySuccess, getCategoryFailure, createCategoryFailure, deleteCategoryFailure, updateCategoryFailure, clearErrorMessage} from './category.action';
import { Category, CategoryState } from '../models/category';
import { logoutUserSuccess } from '../../../store/global.actions';

export const initialState: CategoryState = {
  categories: [],
  loading: false,
  errorMessage: ''
}

export const categoryReducer = createReducer(
  initialState,

  on(getCategorySuccess, (state, { categories }) => {
    return {...state, categories: categories, loading: false}
  }),

  on(getCategoryFailure, (state, {errorMessage})=>({
    ...state,
    errorMessage: errorMessage,
    loading: false
  })),

  on(createCategorySuccess, (state, { category }) => ({
    ...state, 
    categories: [...state.categories, category],
    loading: false
  })),

  on(createCategoryFailure, (state, {errorMessage})=>({
    ...state,
    errorMessage: errorMessage,
    loading: false
  })),

  on(deleteCategorySuccess, (state, { categoryId }) => ({
    ...state,
    categories: state.categories.filter(category => category._id !== categoryId),
    loading: false
  })),

  on(deleteCategoryFailure, (state, {errorMessage})=>({
    ...state,
    errorMessage: errorMessage,
    loading: false
  })),

  on(updateCategorySuccess, (state, { updatedCategory }) => ({
    ...state,
    categories: state.categories.map(category =>
      category._id === updatedCategory._id ? updatedCategory : category),
    loading: false
  })),

  on(updateCategoryFailure, (state, {errorMessage})=>({
    ...state,
    errorMessage: errorMessage,
    loading: false
  })),

  on(setLoading, (state)=> ({...state, loading: true})),
  on(clearErrorMessage, (state)=> ({...state, errorMessage: ''})),
  on(logoutUserSuccess, ()=>  initialState)
);
