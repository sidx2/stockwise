import { createAction, props } from '@ngrx/store';
import { CheckoutMailDetails, Item, UserAsset, CheckinDetails, CheckoutDetails } from '../models/inventory';

// inventory actions
export const getItemRequest = createAction('[Item] Get Item Request', props<{identificationType:string, categoryId: string, assignedStatus: string,  limit: number, skip: number, searchText: string, assetId: string}>());
export const getItemSuccess = createAction('[Item] Get Item Success', props<{ items: Item[], totalItems: number }>());
export const getItemFailure = createAction('[Item] Get Item Failure', props<{ errorMessage: string }>());

export const createItemRequest = createAction('[Item] Create Item Request', props<{ item: Item }>());
export const createItemSuccess = createAction('[Item] Create Item Success', props<{ item: Item }>());
export const createItemFailure = createAction('[Item] Create Item Failure', props<{ errorMessage: string }>());

export const createMultipleItemRequest = createAction('[Item] Create Multiple Item Request', props<{ item: Item }>());
export const createMultipleItemSuccess = createAction('[Item] Create Multiple Item Success', props<{ items: Item[] }>());
export const createMultipleItemFailure = createAction('[Item] Create Multiple Item Failure', props<{ errorMessage: string }>());

export const deleteItemRequest = createAction('[Item] Delete Item Request', props<{ itemId: string }>());
export const deleteItemSuccess = createAction('[Item] Delete Item Success', props<{ itemId: string }>());
export const deleteItemFailure = createAction('[Item] Delete Item Failure', props<{ errorMessage: string }>());

export const updateItemRequest = createAction('[Item] Update Item Request', props<{ updatedItem: Item }>());
export const updateItemSuccess = createAction('[Item] Update Item Success', props<{ updatedItem: Item }>());
export const updateItemFailure = createAction('[Item] Update Item Failure', props<{ errorMessage: string }>());

export const checkoutItemRequest = createAction('[Item] Checkout Item Request', props<{assignedToDetails: CheckoutDetails}>());
export const checkoutItemSuccess = createAction('[Item] checkout Item Success', props<{ updatedItem: Item }>());
export const checkoutItemFailure = createAction('[Item] Checkout Item Failure', props<{ errorMessage: string }>());

export const checkinItemRequest = createAction('[Item] Checkin Item Request', props<{checkinDetails: CheckinDetails}>());
export const checkintItemSuccess = createAction('[Item] checkin Item Success', props<{ updatedItem: Item }>());
export const checkinItemFailure = createAction('[Item] Checkin Item Failure', props<{ errorMessage: string }>());

export const checkoutMailRequest = createAction('[Item] Checkout Mail Request', props<{checkoutMailDetails: CheckoutMailDetails}>());
export const checkoutMailSuccess = createAction('[Item] checkout mail Success');
export const checkoutMailFailure = createAction('[Item] Checkout Mail Failure', props<{ errorMessage: string }>());

// user Assets
export const getUserAssets = createAction('[UserAssets] Get UserAsset Request');
export const getUserAssetsSuccess = createAction('[UserAssets] Get UserAsset Success', props<{ userAssets: UserAsset[] }>());
export const getUserAssetsFailure = createAction('[UserAssets] Get UserAsset Failure', props<{ errorMessage: string }>());

// loading
export const setLoading = createAction('[Item] set loading');

// clear error message
export const clearErrorMessage = createAction('[Item] clear error message');




