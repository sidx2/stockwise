import { createSelector, createFeatureSelector } from '@ngrx/store';
import { InventoryState } from './inventory.reducer';

export const selectInventoryState = createFeatureSelector<InventoryState>('inventory');

export const inventorySelector = createSelector(
    selectInventoryState,
    (state: InventoryState) => state.items
);

export const usrAssetSelector = createSelector(
    selectInventoryState,
    (state: InventoryState) => state.userAssets
);

export const getLoading = createSelector(
    selectInventoryState,
    (state: InventoryState) => state.loading
);