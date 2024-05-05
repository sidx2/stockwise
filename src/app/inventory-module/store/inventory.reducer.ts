import { createReducer, on } from '@ngrx/store';
import { Item } from '../models/inventory';

import { addItem, removeItem, setItems, updateItem } from './inventory.action';
export const initialState: Item[] = [];

export const inventoryReducer = createReducer(
    initialState,

    on(setItems, (_, { items }) => {
        console.log("hello");
        return items;
    }),

    on(addItem, (state, { item }) => [...state, item]),

    on(removeItem, (state , {itemId})=>{
        return state.filter((item)=>  item._id !== itemId)
    }),

    on(updateItem, (state, {updatedItem})=>{
        const updatedState = state.map( item => {
          if (item._id === updatedItem._id) {
            return updatedItem;
          } else {
            return item;
          }
        });
        return updatedState;
      }),

);

