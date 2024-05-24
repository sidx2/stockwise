import { createReducer, on } from '@ngrx/store';
import { setCategories, addCategory, removeCategory, updateCategory} from './category.action';
import { Category } from '../models/category';
import { logoutUserSuccess } from '../../../store/global.actions';

export const initialState: Category[] = [];

export const categoryReducer = createReducer(
  initialState,

  on(setCategories, (_, { categories }) => {
    return categories;
  }),

  on(addCategory, (state, { category }) => [...state, category]),

  on(removeCategory, (state, { categoryId }) => 
    state.filter(category => category._id !== categoryId)
  ),

  on(updateCategory, (state, {updatedCategory})=>{
    const updatedState = state.map(category => {
      if (category._id === updatedCategory._id) {
        return updatedCategory;
      } else {
        return category;
      }
    });
    return updatedState;
  }),

  on(logoutUserSuccess, ()=>  initialState)
);
