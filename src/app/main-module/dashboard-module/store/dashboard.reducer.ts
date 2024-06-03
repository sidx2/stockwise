import { createReducer, on } from '@ngrx/store';
import { logoutUserSuccess } from '../../../auth-module/store/auth.actions';
import { DashboardState } from '../models/dashboard';
import { clearErrorMessage, getInventoryCountsSuccess, setLoading } from './dashboard.action';

const initialState: DashboardState = {
    inventoryCounts: [],
    loading: false,
    errorMessage: ''
};

export const dashboardReducer = createReducer(
    initialState,
    on(getInventoryCountsSuccess, (state, { inventoryCounts }) => {
        console.log('Reducer - inventory counts:', inventoryCounts);
        return { ...state, inventoryCounts, loading: false };
    }),
    on(setLoading, (state) => ({ ...state, loading: true })),
    on(clearErrorMessage, (state) => ({ ...state, errorMessage: '' })),
    on(logoutUserSuccess, () => initialState)
);
