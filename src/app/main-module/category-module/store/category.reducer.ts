import { createReducer, on } from '@ngrx/store';
import { setCategories, addCategory, removeCategory, updateCategory, setLoading} from './category.action';
import { Category } from '../models/category';
import { logoutUserSuccess } from '../../../store/global.actions';

export interface CategoryState {
  categories: Category[]
  loading: boolean
}

export const initialState: CategoryState = {
  categories: [],
  loading: false
}

export const categoryReducer = createReducer(
  initialState,

  on(setCategories, (state, { categories }) => {
    return {...state, categories: categories, loading: false}
  }),

  on(addCategory, (state, { category }) => ({
    ...state, 
    categories: [...state.categories, category],
    loading: false
  })),

  on(removeCategory, (state, { categoryId }) => ({
    ...state,
    categories: state.categories.filter(category => category._id !== categoryId),
    loading: false
  })),

  on(updateCategory, (state, { updatedCategory }) => ({
    ...state,
    categories: state.categories.map(category =>
      category._id === updatedCategory._id ? updatedCategory : category),
    loading: false
  })),

  on(setLoading, (state)=> ({...state, loading: true})),
  on(logoutUserSuccess, ()=>  initialState)
);
