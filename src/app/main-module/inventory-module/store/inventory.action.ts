import { createAction, props } from '@ngrx/store';
import { CheckoutMailDetails, Item, UserAsset } from '../models/inventory';
import { CheckinDetails, CheckoutDetails } from '../models/inventory';

// Actions triggering backend requests
export const getItemRequest = createAction('[Item] Get Item Request', props<{orgId: string}>());
export const createItemRequest = createAction('[Item] Create Item Request', props<{ item: Item }>());
export const deleteItemRequest = createAction('[Item] Delete Item Request', props<{ itemId: string }>());
export const updateItemRequest = createAction('[Item] Update Item Request', props<{ updatedItem: Item }>());
export const checkoutItemRequest = createAction('[Item] Checkout Item Request', props<{assignedToDetails: CheckoutDetails, checkoutMailDetails: CheckoutMailDetails}>());
export const checkoutMailRequest = createAction('[Item] Checkout Item Request', props<{checkoutMailDetails: CheckoutMailDetails}>());
export const checkinItemRequest = createAction('[Item] Checkin Item Request', props<{checkinDetails: CheckinDetails}>());

// Success actions
export const getItemSuccess = createAction('[Item] Get Item Success', props<{ items: Item[] }>());
export const createItemSuccess = createAction('[Item] Create Item Success', props<{ item: Item }>());
export const deleteItemSuccess = createAction('[Item] Delete Item Success', props<{ itemId: string }>());
export const updateItemSuccess = createAction('[Item] Update Item Success', props<{ updatedItem: Item }>());
export const checkoutItemSuccess = createAction('[Item] Update Item Success', props<{ updatedItem: Item }>());

// Failure actions
export const getItemFailure = createAction('[Item] Get Item Failure', props<{ errorMessage: string }>());
export const createItemFailure = createAction('[Item] Create Item Failure', props<{ errorMessage: string }>());
export const deleteItemFailure = createAction('[Item] Delete Item Failure', props<{ errorMessage: string }>());
export const updateItemFailure = createAction('[Item] Update Item Failure', props<{ errorMessage: string }>());
export const checkoutItemFailure = createAction('[Item] Checkout Item Failure', props<{ errorMessage: string }>());
export const checkoutMailFailure = createAction('[Item] Checkout Mail Failure', props<{ errorMessage: string }>());

// userAsset
export const getUserAssets = createAction('[UserAssets] Get UserAsset Request');
export const getUserAssetsSuccess = createAction('[UserAssets] Get UserAsset Success', props<{ userAssets: UserAsset[] }>());
export const getUserAssetsFailure = createAction('[UserAssets] Get UserAsset Failure', props<{ errorMessage: string }>());

// loading
export const setLoading = createAction('[Item] set loading');
export const resetLoading = createAction('[Item] reset loading');



