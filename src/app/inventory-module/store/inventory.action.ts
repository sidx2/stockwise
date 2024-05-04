import { createAction, props } from '@ngrx/store';
import { Item } from '../models/inventory';

// Actions triggering backend requests
export const getItemRequest = createAction('[Item] Get Item Request');
export const createItemRequest = createAction('[Item] Create Item Request', props<{ item: Item }>());
export const deleteItemRequest = createAction('[Item] Delete Item Request', props<{ itemId: string }>());
export const updateItemRequest = createAction('[Item] Update Item Request', props<{ updatedItem: Item }>());

// Actions updating state
export const setItems = createAction('[Item] Set Items', props<{ items: Item[] }>());
export const addItem = createAction('[Item] Add Item', props<{ item: Item }>());
export const removeItem = createAction('[Item] Remove Item', props<{ itemId: string | undefined }>());
export const updateItem = createAction('[Item] Update Item', props<{ updatedItem: Item }>());


