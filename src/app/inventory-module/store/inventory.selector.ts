import { createSelector, createFeatureSelector } from '@ngrx/store';
import { InventoryState } from './inventory.reducer';

export const selectInventoryState = createFeatureSelector<InventoryState>('inventory');

export const selectItems = createSelector(
    selectInventoryState,
    (state: InventoryState) => state.items
);
