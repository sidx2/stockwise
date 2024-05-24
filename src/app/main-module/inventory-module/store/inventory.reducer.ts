import { createReducer, on } from '@ngrx/store';
import { InventoryState, Item, UserAsset } from '../models/inventory';
import { addItem, removeItem, setItems, updateItem, setUserAssets, setLoading, resetLoading } from './inventory.action';
import { logoutUserSuccess } from '../../../store/global.actions';

const initialState: InventoryState = {
  items: [],
  userAssets: [],
  loading: false
};

export const inventoryReducer = createReducer(
  initialState,

  on(setItems, (state, { items }) => ({ ...state, items, loading:false })),

  on(setUserAssets, (state, { userAssets }) => ({ ...state, userAssets, loading: false })),

  on(addItem, (state, { item }) => ({
    ...state,
    items: [...state.items, item],
    loading: false
  })),

  on(removeItem, (state, { itemId }) => ({
    ...state,
    items: state.items.filter((item) => item._id !== itemId),
    loading: false
  })),

  on(updateItem, (state, { updatedItem }) => ({
    ...state,
    items: state.items.map((item) => (item._id === updatedItem._id ? updatedItem : item)),
    loading: false
  })), 

  on(setLoading, (state)=> ({...state, loading: true})),
  on(resetLoading, (state)=> ({...state, loading: false})),

  on(logoutUserSuccess, ()=>  initialState)
);
