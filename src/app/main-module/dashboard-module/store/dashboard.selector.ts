import { createSelector, createFeatureSelector } from '@ngrx/store';
import { DashboardState } from '../models/dashboard';

export const selectDashboardState = createFeatureSelector<DashboardState>('dashboard');

export const inventoryCountSelector = createSelector(
    selectDashboardState,
    (state: DashboardState) => {
        console.log('Selector - inventory counts:', state.inventoryCounts);
        return state.inventoryCounts;
    }
);

export const getLoading = createSelector(
    selectDashboardState,
    (state: DashboardState) => state.loading
);

export const getErrorMessage = createSelector(
    selectDashboardState,
    (state: DashboardState) => state.errorMessage
);
