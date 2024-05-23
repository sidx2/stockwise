import { createReducer, on } from '@ngrx/store';
import { Item, UserAsset } from '../models/inventory';
import { addItem, removeItem, setItems, updateItem, setUserAssets } from './inventory.action';

export interface InventoryState {
  items: Item[];
  userAssets: UserAsset[];
}

const initialState: InventoryState = {
  items: [],
  userAssets: []
};

export const inventoryReducer = createReducer(
  initialState,

  on(setItems, (_, { items }) => ({ ...initialState, items })),

  on(setUserAssets, (_, { userAssets }) => ({ ...initialState, userAssets })),

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
  }))
);
