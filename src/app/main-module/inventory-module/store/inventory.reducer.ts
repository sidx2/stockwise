import { createReducer, on } from '@ngrx/store';
import { Item, UserAsset } from '../models/inventory';
import { addItem, removeItem, setItems, updateItem, setUserAssets } from './inventory.action';
import { logoutUserSuccess } from '../../../store/global.actions';

export interface InventoryState {
  items: Item[];
  userAssets: UserAsset[];
  loading: boolean
}

const initialState: InventoryState = {
  items: [],
  userAssets: [],
  loading: false
};

export const inventoryReducer = createReducer(
  initialState,

  on(setItems, (state, { items }) => ({ ...state, items })),

  on(setUserAssets, (state, { userAssets }) => ({ ...state, userAssets })),

  on(addItem, (state, { item }) => ({
    ...state,
    items: [...state.items, item]
  })),

  on(removeItem, (state, { itemId }) => ({
    ...state,
    items: state.items.filter((item) => item._id !== itemId)
  })),

  on(updateItem, (state, { updatedItem }) => ({
    ...state,
    items: state.items.map((item) => (item._id === updatedItem._id ? updatedItem : item))
  })), 

  on(logoutUserSuccess, ()=>  initialState) 
);
