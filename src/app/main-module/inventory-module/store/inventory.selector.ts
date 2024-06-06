import { createSelector, createFeatureSelector } from '@ngrx/store';
import { InventoryState } from '../models/inventory';

export const selectInventoryState = createFeatureSelector<InventoryState>('inventory');

export const inventorySelector = createSelector(
    selectInventoryState,
    (state: InventoryState) => state.items
);

export const totalItemsSelector = createSelector(
    selectInventoryState,
    (state: InventoryState) => state.totalItems
)

export const usrAssetSelector = createSelector(
    selectInventoryState,
    (state: InventoryState) => state.userAssets
);

export const getLoading = createSelector(
    selectInventoryState,
    (state: InventoryState) => state.loading
);

export const getErrorMessage = createSelector(
    selectInventoryState,
    (state: InventoryState) => state.errorMessage
);