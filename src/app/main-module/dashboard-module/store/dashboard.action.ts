import { createAction, props } from '@ngrx/store';
import { InventoryCount } from '../models/dashboard';

export const getInventoryCountsRequest = createAction('[Dashboard] Get Inventory Count Request');

export const getInventoryCountsSuccess = createAction('[Dashboard] Get Inventory Count Success', props<{ inventoryCounts: InventoryCount[] }>());

export const getInventoryCountsFailure = createAction('[Dashboard] Get Inventory Count Failure', props<{ errorMessage: string }>());

export const setLoading = createAction('[Dashboard] set loading')

export const clearErrorMessage = createAction('[Dashboard] clear error message');
